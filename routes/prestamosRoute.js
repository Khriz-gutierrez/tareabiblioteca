import { Router } from 'express';
import {
    listarTodosPrestamo,
    listarPrestamoPorId,
    crearPrestamo,
    actualizarPrestamo,
    eliminarPrestamo
} from '../controllers/prestamosController.js';

const prestamosRouter = Router();

// Middleware de logging para todas las rutas
prestamosRouter.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Rutas con validación básica
prestamosRouter.get('/', listarTodosPrestamo);
prestamosRouter.get('/:id', validateId, listarPrestamoPorId);
prestamosRouter.post('/', validatePrestamoData, crearPrestamo);
prestamosRouter.put('/:id', validateId, validatePrestamoData, actualizarPrestamo);
prestamosRouter.delete('/:id', validateId, eliminarPrestamo);

// Middleware de validación
function validateId(req, res, next) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ 
            success: false, 
            message: 'ID debe ser un número válido' 
        });
    }
    next();
}

function validatePrestamoData(req, res, next) {
    const { usuario_id, libro_id, fecha_prestamo } = req.body;
    if (!usuario_id || !libro_id || !fecha_prestamo) {
        return res.status(400).json({
            success: false,
            message: 'Faltan campos obligatorios: usuario_id, libro_id, fecha_prestamo'
        });
    }
    next();
}

export default prestamosRouter;