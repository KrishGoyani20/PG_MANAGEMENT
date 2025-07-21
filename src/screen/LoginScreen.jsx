import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {Colors} from '../utils/Theme';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {loginAdmin} from '../server/Api';
import {useDispatch} from 'react-redux';
import {loginSuccess} from '../redux/slice/AuthSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

export default function LoginScreen() {
  const {navigate} = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch(); // ✅ Add this

  const handleLogin = async () => {
    console.log('email', email);
    console.log('password', password);

    if (!email || !password) {
      Toast.show({
        type: 'error',
        text1: 'Missing fields',
        text2: 'Please enter both email and password',
      });
      return;
    }

    console.log('000');

    try {
      console.log('111');

      const response = await loginAdmin({email, password});
      console.log('response', response);

      if (response.success) {
        // console.log('Login success1111', response);
        // console.log('Login success2222', response.admin);

        await AsyncStorage.setItem(
          'user',
          JSON.stringify({
            user: response.admin,
            token: response.token,
          }),
        );
        const userData1 = await AsyncStorage.getItem('user');
        console.log('User saved to AsyncStorage');
        console.log('User saved to AsyncStorage',userData1 );

        dispatch(
          loginSuccess({
            user: response.admin,
            token: response.token,
          }),
        );

        Toast.show({
          type: 'success',
          text1: 'Login Successful 🎉',
          text2: `Welcome back, ${response.admin.name || 'User'}!`,
        });

        navigate('HomeScreen');
      } else {
        Toast.show({
          type: 'error',
          text1: 'Login Failed',
          text2: response.message || 'Invalid credentials',
        });
      }
    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Something went wrong, please try again.',
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.Subtitle}>Please sign in to your account</Text>

      <View>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor={Colors.BLUELITE}
          style={styles.input}
        />
      </View>
      <View>
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          placeholderTextColor={Colors.BLUELITE}
          secureTextEntry
          style={styles.input}
        />
      </View>

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
