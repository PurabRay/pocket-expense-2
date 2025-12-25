import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/authSlice';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.auth);

  const handleRegister = async () => {
    if (!name.trim() || !email.trim() || !password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    const result = await dispatch(register({ name, email, password }));

    if (register.fulfilled.match(result)) {
      Alert.alert('Success', 'Account created! You are now logged in.');
    } else {
      const errorMsg = result.payload || 'Email already exists';
      Alert.alert('Registration Failed', errorMsg);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PocketExpense+</Text>
      <Text style={styles.subtitle}>Register</Text>

      <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.linkText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 34, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 22, marginBottom: 40 },
  input: { width: '90%', height: 50, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, paddingHorizontal: 15, marginBottom: 20, backgroundColor: '#fff' },
  button: { width: '90%', height: 50, backgroundColor: '#28a745', justifyContent: 'center', alignItems: 'center', borderRadius: 8, marginVertical: 20 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  linkText: { color: '#007bff', fontSize: 16 },
});