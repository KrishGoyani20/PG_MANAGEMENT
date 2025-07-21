import {View, SafeAreaView, Text, StatusBar} from 'react-native';
import React, {useEffect} from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {Colors} from './src/utils/Theme';
import {store} from './src/redux/Store';
import {Provider} from 'react-redux';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';

const App = () => {
  const toastConfig = {
    success: props => (
      <BaseToast
        {...props}
        style={{borderLeftColor: 'green', backgroundColor: '#E6FFE6'}}
        contentContainerStyle={{paddingHorizontal: 15}}
        text1Style={{
          fontSize: 16,
          fontWeight: 'bold',
          color: '#0A0',
        }}
        text2Style={{
          fontSize: 14,
          color: '#070',
        }}
      />
    ),
    error: props => (
      <ErrorToast
        {...props}
        style={{borderLeftColor: 'red', backgroundColor: '#FFE6E6'}}
        text1Style={{
          fontSize: 16,
          fontWeight: 'bold',
          color: '#A00',
        }}
        text2Style={{
          fontSize: 14,
          color: '#900',
        }}
      />
    ),
  };

  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar
          backgroundColor={Colors.CHARCOLEBLUE}
          barStyle="light-content"
          translucent={true}
        />
        <AppNavigator />
        {/* <NewTenants /> */}
      </NavigationContainer>
      <Toast config={toastConfig} /> {/* 👈 add this at the bottom! */}
    </Provider>
  );
};

export default App;

// const firebaseConfig = {
//   apiKey: 'AIzaSyB1EIXpIGEdAS3mJbN5JK1nJl8ANmi11xw', // ✅ must be correct
//   authDomain: 'your-project.firebaseapp.com',
//   projectId: 'phoneotp-3a806',
//   storageBucket: 'phoneotp-3a806.firebasestorage.app',
//   messagingSenderId: '1234567890',
//   appId: '1:570007750848:android:599e87e856b362b14d8525',
// };

// useEffect(() => {
//   if (!firebase.apps.length) {
//     firebase.initializeApp(firebaseConfig);
//   }
// }, []);
