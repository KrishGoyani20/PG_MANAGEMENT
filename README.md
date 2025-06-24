npm i react-native-responsive-screen
<<<<<<< HEAD
npm i react-native-modal
npm i react-native-file-picker
npm i react-native-date-picker



npm install react-native-element-dropdown

adb devices(with cable)
adb tcpip 5553 reply:- restarting in TCP mode port: 5553
adb connect 192.168.112.214:5553 reply:- connected to 192.168.112.214:5553




npm i react-native-otp-entry



snack bar use karva nu ke ne to aa install karva nu che okay

npm i react-native-snack     // snackbar 
npm i react-native-sms-retriever    // autofill otp
npm i react-native-text-recognition   // image se text fatch karne ke liye
npm i @twotalltotems/react-native-otp-input    // otp input ke liye

npm i @twotalltotems/react-native-otp-input // auto enter OTP





text local



https://www.textlocal.in/signup



// sendOtp.js
const axios = require('axios');
const express = require('express');
const app = express();
app.use(express.json());

const apiKey = 'your_textlocal_api_key';

app.post('/send-otp', async (req, res) => {
  const { phone } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP

  const message = `Your OTP code is ${otp}`;

  try {
    await axios.get(`https://api.textlocal.in/send/`, {
      params: {
        apikey: apiKey,
        numbers: phone,
        message,
        sender: 'TXTLCL', // or your approved sender
      },
    });
    res.json({ success: true, otp }); // You can hash OTP or store it in DB
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to send OTP' });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));







const sendOtp = async () => {
  if (Phonenumber.length < 10) {
    Alert.alert('Enter valid 10-digit number');
    return;
  }

  try {
    const response = await fetch('http://<your-backend-url>/send-otp', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ phone: `+91${Phonenumber}` }),
    });

    const data = await response.json();
    if (data.success) {
      setOTP(data.otp); // for testing only, in real app don’t show or store this
      const newIndex = currentIndex + 1;
      flatListRef.current?.scrollToIndex({ index: newIndex, animated: true });
      setCurrentIndex(newIndex);
    } else {
      Alert.alert('Failed to send OTP');
    }
  } catch (err) {
    Alert.alert('Network error');
  }
};

