import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Colors} from '../utils/Theme';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function LoginScreen() {
  const {navigate} = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    navigate('HomeScreen');
    console.log('Email:', email);
    console.log('Password:', password);
    // 👉 Do your login logic here
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.Subtitle}>Please sign in to your account</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor={Colors.BLUELITE}
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        placeholderTextColor={Colors.BLUELITE}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigate('RegisterScreen')}>
        <Text style={styles.registerText}>
          Don't have an account? Register here
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITEDARK,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.BLUELITE,
    marginBottom: 10,
    textAlign: 'center',
  },
  Subtitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.BLACK,
    marginBottom: 40,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.BLUELITE,
    backgroundColor: Colors.WHITELITE,
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 16,
    color: Colors.BLUELITE,
  },
  button: {
    backgroundColor: Colors.BLUELITE,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.WHITEDARK,
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerText: {
    color: Colors.BLUELITE,
    textAlign: 'center',
    marginTop: 20,
  },
});
