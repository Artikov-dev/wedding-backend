async function main() {
  const res = await fetch('http://localhost:4000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'hallowner_test@wedding.uz', password: 'HallOwner1234!' })
  });
  const data = await res.json();
  
  if (data.success) {
    const refreshToken = data.data.refreshToken;
    console.log("Got refresh token", refreshToken);
    
    // Now test refresh
    const refreshRes = await fetch('http://localhost:4000/api/auth/refresh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken })
    });
    console.log(await refreshRes.json());
  } else {
    console.log('Login failed', data);
  }
}
main().catch(console.error);
