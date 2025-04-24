import { Router } from 'express';

import {
    listarTodosLibro,
    listarLibroPorId,
    crearLibro,
    actualizarLibro,
    eliminarLibro
} from '../controllers/libroController.js';

const librosRouter = Router();

librosRouter.get('/', listarTodosLibro);
librosRouter.get('/:id', listarLibroPorId);
librosRouter.post('/', crearLibro);
librosRouter.put('/:id', actualizarLibro);
librosRouter.delete('/:id', eliminarLibro);

export default librosRouter;