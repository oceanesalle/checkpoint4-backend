import dbConnect from '../config/db-config.js';

const getAll = () => {
  return new Promise((resolve, reject) => {
      dbConnect.query('SELECT * FROM client', (err, results) => {
          if (err) reject(err);
          else resolve(results);
      })
  })
}

const getOneById = (id) => {
  return new Promise((resolve, reject) => {
      dbConnect.query('SELECT * FROM client WHERE id = ?', id, (err, result) => {
          if (err) reject(err);
          else resolve(result[0]);
      })
  })
}

const deleteById = (id) => {
  return new Promise((resolve, reject) => {
      dbConnect.query('DELETE FROM client WHERE id = ?', id, (err, result) => {
          if (err) reject(err);
          else resolve(result.affectedRows);
      })
  })
}

const createNew = (client) => {
  const { name, clientcode, email } = client;
  return new Promise((resolve, reject) => {
      dbConnect.query('INSERT INTO client (name, clientcode, email) VALUES (?,?,?)', [name, clientcode, email], (err, result) => {
          if (err) reject(err);
          else resolve(result.insertId);
      })
  })
}

const updateClient = (client) => {
  const { name, clientcode, email, id } = client;
  return new Promise((resolve, reject) => {
      dbConnect.query('UPDATE client SET name = ?, clientcode = ?, email = ? WHERE id = ?', [name, clientcode, email, id], (err, result) => {
          if (err) reject(err);
          else resolve(result);
      })
  })
}

export default { getAll, getOneById, deleteById, createNew, updateClient };