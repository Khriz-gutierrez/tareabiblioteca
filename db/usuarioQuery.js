import { pool } from '../config.js';

const listarTodosUsuariosQuery = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM usuarios', (err, result) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(result.rows);
            }
        });
    });
};

const listarUsuarioPorIdQuery = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM usuarios WHERE id = $1 LIMIT 1';
        pool.query(sql, [id], (err, result) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(result.rows[0]); // Devuelve solo uno
            }
        });
    });
};

const crearUsuarioQuery = (usuario) => {
    const { nombre, email, telefono } = usuario;
    const sql = 'INSERT INTO usuarios (nombre, email, telefono) VALUES ($1, $2, $3) RETURNING *';
    return new Promise((resolve, reject) => {
        pool.query(sql, [nombre, email, telefono], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result.rows[0]);
            }
        });
    });
};

const actualizarUsuarioQuery = (id, usuario) => {
    const { nombre, email, telefono } = usuario;
    const sql = 'UPDATE usuarios SET nombre = $1, email = $2, telefono = $3 WHERE id = $4 RETURNING *';
    return new Promise((resolve, reject) => {
        pool.query(sql, [nombre, email, telefono, id], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result.rows[0]);
            }
        });
    });
};

const eliminarUsuarioQuery = (id) => {
    const sql = 'DELETE FROM usuarios WHERE id = $1 RETURNING *';
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
    listarTodosUsuariosQuery,
    listarUsuarioPorIdQuery,
    crearUsuarioQuery,
    actualizarUsuarioQuery, 
    eliminarUsuarioQuery
};
