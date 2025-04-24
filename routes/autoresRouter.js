import { Router } from 'express';

import {
    listarTodosAutor,
    listarAutorPorId,
    crearAutor,
    actualizarAutor,
    eliminarAutor
} from '../controllers/autoresController.js';

const autoresRouter = Router();

autoresRouter.get('/', listarTodosAutor);
autoresRouter.get('/:id', listarAutorPorId);
autoresRouter.post('/', crearAutor);
autoresRouter.put('/:id', actualizarAutor);
autoresRouter.delete('/:id', eliminarAutor);

export default autoresRouter;