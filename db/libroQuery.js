import { pool } from '../config.js';

const listarTodosLibrosQuery = () => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM libros', (err, result) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
};

const listarLibroPorIdQuery = (id) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM libros WHERE id = $1 LIMIT 1';
    pool.query(sql, [id], (err, result) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(result.rows[0]);
      }
    });
  });
};

const crearLibroQuery = ({ nombre, copias, estante, id_estado, titulo }) => {
  const sql = 'INSERT INTO libros (nombre, copias, estante, id_estado, titulo) VALUES ($1, $2, $3, $4, $5) RETURNING *';
  return new Promise((resolve, reject) => {
    pool.query(sql, [nombre, copias, estante, id_estado, titulo], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.rows[0]);
      }
    });
  });
};

const actualizarLibroQuery = (id, { nombre, copias, estante, id_estado, titulo }) => {
  const sql = 'UPDATE libros SET nombre = $1, copias = $2, estante = $3, id_estado = $4, titulo = $5 WHERE id = $6 RETURNING *';
  return new Promise((resolve, reject) => {
    pool.query(sql, [nombre, copias, estante, id_estado, titulo, id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.rows[0]);
      }
    });
  });
};

const eliminarLibroQuery = (id) => {
  const sql = 'DELETE FROM libros WHERE id = $1 RETURNING *';
  return new Promise((resolve, reject) => {
    pool.query(sql, [id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.rows[0]);
      }
    });
  });
};

export {
  listarTodosLibrosQuery,
  listarLibroPorIdQuery,
  crearLibroQuery,
  actualizarLibroQuery,
  eliminarLibroQuery
};

