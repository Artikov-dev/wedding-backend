import { Pool, PoolClient, QueryResult, QueryResultRow, Submittable } from 'pg';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is required');
}

const isLocalDatabase = /localhost|127\.0\.0\.1/.test(connectionString);

const pool = new Pool({
  connectionString,
  ssl: isLocalDatabase ? undefined : { rejectUnauthorized: false },
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

const MAX_QUERY_RETRIES = 2;
const QUERY_RETRY_DELAY_MS = 500;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function query<T extends any[] | QueryResultRow | Submittable = any>(text: string, params: unknown[] = []): Promise<QueryResult<T>> {
  let attempt = 0;

  while (true) {
    try {
      return await pool.query<T>(text, params);
    } catch (error: any) {
      attempt += 1;
      const message = String(error?.message || '');
      const retryable = /timeout exceeded|Connection terminated|connect ECONNRESET|connection timeout/i.test(message);
      if (attempt <= MAX_QUERY_RETRIES && retryable) {
        await sleep(QUERY_RETRY_DELAY_MS);
        continue;
      }
      throw error;
    }
  }
}

export async function queryOne<T extends any[] | QueryResultRow | Submittable = any>(text: string, params: unknown[] = []): Promise<T | null> {
  const result = await query<T>(text, params);
  return result.rows[0] ?? null;
}

export async function transaction<T>(callback: (client: PoolClient) => Promise<T>): Promise<T> {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

function quoteIdentifier(name: string): string {
  return '"' + name.replace(/"/g, '""') + '"';
}

function buildWhereClause(where: any, params: unknown[] = [], modelName?: string): string {
  if (!where || Object.keys(where).length === 0) {
    return '';
  }

  const parts: string[] = [];

  for (const key of Object.keys(where)) {
    const value = where[key];

    if (key === 'OR' && Array.isArray(value)) {
      const orParts = value.map((item: any) => {
        const clause = buildWhereClause(item, params, modelName);
        return clause.replace(/^WHERE\s*/i, '');
      });
      parts.push(`(${orParts.join(' OR ')})`);
      continue;
    }

    const fieldName = quoteIdentifier(key);

    if (value && typeof value === 'object' && !Array.isArray(value) && !(value instanceof Date)) {
      const operatorKeys = Object.keys(value);
      const operators = [];

      if ('gte' in value) {
        params.push(value.gte);
        operators.push(`${fieldName} >= $${params.length}`);
      }
      if ('lte' in value) {
        params.push(value.lte);
        operators.push(`${fieldName} <= $${params.length}`);
      }
      if ('gt' in value) {
        params.push(value.gt);
        operators.push(`${fieldName} > $${params.length}`);
      }
      if ('lt' in value) {
        params.push(value.lt);
        operators.push(`${fieldName} < $${params.length}`);
      }
      if ('in' in value) {
        const arrayValue = Array.isArray(value.in) ? value.in : [value.in];
        if (arrayValue.length === 0) {
          operators.push('FALSE');
        } else {
          params.push(arrayValue);
          operators.push(`${fieldName} = ANY($${params.length})`);
        }
      }
      if ('contains' in value) {
        params.push(`%${value.contains}%`);
        operators.push(`${fieldName} ILIKE $${params.length}`);
      }
      if ('equals' in value) {
        params.push(value.equals);
        operators.push(`${fieldName} = $${params.length}`);
      }
      if ('notIn' in value) {
        const arrayValue = Array.isArray(value.notIn) ? value.notIn : [value.notIn];
        if (arrayValue.length === 0) {
          operators.push('TRUE');
        } else {
          params.push(arrayValue);
          operators.push(`${fieldName} <> ALL($${params.length})`);
        }
      }
      if ('has' in value) {
        params.push([value.has]);
        operators.push(`${fieldName} @> $${params.length}::text[]`);
      }
      if ('not' in value) {
        params.push(value.not);
        operators.push(`${fieldName} <> $${params.length}`);
      }

      if (operators.length > 0) {
        parts.push(operators.join(' AND '));
        continue;
      }

      if (modelName && modelRelations[modelName]?.[key]) {
        const relation = modelRelations[modelName][key];
        const relationWhere = buildWhereClause(value, params, relation.model);
        parts.push(`${quoteIdentifier(relation.foreignKey)} IN (SELECT ${quoteIdentifier(relation.remoteKey)} FROM ${modelTables[relation.model]} WHERE ${relationWhere.replace(/^WHERE\s*/i, '')})`);
        continue;
      }
    }

    params.push(value);
    parts.push(`${fieldName} = $${params.length}`);
  }

  return parts.length ? `WHERE ${parts.join(' AND ')}` : '';
}

function buildOrderBy(orderBy: any, alias: string = ''): string {
  if (!orderBy) return '';
  const clauses: string[] = [];
  const prefix = alias ? `${alias}.` : '';

  if (Array.isArray(orderBy)) {
    for (const item of orderBy) {
      clauses.push(buildOrderBy(item, alias));
    }
  } else {
    for (const key of Object.keys(orderBy)) {
      const direction = orderBy[key] === 'desc' ? 'DESC' : 'ASC';
      clauses.push(`${prefix}${quoteIdentifier(key)} ${direction}`);
    }
  }

  return clauses.length ? `ORDER BY ${clauses.join(', ')}` : '';
}

function pickFields<T extends Record<string, any>>(item: T, select: any): any {
  if (!select || select === true) {
    return item;
  }

  const result: any = {};
  for (const key of Object.keys(select)) {
    if (select[key]) {
      result[key] = item[key];
    }
  }
  return result;
}

const modelTables: Record<string, string> = {
  user: '"User"',
  oTP: '"OTP"',
  refreshToken: '"RefreshToken"',
  address: '"Address"',
  hallProfile: '"HallProfile"',
  hallAmenity: '"HallAmenity"',
  hallService: '"HallService"',
  serviceProvider: '"ServiceProvider"',
  booking: '"Booking"',
  serviceBooking: '"ServiceBooking"',
  payment: '"Payment"',
  invoice: '"Invoice"',
  review: '"Review"',
  favorite: '"Favorite"',
  notification: '"Notification"',
  chatMessage: '"ChatMessage"',
  conversation: '"Conversation"',
  invitation: '"Invitation"',
  auditLog: '"AuditLog"',
  // New models
  hallApprovalRequest: '"HallApprovalRequest"',
  hallCalendar: '"HallCalendar"',
  hallOwner: '"HallOwner"',
  hallImage: '"HallImage"',
  serviceImage: '"ServiceImage"',
  profileImage: '"ProfileImage"',
  singer: '"Singer"',
  car: '"Car"',
  menu: '"Menu"',
  menuItem: '"MenuItem"',
  region: '"Region"',
  district: '"District"',
  dailyMetric: '"DailyMetric"',
  ownerAnalytic: '"OwnerAnalytic"',
  adminAnalytic: '"AdminAnalytic"',
};

interface RelationDef {
  model: string;
  type: 'one' | 'many';
  foreignKey: string;
  remoteKey: string;
  localKey?: string;
}

const modelRelations: Record<string, Record<string, RelationDef>> = {
  booking: {
    hall: { model: 'hallProfile', type: 'one', foreignKey: 'hallId', remoteKey: 'id' },
    user: { model: 'user', type: 'one', foreignKey: 'userId', remoteKey: 'id' },
    serviceBookings: { model: 'serviceBooking', type: 'many', foreignKey: 'bookingId', remoteKey: 'id', localKey: 'id' },
    payments: { model: 'payment', type: 'many', foreignKey: 'bookingId', remoteKey: 'id', localKey: 'id' },
    invitations: { model: 'invitation', type: 'many', foreignKey: 'bookingId', remoteKey: 'id', localKey: 'id' },
  },
  hallProfile: {
    user: { model: 'user', type: 'one', foreignKey: 'userId', remoteKey: 'id' },
    amenities: { model: 'hallAmenity', type: 'many', foreignKey: 'hallId', remoteKey: 'id', localKey: 'id' },
    services: { model: 'hallService', type: 'many', foreignKey: 'hallId', remoteKey: 'id', localKey: 'id' },
    bookings: { model: 'booking', type: 'many', foreignKey: 'hallId', remoteKey: 'id', localKey: 'id' },
    reviews: { model: 'review', type: 'many', foreignKey: 'hallId', remoteKey: 'id', localKey: 'id' },
    favorites: { model: 'favorite', type: 'many', foreignKey: 'hallId', remoteKey: 'id', localKey: 'id' },
    images: { model: 'hallImage', type: 'many', foreignKey: 'hallId', remoteKey: 'id', localKey: 'id' },
    owners: { model: 'hallOwner', type: 'many', foreignKey: 'hallId', remoteKey: 'id', localKey: 'id' },
    calendars: { model: 'hallCalendar', type: 'many', foreignKey: 'hallId', remoteKey: 'id', localKey: 'id' },
    menus: { model: 'menu', type: 'many', foreignKey: 'hallId', remoteKey: 'id', localKey: 'id' },
  },
  serviceBooking: {
    serviceProvider: { model: 'serviceProvider', type: 'one', foreignKey: 'serviceProviderId', remoteKey: 'id' },
  },
  favorite: {
    hall: { model: 'hallProfile', type: 'one', foreignKey: 'hallId', remoteKey: 'id' },
    user: { model: 'user', type: 'one', foreignKey: 'userId', remoteKey: 'id' },
  },
  invitation: {
    booking: { model: 'booking', type: 'one', foreignKey: 'bookingId', remoteKey: 'id' },
    user: { model: 'user', type: 'one', foreignKey: 'userId', remoteKey: 'id' },
    invitedBy: { model: 'user', type: 'one', foreignKey: 'invitedByUserId', remoteKey: 'id' },
  },
  chatMessage: {
    sender: { model: 'user', type: 'one', foreignKey: 'senderId', remoteKey: 'id' },
    conversation: { model: 'conversation', type: 'one', foreignKey: 'conversationId', remoteKey: 'id' },
  },
  conversation: {
    messages: { model: 'chatMessage', type: 'many', foreignKey: 'conversationId', remoteKey: 'id', localKey: 'id' },
  },
  payment: {
    booking: { model: 'booking', type: 'one', foreignKey: 'bookingId', remoteKey: 'id' },
    user: { model: 'user', type: 'one', foreignKey: 'userId', remoteKey: 'id' },
  },
  invoice: {
    payment: { model: 'payment', type: 'one', foreignKey: 'paymentId', remoteKey: 'id' },
  },
  review: {
    user: { model: 'user', type: 'one', foreignKey: 'userId', remoteKey: 'id' },
    hall: { model: 'hallProfile', type: 'one', foreignKey: 'hallId', remoteKey: 'id' },
    serviceProvider: { model: 'serviceProvider', type: 'one', foreignKey: 'serviceProviderId', remoteKey: 'id' },
  },
  serviceProvider: {
    user: { model: 'user', type: 'one', foreignKey: 'userId', remoteKey: 'id' },
    images: { model: 'serviceImage', type: 'many', foreignKey: 'serviceProviderId', remoteKey: 'id', localKey: 'id' },
  },
  notification: {
    user: { model: 'user', type: 'one', foreignKey: 'userId', remoteKey: 'id' },
  },
  oTP: {
    user: { model: 'user', type: 'one', foreignKey: 'userId', remoteKey: 'id' },
  },
  refreshToken: {
    user: { model: 'user', type: 'one', foreignKey: 'userId', remoteKey: 'id' },
  },
  address: {
    user: { model: 'user', type: 'one', foreignKey: 'userId', remoteKey: 'id' },
  },
  // New models
  hallApprovalRequest: {
    hall: { model: 'hallProfile', type: 'one', foreignKey: 'hallId', remoteKey: 'id' },
    owner: { model: 'user', type: 'one', foreignKey: 'ownerId', remoteKey: 'id' },
    approvedByUser: { model: 'user', type: 'one', foreignKey: 'approvedBy', remoteKey: 'id' },
  },
  hallCalendar: {
    hall: { model: 'hallProfile', type: 'one', foreignKey: 'hallId', remoteKey: 'id' },
  },
  hallOwner: {
    hall: { model: 'hallProfile', type: 'one', foreignKey: 'hallId', remoteKey: 'id' },
    owner: { model: 'user', type: 'one', foreignKey: 'ownerId', remoteKey: 'id' },
    assignedByUser: { model: 'user', type: 'one', foreignKey: 'assignedBy', remoteKey: 'id' },
  },
  hallImage: {
    hall: { model: 'hallProfile', type: 'one', foreignKey: 'hallId', remoteKey: 'id' },
  },
  serviceImage: {
    provider: { model: 'serviceProvider', type: 'one', foreignKey: 'serviceProviderId', remoteKey: 'id' },
  },
  profileImage: {
    user: { model: 'user', type: 'one', foreignKey: 'userId', remoteKey: 'id' },
  },
  singer: {},
  car: {},
  menu: {
    hall: { model: 'hallProfile', type: 'one', foreignKey: 'hallId', remoteKey: 'id' },
    items: { model: 'menuItem', type: 'many', foreignKey: 'menuId', remoteKey: 'id', localKey: 'id' },
  },
  menuItem: {
    menu: { model: 'menu', type: 'one', foreignKey: 'menuId', remoteKey: 'id' },
  },
  region: {},
  district: {
    region: { model: 'region', type: 'one', foreignKey: 'regionId', remoteKey: 'id' },
  },
  dailyMetric: {},
  ownerAnalytic: {
    owner: { model: 'user', type: 'one', foreignKey: 'ownerId', remoteKey: 'id' },
  },
  adminAnalytic: {
    topRatedHall: { model: 'hallProfile', type: 'one', foreignKey: 'topRatedHall', remoteKey: 'id' },
  },
};

async function attachInclude(records: any[], modelName: string, include: any): Promise<any[]> {
  if (!records.length || !include) return records;

  const relationEntries = Object.entries(include) as [string, any][];
  for (const [relationName, relationConfig] of relationEntries) {
    if (!relationConfig) continue;
    if (relationName === '_count') {
      const counts: Record<string, Record<string, number>> = {};
      const relationCountConfig = relationConfig.select || {};
      for (const relationKey of Object.keys(relationCountConfig)) {
        const relationDef = modelRelations[modelName]?.[relationKey];
        if (!relationDef) continue;
        const ids = records.map(record => record[relationDef.localKey || 'id']).filter(Boolean);
        if (!ids.length) {
          for (const record of records) {
            record._count = record._count || {};
            record._count[relationKey] = 0;
          }
          continue;
        }
        const result = await query<{ key: string; count: string }>(
          `SELECT ${quoteIdentifier(relationDef.foreignKey)} AS key, COUNT(*)::text AS count FROM ${modelTables[relationDef.model]} WHERE ${quoteIdentifier(relationDef.foreignKey)} = ANY($1) GROUP BY ${quoteIdentifier(relationDef.foreignKey)}`,
          [ids]
        );
        const grouped = result.rows.reduce((acc, row) => {
          acc[row.key] = Number(row.count);
          return acc;
        }, {} as Record<string, number>);
        for (const record of records) {
          record._count = record._count || {};
          const key = record[relationDef.localKey || 'id'];
          record._count[relationKey] = grouped[key] ?? 0;
        }
      }
      continue;
    }

    const relationDef = modelRelations[modelName]?.[relationName];
    if (!relationDef) continue;

    if (relationDef.type === 'one') {
      const ids = records.map(record => record[relationDef.foreignKey]).filter(Boolean);
      if (!ids.length) continue;
      const selectedColumns = relationConfig.select ? Object.keys(relationConfig.select).map(quoteIdentifier).join(', ') : '*';
      const relatedRows = await query<any>(
        `SELECT ${selectedColumns} FROM ${modelTables[relationDef.model]} WHERE ${quoteIdentifier(relationDef.remoteKey)} = ANY($1)`,
        [ids]
      );
      const map = new Map(relatedRows.rows.map((item: any) => [item[relationDef.remoteKey], item]));
      for (const record of records) {
        record[relationName] = map.get(record[relationDef.foreignKey]) ?? null;
        if (relationConfig.include && record[relationName]) {
          const children = await attachInclude([record[relationName]], relationDef.model, relationConfig.include);
          record[relationName] = children[0];
        }
      }
      continue;
    }

    const ids = records.map(record => record[relationDef.localKey || 'id']).filter(Boolean);
    if (!ids.length) continue;
    const selectedColumns = relationConfig.select ? Object.keys(relationConfig.select).map(quoteIdentifier).join(', ') : '*';
    const orderBy = relationConfig.orderBy ? buildOrderBy(relationConfig.orderBy, 'r') : '';
    const related = await query<any>(
      `SELECT ${selectedColumns}, ${quoteIdentifier(relationDef.foreignKey)} AS __parent_key FROM ${modelTables[relationDef.model]} AS r WHERE ${quoteIdentifier(relationDef.foreignKey)} = ANY($1) ${orderBy}`,
      [ids]
    );
    const grouped = related.rows.reduce((acc: Record<string, any[]>, item: any) => {
      const key = item.__parent_key;
      const row = { ...item };
      delete row.__parent_key;
      if (!acc[key]) acc[key] = [];
      acc[key].push(row);
      return acc;
    }, {} as Record<string, any[]>);

    for (const record of records) {
      const list = grouped[record[relationDef.localKey || 'id']] || [];
      record[relationName] = list;
    }
  }

  return records;
}

function buildInsertQuery(table: string, data: Record<string, any>): { text: string; params: unknown[] } {
  const keys = Object.keys(data);
  const columns = keys.map(quoteIdentifier).join(', ');
  const values = keys.map((_, idx) => `$${idx + 1}`);
  const params = Object.values(data);
  return {
    text: `INSERT INTO ${table} (${columns}) VALUES (${values.join(', ')}) RETURNING *`,
    params,
  };
}

function buildUpdateQuery(table: string, data: Record<string, any>, where: any, params: unknown[]): string {
  const keys = Object.keys(data);
  const assignments = keys.map((key, idx) => `${quoteIdentifier(key)} = $${params.length + idx + 1}`);
  params.push(...Object.values(data));
  return `UPDATE ${table} SET ${assignments.join(', ')} ${buildWhereClause(where, params) } RETURNING *`;
}

function normalizeModelName(name: string): string {
  return name.charAt(0).toLowerCase() + name.slice(1);
}

function createModelHandler(modelName: string) {
  const table = modelTables[modelName];

  return {
    findUnique: async ({ where, include, select }: any = {}) => {
      const params: unknown[] = [];
      const selectClause = select ? Object.keys(select).map(quoteIdentifier).join(', ') : '*';
      const whereClause = buildWhereClause(where, params, modelName);
      const text = `SELECT ${selectClause} FROM ${table} ${whereClause} LIMIT 1`;
      const result = await query<any>(text, params);
      const row = result.rows[0] ?? null;
      if (!row) return null;
      if (include) {
        const [attached] = await attachInclude([row], modelName, include);
        return attached;
      }
      return row;
    },
    findFirst: async ({ where, include, select, orderBy }: any = {}) => {
      const params: unknown[] = [];
      const selectClause = select ? Object.keys(select).map(quoteIdentifier).join(', ') : '*';
      const whereClause = buildWhereClause(where, params, modelName);
      const orderClause = buildOrderBy(orderBy);
      const text = `SELECT ${selectClause} FROM ${table} ${whereClause} ${orderClause} LIMIT 1`;
      const result = await query<any>(text, params);
      const row = result.rows[0] ?? null;
      if (!row) return null;
      if (include) {
        const [attached] = await attachInclude([row], modelName, include);
        return attached;
      }
      return row;
    },
    findMany: async ({ where, include, select, skip, take, orderBy }: any = {}) => {
      const params: unknown[] = [];
      const selectClause = select ? Object.keys(select).map(quoteIdentifier).join(', ') : '*';
      const whereClause = buildWhereClause(where, params, modelName);
      const orderClause = buildOrderBy(orderBy);
      const limitClause = typeof take === 'number' ? `LIMIT ${take}` : '';
      const offsetClause = typeof skip === 'number' ? `OFFSET ${skip}` : '';
      const text = `SELECT ${selectClause} FROM ${table} ${whereClause} ${orderClause} ${limitClause} ${offsetClause}`;
      const result = await query<any>(text, params);
      let rows = result.rows;
      if (include) {
        rows = await attachInclude(rows, modelName, include);
      }
      return rows;
    },
    count: async ({ where }: any = {}) => {
      const params: unknown[] = [];
      const whereClause = buildWhereClause(where, params, modelName);
      const text = `SELECT COUNT(*) AS count FROM ${table} ${whereClause}`;
      const result = await query<{ count: string }>(text, params);
      return Number(result.rows[0]?.count ?? 0);
    },
  
    createMany: async ({ data }: any) => {
      if (!Array.isArray(data) || data.length === 0) {
        return { count: 0 };
      }
      const columns = Object.keys(data[0]);
      const columnNames = columns.map(quoteIdentifier).join(', ');
      const values: string[] = [];
      const params: unknown[] = [];
      data.forEach((row: any, index: number) => {
        const paramPlaceholders = columns.map((_, colIndex) => {
          params.push(row[columns[colIndex]]);
          return `$${params.length}`;
        });
        values.push(`(${paramPlaceholders.join(', ')})`);
      });
      const text = `INSERT INTO ${table} (${columnNames}) VALUES ${values.join(', ')} RETURNING *`;
      const result = await query<any>(text, params);
      return { count: result.rowCount, rows: result.rows };
    },
    update: async ({ where, data }: any = {}) => {
      const params: unknown[] = [];
      const text = buildUpdateQuery(table, data, where, params);
      const result = await query<any>(text, params);
      return result.rows[0] ?? null;
    },
    updateMany: async ({ where, data }: any = {}) => {
      const params: unknown[] = [];
      const text = buildUpdateQuery(table, data, where, params);
      const result = await query<any>(text, params);
      return { count: result.rowCount };
    },
    delete: async ({ where }: any = {}) => {
      const params: unknown[] = [];
      const whereClause = buildWhereClause(where, params, modelName);
      const text = `DELETE FROM ${table} ${whereClause} RETURNING *`;
      const result = await query<any>(text, params);
      return result.rows[0] ?? null;
    },
    deleteMany: async ({ where }: any = {}) => {
      const params: unknown[] = [];
      const whereClause = buildWhereClause(where, params, modelName);
      const text = `DELETE FROM ${table} ${whereClause}`;
      const result = await query<any>(text, params);
      return { count: result.rowCount };
    },
  };
}

export const prisma = new Proxy({}, {
  get(_, property: string) {
    if (property === '$queryRaw') {
      return async (strings: TemplateStringsArray | string, ...values: unknown[]) => {
        if (Array.isArray(strings)) {
          let text = strings[0];
          values.forEach((value, index) => {
            text += `$${index + 1}${strings[index + 1] ?? ''}`;
          });
          return query(text, values);
        }
        return query(strings, values);
      };
    }

    if (property === '$transaction') {
      return async (callback: any) => transaction(callback);
    }

    const modelName = normalizeModelName(property);
    if (modelTables[modelName]) {
      return createModelHandler(modelName);
    }

    return undefined;
  },
}) as any;
