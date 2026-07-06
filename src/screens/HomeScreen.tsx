import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useEffect, useState } from 'react';

import {
  deleteProducto,
  getProductos,
  initDatabase,
  insertProducto,
  updateProducto,
} from '../database/database';
import type { Producto } from '../types/Producto';

export default function HomeScreen() {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [productos, setProductos] = useState<Producto[]>([]);
  const [productoEditando, setProductoEditando] = useState<Producto | null>(
    null
  );
  const [cargando, setCargando] = useState(true);

  const limpiarFormulario = () => {
    setNombre('');
    setDescripcion('');
    setPrecio('');
    setCantidad('');
    setProductoEditando(null);
  };

  const cargarProductos = async () => {
    try {
      const productosGuardados = await getProductos();
      setProductos(productosGuardados);
    } catch {
      Alert.alert('Error', 'No se pudieron consultar los productos.');
    }
  };

  // Aqui se inicializa la base de datos y se cargan datos al iniciar la app.
  useEffect(() => {
    async function prepararBaseDeDatos() {
      try {
        await initDatabase();
        await cargarProductos();
      } catch {
        Alert.alert('Error', 'No se pudo iniciar la base de datos SQLite.');
      } finally {
        setCargando(false);
      }
    }

    prepararBaseDeDatos();
  }, []);

  const validarFormulario = () => {
    if (
      !nombre.trim() ||
      !descripcion.trim() ||
      !precio.trim() ||
      !cantidad.trim()
    ) {
      Alert.alert('Campos incompletos', 'Todos los campos son obligatorios.');
      return null;
    }

    const precioNumero = Number(precio);
    const cantidadNumero = Number(cantidad);

    if (!Number.isFinite(precioNumero) || precioNumero <= 0) {
      Alert.alert('Precio invalido', 'Ingresa un precio numerico mayor a 0.');
      return null;
    }

    if (
      !Number.isInteger(cantidadNumero) ||
      cantidadNumero < 0
    ) {
      Alert.alert('Cantidad invalida', 'Ingresa una cantidad entera valida.');
      return null;
    }

    return {
      nombre: nombre.trim(),
      descripcion: descripcion.trim(),
      precio: precioNumero,
      cantidad: cantidadNumero,
    };
  };

  const guardarProducto = async () => {
    const productoValidado = validarFormulario();

    if (!productoValidado) {
      return;
    }

    try {
      if (productoEditando?.id) {
        await updateProducto({
          ...productoValidado,
          id: productoEditando.id,
        });
        Alert.alert('Producto actualizado', 'El registro fue actualizado.');
      } else {
        await insertProducto(productoValidado);
        Alert.alert('Producto insertado', 'El registro fue guardado.');
      }

      limpiarFormulario();
      await cargarProductos();
    } catch {
      Alert.alert('Error', 'No se pudo guardar el producto.');
    }
  };

  const editarProducto = (producto: Producto) => {
    setProductoEditando(producto);
    setNombre(producto.nombre);
    setDescripcion(producto.descripcion);
    setPrecio(String(producto.precio));
    setCantidad(String(producto.cantidad));
  };

  const confirmarEliminarProducto = (producto: Producto) => {
    if (!producto.id) {
      return;
    }

    Alert.alert(
      'Eliminar producto',
      `Quieres eliminar "${producto.nombre}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteProducto(producto.id as number);
              Alert.alert('Producto eliminado', 'El registro fue eliminado.');
              await cargarProductos();
            } catch {
              Alert.alert('Error', 'No se pudo eliminar el producto.');
            }
          },
        },
      ]
    );
  };

  const renderProducto = ({ item }: { item: Producto }) => {
    return (
      <View style={styles.productCard}>
        <View style={styles.productHeader}>
          <Text style={styles.productName}>{item.nombre}</Text>
          <Text style={styles.productQuantity}>Stock: {item.cantidad}</Text>
        </View>
        <Text style={styles.productDescription}>{item.descripcion}</Text>
        <Text style={styles.productPrice}>${item.precio.toFixed(2)} MXN</Text>

        <View style={styles.actionsRow}>
          <Pressable
            style={[styles.actionButton, styles.editButton]}
            onPress={() => editarProducto(item)}
          >
            <Text style={styles.actionButtonText}>Editar</Text>
          </Pressable>
          <Pressable
            style={[styles.actionButton, styles.deleteButton]}
            onPress={() => confirmarEliminarProducto(item)}
          >
            <Text style={styles.actionButtonText}>Eliminar</Text>
          </Pressable>
        </View>
      </View>
    );
  };

  const renderHeader = () => {
    return (
      <View>
        <Text style={styles.screenTitle}>Conexion SQLite</Text>
        <Text style={styles.description}>
          Captura, consulta, actualiza y elimina productos en una base de datos
          local.
        </Text>

        <View style={styles.formCard}>
          <Text style={styles.sectionTitle}>
            {productoEditando ? 'Editar producto' : 'Nuevo producto'}
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Nombre del producto"
            value={nombre}
            onChangeText={setNombre}
          />
          <TextInput
            style={[styles.input, styles.multilineInput]}
            multiline
            placeholder="Descripcion"
            value={descripcion}
            onChangeText={setDescripcion}
          />
          <TextInput
            style={styles.input}
            keyboardType="decimal-pad"
            placeholder="Precio"
            value={precio}
            onChangeText={setPrecio}
          />
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            placeholder="Cantidad"
            value={cantidad}
            onChangeText={setCantidad}
          />

          <View style={styles.formActions}>
            <Pressable style={styles.primaryButton} onPress={guardarProducto}>
              <Text style={styles.primaryButtonText}>
                {productoEditando ? 'Actualizar' : 'Insertar'}
              </Text>
            </Pressable>
            {productoEditando && (
              <Pressable
                style={styles.secondaryButton}
                onPress={limpiarFormulario}
              >
                <Text style={styles.secondaryButtonText}>Cancelar</Text>
              </Pressable>
            )}
          </View>
        </View>

        <Text style={styles.sectionTitle}>Productos almacenados</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {cargando ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color="#1f6feb" size="large" />
        </View>
      ) : (
        <FlatList
          data={productos}
          keyExtractor={(producto) => String(producto.id)}
          renderItem={renderProducto}
          ListHeaderComponent={renderHeader}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Aun no hay productos guardados.</Text>
          }
          contentContainerStyle={styles.listContent}
          keyboardShouldPersistTaps="handled"
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
  formCard: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    borderColor: '#d9dee8',
    borderWidth: 1,
    marginBottom: 18,
  },
  sectionTitle: {
    color: '#101828',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 12,
  },
  input: {
    minHeight: 46,
    borderRadius: 8,
    borderColor: '#d9dee8',
    borderWidth: 1,
    color: '#101828',
    fontSize: 15,
    marginBottom: 12,
    paddingHorizontal: 12,
    backgroundColor: '#ffffff',
  },
  multilineInput: {
    minHeight: 82,
    paddingTop: 12,
    textAlignVertical: 'top',
  },
  formActions: {
    flexDirection: 'row',
    gap: 10,
  },
  primaryButton: {
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#1f6feb',
    flex: 1,
    justifyContent: 'center',
    minHeight: 44,
    paddingHorizontal: 16,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '800',
  },
  secondaryButton: {
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#eef1f6',
    justifyContent: 'center',
    minHeight: 44,
    paddingHorizontal: 16,
  },
  secondaryButtonText: {
    color: '#344054',
    fontSize: 14,
    fontWeight: '800',
  },
  productCard: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    borderColor: '#d9dee8',
    borderWidth: 1,
  },
  productHeader: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
  },
  productName: {
    color: '#101828',
    flex: 1,
    fontSize: 17,
    fontWeight: '800',
  },
  productQuantity: {
    color: '#475467',
    fontSize: 13,
    fontWeight: '700',
  },
  productDescription: {
    color: '#475467',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
  },
  productPrice: {
    color: '#101828',
    fontSize: 17,
    fontWeight: '800',
    marginTop: 12,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },
  actionButton: {
    alignItems: 'center',
    borderRadius: 8,
    flex: 1,
    justifyContent: 'center',
    minHeight: 40,
  },
  editButton: {
    backgroundColor: '#1f6feb',
  },
  deleteButton: {
    backgroundColor: '#d92d20',
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '800',
  },
  emptyText: {
    color: '#667085',
    fontSize: 15,
    paddingVertical: 18,
    textAlign: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
