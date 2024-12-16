import Sales from '../models/sales.models.js';
import { unlink } from 'fs/promises'; // Usar la versión de promesas de fs
import path from 'path';

// Función para obtener todas las ventas
export const getSales = async (req, res) => {
  try {
    const sales = await Sales.find({ user: req.user.id }); // Obtener ventas por usuario
    res.json(sales);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: ['Error al obtener las ventas'] });
  }
};

// Función para crear una venta
export const createSale = async (req, res) => {
  try {
    const { customerName, price, quantity } = req.body; // Atributos solicitados
    const newSale = new Sales({
      customerName,
      price,
      quantity,
      user: req.user.id,
    });
    const savedSale = await newSale.save();
    res.json(savedSale);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: ['Error al registrar una venta'] });
  }
};

// Función para obtener una venta
export const getSale = async (req, res) => {
  try {
    const sale = await Sales.findById(req.params.id); // Buscar venta por ID
    if (!sale) {
      return res.status(404).json({ error: ['Venta no encontrada'] });
    }
    res.json(sale);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: ['Error al obtener la venta'] });
  }
};

// Función para eliminar una venta
export const deleteSale = async (req, res) => {
  try {
    const sale = await Sales.findByIdAndDelete(req.params.id); // Eliminar venta por ID
    if (!sale) {
      return res.status(404).json({ error: ['Venta no encontrada'] });
    }

    return res.json({ message: 'Venta eliminada correctamente', sale });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: ['Error al eliminar la venta'] });
  }
};

// Función para editar una venta
export const editSale = async (req, res) => {
  try {
    const { customerName, price, quantity } = req.body; // Solo atributos permitidos
    const sale = await Sales.findByIdAndUpdate(
      req.params.id,
      { customerName, price, quantity },
      { new: true } // Retornar el documento actualizado
    );
    if (!sale) {
      return res.status(404).json({ error: ['Venta no encontrada'] });
    }
    res.json(sale);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: ['Error al actualizar la venta'] });
  }
};
