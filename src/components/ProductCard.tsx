import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import type { Artesano, Producto } from '../types';

type ProductCardProps = {
  producto: Producto & { artesano?: Artesano };
  onOffer: (producto: Producto & { artesano?: Artesano }) => void;
};

export default function ProductCard({ producto, onOffer }: ProductCardProps) {
  const precio = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
  }).format(producto.precio);

  return (
    <View style={styles.card}>
      <Image source={{ uri: producto.imagen }} style={styles.image} />
      <View style={styles.body}>
        <Text style={styles.name}>{producto.nombre}</Text>
        <Text style={styles.description}>{producto.descripcion}</Text>
        <Text style={styles.artisan}>
          {producto.artesano?.nombre ?? 'Artesano no disponible'}
        </Text>
        <View style={styles.footer}>
          <Text style={styles.price}>{precio}</Text>
          <Pressable style={styles.offerButton} onPress={() => onOffer(producto)}>
            <Text style={styles.offerButtonText}>Ofertar</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
    borderRadius: 8,
    backgroundColor: '#ffffff',
    borderColor: '#d9dee8',
    borderWidth: 1,
  },
  image: {
    width: '100%',
    height: 180,
    backgroundColor: '#eef1f6',
  },
  body: {
    padding: 16,
  },
  name: {
    color: '#101828',
    fontSize: 18,
    fontWeight: '800',
  },
  description: {
    color: '#475467',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 6,
  },
  artisan: {
    color: '#1f6feb',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 10,
  },
  footer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  price: {
    color: '#101828',
    fontSize: 18,
    fontWeight: '800',
  },
  offerButton: {
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#1f6feb',
    justifyContent: 'center',
    minHeight: 42,
    paddingHorizontal: 18,
  },
  offerButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '800',
  },
});
