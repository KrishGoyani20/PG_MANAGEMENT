import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {moderateScale, screenHeight, screenWidth} from '../utils/Metrics';
import {Colors, Fonts} from '../utils/Theme';
import {Images} from '../assets/image/image';
import Modal from 'react-native-modal';
import {MultiSelect} from 'react-native-element-dropdown';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function RoomsScreen() {
  const {navigate} = useNavigation();
  const [isFiltter, setIsFiltter] = useState(false);

  const [selectedRoomType, setSelectedRoomType] = useState(null); // 'Single' or 'Double'
  const [selectedStatus, setSelectedStatus] = useState(null); // 'Vacant' or 'Occupied'
  const [selectedRentType, setSelectedRentType] = useState(null); // 'Monthly' | 'PerDay'
  const [floorNumber, setFloorNumber] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [capacity, setcapacity] = useState('');
  const [roomAmountNumber, setRoomAmountNumber] = useState('');
  const [Amenities, setAmenities] = useState([]);

  const [isFocus, setIsFocus] = useState(false);
  const [isTrueRound, setIsTrueRound] = useState(false);
  const [modalNewUpdate, setModalNewUpdate] = useState(false);

  const [filterData, setFiltterData] = useState(null);
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  const RoomNumber = [
    {
      id: 1,
      image: Images.RBAD,
      badW: Images.RBAD2,
      num: 101,
      isBooked: false,
    },
    {
      id: 2,
      image: Images.RBAD,
      badW: Images.RBAD2,
      num: 102,
      isBooked: false,
    },
    {
      id: 3,
      image: Images.RBAD,
      badW: Images.RBAD2,
      num: 103,
      isBooked: false,
    },
    {
      id: 4,
      image: Images.RBAD,
      badW: Images.RBAD2,
      num: 104,
      isBooked: false,
    },
    {
      id: 5,
      image: Images.RBAD,
      badW: Images.RBAD2,
      num: 105,
      isBooked: false,
    },
    {
      id: 6,
      image: Images.RBAD,
      badW: Images.RBAD2,
      num: 106,
      isBooked: false,
    },
    {
      id: 7,
      image: Images.RBAD,
      badW: Images.RBAD2,
      num: 107,
      isBooked: false,
    },
    {
      id: 8,
      image: Images.RBAD,
      badW: Images.RBAD2,
      num: 108,
      isBooked: false,
    },
    {
      id: 9,
      image: Images.RBAD,
      badW: Images.RBAD2,
      num: 109,
      isBooked: false,
    },
    {
      id: 10,
      image: Images.RBAD,
      badW: Images.RBAD2,
      num: 110,
      isBooked: false,
    },
    {
      id: 11,
      image: Images.RBAD,
      badW: Images.RBAD2,
      num: 111,
      isBooked: false,
    },
    {
      id: 12,
      image: Images.RBAD,
      badW: Images.RBAD2,
      num: 112,
      isBooked: false,
    },
  ];

  const totalBeds = RoomNumber.length;
  const bookedBeds = RoomNumber.filter(bed => bed.isBooked).length;

  const amenitiesData = [
    {id: '1', name: 'Cooler'},
    {id: '2', name: 'TV'},
    {id: '3', name: 'Curtains'},
    {id: '4', name: 'Table Chair'},
    {id: '5', name: 'Almirah'},
    {id: '6', name: 'AC'},
    {id: '7', name: 'Washroom'},
    {id: '8', name: 'Bed'},
    {id: '9', name: 'Mattress'},
    {id: '10', name: 'WiFi'},
    {id: '11', name: 'Geyser'},
    {id: '12', name: 'Refrigerator'},
    {id: '13', name: 'Fan'},
    {id: '14', name: 'Cupboard'},
  ];

  const handalSubmitData = () => {
    const filteredData = {
      RoomType: selectedRoomType,
      Status: selectedStatus,
      RentType: selectedRentType,
      FloorNumber: floorNumber,
      RoomNumber: roomNumber,
      capacity: capacity,
      RentAmount: roomAmountNumber,
      Amenities,
    };

    setFiltterData(filteredData); // Save filter data
    setIsFilterApplied(true); // ✅ Mark filter as applied
    console.log(filteredData);
  };

  const PGComponent = () => {
    const filteredData = {
      RoomType: selectedRoomType,
      Status: selectedStatus,
      RentType: selectedRentType,
      FloorNumber: floorNumber,
      RoomNumber: roomNumber,
      capacity: capacity,
      RentAmount: roomAmountNumber,
      Amenities,
    };

    // ✅ Navigate and pass it
    navigate('PGselectBad', {filteredData});
  };

  const DormitoryComponent = () => {
    const filteredData = {
      RoomType: selectedRoomType,
      Status: selectedStatus,
      RentType: selectedRentType,
      FloorNumber: floorNumber,
      RoomNumber: roomNumber,
      capacity: capacity,
      RentAmount: roomAmountNumber,
      Amenities,
    };

    // ✅ Navigate and pass it
    navigate('DRselect', {filteredData});
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          // backgroundColor: Colors.CHARCOLEBLUE,
          paddingHorizontal: moderateScale(20),
          paddingBottom: moderateScale(50),
        }}
        showsVerticalScrollIndicator={false}>
        <View
          style={{
            marginHorizontal: moderateScale(20),
            marginBottom: moderateScale(20),
          }}>
          <Text style={[styles.HeaderText, styles.header]}>Room</Text>
        </View>

        {!isFilterApplied && (
          <TouchableOpacity
            onPress={() => setIsFiltter(true)}
            style={{
              width: screenWidth * 0.9,
              backgroundColor: Colors.WHITE,
              padding: moderateScale(8),
              borderRadius: moderateScale(10),
              flexDirection: 'row',
              gap: moderateScale(14),
            }}>
            <Image style={{width: 24, height: 24}} source={Images.RFILTER} />
            <Text
              style={{
                fontSize: moderateScale(18),
                fontWeight: 700,
                color: Colors.BLACK,
              }}>
              Filter
            </Text>
          </TouchableOpacity>
        )}
        {/* 
        {filterData && (
          <View style={{marginVertical: moderateScale(20)}}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: moderateScale(22),
                fontWeight: 500,
                color: '#fff',
              }}>
              Filled Data
            </Text>

            <Text style={styles.filterText}>Room Type:</Text>
            <View style={styles.TextBox}>
              <Text style={styles.filterText}>{filterData.RoomType}</Text>
            </View>

            <Text style={styles.filterText}>Status: </Text>
            <View style={styles.TextBox}>
              <Text style={styles.filterText}>{filterData.Status}</Text>
            </View>

            <Text style={styles.filterText}>Rent Type:</Text>
            <View style={styles.TextBox}>
              <Text style={styles.filterText}>{filterData.RentType}</Text>
            </View>

            <Text style={styles.filterText}>Floor Number:</Text>
            <View style={styles.TextBox}>
              <Text style={styles.filterText}>{filterData.FloorNumber}</Text>
            </View>

            <Text style={styles.filterText}>Room Number:</Text>
            <View style={styles.TextBox}>
              <Text style={styles.filterText}>{filterData.RoomNumber}</Text>
            </View>

            <Text style={styles.filterText}>Capacity:</Text>
            <View style={styles.TextBox}>
              <Text style={styles.filterText}>{filterData.capacity}</Text>
            </View>

            <Text style={styles.filterText}>Rent Amount:</Text>
            <View style={styles.TextBox}>
              <Text style={styles.filterText}>{filterData.RentAmount}</Text>
            </View>

            <Text style={styles.filterText}>Amenities:</Text>

            <View style={styles.TextBox}>
              <Text style={styles.filterText}>
                {filterData.Amenities?.join(', ')}
              </Text>
            </View>
          </View>
        )} */}

        {filterData && (
          <View
            style={{
              marginVertical: moderateScale(20),
              backgroundColor: '#fff',
              borderRadius: 12,
              padding: moderateScale(16),
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 4,
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: moderateScale(20),
                fontWeight: '700',
                marginBottom: moderateScale(12),
                color: '#333',
              }}>
              Filtered Room Details
            </Text>

            <View style={{marginBottom: moderateScale(10)}}>
              <Text style={styles.filterLabel}>Room Type</Text>
              <Text style={styles.filterValue}>{filterData.RoomType}</Text>
            </View>

            <View style={{marginBottom: moderateScale(10)}}>
              <Text style={styles.filterLabel}>Status</Text>
              <Text style={styles.filterValue}>{filterData.Status}</Text>
            </View>

            <View style={{marginBottom: moderateScale(10)}}>
              <Text style={styles.filterLabel}>Rent Type</Text>
              <Text style={styles.filterValue}>{filterData.RentType}</Text>
            </View>

            <View style={{marginBottom: moderateScale(10)}}>
              <Text style={styles.filterLabel}>Floor Number</Text>
              <Text style={styles.filterValue}>{filterData.FloorNumber}</Text>
            </View>

            <View style={{marginBottom: moderateScale(10)}}>
              <Text style={styles.filterLabel}>Room Number</Text>
              <Text style={styles.filterValue}>{filterData.RoomNumber}</Text>
            </View>

            <View style={{marginBottom: moderateScale(10)}}>
              <Text style={styles.filterLabel}>Capacity</Text>
              <Text style={styles.filterValue}>{filterData.capacity}</Text>
            </View>

            <View style={{marginBottom: moderateScale(10)}}>
              <Text style={styles.filterLabel}>Rent Amount</Text>
              <Text style={styles.filterValue}>₹ {filterData.RentAmount}</Text>
            </View>

            <View style={{marginBottom: moderateScale(10)}}>
              <Text style={styles.filterLabel}>Amenities</Text>
              <Text style={styles.filterValue}>
                {filterData.Amenities && filterData.Amenities.length > 0
                  ? amenitiesData
                      .filter(item => filterData.Amenities.includes(item.id))
                      .map(item => item.name)
                      .join(', ')
                  : 'None'}
              </Text>
            </View>
          </View>
        )}

        <View
          style={{
            marginTop: moderateScale(20),
            width: screenWidth * 0.9,
            height: screenHeight / 3,
            backgroundColor: Colors.BLUEGRAY,
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
          <View
            style={{
              width: '100%',
              height: 'auto',
              alignItems: 'center',
              rowGap: moderateScale(10),
            }}>
            <TouchableOpacity
              style={[styles.Button]}
              onPress={() => {
                PGComponent();
              }}>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>
                PG Room
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.Button]}
              onPress={() => {
                DormitoryComponent();
              }}>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>
                Dormitory
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <Modal
        transparent
        animationType="fade"
        visible={isFiltter}
        onRequestClose={() => setIsFiltter(false)}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{flex: 1}}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,0.5)',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: screenWidth * 0.9,
                maxHeight: screenHeight * 0.8,
                backgroundColor: '#fff',
                borderRadius: 10,
                padding: 20,
              }}>
              <ScrollView
                contentContainerStyle={{paddingBottom: 50}}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled">
                {/* 👇 Place all your existing modal content here 👇 */}
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    marginBottom: 10,
                  }}>
                  Filter Room
                </Text>

                {/* Keep rest of your fields like Room Type, Status, etc... here as they are */}
                {/* Room Type */}
                <Text style={{fontSize: 16, fontWeight: '600', marginTop: 10}}>
                  Room Type
                </Text>
                <View style={{flexDirection: 'row', marginTop: 8}}>
                  {['Single', 'Double'].map(type => (
                    <TouchableOpacity
                      key={type}
                      style={{
                        flex: 1,
                        padding: 10,
                        marginHorizontal: 4,
                        borderRadius: 8,
                        backgroundColor:
                          selectedRoomType === type ? '#5B7CE9' : '#eee',
                      }}
                      onPress={() => setSelectedRoomType(type)}>
                      <Text
                        style={{
                          textAlign: 'center',
                          color: selectedRoomType === type ? '#fff' : '#000',
                        }}>
                        {type}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* Status */}
                <Text style={{fontSize: 16, fontWeight: '600', marginTop: 20}}>
                  Status
                </Text>
                <View style={{flexDirection: 'row', marginTop: 8}}>
                  {['Vacant', 'Occupied'].map(status => (
                    <TouchableOpacity
                      key={status}
                      style={{
                        flex: 1,
                        padding: 10,
                        marginHorizontal: 4,
                        borderRadius: 8,
                        backgroundColor:
                          selectedStatus === status ? '#5B7CE9' : '#eee',
                      }}
                      onPress={() => setSelectedStatus(status)}>
                      <Text
                        style={{
                          textAlign: 'center',
                          color: selectedStatus === status ? '#fff' : '#000',
                        }}>
                        {status}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* Rent Type */}
                <Text style={{fontSize: 16, fontWeight: '600', marginTop: 20}}>
                  Rent Type
                </Text>
                <View style={{flexDirection: 'row', marginTop: 8}}>
                  {['Monthly', 'PerDay'].map(rent => (
                    <TouchableOpacity
                      key={rent}
                      style={{
                        flex: 1,
                        padding: 10,
                        marginHorizontal: 4,
                        borderRadius: 8,
                        backgroundColor:
                          selectedRentType === rent ? '#5B7CE9' : '#eee',
                      }}
                      onPress={() => setSelectedRentType(rent)}>
                      <Text
                        style={{
                          textAlign: 'center',
                          color: selectedRentType === rent ? '#fff' : '#000',
                        }}>
                        {rent}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* Floor Number Input */}
                <Text style={{fontWeight: '600', marginTop: 10}}>
                  Floor Number
                </Text>
                <TextInput
                  placeholder="Enter Floor Number 0 to 3"
                  placeholderTextColor={'#ccc'}
                  value={floorNumber}
                  onChangeText={setFloorNumber}
                  style={{
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 6,
                    padding: 8,
                    marginTop: 5,
                  }}
                  keyboardType="numeric"
                />

                {/* Room Number Input */}
                <Text style={{fontWeight: '600', marginTop: 10}}>
                  Room Number
                </Text>
                <TextInput
                  placeholder="Enter Room Number"
                  placeholderTextColor={'#ccc'}
                  value={roomNumber}
                  onChangeText={setRoomNumber}
                  style={{
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 6,
                    padding: 8,
                    marginTop: 5,
                  }}
                  keyboardType="numeric"
                />

                {/* Capacity Input */}
                <Text style={{fontWeight: '600', marginTop: 10}}>
                  Capacity (persons)
                </Text>
                <TextInput
                  placeholder="Enter Capacity (persons)"
                  placeholderTextColor={'#ccc'}
                  value={capacity}
                  onChangeText={setcapacity}
                  style={{
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 6,
                    padding: 8,
                    marginTop: 5,
                  }}
                  keyboardType="numeric"
                />

                {/* Rent Amount (₹/month) */}
                <Text style={{fontWeight: '600', marginTop: 10}}>
                  Rent Amount (₹/month)
                </Text>
                <TextInput
                  placeholder="Enter Rent Amount (₹/month)"
                  placeholderTextColor={'#ccc'}
                  value={roomAmountNumber}
                  onChangeText={setRoomAmountNumber}
                  style={{
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 6,
                    padding: 8,
                    marginTop: 5,
                  }}
                  keyboardType="numeric"
                />

                {/* select Filled */}
                <Text style={{fontWeight: '600', marginTop: 20}}>
                  Amenities
                </Text>
                <MultiSelect
                  style={{
                    borderColor: isFocus ? '#5B7CE9' : '#ccc',
                    borderWidth: 1,
                    borderRadius: 8,
                    paddingHorizontal: 10,
                    paddingVertical: 8,
                    marginTop: 12,
                  }}
                  placeholderStyle={{color: '#aaa'}}
                  selectedTextStyle={{color: '#000'}}
                  inputSearchStyle={{
                    height: 40,
                    borderColor: '#ccc',
                    borderWidth: 1,
                    paddingLeft: 10,
                    borderRadius: 6,
                  }}
                  iconStyle={{tintColor: '#5B7CE9'}}
                  activeColor="#5B7CE9"
                  data={amenitiesData.map(item => ({
                    label: item.name,
                    value: item.id,
                  }))}
                  labelField="label"
                  valueField="value"
                  placeholder="Select Amenities"
                  value={Amenities}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={item => {
                    setAmenities(item);
                  }}
                  selectedStyle={{
                    borderRadius: 12,
                    backgroundColor: '#5B7CE9',
                    padding: 6,
                    margin: 4,
                  }}
                  maxHeight={300}
                  search
                  showsVerticalScrollIndicator={false}
                />

                {/* Cancel / Apply */}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    marginTop: 30,
                  }}>
                  <TouchableOpacity onPress={() => setIsFiltter(false)}>
                    <Text style={{marginRight: 20, color: '#999'}}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setIsFiltter(false);
                      handalSubmitData();
                    }}>
                    <Text style={{color: '#5B7CE9', fontWeight: 'bold'}}>
                      Apply
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      <Modal
        transparent
        animationType="fade"
        visible={modalNewUpdate}
        onRequestClose={() => setModalNewUpdate(false)}>
        <View
          style={{
            width: screenWidth * 0.9,
            height: 'auto',
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
                  Capacity : {bookedBeds}/{totalBeds}
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
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
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
  TextBox: {
    width: screenWidth * 0.9,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: moderateScale(10),
    padding: moderateScale(12),
    marginBottom: moderateScale(10),
  },
  filterText: {
    fontSize: moderateScale(16),
    color: Colors.WHITE,
    marginBottom: 5,
    fontWeight: '500',
  },

  filterLabel: {
    fontSize: moderateScale(14),
    color: '#666',
    fontWeight: '600',
    marginBottom: 2,
  },

  filterValue: {
    fontSize: moderateScale(16),
    color: '#111',
    fontWeight: '500',
  },
});
