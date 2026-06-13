import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Get all users
  const users = await prisma.user.findMany();
  
  console.log(`Sending notification to ${users.length} users...`);
  
  for (const user of users) {
    await prisma.notification.create({
      data: {
        userId: user.id,
        type: 'BOOKING_CONFIRMED',
        title: 'Yangi bron tushdi!',
        message: 'Ajoyib xabar! Sayt orqali yangi to\'yxona band qilindi.',
      }
    });
  }
  
  console.log('Notifications created successfully!');
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
