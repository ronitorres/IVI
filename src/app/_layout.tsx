import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';

import { initializeDatabase } from '@/database/initializeDatabase';
import { Slot } from 'expo-router';
import { SQLiteProvider } from 'expo-sqlite';
import React from 'react';



export default function RootLayout() {
  return (

    <GestureHandlerRootView style={{ flex: 1 }}>
      <SQLiteProvider databaseName='ivi.db' onInit={initializeDatabase}>
        <Drawer screenOptions={{ headerShown: false }}>
          <Drawer.Screen
            name="index"
            options={{
              drawerLabel: 'Home',
              title: 'Home',
              drawerIcon: () => (
                <Ionicons name="home-outline" size={18} color="#3A98FF" />
              ),
            }}
          />
          <Drawer.Screen
            name="visitante"
            options={{
              drawerLabel: 'Visitante',
              title: '',
              drawerIcon: () => (
                <Ionicons name="people-outline" size={18} color="#3A98FF" />
              ),
            }}
          />

        </Drawer>
      </SQLiteProvider>
    </GestureHandlerRootView>
  );
}
