import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import {moderateScale, screenHeight, screenWidth} from '../utils/Metrics';
import {Colors, Fonts} from '../utils/Theme';
import {Images} from '../assets/image/image';

export default function RoomsScreen() {
  const [isAddRoomVisible, setIsAddRoomVisible] = useState(false);
  const [isTrueRound, setIsTrueRound] = useState(false);
  const [selectedItems, setSelectedItems] = useState(false);

  const renderRoomAdd = () => {
    return <></>;
  };

  const RoomNumber = [
    {
      id: 1,
      image: Images.RBAD,
      badW: Images.RBAD2,
      num: 1,
    },
    {
      id: 2,
      image: Images.RBAD,
      num: 2,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={{margin: moderateScale(20)}}>
        <Text style={[styles.HeaderText, styles.header]}>Room</Text>
      </View>

      {isAddRoomVisible ? (
        <View
          style={{
            width: screenWidth * 0.9,
            height: moderateScale(300),
            marginTop: moderateScale(20),
            backgroundColor: Colors.WHITE,
            borderRadius: moderateScale(20),
          }}>
          <View
            style={{
              paddingHorizontal: moderateScale(20),
              height: moderateScale(70),
              backgroundColor: '#5B7CE9',
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
                  borderRadius: moderateScale(50),
                  backgroundColor: Colors.WHITE,
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
            <Text
              style={{
                fontSize: moderateScale(20),
                fontWeight: 800,
                color: Colors.WHITE,
              }}>
              Room 5
            </Text>
          </View>
          <View
            style={{
              paddingHorizontal: moderateScale(8),
              marginTop: moderateScale(10),
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  style={{
                    width: moderateScale(24),
                    height: moderateScale(24),
                    resizeMode: 'contain',
                  }}
                  source={Images.RUSER}
                />
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 500,
                    marginLeft: moderateScale(4),
                  }}>
                  Capacity : 0/12
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  style={{
                    width: moderateScale(20),
                    height: moderateScale(20),
                    resizeMode: 'contain',
                  }}
                  source={Images.RMONEY}
                />
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 500,
                    marginLeft: moderateScale(4),
                  }}>
                  Rent : 200/-
                </Text>
              </View>
            </View>

            <View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: moderateScale(4),
                }}>
                <Image
                  style={{
                    width: moderateScale(24),
                    height: moderateScale(24),
                    resizeMode: 'contain',
                  }}
                  source={Images.RTHREELINE}
                />
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 500,
                    marginLeft: moderateScale(4),
                  }}>
                  Amenities: TV, WiFi, AC
                </Text>
              </View>

              <View style={{marginTop: moderateScale(10)}}>
                <Text
                  style={{
                    fontSize: moderateScale(18),
                    fontWeight: 500,
                    marginLeft: moderateScale(4),
                  }}>
                  Bed Status:
                </Text>

                <View
                  style={{
                    margin: moderateScale(10),
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: moderateScale(8),
                  }}>
                  {/* Vacant Button */}
                  <TouchableOpacity
                    style={{
                      width: moderateScale(15),
                      height: moderateScale(15),
                      borderWidth: 1,
                      borderRadius: moderateScale(50),
                      backgroundColor: isTrueRound
                        ? Colors.GREEN35
                        : 'transparent',
                      borderColor: isTrueRound ? Colors.GREEN35 : '#ccc',
                    }}
                    onPress={() => setIsTrueRound(true)}
                  />
                  <Text style={{fontSize: 14, fontWeight: '700'}}> Vacant</Text>

                  {/* Filled Button */}
                  <TouchableOpacity
                    style={{
                      width: moderateScale(15),
                      height: moderateScale(15),
                      borderWidth: 1,
                      borderRadius: moderateScale(50),
                      backgroundColor: !isTrueRound
                        ? Colors.GREEN35
                        : 'transparent',
                      borderColor: !isTrueRound ? Colors.GREEN35 : '#ccc',
                    }}
                    onPress={() => setIsTrueRound(false)}
                  />
                  <Text style={{fontSize: 14, fontWeight: '700'}}> Filled</Text>
                </View>
              </View>

              <FlatList
                data={RoomNumber}
                keyExtractor={item => item.id.toString()} // Unique key for each item
                renderItem={({item}) => {
                  // Destructure item
                  const isSelected = selectedItems.includes(item.id); // Check if the item is selected
                  return (
                    <View>
                      <TouchableOpacity
                        onPress={() => {
                          // Toggle selection
                          setSelectedItems(prev =>
                            isSelected
                              ? prev.filter(id => id !== item.id)
                              : [...prev, item.id],
                          );
                        }}
                        style={[
                          styles.ChooseRoom,
                          {
                            backgroundColor: isSelected
                              ? Colors.GREEN35
                              : 'transparent',
                            borderColor: isSelected ? Colors.GREEN35 : '#ccc',
                          },
                        ]}>
                        <Image
                          style={{
                            width: moderateScale(26),
                            height: moderateScale(26),
                            resizeMode: 'contain',
                          }}
                          source={isSelected ? item.badW : item.image} // Use badW if selected
                        />
                        <Text>{item.num}</Text>
                      </TouchableOpacity>
                    </View>
                  );
                }}
              />
            </View>
          </View>
        </View>
      ) : (
        <View
          style={{
            marginTop: moderateScale(100),
            width: screenWidth * 0.9,
            height: screenHeight / 4,
            backgroundColor: Colors.GUNMETAL,
            borderRadius: moderateScale(8),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View>
            <Image
              style={{width: moderateScale(72), height: moderateScale(72)}}
              source={Images.TROOM}
            />
          </View>
          <Text
            style={{
              color: Colors.WHITE,
              textAlign: 'center',
              marginHorizontal: moderateScale(30),
              marginVertical: moderateScale(10),
            }}>
            No rooms found. Add your room to get started.
          </Text>
          <TouchableOpacity
            style={[styles.Button]}
            onPress={() => setIsAddRoomVisible(true)}>
            <Text style={styles.BTNTEXT}>+ Add Room</Text>
          </TouchableOpacity>
        </View>
      )}

      {isAddRoomVisible && renderRoomAdd()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: screenHeight,
    maxHeight: screenHeight,
    backgroundColor: Colors.CHARCOLEBLUE,
    alignItems: 'center',
  },
  header: {
    width: screenWidth * 0.8,
    fontSize: moderateScale(22),
    fontWeight: '800',
    fontFamily: Fonts.POPPINS_BOLD,
    color: Colors.WHITE,
  },

  Button: {
    width: '90%',
    height: moderateScale(50),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.DARKBLUE,
    borderRadius: 7,
  },
  BTNTEXT: {
    fontSize: moderateScale(15),
    color: Colors.WHITE,
    fontWeight: 700,
    fontFamily: Fonts.POPPINS_BOLD,
  },

  ChooseRoom: {
    width: moderateScale(70),
    height: moderateScale(40),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(10),
  },
});
