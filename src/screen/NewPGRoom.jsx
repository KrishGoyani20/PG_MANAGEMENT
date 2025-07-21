import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RFValue} from 'react-native-responsive-fontsize';
import {Fonts} from '../utils/Theme';
import {Images} from '../assets/image/image';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {useNavigation} from '@react-navigation/native';
import {screenWidth} from '../utils/Metrics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createRoom} from '../server/Api';

const Colors = {
  BACKGROUND: '#f5f5ef',
  PRIMARY: '#046d92',
  ALERT: '#a6252c',
  CARD: '#ffffff',
  SOFT_CARD: '#f1f2f2',
  WHITE: '#ffffff',
  GRAY85: '#d3d3d3',
  BLACK: '#000000',
};

const NewPGRoom = ({route}) => {
  const navigation = useNavigation();

  const {RoomsList = [], type = 'pg'} = route?.params || {};

  const [SelectFacelities, setSelectFacelities] = useState([]);
  const [Floor, setFloor] = useState('');
  const [RoomNum, setRoomNum] = useState('');
  const [Person, setPerson] = useState('');
  const [Amount, setAmount] = useState('');
  const [Description, setDescription] = useState('');

  const [cannotSelect, setCannotSelect] = useState([]);

  const FacelitiesData = [
    {id: 1, icon: Images.Cooler, Text: 'Cooler'},
    {id: 2, icon: Images.TV, Text: 'TV'},
    {id: 3, icon: Images.Curtains, Text: 'Curtains'},
    {id: 4, icon: Images.AC, Text: 'AC'},
    {id: 5, icon: Images.TableChair, Text: 'Table Chair'},
    {id: 6, icon: Images.Almirah, Text: 'Almirah'},
    {id: 7, icon: Images.Washroom, Text: 'Washroom'},
    {id: 8, icon: Images.Bed, Text: 'Bed'},
    {id: 9, icon: Images.Mattress, Text: 'Mattress'},
    {id: 10, icon: Images.WiFi, Text: 'WiFi'},
    {id: 11, icon: Images.Fan, Text: 'Fan'},
    {id: 12, icon: Images.Geyser, Text: 'Geyser'},
    {id: 13, icon: Images.Refrigerator, Text: 'Refrigerator'},
    {id: 14, icon: Images.Cupboard, Text: 'Cupboard'},
  ];

  const AddFacelitiesFun = Text => {
    if (cannotSelect.includes(Text)) return;
    setSelectFacelities(prev =>
      prev.includes(Text) ? prev.filter(item => item !== Text) : [...prev, Text],
    );
  };

  const handalAddRoom = async () => {
    console.log('Adding Room via API');

    // ✅ Validate first!
    if (!Floor.trim() || !Amount.trim()) {
      Alert.alert(
        'Validation Error',
        'Please enter Floor number and Rent Amount.',
      );
      return;
    }

    try {
      const userData = await AsyncStorage.getItem('user');
      const parsedUser = JSON.parse(userData);
      const token = parsedUser?.token;
      // token = `Bearer ${token}`
      console.log('add new room', token);
      console.log(typeof token);
      
      
      if (!token) {
        Alert.alert('Error', 'User not authenticated');
        return;
      }

      // ✅ Safe parsing — fallback to null if NaN
      const floorNumber = parseInt(Floor.trim());
      const rentAmount = parseFloat(Amount.trim());
      const roomCapacity = parseInt(Person.trim()) || 1;

      if (isNaN(floorNumber) || isNaN(rentAmount)) {
        Alert.alert('Validation Error', 'Floor or Rent is not a valid number.');
        return;
      }

      const newRoom = { 
        floorNumber: floorNumber,
        roomNumber: RoomNum.trim(),
        capacity: roomCapacity,
        rentAmount: rentAmount,
        description: Description.trim(),
        amenities: SelectFacelities,
        type: type,
      };

      console.log('Room Payload:', newRoom);

      const response = await createRoom(token, newRoom);

      console.log('Room Created Response:', response);

      if (response.success) {
        Alert.alert('Success', 'Room created successfully!');
        navigation.navigate('RoomsScreen');
      } else {
        console.log('Server rejected:', response);
        Alert.alert('Error', response.error || 'Something went wrong');
      }
    } catch (error) {
      console.error('Catch Error:', error);
      const backendError = error?.response?.data?.error;
      const message =
        backendError || error.error || error.message || 'Something went wrong';
      Alert.alert('Error', message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={{
            width: 24,
            height: 24,
          }}
          onPress={() => navigation.goBack()}>
          <FontAwesome6
            name="arrow-left"
            size={RFValue(16)}
            color={Colors.PRIMARY}
          />
        </TouchableOpacity>
        <Text
          style={[
            styles.ScreenText,
            {
              flex: 1,
              textAlign: 'center',
              justifyContent: 'center',
            },
          ]}>
          Add New : {type === 'pg' ? 'PG Room' : 'Dormitory'}
        </Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 50}}>
        <View style={{marginVertical: 15}}>
          <View>
            <Text style={styles.NormalText}>Floor Number</Text>
            <TextInput
              style={styles.inputField}
              placeholder="Floor"
              placeholderTextColor={Colors.BLACK}
              value={Floor}
              keyboardType="numeric"
              onChangeText={setFloor}
            />
          </View>

          <View>
            <Text style={styles.NormalText}>Room Number</Text>
            <TextInput
              style={styles.inputField}
              placeholder="Room Number"
              placeholderTextColor={Colors.BLACK}
              keyboardType="numeric"
              value={RoomNum}
              onChangeText={setRoomNum}
            />
          </View>

          <View>
            <Text style={styles.NormalText}>Capacity (Persons)</Text>
            <TextInput
              style={styles.inputField}
              placeholder="Persons"
              placeholderTextColor={Colors.BLACK}
              keyboardType="numeric"
              value={Person}
              onChangeText={setPerson}
            />
          </View>

          <View>
            <Text style={styles.NormalText}>Rent Amount (₹/month)</Text>
            <TextInput
              style={styles.inputField}
              placeholder="Rent Amount"
              placeholderTextColor={Colors.BLACK}
              keyboardType="numeric"
              value={Amount}
              onChangeText={setAmount}
            />
          </View>
        </View>
        <View
          style={[
            styles.Flex,
            {justifyContent: 'space-between', marginVertical: 10},
          ]}>
          <Text style={styles.ScreenText}>Amenities</Text>
          <TouchableOpacity style={styles.Box}>
            <AntDesign name="plus" size={RFValue(16)} color={Colors.PRIMARY} />
            <Text style={styles.NormalText}>Add Custom</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.Flex}>
          <FlatList
            contentContainerStyle={styles.FlexBox}
            data={FacelitiesData}
            numColumns={3}
            keyExtractor={item => `${item.id}`}
            renderItem={({item}) => {
              const isBlocked = cannotSelect.includes(item.id);
              const isSelected = SelectFacelities.includes(item.id);

              return (
                <TouchableOpacity
                  disabled={isBlocked}
                  style={[
                    styles.Box,
                    {
                      backgroundColor: isBlocked
                        ? '#ccc'
                        : isSelected
                        ? Colors.PRIMARY
                        : Colors.BACKGROUND,
                      opacity: isBlocked ? 0.5 : 1,
                    },
                  ]}
                  onPress={() => AddFacelitiesFun(item.Text)}>
                  <Image
                    source={item.icon}
                    style={styles.BoxIcon}
                    tintColor={
                      isBlocked ? 'gray' : isSelected ? Colors.WHITE : null
                    }
                  />
                  <Text
                    style={[
                      styles.NormalText,
                      {
                        color: isBlocked
                          ? 'gray'
                          : isSelected
                          ? Colors.WHITE
                          : Colors.PRIMARY,
                      },
                    ]}>
                    {item.Text}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
        <View style={{marginVertical: 10}}>
          <Text style={[styles.ScreenText]}>Description</Text>
          <TextInput
            style={[styles.inputField, styles.Desc]}
            placeholder="Description"
            placeholderTextColor={Colors.BLACK}
            multiline={true}
            value={Description}
            onChangeText={setDescription}
            numberOfLines={10}
          />
        </View>
        <TouchableOpacity style={styles.BTN} onPress={handalAddRoom}>
          <Text style={[styles.NormalText, {color: Colors.WHITE}]}>
            Add Room
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewPGRoom;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
    padding: 15,
  },
  ScreenText: {
    fontSize: RFValue(18),
    fontWeight: '600',
    color: Colors.PRIMARY,
  },
  inputField: {
    width: '100%',
    borderWidth: 1,
    marginVertical: 10,
    borderRadius: 7,
    paddingHorizontal: 15,
    borderColor: Colors.PRIMARY,
    color: Colors.PRIMARY,
    fontWeight: '400',
    fontSize: RFValue(12),
    letterSpacing: 0.5,
  },
  NormalText: {
    fontSize: RFValue(12),
    fontWeight: '500',
    color: Colors.PRIMARY,
  },
  Box: {
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 7,
    backgroundColor: Colors.CARD,
  },
  Flex: {
    width: screenWidth * 0.9,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  FlexBox: {
    width: screenWidth,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    rowGap: 10,
  },
  BoxIcon: {
    width: 25,
    height: 25,
  },
  Desc: {
    height: 100,
    textAlignVertical: 'top',
  },
  BTN: {
    backgroundColor: Colors.PRIMARY,
    height: RFValue(35),
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// const handalAddRoom = () => {
//   console.log('Adding Room. Old Rooms:', RoomsList);

//   const newRoom = {
//     SelectFacelities,
//     Floor,
//     RoomNum,
//     Person,
//     Amount,
//     Description,
//     FacelitiesData,
//     type, // ✅ IMPORTANT!
//   };

//   navigation.navigate('RoomsScreen', {
//     RoomsList: [...RoomsList, newRoom],
//     type: type, // ✅ pass same type back!
//   });
// };
