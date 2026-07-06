import * as SQLite from 'expo-sqlite';

import type { Producto } from '../types/Producto';

const DATABASE_NAME = 'artisan_auction.db';

let databasePromise: Promise<SQLite.SQLiteDatabase> | null = null;

async function getDatabase() {
  if (!databasePromise) {
    // Aqui se abre o crea la base de datos SQLite local.
    databasePromise = SQLite.openDatabaseAsync(DATABASE_NAME);
  }

  return databasePromise;
}

export async function initDatabase() {
  try {
    const db = await getDatabase();

    // Aqui se crea la tabla productos si aun no existe.
    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS productos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        descripcion TEXT NOT NULL,
        precio REAL NOT NULL,
        cantidad INTEGER NOT NULL
      );
    `);
  } catch (error) {
    console.error('Error al inicializar SQLite:', error);
    throw error;
  }
}

export async function insertProducto(producto: Producto) {
  try {
    const db = await getDatabase();

    // Aqui se insertan registros en la tabla productos.
    await db.runAsync(
      'INSERT INTO productos (nombre, descripcion, precio, cantidad) VALUES (?, ?, ?, ?)',
      producto.nombre,
      producto.descripcion,
      producto.precio,
      producto.cantidad
    );
  } catch (error) {
    console.error('Error al insertar producto:', error);
    throw error;
  }
}

export async function getProductos() {
  try {
    const db = await getDatabase();

    // Aqui se consultan los registros guardados en SQLite.
    return await db.getAllAsync<Producto>(
      'SELECT id, nombre, descripcion, precio, cantidad FROM productos ORDER BY id DESC'
    );
  } catch (error) {
    console.error('Error al consultar productos:', error);
    throw error;
  }
}

export async function updateProducto(producto: Producto) {
  try {
    if (!producto.id) {
      throw new Error('No se puede actualizar un producto sin id.');
    }

    const db = await getDatabase();

    // Aqui se actualizan registros existentes.
    await db.runAsync(
      'UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, cantidad = ? WHERE id = ?',
      producto.nombre,
      producto.descripcion,
      producto.precio,
      producto.cantidad,
      producto.id
    );
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    throw error;
  }
}

export async function deleteProducto(id: number) {
  try {
    const db = await getDatabase();

    // Aqui se eliminan registros por id.
    await db.runAsync('DELETE FROM productos WHERE id = ?', id);
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    throw error;
  }
}
