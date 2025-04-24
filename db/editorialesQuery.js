import { pool } from '../config.js';

const listarTodosEditorialesQuery = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM editoriales', (err, result) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(result.rows);
            }
        });
    });
};

const listarEditorialesPorIdQuery = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM editoriales WHERE id = $1 LIMIT 1';
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

const crearEditorialesQuery = ({ nombres }) => {
    const sql = 'INSERT INTO editoriales (nombres) VALUES ($1) RETURNING *';
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

const actualizarEditorialesQuery = (id, { nombres }) => {
    const sql = 'UPDATE editoriales SET nombres = $1 WHERE id = $2 RETURNING *';
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

const eliminarEditorialesQuery = (id) => {
    const sql = 'DELETE FROM editoriales WHERE id = $1 RETURNING *';
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
    listarTodosEditorialesQuery,
    listarEditorialesPorIdQuery,
    crearEditorialesQuery,
    actualizarEditorialesQuery,
    eliminarEditorialesQuery,
  };
  

