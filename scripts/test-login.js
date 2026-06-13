async function main() {
  const res = await fetch('http://localhost:4000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'hallowner_test@wedding.uz', password: 'HallOwner1234!' })
  });
  console.log(await res.json());
}
main().catch(console.error);
