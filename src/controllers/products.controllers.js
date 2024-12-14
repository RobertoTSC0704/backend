import Products from '../models/products.models.js';
import { unlink } from 'fs/promises'; // Usar la versión de promesas de fs
import path from 'path';

// Función para obtener todos los productos
export const getProducts = async (req, res) => {
  try {
    const products = await Products.find({ user: req.user.id });
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: ['Error al obtener los productos'] });
  }
};

// Función para crear un producto
export const createProduct = async (req, res) => {
  try {
    if (!req.file || !req.file.filename) {
      return res.status(400).json({
        message: ['Error al crear un producto, no se encontró la imagen'],
      });
    }

    const { name, price, year } = req.body;
    const newProduct = new Products({
      name,
      price,
      year,
      image: req.file.filename,
      user: req.user.id,
    });
    const savedProduct = await newProduct.save();
    res.json(savedProduct);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: ['Error al crear un producto'] });
  }
};

// Función para obtener un producto
export const getProduct = async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);
    if (!product)
      return res.status(404).json({ error: ['Producto no encontrado'] });
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: ['Error al obtener el producto'] });
  }
};

// Función para eliminar un producto
export const deleteProduct = async (req, res) => {
  try {
    const product = await Products.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: ['Producto no encontrado'] });
    }

    const image = product.image;
    const ruta = path.resolve('./src/public/img') + '/' + image;

    try {
      await unlink(ruta); // Elimina la imagen usando unlink con promesas
    } catch (err) {
      console.error('Error al eliminar la imagen:', err.message);
    }

    return res.json({ message: 'Producto eliminado correctamente', product });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: ['Error al eliminar el producto'] });
  }
};

// Función para editar un producto
export const editProduct = async (req, res) => {
  try {
    const product = await Products.findByIdAndUpdate(req.params.id, req.body);
    if (!product) {
      return res.status(404).json({ error: ['Producto no encontrado'] });
    }
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: ['Error al actualizar el producto'] });
  }
};

// Función para actualizar un producto
export const updateProduct = async (req, res) => {
  try {
    if (!req.file || !req.file.filename) {
      console.log('No se encontró la imagen');
      return res.status(400).json({
        message: ['Error al actualizar un producto, no se encontró la imagen'],
      });
    }

    const data = {
      name: req.body.name,
      price: req.body.price,
      year: req.body.year,
      image: req.file.filename,
      user: req.user.id,
    };

    const product = await Products.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    if (!product) {
      return res.status(404).json({ message: ['Producto no encontrado'] });
    }

    const image = product.image;
    const ruta = path.resolve('./src/public/img') + '/' + image;

    try {
      await unlink(ruta); // Elimina la imagen usando unlink con promesas
    } catch (err) {
      console.error(
        'Error al eliminar la imagen del producto actualizado:',
        err.message
      );
    }

    return res.json({ message: 'Producto actualizado correctamente', product });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: ['Error al actualizar un producto'] });
  }
};
