// firebaseconfig.js

import { initializeApp } from 'firebase/app';
import { getReactNativePersistence, initializeAuth } from 'firebase/auth/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyAivJkkbR4hxZd-s0k9Debz5V30_QRAvSw",
  authDomain: "sebzyy-cc9a9.firebaseapp.com",
  projectId: "sebzyy-cc9a9",
  storageBucket: "sebzyy-cc9a9.appspot.com", // ✅ fix spelling
  messagingSenderId: "120849661823",
  appId: "1:120849661823:web:ff61ba82e792d427e1a44a",
  measurementId: "G-L3749D9WJN"
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { auth };
