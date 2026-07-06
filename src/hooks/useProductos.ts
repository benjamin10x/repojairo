import { obtenerArtesanoPorId, obtenerProductos } from '../services/artesaniaService';

export function useProductos() {
  return obtenerProductos().map((producto) => ({
    ...producto,
    artesano: obtenerArtesanoPorId(producto.artesanoId),
  }));
}
