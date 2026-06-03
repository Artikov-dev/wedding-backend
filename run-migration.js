const fs = require('fs');
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://weddi:QCrumP02YXmhcctw3dDVPGct6fVnnXjR@dpg-d8enor0js32c738li930-a.oregon-postgres.render.com/weddingly',
  connectionTimeoutMillis: 30000,
  idleTimeoutMillis: 30000,
  statement_timeout: 60000,
  query_timeout: 60000,
  ssl: {
    rejectUnauthorized: false
  }
});

(async () => {
  try {
    const migration = fs.readFileSync('./scripts/migration-20260603-new-features.sql', 'utf8');
    const statements = migration.split(';').filter(s => s.trim());
    
    console.log(`Executing ${statements.length} SQL statements...\n`);
    
    let successCount = 0;
    let skipCount = 0;
    let errorCount = 0;
    
    for (let i = 0; i < statements.length; i++) {
      const stmt = statements[i].trim();
      if (stmt) {
        try {
          await pool.query(stmt);
          successCount++;
          console.log(`✓ Statement ${i + 1}/${statements.length} executed`);
        } catch (e) {
          if (e.message.includes('already exists') || e.code === '42P07') {
            skipCount++;
            console.log(`⊙ Statement ${i + 1}/${statements.length} (already exists)`);
          } else {
            errorCount++;
            console.error(`✗ Error in statement ${i + 1}: ${e.message}`);
          }
        }
      }
    }
    
    console.log(`\n✓ Migration completed:`);
    console.log(`  - Executed: ${successCount}`);
    console.log(`  - Skipped: ${skipCount}`);
    console.log(`  - Errors: ${errorCount}`);
    
    await pool.end();
  } catch (error) {
    console.error('✗ Migration error:', error.message);
    await pool.end();
    process.exit(1);
  }
})();
