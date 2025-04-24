import { Router } from 'express';

import {
    listarTodosUsuario,
    listarUsuarioPorId,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
} from '../controllers/usuarioController.js';

const usuariosRouter = Router();

usuariosRouter.get('/', listarTodosUsuario);
usuariosRouter.get('/:id', listarUsuarioPorId);
usuariosRouter.post('/', crearUsuario);
usuariosRouter.put('/:id', actualizarUsuario);
usuariosRouter.delete('/:id', eliminarUsuario);

export default usuariosRouter;