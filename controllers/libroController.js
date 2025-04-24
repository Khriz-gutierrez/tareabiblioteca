import {
  listarTodosLibrosQuery,
  listarLibroPorIdQuery,
  crearLibroQuery,
  actualizarLibroQuery,
  eliminarLibroQuery
} from "../db/libroQuery.js";

/**
 * Obtener todos los libros
 */
const listarTodosLibro = async (req, res) => {
  try {
    const libros = await listarTodosLibrosQuery();
    res.json(libros);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al listar los libros', error: error.message });
  }
};

/**
 * Obtener libro por ID
 */
const listarLibroPorId = async (req, res) => {
  try {
    const libro = await listarLibroPorIdQuery(req.params.id);
    if (libro) {
      res.json(libro);
    } else {
      res.status(404).json({ mensaje: 'Libro no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el libro', error: error.message });
  }
};

/**
 * Crear un nuevo libro
 */
const crearLibro = async (req, res) => {
  try {
    const datosLibro = req.body;
    const nuevoLibro = await crearLibroQuery(datosLibro);
    res.status(201).json({ mensaje: 'Libro creado con éxito', libro: nuevoLibro });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear el libro', error: error.message });
  }
};

/**
 * Actualizar libro existente
 */
const actualizarLibro = async (req, res) => {
  try {
    const id = req.params.id;
    const datosLibro = req.body;
    const libroActualizado = await actualizarLibroQuery(id, datosLibro);
    if (libroActualizado) {
      res.json({ mensaje: 'Libro actualizado con éxito', libro: libroActualizado });
    } else {
      res.status(404).json({ mensaje: 'Libro no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar el libro', error: error.message });
  }
};

/**
 * Eliminar un libro
 */
const eliminarLibro = async (req, res) => {
  try {
    const id = req.params.id;
    const libroEliminado = await eliminarLibroQuery(id);
    if (libroEliminado) {
      res.json({ mensaje: 'Libro eliminado con éxito' });
    } else {
      res.status(404).json({ mensaje: 'Libro no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el libro', error: error.message });
  }
};

export {
  listarTodosLibro,
  listarLibroPorId,
  crearLibro,
  actualizarLibro,
  eliminarLibro,
};
