import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Animated, {
  FadeInLeft,
  FadeInRight,
  FadeInUp,
} from 'react-native-reanimated';
import {Images} from '../assets/image/image';
import {horizontalScale, moderateScale} from '../utils/Metrics';
import {Fonts} from '../utils/Theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';

// import {useNavigation} from '@react-navigation/native';

const Header = ({functions}) => {
  // const navigation = useNavigation();

  // const AnimatedCard = Animated.createAnimatedComponent(TouchableOpacity);
  // const [MyWidth, setMyWidth] = useState(Dimensions.get('window').width);

  // const user = useSelector(state => state.auth.user);
  // console.log('Redux user:', user);
  const [name, SetName] = useState();
  const [address, SetAddress] = useState();

  const Data = async () => {
    const userData = await AsyncStorage.getItem('user');
    const parsedUser = JSON.parse(userData);
    console.log('UserData Header :', parsedUser.token);
    SetName(parsedUser.user.name);
    SetAddress(parsedUser.user.address);
  };

  useEffect(() => {
    Data();
  }, []);

  return (
    <View style={{position: 'static', top: 0, zIndex: 20}}>
      <View style={styles.HeaderMainView}>
        {/* <TouchableOpacity
          style={{
            backgroundColor: '#1d1d3b',
            padding: moderateScale(6),
            borderRadius: moderateScale(12),
          }}
          onPress={() => functions()}>
          <Animated.Image
            entering={FadeInLeft.duration(500).delay(200)}
            source={Images.THREELINE}
            style={{width: moderateScale(32), height: moderateScale(32)}}
          />
        </TouchableOpacity> */}
        <View
          style={styles.HederCenterStyle}
          entering={FadeInUp.duration(500).delay(200)}>
          <TouchableOpacity onPress={() => functions()}>
            <Image
              style={{
                width: moderateScale(32),
                height: moderateScale(32),
                borderRadius: moderateScale(8),
              }}
              source={Images.SplashScreen}
            />
          </TouchableOpacity>
          <View>
            <Text style={styles.HeaderText}>Sebzy</Text>
            <Text style={styles.HeaderTextSmall}>PG Management</Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: '#1d1d3b',
            padding: moderateScale(6),
            borderRadius: moderateScale(12),
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            style={{
              width: moderateScale(32),
              height: moderateScale(32),
              backgroundColor: '#FFF',
              borderRadius: moderateScale(8),
            }}
            source={Images.USER}
          />
          <View style={{marginLeft: moderateScale(8)}}>
            <Text style={[styles.HeaderText]}>{name}</Text>
            <Text style={[styles.HeaderTextSmall, {color: '#FFF'}]}>
              {address}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      {/* 
      {isSelected ? (
        <Animated.View entering={FadeInRight.duration(500).delay(200)}>
          <View
            style={{
              zIndex: 5,
              width: moderateScale(50),
              height: moderateScale(150),
            }}>
            <Text>DEmo</Text>
          </View>
        </Animated.View>
      ) : (
        <View></View>
      )} */}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  HeaderMainView: {
    flex: 1,
    height: moderateScale(70),
    backgroundColor: '#046d92',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: horizontalScale(16),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },
  HeaderText: {
    fontSize: moderateScale(18),
    fontFamily: Fonts.POPPINS_SEMIBOLD,
    color: '#FFF',
    fontWeight: 700,
  },
  HeaderTextSmall: {
    fontSize: moderateScale(14),
    fontFamily: Fonts.POPPINS_SEMIBOLD,
    color: '#A1AFF6',
  },
  HederCenterStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(3),
  },
});
