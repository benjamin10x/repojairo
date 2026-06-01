import { ScrollView, StyleSheet, Text, View } from 'react-native';

const proyecto = {
  nombre: 'Portafolio movil',
  version: '1.0.0',
  descripcion:
    'Aplicacion React Native para presentar perfil, habilidades y proyecto integrador.',
  repositorio: 'github.com/BenjaminMorales/mi-proyecto',
  activo: true,
};

export default function ProjectScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.screenTitle}>Mi Proyecto</Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Campo por campo</Text>
        <Text style={styles.dataText}>Nombre: {proyecto.nombre}</Text>
        <Text style={styles.dataText}>Version: {proyecto.version}</Text>
        <Text style={styles.dataText}>
          Descripcion: {proyecto.descripcion}
        </Text>
        <Text style={styles.dataText}>Repositorio: {proyecto.repositorio}</Text>
        <Text style={styles.dataText}>Activo: {String(proyecto.activo)}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Objeto completo</Text>
        <Text style={styles.jsonText}>{JSON.stringify(proyecto, null, 2)}</Text>
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
  card: {
    padding: 18,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    borderColor: '#d9dee8',
    borderWidth: 1,
    marginBottom: 14,
  },
  sectionTitle: {
    color: '#101828',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 12,
  },
  dataText: {
    color: '#1d2939',
    fontSize: 16,
    lineHeight: 26,
  },
  jsonText: {
    color: '#344054',
    fontFamily: 'monospace',
    fontSize: 13,
    lineHeight: 20,
  },
});
