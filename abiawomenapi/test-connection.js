// test-connection.js
const db = require("./db.config");

(async () => {
  try {
    const res = await db.query("SELECT NOW()");
  } catch (err) {
    console.error("❌ Connection failed:", err.message);
  } finally {
    await db.end();
  }
})();
