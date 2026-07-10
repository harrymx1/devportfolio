const db = require('../config/db');

const findAll = async () => {
  const result = await db.query('SELECT * FROM experiences ORDER BY order_index ASC');
  return result.rows;
};

const findById = async (id) => {
  const result = await db.query('SELECT * FROM experiences WHERE id = $1', [id]);
  return result.rows[0];
};

const create = async (experience) => {
  const { title, date_range, organization, description, type, tags, order_index } = experience;
  const result = await db.query(
    `INSERT INTO experiences (title, date_range, organization, description, type, tags, order_index, created_at) 
     VALUES ($1, $2, $3, $4, $5, $6, $7, NOW()) RETURNING *`,
    [title, date_range, organization, description, type, tags, order_index || 0]
  );
  return result.rows[0];
};

const update = async (id, experience) => {
  const { title, date_range, organization, description, type, tags, order_index } = experience;
  const result = await db.query(
    `UPDATE experiences SET 
      title = $1, 
      date_range = $2, 
      organization = $3, 
      description = $4, 
      type = $5, 
      tags = $6, 
      order_index = $7
     WHERE id = $8 RETURNING *`,
    [title, date_range, organization, description, type, tags, order_index || 0, id]
  );
  return result.rows[0];
};

const remove = async (id) => {
  const result = await db.query('DELETE FROM experiences WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
