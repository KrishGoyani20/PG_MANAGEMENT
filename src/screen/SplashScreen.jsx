import {View, Text, StyleSheet, Image, StatusBar} from 'react-native';
import React, {useEffect} from 'react';
import {screenHeight, screenWidth} from '../utils/Metrics';
import {useNavigation} from '@react-navigation/native';
import {Images} from '../assets/image/image';
import Video from 'react-native-video';

export default function SplashScreen() {
  const {replace} = useNavigation();
  // useEffect(() => {
  //   let time = setTimeout(() => {
  //     replace('HomeScreen');
  //   }, 1500);
  //   return () => {
  //     clearTimeout(time);
  //   };
  // }, []);
  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} />

      <Video
        source={require('../assets/viedo/SEBZYYFORYOU.mp4')}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
        onEnd={() => replace('HomeScreen')}
        muted={true}
        repeat={false}
        paused={false}
      />

      {/* <Image source={Images.SplashScreen} style={styles.Images} /> */}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgray',
  },
  Images: {
    width: screenWidth * 0.5,
    height: screenWidth * 0.5,
  },
  video: {
      width: screenWidth,
    height: screenHeight,
  },
});