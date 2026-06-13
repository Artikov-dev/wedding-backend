import * as dotenv from 'dotenv';
dotenv.config();
import { prisma } from '../lib/db';
import bcrypt from 'bcryptjs';

async function main() {
  const accounts = [
    { email: 'superadmin@wedding.uz', password: 'SuperAdmin1234!', role: 'ADMIN', firstName: 'Super', lastName: 'Admin' },
    { email: 'hallowner_test@wedding.uz', password: 'HallOwner1234!', role: 'HALL_OWNER', firstName: 'Test', lastName: 'Owner' },
    { email: 'customer_test@wedding.uz', password: 'Customer1234!', role: 'CUSTOMER', firstName: 'Test', lastName: 'Customer' },
  ];

  for (const acc of accounts) {
    const exists = await prisma.user.findUnique({ where: { email: acc.email } });
    if (!exists) {
      const hashedPassword = await bcrypt.hash(acc.password, 10);
      await prisma.user.create({
        data: {
          email: acc.email,
          password: hashedPassword,
          role: acc.role,
          firstName: acc.firstName,
          lastName: acc.lastName,
          status: 'ACTIVE'
        }
      });
      console.log('Created: ' + acc.email);
    } else {
      console.log('Exists: ' + acc.email);
    }
  }
}

main().catch(e => console.error(e)).finally(() => process.exit(0));
