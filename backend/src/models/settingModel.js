const db = require('../config/db');

const findAll = async () => {
  const result = await db.query('SELECT * FROM settings');
  return result.rows.reduce((acc, row) => {
    acc[row.key] = row.value;
    return acc;
  }, {});
};

const updateMultiple = async (settingsObject) => {
  const keys = Object.keys(settingsObject);
  if (keys.length === 0) return {};
  
  // Use a transaction for bulk update
  const client = await db.query('BEGIN');
  try {
    for (const key of keys) {
      await db.query(
        `INSERT INTO settings (key, value, updated_at) 
         VALUES ($1, $2, NOW()) 
         ON CONFLICT (key) DO UPDATE SET value = $2, updated_at = NOW()`,
        [key, settingsObject[key]]
      );
    }
    await db.query('COMMIT');
    return await findAll();
  } catch (e) {
    await db.query('ROLLBACK');
    throw e;
  }
};

module.exports = {
  findAll,
  updateMultiple
};
