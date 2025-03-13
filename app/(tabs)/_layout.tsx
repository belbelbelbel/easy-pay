import { View, StyleSheet } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (

    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
      }}
    >

      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <Ionicons name="home" color={focused ? 'black' : "#B0B0B0"} size={30} />
              {focused && <View style={styles.dot} />}
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <Ionicons name="receipt" color={focused ? 'black' : '#B0B0B0'} size={30} />
              {focused && <View style={styles.dot} />}
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="scan"
        options={{
          title: 'Scan',
          tabBarIcon: () => (
            <View style={styles.floatingButton}>
              <Ionicons name="qr-code" color="white" size={30} />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="notification"
        options={{
          title: 'Notification',
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <Ionicons name="notifications" color={focused ? 'black' : "#B0B0B0"} size={30} />
              {focused && <View style={styles.dot} />}
            </View>
          ),
        }}
      />
    
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <Ionicons name="person" color={focused ? 'black' : "#B0B0B0"} size={30} />
              {focused && <View style={styles.dot} />}
            </View>
          ),
        }}
      />
      
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: '#fff',
    position: 'absolute',
    // borderRadius: 10,
    left: 20,
    right: 20,
    bottom: 0,
    height: 95,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    paddingHorizontal: 2,
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'space-around', 
    alignItems: 'center',
    borderTopWidth: 0,
    borderColor: 'grey'
  },

  floatingButton: {
    backgroundColor: 'black',
    width: 64,
    height: 64,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
  },

  iconContainer: {
    alignItems: 'center',
  },

  dot: {
    width: 5,
    height: 5,
    borderRadius: 5,
    backgroundColor: 'black',
    marginTop: 4,
    position: 'absolute',
    bottom: -10
  },
});
