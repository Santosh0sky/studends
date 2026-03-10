const axios = require('axios');

const BASE = process.env.BASE_URL || 'http://localhost:3000';

async function run() {
  console.log('--- Starting operations ---');

  // Ensure a clean slate (delete any existing students)
  console.log('\n0) Cleaning up existing students...');
  const existing = await axios.get(`${BASE}/students`);
  await Promise.all(existing.data.map((s) => axios.delete(`${BASE}/students/${s.id}`)));
  console.log('Cleanup complete.');

  // 1) Insert two students
  console.log('\n1) Inserting MS Dhoni...');
  const dhoni = await axios.post(`${BASE}/students`, {
    name: 'MS Dhoni',
    email: 'dhoni@example.com',
    age: 42,
  });
  console.log('Inserted:', dhoni.data);

  console.log('\n2) Inserting Virat Kohli...');
  const virat = await axios.post(`${BASE}/students`, {
    name: 'Virat Kohli',
    email: 'virat.kohli@example.com',
    age: 35,
  });
  console.log('Inserted:', virat.data);

  // 3) Update first student
  console.log('\n3) Updating MS Dhoni to Captain Cool...');
  const updated = await axios.put(`${BASE}/students/${dhoni.data.id}`, {
    name: 'Captain Cool',
    email: 'captaincool@example.com',
  });
  console.log('Updated:', updated.data);

  // 4) Delete second student
  console.log('\n4) Deleting Virat Kohli...');
  await axios.delete(`${BASE}/students/${virat.data.id}`);
  console.log('Deleted student id:', virat.data.id);

  // 5) Verify deletion
  console.log('\n5) Fetching all students to verify deletion...');
  const all = await axios.get(`${BASE}/students`);
  console.log('All students:', all.data);

  console.log('\n--- Operations complete ---');
}

run().catch((err) => {
  if (err.response) {
    console.error('API error:', err.response.status, err.response.data);
  } else {
    console.error('Error:', err.message);
  }
  process.exit(1);
});
