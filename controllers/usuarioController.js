import {
  listarTodosUsuariosQuery,
  listarUsuarioPorIdQuery,
  crearUsuarioQuery,
  actualizarUsuarioQuery,
  eliminarUsuarioQuery
} from "../db/usuarioQuery.js";

/**
 * Obtener todos los usuarios
 */
const listarTodosUsuario = async (req, res) => {
  try {
    const usuarios = await listarTodosUsuariosQuery();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los usuarios', error: error.message });
  }
};

/**
 * Obtener un usuario por ID
 */
const listarUsuarioPorId = async (req, res) => {
  try {
    const usuario = await listarUsuarioPorIdQuery(req.params.id);
    if (usuario) {
      res.json(usuario);
    } else {
      res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el usuario', error: error.message });
  }
};

/**
 * Crear un usuario
 */
const crearUsuario = async (req, res) => {
  try {
    const datosUsuario = req.body;
    const nuevoUsuario = await crearUsuarioQuery(datosUsuario);
    res.status(201).json({ mensaje: 'Usuario creado con éxito', usuario: nuevoUsuario });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear el usuario', error: error.message });
  }
};

/**
 * Actualizar un usuario
 */
const actualizarUsuario = async (req, res) => {
  try {
    const id = req.params.id;
    const datosUsuario = req.body;
    const usuarioActualizado = await actualizarUsuarioQuery(id, datosUsuario);
    if (usuarioActualizado) {
      res.json({ mensaje: 'Usuario actualizado con éxito', usuario: usuarioActualizado });
    } else {
      res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar el usuario', error: error.message });
  }
};

/**
 * Eliminar un usuario
 */
const eliminarUsuario = async (req, res) => {
  try {
    const id = req.params.id;
    const usuarioEliminado = await eliminarUsuarioQuery(id);
    if (usuarioEliminado) {
      res.json({ mensaje: 'Usuario eliminado con éxito' });
    } else {
      res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el usuario', error: error.message });
  }
};

export {
  listarTodosUsuario,
  listarUsuarioPorId,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
};
