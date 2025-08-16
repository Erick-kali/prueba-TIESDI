import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  // Cargar usuarios al iniciar
  const loadUsers = async () => {
    try {
      const usersData = await AsyncStorage.getItem('@users');
      if (usersData) {
        setUsers(JSON.parse(usersData));
      }
    } catch (error) {
      console.error('Error loading users:', error);
    }
  };

  // Actualizar la lista de usuarios
  const refreshUsers = () => {
    loadUsers();
    setEditingUser(null);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Gestión de Usuarios</Text>
      
      <UserForm 
        editingUser={editingUser}
        refreshUsers={refreshUsers}
      />
      
      <UserList 
        users={users}
        setEditingUser={setEditingUser}
        refreshUsers={refreshUsers}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
});
