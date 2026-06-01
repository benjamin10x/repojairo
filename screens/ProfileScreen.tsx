import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

const nombre: string = 'Benjamin Morales';
const carrera: string = 'Ing. en Sistemas Computacionales';
const cuatrimestre: number = 9;
const promedio: number = 9.2;
const titulado: boolean = false;
const datoPendiente: null = null;

const imagenWeb =
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80';

export default function ProfileScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.screenTitle}>Perfil</Text>

      <View style={styles.imagesRow}>
        <View style={styles.imageBlock}>
          <Image source={{ uri: imagenWeb }} style={styles.avatar} />
          <Text style={styles.imageLabel}>Imagen desde internet</Text>
        </View>

        <View style={styles.imageBlock}>
          <Image source={require('../assets/icon.png')} style={styles.avatar} />
          <Text style={styles.imageLabel}>Imagen local assets/</Text>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.name}>{nombre}</Text>
        <Text style={styles.career}>{carrera}</Text>

        <Text style={styles.dataText}>Nombre: {nombre}</Text>
        <Text style={styles.dataText}>Carrera: {carrera}</Text>
        <Text style={styles.dataText}>Cuatrimestre: {cuatrimestre}</Text>
        <Text style={styles.dataText}>Promedio: {promedio}</Text>
        <Text style={styles.dataText}>Titulado: {String(titulado)}</Text>
        <Text style={styles.dataText}>
          Dato pendiente: {String(datoPendiente)}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 28,
  },
  screenTitle: {
    color: '#101828',
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 18,
  },
  imagesRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  imageBlock: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    borderColor: '#d9dee8',
    borderWidth: 1,
  },
  avatar: {
    width: 116,
    height: 116,
    borderRadius: 58,
    marginBottom: 10,
    backgroundColor: '#eef1f6',
  },
  imageLabel: {
    color: '#667085',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  infoCard: {
    padding: 18,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    borderColor: '#d9dee8',
    borderWidth: 1,
  },
  name: {
    color: '#101828',
    fontSize: 24,
    fontWeight: '800',
  },
  career: {
    color: '#475467',
    fontSize: 15,
    marginBottom: 18,
    marginTop: 4,
  },
  dataText: {
    color: '#1d2939',
    fontSize: 16,
    lineHeight: 26,
  },
});
