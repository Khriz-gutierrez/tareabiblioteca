import {
    listarTodosPrestamosQuery,
    listarPrestamoPorIdQuery,
    crearPrestamoQuery,
    actualizarPrestamoQuery,
    eliminarPrestamoQuery
  } from "../db/prestamoQuery.js";
  
  // Helper para respuestas consistentes
  const respond = (res, status, success, message, data = null) => {
    const response = { success, message };
    if (data !== null) response.data = data;
    return res.status(status).json(response);
  };
  
  /**
   * Listar todos los préstamos
   */
  const listarTodosPrestamo = async (req, res) => {
    try {
      const prestamos = await listarTodosPrestamosQuery();
  
      if (!prestamos || prestamos.length === 0) {
        return respond(res, 200, true, 'No hay préstamos registrados', []);
      }
  
      return respond(res, 200, true, 'Préstamos obtenidos con éxito', prestamos);
    } catch (error) {
      console.error('Error en listarTodosPrestamo:', error);
      return respond(res, 500, false, 'Error interno del servidor');
    }
  };
  
  /**
   * Obtener un préstamo por ID
   */
  const listarPrestamoPorId = async (req, res) => {
    try {
      const id = req.params.id;
      const prestamo = await listarPrestamoPorIdQuery(id);
  
      if (!prestamo) {
        return respond(res, 404, false, 'Préstamo no encontrado');
      }
  
      return respond(res, 200, true, 'Préstamo encontrado', prestamo);
    } catch (error) {
      console.error('Error en listarPrestamoPorId:', error);
      return respond(res, 500, false, 'Error interno del servidor');
    }
  };
  
  /**
   * Crear un préstamo
   */
  const crearPrestamo = async (req, res) => {
    try {
      const datosPrestamo = req.body;
      const nuevoPrestamo = await crearPrestamoQuery(datosPrestamo);
      return respond(res, 201, true, 'Préstamo creado con éxito', nuevoPrestamo);
    } catch (error) {
      console.error('Error en crearPrestamo:', error);
      return respond(res, 500, false, 'Error al crear el préstamo');
    }
  };
  
  /**
   * Actualizar préstamo
   */
  const actualizarPrestamo = async (req, res) => {
    try {
      const id = req.params.id;
      const datosPrestamo = req.body;
      const prestamoActualizado = await actualizarPrestamoQuery(id, datosPrestamo);
  
      if (!prestamoActualizado) {
        return respond(res, 404, false, 'Préstamo no encontrado');
      }
  
      return respond(res, 200, true, 'Préstamo actualizado con éxito', prestamoActualizado);
    } catch (error) {
      console.error('Error en actualizarPrestamo:', error);
      return respond(res, 500, false, 'Error al actualizar el préstamo');
    }
  };
  
  /**
   * Eliminar un préstamo
   */
  const eliminarPrestamo = async (req, res) => {
    try {
      const id = req.params.id;
      const prestamoEliminado = await eliminarPrestamoQuery(id);
  
      if (!prestamoEliminado) {
        return respond(res, 404, false, 'Préstamo no encontrado');
      }
  
      return respond(res, 200, true, 'Préstamo eliminado con éxito', prestamoEliminado);
    } catch (error) {
      console.error('Error en eliminarPrestamo:', error);
      return respond(res, 500, false, 'Error al eliminar el préstamo');
    }
  };
  
  export {
    listarTodosPrestamo,
    listarPrestamoPorId,
    crearPrestamo,
    actualizarPrestamo,
    eliminarPrestamo
  };
  