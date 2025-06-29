import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Modal,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, {use, useState} from 'react';
import {Colors, Fonts} from '../utils/Theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RFValue} from 'react-native-responsive-fontsize';
import {Dropdown} from 'react-native-element-dropdown';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {Images} from '../assets/image/image';
import DRManagement from './DRManagement';
import {useNavigation} from '@react-navigation/native';

export default function PaymentManagement() {
  const {navigate} = useNavigation();

  const [value, setValue] = useState(null);
  const [NextStep, setNextStep] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [calendarVisible1, setCalendarVisible1] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [DailyRent, setDailyRent] = useState('');
  const [CheckIn, setCheckIn] = useState('');
  const [CheckOut, setCheckOut] = useState('');
  const [Replacement, setReplacement] = useState('');

  const data = [
    {label: 'Dormitory', value: 'Dormitory'},
    {label: 'PG Rent Management', value: 'PG Rent Management'},
  ];

  const handleDateSelect = day => {
    // const [year, month, date] = day.dateString.split('-');
    setCheckIn(day.dateString);
    // const formattedDate = `${date}-${month}-${year}`; // DD-MM-YYYY
    setCalendarVisible(false); // close calendar
  };
  return (
    <SafeAreaView style={styles.container}>
      {NextStep ? (
        <DRManagement />
      ) : (
        <ScrollView style={{flex: 1}}>
          <View style={styles.PaymentBox}>
            <Text style={styles.Heading}>Payment Management</Text>
            <View>
              <Text style={styles.TitleText}>Accommodation Type</Text>
              <TextInput style={styles.TextInput} value="Dormitory" />
            </View>
            <View style={{marginTop: 10}}>
              <Text style={[styles.TitleText, {marginVertical: 5}]}>
                Daily Rent (₹)
              </Text>
              <TextInput
                placeholder="Enter Rent"
                placeholderTextColor={'#ccc'}
                style={styles.TextInput}
                value={DailyRent}
                onChangeText={setDailyRent}
              />
            </View>

            <View>
              <Text style={[styles.TitleText, {padding: 10}]}>
                CheckIn & CheckOut
              </Text>
              <Calendar
                onDayPress={handleDateSelect}
                markedDates={{
                  [CheckIn]: {
                    selected: true,
                    selectedColor: '#00adf5',
                  },
                }}
              />

              {/* <View style={{ width: '45%' }}>
                        <Text style={[styles.TitleText, { width: '100%', textAlign: 'center' }]}>Check-in Date</Text>
                        <TouchableOpacity style={styles.HalfWidth} onPress={() => setCalendarVisible(true)}>
                            <Text>{CheckIn}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '45%' }}>
                        <Text style={[styles.TitleText, { width: '100%', textAlign: 'center' }]}>Check-out Date</Text>
                        <TouchableOpacity style={styles.HalfWidth} onPress={() => setCalendarVisible1(true)}>
                            <Text>{CheckOut}</Text>
                        </TouchableOpacity>
                    </View> */}
            </View>
            <Text style={styles.RentText}>Total Rent: 0</Text>

            <View style={styles.BoxTime}>
              <Text style={[styles.TitleText, {color: 'black'}]}>
                Grace Period
              </Text>

              <View style={styles.ColorBox}>
                <Text style={styles.TimerText}>45:00</Text>
              </View>
            </View>
            <View style={styles.AmountBox}>
              <Text style={[styles.TitleText, {color: Colors.BLACK}]}>
                Refundable Amount
              </Text>
              <View style={styles.flex}>
                <Text style={styles.NormalText}>
                  Original Refundable Amoun:
                </Text>
                <Text style={styles.NormalText}>₹200</Text>
              </View>
              <View style={styles.flex}>
                <Text style={styles.NormalText}>Late Fee Deducted</Text>
                <Text style={styles.NormalText}> ₹0</Text>
              </View>
              <View style={styles.flex}>
                <Text style={styles.NormalText}>Lock Replacement Fee</Text>
                <Text style={styles.NormalText}>₹0</Text>
              </View>
              <View
                style={[
                  styles.flex,
                  {borderTopWidth: 1, borderColor: '#d3d1d1'},
                ]}>
                <Text style={[styles.NormalText, {paddingTop: 10}]}>
                  Total Refundable Amount:
                </Text>
                <Text style={styles.NormalText}>₹200</Text>
              </View>
            </View>
            <View style={styles.LASTBOX}>
              <Text style={[styles.TitleText, {color: 'black'}]}>
                Lock Replacement Fee
              </Text>
              <TextInput
                style={[
                  styles.TextInput,
                  {borderWidth: 1, paddingHorizontal: 10, marginTop: 10},
                ]}
                placeholder="Lock lost by tenant."
                value={Replacement}
                onChangeText={setReplacement}
              />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                  marginTop: 10,
                }}>
                <Image
                  source={Images.Warnings}
                  style={{width: 20, height: 20}}
                />
                <Text style={[styles.TitleText, {color: 'black'}]}>
                  Lock lost by tenant.
                </Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', gap: 10, marginTop: 10}}>
              <TouchableOpacity
                style={styles.BTN}
                onPress={() => navigate('DRManagement')}>
                <Text style={styles.TitleText}>Finalize Payment</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.BTN}>
                <Text style={styles.TitleText}>Calculate Due</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.BTN,
                  {
                    backgroundColor: 'transparent',
                    borderWidth: 1,
                    borderColor: 'white',
                  },
                ]}>
                <Text style={styles.TitleText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.GUNMETAL,
  },
  PaymentBox: {
    width: '95%',
    marginHorizontal: 'auto',
    backgroundColor: 'gray',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 7,
  },
  Heading: {
    color: Colors.WHITE,
    fontSize: RFValue(15),
    fontWeight: '500',
    fontFamily: Fonts.POPPINS_REGULAR,
    marginVertical: 15,
  },
  dropdown: {
    width: '90%',

    marginTop: 10,
    padding: 10,
    backgroundColor: Colors.WHITE,
    borderRadius: 7,
  },
  selectedTextStyle: {
    color: Colors.BLACK,
  },
  TitleText: {
    color: Colors.WHITE,
    fontWeight: '500',
    fontSize: RFValue(12),
  },
  TextInput: {
    backgroundColor: Colors.WHITE,
    borderRadius: 7,
    width: '90%',
  },
  CHECKIN: {
    backgroundColor: Colors.WHITE,
    height: RFValue(35),
    borderRadius: 7,
    marginTop: 15,
  },
  HalfWidth: {
    width: '100%',
    height: RFValue(30),
    backgroundColor: Colors.WHITE,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarContainer: {
    width: '80%',
    borderRadius: 7,
  },
  flex: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  RentText: {
    fontSize: RFValue(12),
    color: Colors.WHITE,
    fontWeight: '500',
    marginTop: 10,
  },
  BoxTime: {
    marginTop: 10,
    borderWidth: 0.5,
    borderColor: Colors.GRAY,
    borderRadius: 7,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: Colors.WHITE,
  },
  ColorBox: {
    backgroundColor: '#08b10865',
    width: '60%',
    marginHorizontal: 'auto',
    marginTop: 10,
    borderRadius: 7,
  },
  TimerText: {
    fontSize: RFValue(18),
    color: 'green',
    fontWeight: '600',
    textAlign: 'center',
    paddingVertical: 15,
  },
  AmountBox: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: Colors.WHITE,
    marginTop: 10,
    borderRadius: 7,
  },
  NormalText: {
    fontSize: RFValue(11),
    fontWeight: '500',
    color: Colors.BLACK,
  },
  LASTBOX: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: Colors.WHITE,
    marginTop: 10,
    borderRadius: 7,
  },
  BTN: {
    backgroundColor: Colors.GRAY44,
    borderRadius: 7,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
});
