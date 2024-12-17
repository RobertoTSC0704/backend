import Sales from '../models/sales.models.js';
import { unlink } from 'fs/promises'; // Usar la versión de promesas de fs
import path from 'path';

// Función para obtener todas las ventas
export const getSales = async (req, res) => {
  try {
    const sales = await Sales.find({ user: req.user.id });
    res.json(sales);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: ['Error al obtener las ventas'] });
  }
};

// Función para crear una venta
export const createSale = async (req, res) => {
  try {
    if (!req.file || !req.file.filename) {
      return res.status(400).json({
        message: ['Error al crear la venta, no se encontró la imagen'],
      });
    }

    const { productName, price, quantity } = req.body;

    const newSale = new Sales({
      productName,
      price,
      quantity,
      image: req.file.filename,
      user: req.user.id,
    });

    const savedSale = await newSale.save();
    res.json(savedSale);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: ['Error al crear la venta'] });
  }
};

// Función para obtener una venta por ID
export const getSale = async (req, res) => {
  try {
    const sale = await Sales.findById(req.params.id);
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
    const sale = await Sales.findByIdAndDelete(req.params.id);
    if (!sale) {
      return res.status(404).json({ error: ['Venta no encontrada'] });
    }

    const image = sale.image;
    const ruta = path.resolve('./src/public/img') + '/' + image;

    try {
      await unlink(ruta); // Elimina la imagen usando unlink con promesas
    } catch (err) {
      console.error('Error al eliminar la imagen:', err.message);
    }

    return res.json({ message: 'Venta eliminada correctamente', sale });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: ['Error al eliminar la venta'] });
  }
};

// Función para actualizar una venta
export const updateSale = async (req, res) => {
  try {
    if (!req.file || !req.file.filename) {
      console.log('No se encontró la imagen');
      return res.status(400).json({
        message: ['Error al actualizar la venta, no se encontró la imagen'],
      });
    }

    const data = {
      productName: req.body.productName,
      price: req.body.price,
      quantity: req.body.quantity,
      image: req.file.filename,
      user: req.user.id,
    };

    const sale = await Sales.findByIdAndUpdate(req.params.id, data, {
      new: true, // Retorna la venta actualizada
    });

    if (!sale) {
      return res.status(404).json({ message: ['Venta no encontrada'] });
    }

    const image = sale.image;
    const ruta = path.resolve('./src/public/img') + '/' + image;

    try {
      await unlink(ruta); // Elimina la imagen anterior
    } catch (err) {
      console.error('Error al eliminar la imagen antigua:', err.message);
    }

    return res.json({ message: 'Venta actualizada correctamente', sale });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: ['Error al actualizar la venta'] });
  }
};
