import { pool } from '../config.js';

const listarTodosAutoresQuery = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM autores', (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result.rows);
            }
        });
    });
};

const listarAutorPorIdQuery = (id) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM autores WHERE id = $1 LIMIT 1', [id], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result.rows[0]);
            }
        });
    });
};

const crearAutorQuery = ({ nombres }) => {
    const sql = 'INSERT INTO autores (nombres) VALUES ($1) RETURNING *';
    return new Promise((resolve, reject) => {
        pool.query(sql, [nombres], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result.rows[0]);
            }
        });
    });
};

const actualizarAutorQuery = (id, { nombres }) => {
    const sql = 'UPDATE autores SET nombres = $1 WHERE id = $2 RETURNING *';
    return new Promise((resolve, reject) => {
        pool.query(sql, [nombres, id], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result.rows[0]);
            }
        });
    });
};

const eliminarAutorQuery = (id) => {
    const sql = 'DELETE FROM autores WHERE id = $1 RETURNING *';
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
    listarTodosAutoresQuery,
    listarAutorPorIdQuery,
    crearAutorQuery,
    actualizarAutorQuery,
    eliminarAutorQuery
};

