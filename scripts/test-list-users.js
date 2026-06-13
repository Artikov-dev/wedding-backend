async function main() {
  const res = await fetch('http://localhost:4000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'superadmin@wedding.uz', password: 'SuperAdmin1234!' })
  });
  const data = await res.json();
  
  if (data.success) {
    const token = data.data.token;
    // get all users using admin endpoint
    const usersRes = await fetch('http://localhost:4000/api/admin/users', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    console.log(await usersRes.json());
  } else {
    console.log('Admin login failed', data);
  }
}
main().catch(console.error);
