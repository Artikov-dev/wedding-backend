async function main() {
  const accounts = [
    { email: 'superadmin@wedding.uz', password: 'SuperAdmin1234!', role: 'ADMIN', firstName: 'Super', lastName: 'Admin', phone: '+998900000001' },
    { email: 'hallowner_test@wedding.uz', password: 'HallOwner1234!', role: 'HALL_OWNER', firstName: 'Test', lastName: 'Owner', phone: '+998900000002' },
    { email: 'customer_test@wedding.uz', password: 'Customer1234!', role: 'CUSTOMER', firstName: 'Test', lastName: 'Customer', phone: '+998900000003' },
  ];

  for (const acc of accounts) {
    console.log('Registering', acc.email);
    const res = await fetch('http://localhost:4000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(acc)
    });
    const data = await res.json();
    console.log(data);
  }
}

main().catch(console.error);
