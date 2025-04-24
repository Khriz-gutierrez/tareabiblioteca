import { Router } from 'express';

import {
    listarTodosEditoriales,
    listarEditorialesPorId,
    crearEditoriales,
    actualizarEditoriales,
    eliminarEditoriales
} from '../controllers/editorialesController.js';

const editorialessRouter = Router();

editorialessRouter.get('/', listarTodosEditoriales);
editorialessRouter.get('/:id', listarEditorialesPorId);
editorialessRouter.post('/', crearEditoriales);
editorialessRouter.put('/:id', actualizarEditoriales);
editorialessRouter.delete('/:id', eliminarEditoriales);

export default editorialessRouter;