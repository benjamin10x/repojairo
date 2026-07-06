export type Artesano = {
  id: string;
  nombre: string;
  comunidad: string;
  especialidad: string;
};

export type Producto = {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
  artesanoId: Artesano['id'];
};

export type Oferta = {
  id: string;
  productoId: Producto['id'];
  comprador: string;
  monto: number;
  fecha: string;
};
