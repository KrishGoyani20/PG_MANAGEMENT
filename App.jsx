import {View, SafeAreaView, Text, StatusBar} from 'react-native';
import React, {useEffect} from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {Colors} from './src/utils/Theme';
import firebase from '@react-native-firebase/app';
import NewTenants from './src/component/NewTenants';
const App = () => {
  const firebaseConfig = {
    apiKey: 'AIzaSyB1EIXpIGEdAS3mJbN5JK1nJl8ANmi11xw', // ✅ must be correct
    authDomain: 'your-project.firebaseapp.com',
    projectId: 'phoneotp-3a806',
    storageBucket: 'phoneotp-3a806.firebasestorage.app',
    messagingSenderId: '1234567890',
    appId: '1:570007750848:android:599e87e856b362b14d8525',
  };

  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }, []);
  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor={Colors.CHARCOLEBLUE}
        barStyle="light-content"
        translucent={true}
      />
      <AppNavigator />
      {/* <NewTenants /> */}
    </NavigationContainer>
  );
};

export default App;
