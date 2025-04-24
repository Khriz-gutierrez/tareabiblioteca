import { pool } from '../config.js';

const listarTodosPrestamosQuery = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM prestamos';
        console.log('Ejecutando consulta:', sql);
        
        pool.query(sql, (err, result) => {
            if (err) {
                console.error('Error en listarTodosPrestamosQuery:', err);
                reject(err);
            } else {
                console.log('Resultados obtenidos:', result.rows);
                resolve(result.rows);
            }
        });
    });
};

const listarPrestamoPorIdQuery = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM prestamos WHERE id = $1 LIMIT 1';
        pool.query(sql, [id], (err, result) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(result.rows);
            }
        });
    });
};

const crearPrestamoQuery = (prestamos) => {
    const { usuario_id, libro_id, fecha_prestamo, fecha_devolucion } = prestamos;
    const sql = 'INSERT INTO prestamos (usuario_id, libro_id, fecha_prestamo, fecha_devolucion) VALUES ($1, $2, $3, $4) RETURNING *';
    return new Promise((resolve, reject) => {
        pool.query(sql, [usuario_id, libro_id, fecha_prestamo, fecha_devolucion], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result.rows[0]);
            }
        });
    });
};

const actualizarPrestamoQuery = (id, prestamo) => {
    const { usuario_id, libro_id, fecha_prestamo, fecha_devolucion } = prestamo;
    const sql = 'UPDATE prestamos SET usuario_id = $1, libro_id = $2, fecha_prestamo = $3, fecha_devolucion = $4 WHERE id = $5 RETURNING *';
    return new Promise((resolve, reject) => {
        pool.query(sql, [usuario_id, libro_id, fecha_prestamo, fecha_devolucion, id], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result.rows[0]);
            }
        });
    });
};

const eliminarPrestamoQuery = (id) => {
    const sql = 'DELETE FROM prestamos WHERE id = $1 RETURNING *';
    return new Promise((resolve, reject) => {
        pool.query(sql, [id], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result.rows[0]); // confirmamos qué fila fue eliminada
            }
        });
    });
};

export {
    listarTodosPrestamosQuery,
    listarPrestamoPorIdQuery,
    crearPrestamoQuery,
    actualizarPrestamoQuery, 
    eliminarPrestamoQuery
};

