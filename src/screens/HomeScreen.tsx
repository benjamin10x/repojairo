import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import ProductCard from '../components/ProductCard';
import { useProductos } from '../hooks/useProductos';
import type { Artesano, Producto } from '../types';

type ProductoConArtesano = Producto & { artesano?: Artesano };

export default function HomeScreen() {
  const { productos, cargando, getArtesano } = useProductos();

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

      {cargando ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color="#1f6feb" size="large" />
        </View>
      ) : (
        <FlatList
          data={productos}
          keyExtractor={(producto) => producto.id}
          renderItem={({ item }) => {
            const productoConArtesano = {
              ...item,
              artesano: getArtesano(item.artesanoId),
            };

            return (
              <ProductCard
                producto={productoConArtesano}
                onOffer={confirmarOferta}
              />
            );
          }}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
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
  loadingContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
