import {
  listarTodosAutoresQuery,
  listarAutorPorIdQuery,
  crearAutorQuery,
  actualizarAutorQuery,
  eliminarAutorQuery
} from "../db/autoresQuery.js";

// Helper para enviar respuestas consistentes
const respond = (res, status, success, message, data = null) => {
  const response = { success, message };
  if (data !== null) response.data = data;
  return res.status(status).json(response);
};

/**
 * Obtener todos los autores
 */
const listarTodosAutor = async (req, res) => {
  try {
    const autores = await listarTodosAutoresQuery();
    if (!autores || autores.length === 0) {
      return respond(res, 200, true, "No hay autores registrados", []);
    }
    return respond(res, 200, true, "Autores obtenidos con éxito", autores);
  } catch (error) {
    console.error("Error en listarTodosAutor:", error);
    return respond(res, 500, false, "Error interno del servidor");
  }
};

/**
 * Obtener un autor por ID
 */
const listarAutorPorId = async (req, res) => {
  try {
    const id = req.params.id;
    const autor = await listarAutorPorIdQuery(id);
    if (!autor) {
      return respond(res, 404, false, "Autor no encontrado");
    }
    return respond(res, 200, true, "Autor encontrado", autor);
  } catch (error) {
    console.error("Error en listarAutorPorId:", error);
    return respond(res, 500, false, "Error interno del servidor");
  }
};

/**
 * Crear un autor
 */
const crearAutor = async (req, res) => {
  try {
    const datosAutor = req.body;
    const nuevoAutor = await crearAutorQuery(datosAutor);
    return respond(res, 201, true, "Autor creado con éxito", nuevoAutor);
  } catch (error) {
    console.error("Error en crearAutor:", error);
    return respond(res, 500, false, "Error al crear el autor");
  }
};

/**
 * Actualizar un autor
 */
const actualizarAutor = async (req, res) => {
  try {
    const id = req.params.id;
    const datosAutor = req.body;
    const autorActualizado = await actualizarAutorQuery(id, datosAutor);
    if (!autorActualizado) {
      return respond(res, 404, false, "Autor no encontrado");
    }
    return respond(res, 200, true, "Autor actualizado con éxito", autorActualizado);
  } catch (error) {
    console.error("Error en actualizarAutor:", error);
    return respond(res, 500, false, "Error al actualizar el autor");
  }
};

/**
 * Eliminar un autor
 */
const eliminarAutor = async (req, res) => {
  try {
    const id = req.params.id;
    const autorEliminado = await eliminarAutorQuery(id);
    if (!autorEliminado) {
      return respond(res, 404, false, "Autor no encontrado");
    }
    return respond(res, 200, true, "Autor eliminado con éxito", autorEliminado);
  } catch (error) {
    console.error("Error en eliminarAutor:", error);
    return respond(res, 500, false, "Error al eliminar el autor");
  }
};

export {
  listarTodosAutor,
  listarAutorPorId,
  crearAutor,
  actualizarAutor,
  eliminarAutor
};

