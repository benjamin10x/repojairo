import { useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import ProfileScreen from './screens/ProfileScreen';
import ProjectScreen from './screens/ProjectScreen';
import SkillsScreen from './screens/SkillsScreen';

type Tab = 'perfil' | 'habilidades' | 'proyecto';

const tabs: { id: Tab; label: string }[] = [
  { id: 'perfil', label: 'Perfil' },
  { id: 'habilidades', label: 'Habilidades' },
  { id: 'proyecto', label: 'Proyecto' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('perfil');

  const renderScreen = () => {
    if (activeTab === 'habilidades') {
      return <SkillsScreen />;
    }

    if (activeTab === 'proyecto') {
      return <ProjectScreen />;
    }

    return <ProfileScreen />;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.content}>{renderScreen()}</View>
      <View style={styles.tabBar}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <Pressable
              key={tab.id}
              onPress={() => setActiveTab(tab.id)}
              style={[styles.tabButton, isActive && styles.tabButtonActive]}
            >
              <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                {tab.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f7f8fb',
  },
  content: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 14,
    backgroundColor: '#ffffff',
    borderTopColor: '#d9dee8',
    borderTopWidth: 1,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
    borderRadius: 8,
    backgroundColor: '#eef1f6',
  },
  tabButtonActive: {
    backgroundColor: '#1f6feb',
  },
  tabText: {
    color: '#344054',
    fontSize: 13,
    fontWeight: '700',
  },
  tabTextActive: {
    color: '#ffffff',
  },
});
