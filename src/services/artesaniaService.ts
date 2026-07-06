import type { Artesano, Producto } from '../types';

export const artesanos: Artesano[] = [
  {
    id: 'artesano-1',
    nombre: 'Maria Lopez',
    comunidad: 'San Bartolo Coyotepec',
    especialidad: 'Barro negro',
  },
  {
    id: 'artesano-2',
    nombre: 'Jose Hernandez',
    comunidad: 'Teotitlan del Valle',
    especialidad: 'Textiles de telar',
  },
  {
    id: 'artesano-3',
    nombre: 'Ana Martinez',
    comunidad: 'Santa Maria Atzompa',
    especialidad: 'Ceramica vidriada',
  },
];

export const productos: Producto[] = [
  {
    id: 'producto-1',
    nombre: 'Jarron de barro negro',
    descripcion: 'Pieza decorativa elaborada y pulida a mano.',
    precio: 780,
    imagen:
      'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=900&q=80',
    artesanoId: 'artesano-1',
  },
  {
    id: 'producto-2',
    nombre: 'Tapete de lana natural',
    descripcion: 'Textil tejido en telar con tintes de origen natural.',
    precio: 1450,
    imagen:
      'https://images.unsplash.com/photo-1600166898405-da9535204843?auto=format&fit=crop&w=900&q=80',
    artesanoId: 'artesano-2',
  },
  {
    id: 'producto-3',
    nombre: 'Plato de ceramica artesanal',
    descripcion: 'Plato utilitario con acabado vidriado tradicional.',
    precio: 360,
    imagen:
      'https://images.unsplash.com/photo-1612196808214-b40b2d8eccf0?auto=format&fit=crop&w=900&q=80',
    artesanoId: 'artesano-3',
  },
];

export function obtenerArtesanoPorId(id: string) {
  return artesanos.find((artesano) => artesano.id === id);
}

export function obtenerProductos() {
  return productos;
}
