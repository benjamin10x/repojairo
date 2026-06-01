import { ScrollView, StyleSheet, Text, View } from 'react-native';

const habilidades: string[] = [
  'React Native',
  'TypeScript',
  'Expo',
  'JavaScript',
  'Git y GitHub',
  'Diseño de interfaces',
];

export default function SkillsScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.screenTitle}>Habilidades</Text>
      <Text style={styles.description}>
        Tecnologias y herramientas que conozco:
      </Text>

      <View style={styles.skillsGrid}>
        {habilidades.map((habilidad, index) => (
          <View key={habilidad} style={styles.skillChip}>
            <Text style={styles.skillNumber}>{index + 1}</Text>
            <Text style={styles.skillText}>{habilidad}</Text>
          </View>
        ))}
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
    marginBottom: 8,
  },
  description: {
    color: '#475467',
    fontSize: 15,
    marginBottom: 18,
  },
  skillsGrid: {
    gap: 12,
  },
  skillChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    borderColor: '#c7d7fe',
    borderWidth: 1,
  },
  skillNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: 'hidden',
    color: '#ffffff',
    backgroundColor: '#1f6feb',
    fontSize: 14,
    fontWeight: '800',
    lineHeight: 32,
    textAlign: 'center',
  },
  skillText: {
    color: '#1d2939',
    fontSize: 16,
    fontWeight: '700',
  },
});
