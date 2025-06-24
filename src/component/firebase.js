import { initializeApp } from '@react-native-firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyB1EIXpIGEdAS3mJbN5JK1nJl8ANmi11xw", // ✅ must be correct
    authDomain: "your-project.firebaseapp.com",
    projectId: "phoneotp-3a806",
    storageBucket: "phoneotp-3a806.firebasestorage.app",
    messagingSenderId: "1234567890",
    appId: "1:570007750848:android:599e87e856b362b14d8525",
};

initializeApp(firebaseConfig);