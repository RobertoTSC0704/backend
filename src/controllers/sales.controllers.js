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

// Función para crear una
export const createSale = async (req, res) => {
  try {
    if (!req.file || !req.file.filename) {
      return res.status(400).json({
        message: ['Error al crear una venta, no se encontró la imagen'],
      });
    }

    const { productName, quantity, price } = req.body;
    const newSale = new Sales({
      productName,
      quantity,
      price,
      image: req.file.filename,
      user: req.user.id,
    });
    const savedSale = await newSale.save();
    res.json(savedSale);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: ['Error al crear una venta'] });
  }
};

// Función para obtener una venta
export const getSale = async (req, res) => {
  try {
    const sale = await Sales.findById(req.params.id);
    if (!sale)
      return res.status(404).json({ error: ['Venta no encontrado'] });
    res.json(sale);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: ['Error al obtener venta'] });
  }
};

// Función para eliminar una venta 
export const deleteSale = async (req, res) => {
  try {
    const sale = await Sales.findByIdAndDelete(req.params.id);
    if (!sale) {
      return res.status(404).json({ error: ['Producto no encontrado'] });
    }

    const image = sale.image;
    const ruta = path.resolve('./src/public/img') + '/' + image;

    try {
      await unlink(ruta); // Elimina la imagen usando unlink con promesas
    } catch (err) {
      console.error('Error al eliminar la imagen:', err.message);
    }

    return res.json({ message: 'Venta eliminado correctamente', product });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: ['Error al eliminar la venta'] });
  }
};

// Función para editar una venta
export const editSale = async (req, res) => {
  try {
    const sale = await Sales.findByIdAndUpdate(req.params.id, req.body);
    if (!sale) {
      return res.status(404).json({ error: ['Venta no encontrado'] });
    }
    res.json(sale);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: ['Error al actualizar el venta'] });
  }
};

// Función para actualizar una venta
export const updateSale = async (req, res) => {
  try {
    if (!req.file || !req.file.filename) {
      console.log('No se encontró la imagen');
      return res.status(400).json({
        message: ['Error al actualizar una venta, no se encontró la imagen'],
      });
    }

    const data = {
      productName: req.body.name,
      quantity: req.body.quantity,
      price: req.body.price,
      image: req.file.filename,
      user: req.user.id,
    };

    const sale = await Sales.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    if (!product) {
      return res.status(404).json({ message: ['Producto no encontrado'] });
    }

    const image = sale.image;
    const ruta = path.resolve('./src/public/img') + '/' + image;

    try {
      await unlink(ruta); // Elimina la imagen usando unlink con promesas
    } catch (err) {
      console.error(
        'Error al eliminar la imagen del producto actualizado:',
        err.message
      );
    }

    return res.json({ message: 'Sale actualizado correctamente', sale});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: ['Error al actualizar una venta'] });
  }
};
