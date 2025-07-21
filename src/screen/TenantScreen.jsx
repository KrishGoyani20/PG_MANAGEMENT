
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Pressable,
  Alert,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {OtpInput} from 'react-native-otp-entry';
import {moderateScale, screenHeight, screenWidth} from '../utils/Metrics';
import {useNavigation} from '@react-navigation/native';

const Colors = {
  BACKGROUND: '#f5f5ef',
  PRIMARY: '#046d92',
  ALERT: '#a6252c',
  CARD: '#ffffff',
  SOFT_CARD: '#f1f2f2',
  WHITE: '#ffffff',
  GRAY85: '#d3d3d3',
};

const Fonts = {
  POPPINS_BOLD: 'Poppins-Bold',
  POPPINS_REGULAR: 'Poppins-Regular',
};

export default function TenantScreen() {
  const {navigate} = useNavigation();
  const [countryCode, setCountryCode] = useState('IN');
  const [country, setCountry] = useState(null);
  const [withCallingCode, setWithCallingCode] = useState(`+91`);
  const onSelect = country => {
    setCountryCode(country.cca2);
    setCountry(country);
    console.log(`+${country?.callingCode[0]}`);
    setWithCallingCode(`+${country?.callingCode[0]}`);
  };

  const [Phonenumber, setPhonenumber] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [OTP, setOTP] = useState('');
  const flatListRef = useRef(null);

  const CreateTenantsSteps = [
    {
      title: 'Enter Mobile Number',
      buttonText: 'Continue',
      type: 'phonenumber',
      disbled: !(Phonenumber?.length >= 10),
    },
    {
      title: 'OTP',
      buttonText: 'Verify',
      type: 'OTP',
      disbled: !(OTP?.length === 6),
    },
  ];

  const phonenumberfun = async text => {
    if (currentIndex < CreateTenantsSteps.length - 1 && text?.length >= 10) {
      const newIndex = currentIndex + 1;
      flatListRef.current?.scrollToIndex({index: newIndex, animated: true});
      setCurrentIndex(newIndex);
    }
    setPhonenumber(text);
  };

  const verifyOtp = async () => {
    if (!confirm) {
      Alert.alert('OTP not sent yet. Please enter your phone number first.');
      return;
    }

    if (!/^[0-9]{6}$/.test(OTP)) {
      Alert.alert('Please enter a valid 6-digit OTP.');
      return;
    }

    try {
      await confirm.confirm(OTP);
      navigate('UserImageCapture');
    } catch (error) {
      console.error('Error verifying OTP:', error.message);
      Alert.alert('Error verifying OTP', error.message);
    }
  };

  const handalPress = () => {
    if (currentIndex === 1 && OTP.length === 6) {
      navigate('UserImageCapture');
    }
  };

  return (
    // <ImageBackground
    //   source={require('../assets/image/Tbackground.png')}
    //   style={styles.backgroundImage}
    //   resizeMode="cover">
    <View style={styles.overlay}>
      <View style={{margin: moderateScale(20)}}>
        <Text style={[styles.HeaderText, styles.header]}>Tenants</Text>
      </View>

      <FlatList
        data={CreateTenantsSteps}
        horizontal
        ref={flatListRef}
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        renderItem={({item}) => (
          <View style={styles.MainFullWidth}>
            <View style={styles.Box}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={[styles.Title, {marginRight: moderateScale(20)}]}>
                  {item?.title}
                </Text>
              </View>

              <View style={styles.PHoneViewHandle}>
                {item.type === 'phonenumber' && (
                  <TextInput
                    placeholder="Enter 10-digit mobile number"
                    style={styles.TextInputPhone}
                    maxLength={10}
                    placeholderTextColor={Colors.PRIMARY}
                    onChangeText={text => phonenumberfun(text)}
                    keyboardType="number-pad"
                    returnKeyType="next"
                    dataDetectorTypes={'phoneNumber'}
                    value={Phonenumber}
                  />
                )}

                {item.type === 'OTP' && (
                  <View style={{marginLeft: moderateScale(-8)}}>
                    <OtpInput
                      numberOfDigits={6}
                      placeholder="*"
                      onTextChange={setOTP}
                      theme={{
                        placeholderTextStyle: {color: Colors.PRIMARY},
                        containerStyle: {marginTop: 50},
                        pinCodeTextStyle: {color: Colors.PRIMARY},
                      }}
                    />
                    <Pressable
                      style={{marginTop: 8}}
                      onPress={() => navigate('TenantScreen')}>
                      <Text style={{color: Colors.PRIMARY}}>
                        Change Mobile Number ? {Phonenumber}
                      </Text>
                    </Pressable>
                  </View>
                )}

                <TouchableOpacity
                  onPress={handalPress}
                  style={[
                    styles.Button,
                    {
                      backgroundColor: !item.disbled
                        ? Colors.PRIMARY
                        : Colors.GRAY85,
                    },
                  ]}>
                  <Text style={styles.BTNTEXT}>{item?.buttonText}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    </View>
    // </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: screenWidth,
    height: screenHeight,
    backgroundColor: Colors.BACKGROUND,
  },
  header: {
    fontSize: moderateScale(26),
    fontWeight: '800',
    fontFamily: Fonts.POPPINS_BOLD,
    color: Colors.PRIMARY,
  },
  MainFullWidth: {
    width: widthPercentageToDP(100),
    marginTop: heightPercentageToDP(15),
  },
  Box: {
    width: '80%',
    marginHorizontal: 'auto',
    backgroundColor: Colors.CARD,
    borderRadius: moderateScale(8),
    padding: 25,
  },
  Title: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.PRIMARY,
    fontFamily: Fonts.POPPINS_REGULAR,
  },
  PHoneViewHandle: {
    gap: 50,
  },
  TextInputPhone: {
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    borderRadius: 7,
    padding: 10,
    marginTop: 20,
    color: Colors.PRIMARY,
  },
  Button: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
  },
  BTNTEXT: {
    fontSize: 15,
    color: Colors.WHITE,
    fontWeight: '500',
    fontFamily: Fonts.POPPINS_BOLD,
  },
});




// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TextInput,
//   TouchableOpacity,
//   Alert,
//   Image,
//   ImageBackground,
//   Pressable,
// } from 'react-native';
// import React, {useRef, useState} from 'react';
// import {
//   heightPercentageToDP,
//   widthPercentageToDP,
// } from 'react-native-responsive-screen';
// import {Colors, Fonts} from '../utils/Theme';
// import {OtpInput} from 'react-native-otp-entry';
// import {moderateScale, screenHeight, screenWidth} from '../utils/Metrics';
// import {useNavigation} from '@react-navigation/native';
// import auth, {getAuth} from '@react-native-firebase/auth';

// export default function TenantScreen() {
//   const {navigate} = useNavigation();

//   const [Phonenumber, setPhonenumber] = useState('');
//   const [OTP, setOTP] = useState('');
//   const [confirm, setConfirm] = useState(null);
//   const [withCallingCode] = useState(`+91`);

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const flatListRef = useRef(null);

//   const phonenumberfun = text => {
//     setPhonenumber(text);
//   };

//   const OTPHandle = otp => {
//     setOTP(otp);
//   };

//   const sendOtp = async () => {
//     if (Phonenumber.length < 10) {
//       Alert.alert('Please enter a valid 10-digit mobile number.');
//       return;
//     }

//     const formattedPhoneNumber = `${withCallingCode}${Phonenumber}`;

//     // ✅ Enforce only test numbers
//     const allowedTestNumbers = ['+911234567890'];
//     const testOtpCode = '123456';

//     if (!allowedTestNumbers.includes(formattedPhoneNumber)) {
//       Alert.alert(
//         'This is a test app. Only predefined test numbers are allowed.\n\nUse +911234567890',
//       );
//       return;
//     }

//     try {
//       const formattedPhoneNumber = `${withCallingCode}${Phonenumber}`;
//       const confirmation = await getAuth().signInWithPhoneNumber(
//         formattedPhoneNumber,
//       );
//       setConfirm(confirmation);
//       // Alert.alert('OTP sent successfully!');

//       const newIndex = currentIndex + 1;
//       flatListRef.current?.scrollToIndex({index: newIndex, animated: true});
//       setCurrentIndex(newIndex);
//     } catch (error) {
//       console.error('Error sending OTP:', error);
//       console.log('Error sending OTP', error.message);
//     }
//   };

//   const verifyOtp = async () => {
//     if (!confirm) {
//       Alert.alert('OTP not sent yet. Please enter your phone number first.');
//       return;
//     }

//     if (!/^\d{6}$/.test(OTP)) {
//       Alert.alert('Please enter a valid 4-digit OTP.');
//       return;
//     }

//     try {
//       await confirm.confirm(OTP); // ✅ This matches Firebase test OTP
//       // Alert.alert('Phone number verified successfully!');
//       navigate('UserImageCapture');
//     } catch (error) {
//       console.error('Error verifying OTP:', error.message);
//       Alert.alert('Error verifying OTP', error.message);
//     }
//   };

//   // const verifyOtp = async () => {
//   //   if (!confirm) {
//   //     Alert.alert('OTP not sent yet. Please enter your phone number first.');
//   //     return;
//   //   }

//   //   if (!/^\d{4}$/.test(OTP)) {
//   //     Alert.alert('Please enter a valid 4-digit OTP.');
//   //     return;
//   //   }

//   //   try {
//   //     await confirm.confirm(OTP);
//   //     Alert.alert('Phone number verified successfully!');
//   //     navigate('UserImageCapture');
//   //   } catch (error) {
//   //     console.error('Error verifying OTP:', error.message);
//   //     Alert.alert('Error verifying OTP', error.message);
//   //   }
//   // };

//   // return (
//   //   <View style={styles.container}>
//   //     <View style={{margin: moderateScale(20)}}>
//   //       <Text style={[styles.HeaderText, styles.header]}>Tenants</Text>
//   //     </View>

//   //     <FlatList
//   //       data={CreateTenantsSteps}
//   //       horizontal
//   //       ref={flatListRef}
//   //       scrollEnabled={false}
//   //       showsHorizontalScrollIndicator={false}
//   //       pagingEnabled
//   //       renderItem={({item}) => (
//   //         <View style={styles.MainFullWidth}>
//   //           <View style={styles.Box}>
//   //             <View
//   //               style={{flexDirection: 'row', justifyContent: 'space-between'}}>
//   //               <Text style={[styles.Title, {marginRight: moderateScale(20)}]}>
//   //                 {item?.title}
//   //               </Text>
//   //             </View>
//   //             <View style={styles.PHoneViewHandle}>
//   //               {item.type === 'phonenumber' && (
//   //                 <TextInput
//   //                   placeholder="Enter 10-digit mobile number"
//   //                   style={styles.TextInputPhone}
//   //                   maxLength={10}
//   //                   placeholderTextColor={Colors.WHITE}
//   //                   onChangeText={phonenumberfun}
//   //                   keyboardType="number-pad"
//   //                   value={Phonenumber}
//   //                 />
//   //               )}

//   //               {item.type === 'OTP' && (
//   //                 <View style={{marginLeft: moderateScale(-8)}}>
//   //                   <OtpInput
//   //                     numberOfDigits={6}
//   //                     placeholder="*"
//   //                     onTextChange={OTPHandle}
//   //                     theme={{
//   //                       placeholderTextStyle: {color: Colors.WHITE},
//   //                       containerStyle: {marginTop: 50},
//   //                       pinCodeTextStyle: {color: Colors.WHITE},
//   //                     }}
//   //                   />
//   //                 </View>
//   //               )}

//   //               <TouchableOpacity
//   //                 onPress={item.type === 'phonenumber' ? sendOtp : verifyOtp}
//   //                 disabled={item?.disbled}
//   //                 style={[
//   //                   styles.Button,
//   //                   {
//   //                     backgroundColor: !item.disbled
//   //                       ? Colors.BLUE
//   //                       : Colors.GRAY85,
//   //                   },
//   //                 ]}>
//   //                 <Text style={styles.BTNTEXT}>{item?.buttonText}</Text>
//   //               </TouchableOpacity>
//   //             </View>
//   //           </View>
//   //         </View>
//   //       )}
//   //     />
//   //   </View>
//   // );

//   return (
//     <View style={styles.container}>
//       <View style={{margin: moderateScale(20)}}>
//         <Text
//           style={[
//             styles.HeaderText,
//             {
//               fontSize: moderateScale(22),
//               fontWeight: 800,
//               fontFamily: Fonts.POPPINS_BOLD,
//               color: Colors.WHITE,
//             },
//           ]}>
//           Tenants
//         </Text>
//       </View>
//       <FlatList
//         data={CreateTenantsSteps}
//         horizontal
//         ref={flatListRef}
//         scrollEnabled={false}
//         showsHorizontalScrollIndicator={false}
//         pagingEnabled
//         renderItem={({item, index}) => {
//           return (
//             <View style={styles.MainFullWidth}>
//               <View style={styles.Box}>
//                 <Text style={styles.Title}>{item?.title}</Text>
//                 <View style={styles.PHoneViewHandle}>
//                   {item.type == 'phonenumber' && (
//                     <>
//                       <TextInput
//                         placeholder="Enter 10-digit mobile number"
//                         style={styles.TextInputPhone}
//                         maxLength={10}
//                         placeholderTextColor={Colors.WHITE}
//                         onChangeText={text => phonenumberfun(text)}
//                         keyboardType="number-pad"
//                         returnKeyType="next"
//                         dataDetectorTypes={'phoneNumber'}
//                         value={Phonenumber}
//                       />
//                     </>
//                   )}
//                   {item?.type == 'OTP' && (
//                     <OtpInput
//                       numberOfDigits={4}
//                       placeholder="*"
//                       onTextChange={text => OTPHandle(text)}
//                       theme={{
//                         placeholderTextStyle: {color: Colors.WHITE},
//                         containerStyle: {marginTop: 50},
//                         pinCodeTextStyle: {color: Colors.WHITE},
//                       }}
//                     />
//                   )}
//                   <TouchableOpacity
//                     onPress={() => navigate('UserImageCapture')}
//                     disabled={item?.disbled}
//                     style={[
//                       styles.Button,
//                       {
//                         backgroundColor: !item.disbled
//                           ? Colors.BLUE
//                           : Colors.GRAY85,
//                       },
//                     ]}>
//                     <Text style={styles.BTNTEXT}>{item?.buttonText}</Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </View>
//           );
//         }}
//       />
//     </View>
//   );

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   backgroundImage: {
//     flex: 1,
//     width: screenWidth,
//     height: screenHeight,
//   },
//   overlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.05)',
//   },
//   header: {
//     fontSize: moderateScale(26),
//     fontWeight: '800',
//     fontFamily: Fonts.POPPINS_BOLD,
//     color: Colors.WHITE,
//   },
//   MainFullWidth: {
//     width: widthPercentageToDP(100),
//     marginTop: heightPercentageToDP(15),
//   },
//   Box: {
//     width: screenWidth * 0.8,
//     alignSelf: 'center',
//     backgroundColor: '#FFF',
//     borderRadius: moderateScale(8),
//     padding: moderateScale(20),

//     // iOS Shadow
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 4,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4.65,

//     // Android Shadow
//     elevation: 6,
//   },

//   Title: {
//     fontSize: 16,
//     fontWeight: '700',
//     color: Colors.BACKDROP,
//     fontFamily: Fonts.POPPINS_REGULAR,
//   },
//   PHoneViewHandle: {
//     gap: 50,
//   },
//   TextInputPhone: {
//     width: '100%',
//     borderWidth: 1,
//     borderColor: Colors.BACKDROP,
//     borderRadius: 7,
//     padding: 10,
//     marginTop: 20,
//     color: Colors.BLACK,
//   },
//   Button: {
//     width: '100%',
//     height: 50,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 7,
//   },
//   BTNTEXT: {
//     fontSize: 15,
//     color: Colors.WHITE,
//     fontWeight: '500',
//     fontFamily: Fonts.POPPINS_BOLD,
//   },
// });

// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TextInput,
//   TouchableOpacity,
//   ImageBackground,
//   Pressable,
//   Alert,
// } from 'react-native';
// import React, {useRef, useState} from 'react';
// import {
//   heightPercentageToDP,
//   widthPercentageToDP,
// } from 'react-native-responsive-screen';
// import {Colors, Fonts} from '../utils/Theme';
// import {OtpInput} from 'react-native-otp-entry';
// import {moderateScale, screenHeight, screenWidth} from '../utils/Metrics';
// import {useNavigation} from '@react-navigation/native';
// export default function TenantScreen() {
//   const {navigate} = useNavigation();
//   const [countryCode, setCountryCode] = useState('IN');
//   const [country, setCountry] = useState(null);
//   const [withCallingCode, setWithCallingCode] = useState(`+91`);
//   const onSelect = country => {
//     setCountryCode(country.cca2);
//     setCountry(country);
//     console.log(`+${country?.callingCode[0]}`);

//     setWithCallingCode(`+${country?.callingCode[0]}`);
//   };
//   const [Phonenumber, setPhonenumber] = useState('');
//   const [currentIndex, setCurrentIndex] = useState(0);
//   // const [FinalIndex, setFinalIndex] = useState(0);
//   const [OTP, setOTP] = useState('');
//   const flatListRef = useRef(null);

//   const CreateTenantsSteps = [
//     {
//       title: 'Enter Mobile Number',
//       buttonText: 'Continue',
//       type: 'phonenumber',
//       disbled: !(Phonenumber?.length >= 10),
//     },
//     {
//       title: 'OTP',
//       buttonText: 'Verify',
//       type: 'OTP',
//       disbled: !(OTP?.length === 6),
//     },
//   ];

//   // const SelfHandle = index => {
//   //   flatListRef.current?.scrollToIndex({index: index, animated: true});
//   //   setCurrentIndex(index);
//   //   setFinalIndex(index);
//   // };
//   const phonenumberfun = async text => {
//     if (currentIndex < CreateTenantsSteps.length - 1 && text?.length >= 10) {
//       const newIndex = currentIndex + 1;
//       flatListRef.current?.scrollToIndex({index: newIndex, animated: true});
//       setCurrentIndex(newIndex);
//       // setFinalIndex(newIndex);
//     }
//     setPhonenumber(text);
//   };
//   const verifyOtp = async () => {
//     if (!confirm) {
//       Alert.alert('OTP not sent yet. Please enter your phone number first.');
//       return;
//     }

//     if (!/^\d{6}$/.test(OTP)) {
//       Alert.alert('Please enter a valid 4-digit OTP.');
//       return;
//     }

//     try {
//       await confirm.confirm(OTP); // ✅ This matches Firebase test OTP
//       // Alert.alert('Phone number verified successfully!');
//       navigate('UserImageCapture');
//     } catch (error) {
//       console.error('Error verifying OTP:', error.message);
//       Alert.alert('Error verifying OTP', error.message);
//     }
//   };

//   // const OTPHandle = otp => {
//   //   setOTP(otp);
//   // };

//   const handalPress = () => {
//     if (currentIndex === 1 && OTP.length === 6) {
//       navigate('UserImageCapture');
//     }
//   };
// // >>>>>>> 4f66fa1 (Some Cahnge on Filtter Room Screen.....!!!!K)

//   return (
//     <ImageBackground
//       source={require('../assets/image/Tbackground.png')} // Replace with your actual image path
//       style={styles.backgroundImage}
//       resizeMode="cover">
//       <View style={styles.overlay}>
//         <View style={{margin: moderateScale(20)}}>
//           <Text style={[styles.HeaderText, styles.header]}>Tenants</Text>
//         </View>

//         <FlatList
//           data={CreateTenantsSteps}
//           horizontal
//           ref={flatListRef}
//           scrollEnabled={false}
//           showsHorizontalScrollIndicator={false}
//           pagingEnabled
//           renderItem={({item}) => (
//             <View style={styles.MainFullWidth}>
//               <View style={styles.Box}>
//                 <View
//                   style={{
//                     flexDirection: 'row',
//                     justifyContent: 'space-between',
//                   }}>
//                   <Text
//                     style={[styles.Title, {marginRight: moderateScale(20)}]}>
//                     {item?.title}
//                   </Text>
//                 </View>
//                 <View style={styles.PHoneViewHandle}>
//                   {item.type === 'phonenumber' && (
//                     <TextInput
//                       placeholder="Enter 10-digit mobile number"
//                       style={styles.TextInputPhone}
//                       maxLength={10}
//                       placeholderTextColor={Colors.WHITE}
//                       onChangeText={text => phonenumberfun(text)}
//                       keyboardType="number-pad"
//                       returnKeyType="next"
//                       dataDetectorTypes={'phoneNumber'}
//                       value={Phonenumber}
//                     />
//                   )}

//                   {item.type === 'OTP' && (
//                     <View style={{marginLeft: moderateScale(-8)}}>
//                       <OtpInput
//                         numberOfDigits={6}
//                         placeholder="*"
//                         onTextChange={setOTP}
//                         theme={{
//                           placeholderTextStyle: {color: Colors.WHITE},
//                           containerStyle: {marginTop: 50},
//                           pinCodeTextStyle: {color: Colors.WHITE},
//                         }}
//                       />
//                       <Pressable
//                         style={{marginTop: 8}}
//                         onPress={() => navigate('TenantScreen')}>
//                         <Text style={{color: Colors.WHITE}}>
//                           Change Mobile Number ? {Phonenumber}
//                         </Text>
//                       </Pressable>
//                     </View>
//                   )}

//                   <TouchableOpacity
//                     // onPress={item.type === 'phonenumber' ? sendOtp : verifyOtp}
//                     // disabled={item?.disbled}
//                     onPress={handalPress}
//                     style={[
//                       styles.Button,
//                       {
//                         backgroundColor: !item.disbled
//                           ? Colors.BLUE
//                           : Colors.GRAY85,
//                       },
//                     ]}>
//                     <Text style={styles.BTNTEXT}>{item?.buttonText}</Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </View>
//           )}
//         />
//       </View>
//     </ImageBackground>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   backgroundImage: {
//     // flex: 1,
//     width: screenWidth,
//     height: screenHeight,
//   },
//   header: {
//     fontSize: moderateScale(26),
//     fontWeight: '800',
//     fontFamily: Fonts.POPPINS_BOLD,
//     color: Colors.WHITE,
//   },
//   MainFullWidth: {
//     width: widthPercentageToDP(100),
//     marginTop: heightPercentageToDP(15),
//   },
//   Box: {
//     width: '80%',
//     marginHorizontal: 'auto',
//     // height: heightPercentageToDP(40),
//     backgroundColor: '#121826',
//     borderRadius: moderateScale(8),
//     padding: 25,
//   },
//   Title: {
//     fontSize: 16,
//     fontWeight: '700',
//     color: Colors.WHITE,
//     fontFamily: Fonts.POPPINS_REGULAR,
//   },
//   PHoneViewHandle: {
//     gap: 50,
//   },
//   TextInputPhone: {
//     width: '100%',
//     borderWidth: 1,
//     borderColor: Colors.WHITE,
//     borderRadius: 7,
//     padding: 10,
//     marginTop: 20,
//     color: Colors.WHITE,
//   },
//   Button: {
//     width: '100%',
//     height: 50,
//     backgroundColor: Colors.BLUE,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 7,
//   },
//   BTNTEXT: {
//     fontSize: 15,
//     color: Colors.WHITE,
//     fontWeight: '500',
//     fontFamily: Fonts.POPPINS_BOLD,
//   },
// });
