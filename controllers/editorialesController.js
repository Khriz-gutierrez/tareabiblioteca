import {
  listarTodosEditorialesQuery,
  listarEditorialesPorIdQuery,
  crearEditorialesQuery,
  actualizarEditorialesQuery,
  eliminarEditorialesQuery
} from "../db/editorialesQuery.js";

/**
 * Obtener todos los editoriales
 */
const listarTodosEditoriales = async (req, res) => {
  try {
    const editoriales = await listarTodosEditorialesQuery();
    res.json(editoriales);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al listar los editoriales', error: error.message });
  }
};

/**
 * Obtener un editorial por ID
 */
const listarEditorialesPorId = async (req, res) => {
  try {
    const editorial = await listarEditorialesPorIdQuery(req.params.id);
    if (editorial) {
      res.json(editorial);
    } else {
      res.status(404).json({ mensaje: 'Editorial no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el editorial', error: error.message });
  }
};

/**
 * Crear un nuevo editorial
 */
const crearEditoriales = async (req, res) => {
  try {
    const datosEditoriales = req.body;
    const resultado = await crearEditorialesQuery(datosEditoriales);
    res.status(201).json({ mensaje: 'Editorial creado con éxito', editorial: resultado });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear el editorial', error: error.message });
  }
};

/**
 * Actualizar un editorial existente
 */
const actualizarEditoriales = async (req, res) => {
  try {
    const id = req.params.id;
    const datosEditoriales = req.body;
    const resultado = await actualizarEditorialesQuery(id, datosEditoriales);

    if (resultado) {
      res.json({ mensaje: 'Editorial actualizado con éxito', editorial: resultado });
    } else {
      res.status(404).json({ mensaje: 'Editorial no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar el editorial', error: error.message });
  }
};

/**
 * Eliminar un editorial por ID
 */
const eliminarEditoriales = async (req, res) => {
  try {
    const id = req.params.id;
    const resultado = await eliminarEditorialesQuery(id);

    if (resultado) {
      res.json({ mensaje: 'Editorial eliminado con éxito' });
    } else {
      res.status(404).json({ mensaje: 'Editorial no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el editorial', error: error.message });
  }
};

export {
  listarTodosEditoriales,
  listarEditorialesPorId,
  crearEditoriales,
  actualizarEditoriales,
  eliminarEditoriales
};
