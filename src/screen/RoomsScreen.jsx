import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SectionList,
} from 'react-native';
import {moderateScale, screenHeight, screenWidth} from '../utils/Metrics';
import {Images} from '../assets/image/image';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from '../utils/Theme';
import {getRooms} from '../server/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Fonts = {
  POPPINS_BOLD: 'Poppins-Bold',
};

export default function RoomsScreen() {
  const {navigate} = useNavigation();

  // ✅ State to store fetched rooms
  const [rooms, setRooms] = useState([]);

  // console.log('Passed Data Rooms (from route):', route?.params?.RoomsList);   // {route}

  useEffect(() => {
    const getRoomData = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        const parsedUser = JSON.parse(userData);
        const token = parsedUser?.token;

        if (!token) {
          console.log('No token found!');
          return;
        }

        const res = await getRooms(token);
        console.log('Room data -->', res);

        // ✅ Store API response in state
        setRooms(res?.data || []);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    getRoomData();
  }, []);

  const PGComponent = () => {
    navigate('NewPGRoom', {RoomsList: rooms, type: 'pg'});
  };

  const DormitoryComponent = () => {
    navigate('NewPGRoom', {RoomsList: rooms, type: 'dormitory'});
  };

  // ✅ Group rooms from API state by type
  const PGRooms = rooms.filter(room => room.type === 'pg');
  const DormitoryRooms = rooms.filter(room => room.type === 'dormitory');

  const sections = [];
  if (PGRooms.length > 0) {
    sections.push({title: 'PG Rooms', data: PGRooms});
  }
  if (DormitoryRooms.length > 0) {
    sections.push({title: 'Dormitory Rooms', data: DormitoryRooms});
  }

  const renderRoomItem = ({item}) => {
    const {
      roomNumber,
      floorNumber,
      capacity,
      rentAmount,
      amenities = [],
      isOccupied,
    } = item;

    return (
      <View
        style={{
          width: screenWidth * 0.9,
          marginTop: moderateScale(20),
          backgroundColor: Colors.WHITE,
          borderRadius: moderateScale(20),
          shadowColor: Colors.BLACK,
          elevation: 10,
          alignSelf: 'center',
          paddingBottom: 10,
        }}>
        {/* Header */}
        <View
          style={{
            paddingHorizontal: moderateScale(16),
            height: moderateScale(70),
            backgroundColor: Colors.DARKBLUE,
            borderTopLeftRadius: moderateScale(20),
            borderTopRightRadius: moderateScale(20),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: moderateScale(46),
              height: moderateScale(46),
              borderRadius: moderateScale(50),
              backgroundColor: '#8BEA7C',
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
            }}>
            <View
              style={{
                width: moderateScale(42),
                height: moderateScale(42),
                backgroundColor: Colors.WHITE,
                borderRadius: moderateScale(50),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                style={{
                  width: moderateScale(26),
                  height: moderateScale(26),
                  resizeMode: 'contain',
                }}
                source={Images.RBAD}
              />
            </View>
          </View>

          <View style={{flex: 1, marginLeft: 10}}>
            <Text
              style={{
                fontSize: moderateScale(20),
                fontWeight: '800',
                color: Colors.WHITE,
              }}>
              Room {roomNumber || '-'}
            </Text>
            <View style={{flexDirection: 'row', gap: 10}}>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: 'rgba(250, 249, 246, 0.4)',
                  borderRadius: 4,
                  paddingHorizontal: 4,
                  alignItems: 'center',
                }}>
                <Image
                  style={{width: 14, height: 14, resizeMode: 'contain'}}
                  source={Images.RFLOOR}
                />
                <Text
                  style={{
                    fontSize: 14,
                    color: Colors.WHITE,
                    fontWeight: '600',
                  }}>
                  Floor {floorNumber || '-'}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: 'rgba(250, 249, 246, 0.4)',
                  borderRadius: 4,
                  paddingHorizontal: 4,
                  alignItems: 'center',
                }}>
                <Image
                  style={{width: 10, height: 10, resizeMode: 'contain'}}
                  source={Images.RMONEY}
                />
                <Text
                  style={{
                    fontSize: 14,
                    color: Colors.WHITE,
                    fontWeight: '600',
                  }}>
                  ₹{rentAmount || '-'}
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              height: 60,
              alignItems: 'flex-start',
              marginTop: moderateScale(14),
            }}>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: isOccupied ? '#FF5A5F' : '#35C625',
                borderRadius: 10,
                paddingHorizontal: 6,
                alignItems: 'center',
              }}>
              <Image
                style={{width: 10, height: 10, resizeMode: 'contain'}}
                source={Images.RTRUE}
              />
              <Text
                style={{
                  fontSize: 14,
                  color: Colors.WHITE,
                  fontWeight: '600',
                }}>
                {isOccupied ? 'Occupied' : 'Vacant'}
              </Text>
            </View>
          </View>
        </View>

        {/* Body */}
        <View
          style={{
            paddingHorizontal: moderateScale(16),
            marginTop: moderateScale(10),
          }}>
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            {Array.from({length: Number(capacity) || 0}).map((_, index) => (
              <TouchableOpacity
                onPress={() => navigate('TenantScreen')}
                key={index}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: '#35C625',
                  borderRadius: 12,
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  margin: 4,
                }}>
                <Image
                  style={{
                    width: 20,
                    height: 20,
                    resizeMode: 'contain',
                    tintColor: '#fff',
                  }}
                  source={Images.RBAD}
                />
                <Text
                  style={{color: '#fff', fontWeight: 'bold', marginLeft: 4}}>
                  {index + 1}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              padding: 8,
              margin: moderateScale(6),
              borderRadius: 6,
            }}>
            <Image
              style={{width: 20, height: 20, resizeMode: 'contain'}}
              source={Images.RUSER}
            />
            <Text style={{fontSize: 16, marginLeft: 4}}>
              Capacity: {capacity || '0'}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              padding: 8,
              borderRadius: 6,
            }}>
            <Image
              style={{width: 20, height: 20, resizeMode: 'contain'}}
              source={Images.RTHREELINE}
            />
            <Text style={{fontSize: 16, marginLeft: 4}}>
              Amenities: {amenities.length > 0 ? amenities.join(', ') : 'None'}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginVertical: moderateScale(10),
            paddingHorizontal: moderateScale(6),
          }}>
          <TouchableOpacity
            style={{
              flex: 1,
              marginHorizontal: 10,
              height: moderateScale(40),
              backgroundColor: 'green',
              borderRadius: 8,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: Colors.WHITE, fontWeight: '600'}}>Add</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flex: 1,
              marginHorizontal: 10,
              height: moderateScale(40),
              backgroundColor: '#5B7CE9',
              borderRadius: 8,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: Colors.WHITE, fontWeight: '600'}}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flex: 1,
              marginHorizontal: 10,
              height: moderateScale(40),
              backgroundColor: '#a6252c',
              borderRadius: 8,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: Colors.WHITE, fontWeight: '600'}}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.BACKGROUND}}>
      <View
        style={{
          marginHorizontal: moderateScale(20),
          marginBottom: moderateScale(20),
        }}>
        <Text style={[styles.HeaderText, styles.header]}>Room</Text>
      </View>

      <View
        style={{
          marginTop: moderateScale(20),
          width: screenWidth * 0.9,
          backgroundColor: Colors.CARD,
          borderRadius: moderateScale(8),
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20,
          alignSelf: 'center',
        }}>
        <Text
          style={{
            color: Colors.BLACK,
            textAlign: 'center',
            marginVertical: moderateScale(10),
          }}>
          Add your room to get started.
        </Text>
        <TouchableOpacity style={styles.Button} onPress={PGComponent}>
          <Text style={styles.BTNTEXT}>PG Room</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.Button, {marginTop: 10}]}
          onPress={DormitoryComponent}>
          <Text style={styles.BTNTEXT}>Dormitory</Text>
        </TouchableOpacity>
      </View>

      <SectionList
        sections={sections}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderRoomItem}
        renderSectionHeader={({section: {title}}) => (
          <Text
            style={{
              fontSize: moderateScale(18),
              fontWeight: 'bold',
              marginTop: moderateScale(20),
              marginLeft: moderateScale(20),
              color: Colors.BLACK,
            }}>
            {title}
          </Text>
        )}
        contentContainerStyle={{paddingBottom: 30}}
        ListEmptyComponent={
          <Text style={{textAlign: 'center', marginTop: 20}}>
            No Rooms Found
          </Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    width: screenWidth * 0.8,
    fontSize: moderateScale(22),
    fontWeight: '800',
    fontFamily: Fonts.POPPINS_BOLD,
    color: Colors.PRIMARY,
  },
  Button: {
    width: '90%',
    height: moderateScale(50),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.PRIMARY,
    borderRadius: 7,
  },
  BTNTEXT: {
    fontSize: moderateScale(15),
    color: Colors.WHITE,
    fontWeight: '700',
    fontFamily: Fonts.POPPINS_BOLD,
  },
});
