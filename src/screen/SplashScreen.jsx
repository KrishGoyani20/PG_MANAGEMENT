import React, {useEffect} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Video from 'react-native-video';

export default function SplashScreen() {
  const navigation = useNavigation(); // ✅ get FULL navigation object

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        console.log('User Data SpleshScreen:', userData);
        if (userData) {
          // ✅ User is logged in, go to Home with RESET
          navigation.reset({
            index: 0,
            routes: [{name: 'HomeScreen'}],
          });
        } else {
          // ⏳ Not logged in → wait → go to Login
          setTimeout(() => {
            navigation.reset({
              index: 0,
              routes: [{name: 'LoginScreen'}],
            });
          }, 3000);
        }
      } catch (error) {
        console.error('Error checking login status:', error);
        // fallback → go to login anyway
      }
    };

    checkLoginStatus();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} />

      <Video
        source={require('../assets/viedo/SEBZYYFORYOU.mp4')}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
        muted
        repeat={false}
        paused={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

// import {View, Text, StyleSheet, Image, StatusBar} from 'react-native';
// import React, {useEffect} from 'react';
// import {screenHeight, screenWidth} from '../utils/Metrics';
// import {useNavigation} from '@react-navigation/native';
// import {Images} from '../assets/image/image';
// import Video from 'react-native-video';

// export default function SplashScreen() {
//   const {replace} = useNavigation();
//   useEffect(() => {
//     let time = setTimeout(() => {
//       replace('LoginScreen');
//     }, 1500);
//     return () => {
//       clearTimeout(time);
//     };
//   }, []);
//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle={'dark-content'} />
//       <View>
//         <Video
//           source={require('../assets/viedo/SEBZYYFORYOU.mp4')}
//           style={StyleSheet.absoluteFill}
//           resizeMode="cover"
//           onEnd={() => replace('LoginScreen')}
//           muted={true}
//           repeat={false}
//           paused={false}
//         />
//       </View>

//       {/* <Image source={Images.SplashScreen} style={styles.Images} /> */}
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'lightgray',
//   },
//   Images: {
//     width: screenWidth * 0.5,
//     height: screenWidth * 0.5,
//   },
//   video: {
//     width: screenWidth,
//     height: screenHeight,
//   },
// });
