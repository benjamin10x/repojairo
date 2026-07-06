import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';

import ProductCard from '../components/ProductCard';
import { useProductos } from '../hooks/useProductos';
import type { Artesano, Producto } from '../types';

type ProductoConArtesano = Producto & { artesano?: Artesano };

export default function HomeScreen() {
  const productos = useProductos();

  const confirmarOferta = (producto: ProductoConArtesano) => {
    Alert.alert(
      'Confirmar oferta',
      `Quieres hacer una oferta por ${producto.nombre}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Confirmar',
          onPress: () => {
            Alert.alert(
              'Oferta enviada',
              `Tu oferta por ${producto.nombre} fue registrada.`
            );
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Artesanias</Text>
      <Text style={styles.description}>
        Productos disponibles de artesanos locales.
      </Text>

      <FlatList
        data={productos}
        keyExtractor={(producto) => producto.id}
        renderItem={({ item }) => (
          <ProductCard producto={item} onOffer={confirmarOferta} />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  screenTitle: {
    color: '#101828',
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 8,
  },
  description: {
    color: '#475467',
    fontSize: 15,
    marginBottom: 18,
  },
  listContent: {
    gap: 14,
    paddingBottom: 28,
  },
});
