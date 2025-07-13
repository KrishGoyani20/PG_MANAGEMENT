import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from '../utils/Theme';
import {Dropdown} from 'react-native-element-dropdown';

export default function RegisterScreen() {
  const {navigate} = useNavigation();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    pgName: '',
    workers: '',
    shift: '',
    address: '',
    phone: '',
  });

  const pgTypeOptions = [
    {label: '1', value: '1'},
    {label: '2', value: '2'},
    {label: '3', value: '3'},
  ];

  const handleChange = (field, value) => {
    setForm({...form, [field]: value});
  };

  const handleRegister = () => {
    navigate('HomeScreen');
    console.log('Register Data:', form);
    // 👉 Add your register logic here
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Create your account</Text>
        <Text style={styles.Subtitle}>Reginster to manage your PG</Text>

        <TextInput
          placeholder="Full Name"
          value={form.name}
          onChangeText={text => handleChange('name', text)}
          placeholderTextColor={Colors.BLUELITE}
          style={styles.input}
        />

        <TextInput
          placeholder="Email"
          value={form.email}
          onChangeText={text => handleChange('email', text)}
          placeholderTextColor={Colors.BLUELITE}
          keyboardType="email-address"
          style={styles.input}
        />

        <TextInput
          placeholder="Password"
          value={form.password}
          onChangeText={text => handleChange('password', text)}
          placeholderTextColor={Colors.BLUELITE}
          secureTextEntry
          style={styles.input}
        />

        <TextInput
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChangeText={text => handleChange('confirmPassword', text)}
          placeholderTextColor={Colors.BLUELITE}
          secureTextEntry
          style={styles.input}
        />

        {/* <Dropdown
          style={styles.dropdown}
          containerStyle={styles.dropdownContainer} // ✅ Add this
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={pgTypeOptions}
          labelField="label"
          valueField="value"
          placeholder="Select Type"
          value={form.pgType}
          onChange={item => handleChange('pgType', item.value)}
        /> */}


         <Dropdown
          style={styles.dropdown}
          containerStyle={styles.dropdownContainer} // ✅ Add this
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={pgTypeOptions}
          labelField="label"
          valueField="value"
          placeholder="Workers"
          value={form.pgType}
          onChange={item => handleChange('pgType', item.value)}
        /> 

        {/* <TextInput
          placeholder="Workers"
          value={form.workers}
          onChangeText={text => handleChange('workers', text)}
          placeholderTextColor={Colors.BLUELITE}
          style={styles.input}
        /> */}

        <TextInput
          placeholder=" Name"
          value={form.pgName}
          onChangeText={text => handleChange('pgName', text)}
          placeholderTextColor={Colors.BLUELITE}
          style={styles.input}
        />

        <TextInput
          placeholder="Shift"
          value={form.shift}
          onChangeText={text => handleChange('shift', text)}
          placeholderTextColor={Colors.BLUELITE}
          style={styles.input}
        />

        <TextInput
          placeholder="Address"
          value={form.address}
          onChangeText={text => handleChange('address', text)}
          placeholderTextColor={Colors.BLUELITE}
          style={styles.input}
        />

        <TextInput
          placeholder="Phone"
          value={form.phone}
          onChangeText={text => handleChange('phone', text)}
          placeholderTextColor={Colors.BLUELITE}
          keyboardType="phone-pad"
          style={styles.input}
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigate('LoginScreen')}>
          <Text style={styles.registerText}>
            Already have an account? Log in here
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITEDARK,
    paddingHorizontal: 20,
    marginVertical: 20,
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
  label: {
    fontSize: 16,
    color: Colors.BLUELITE,
    marginBottom: 5,
  },
  dropdown: {
    flex: 1,
    height: 50,
    borderColor: Colors.BLUELITE,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: Colors.WHITELITE,
  },
  dropdownContainer: {
    borderRadius: 20,
    backgroundColor: Colors.WHITEDARK,
  },
  placeholderStyle: {
    color: Colors.BLUELITE,
  },
  selectedTextStyle: {
    color: Colors.BLUELITE,
  },
  button: {
    backgroundColor: Colors.BLUELITE,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
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
