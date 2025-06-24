// test-connection.js
const db = require('./db.config');

(async () => {
  try {
    const res = await db.query('SELECT NOW()');
    console.log('✅ Database connected at:', res.rows[0].now);
  } catch (err) {
    console.error('❌ Connection failed:', err.message);
  } finally {
    await db.end(); 
  }
})();