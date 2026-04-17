
const { Client } = require('pg');

async function testConnection(url) {
  console.log(`Testing: ${url.replace(/:[^:@]+@/, ':****@')}`);
  const client = new Client({
    connectionString: url,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('SUCCESS!');
    const res = await client.query('SELECT NOW()');
    console.log('Result:', res.rows[0]);
    await client.end();
  } catch (err) {
    console.error('FAILED:', err.message);
  }
}

const originalUrl = 'postgresql://postgres:kN%26%23DA3i-%2AE5G5t@db.uuuayeqngdqkmpipqwzd.supabase.co:5432/postgres';
const newUrl = 'postgresql://postgres.uuuayeqngdqkmpipqwzd:kN%26%23DA3i-%2AE5G5t@db.uuuayeqngdqkmpipqwzd.supabase.co:5432/postgres';

(async () => {
  console.log('--- Test 1: Original ---');
  await testConnection(originalUrl);
  console.log('\n--- Test 2: With Project Ref in Username ---');
  await testConnection(newUrl);
})();
