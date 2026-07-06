import { useEffect, useState } from 'react';

import { obtenerArtesanoPorId, obtenerProductos } from '../services/artesaniaService';
import type { Producto } from '../types';

export function useProductos() {
  // Guarda la lista de productos que se mostrara en la pantalla.
  const [productos, setProductos] = useState<Producto[]>([]);
  // Controla si los datos aun se estan cargando.
  const [cargando, setCargando] = useState(true);

  // Carga los productos al iniciar el componente que usa este hook.
  useEffect(() => {
    setProductos(obtenerProductos());
    setCargando(false);
  }, []);

  const getArtesano = (artesanoId: string) => {
    return obtenerArtesanoPorId(artesanoId);
  };

  // Devuelve los productos, el estado de carga y la busqueda de artesanos.
  return {
    productos,
    cargando,
    getArtesano,
  };
}
