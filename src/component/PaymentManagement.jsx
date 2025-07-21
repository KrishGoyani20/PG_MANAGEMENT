import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RFValue} from 'react-native-responsive-fontsize';
import {Calendar} from 'react-native-calendars';
import {Images} from '../assets/image/image';
import PGManagment from '../component/PGManagement';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';

export const Colors = {
  WHITEDARK: '#F5f5ef',
  WHITELITE: '#F1f2f2',
  BLUELITE: '#046d92',
  REDLITE: '#a6252c',
  BLACK: '#000000',
  GRAY44: '#808080',
  GRAY: '#d3d3d3',
};

export default function PaymentManagament() {
  const {navigate} = useNavigation();
  const [NextStep, setNextStep] = useState(false);
  const [DailyRent, setDailyRent] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [markedDates, setMarkedDates] = useState({});
  const [totalRent, setTotalRent] = useState(0);
  const [Replacement, setReplacement] = useState('');

  const handleDateSelect = day => {
    const selectedDate = day.dateString;

    // First date select
    if (!startDate || (startDate && endDate)) {
      setStartDate(selectedDate);
      setEndDate(null);
      setMarkedDates({
        [selectedDate]: {
          startingDay: true,
          endingDay: true,
          color: '#70d7c7',
          textColor: 'white',
        },
      });
      // Reset totalRent if only one date selected
      setTotalRent(0);
    } else {
      const range = getDateRange(startDate, selectedDate);
      const rangeObject = {};

      range.forEach((date, index) => {
        if (index === 0) {
          rangeObject[date] = {
            startingDay: true,
            color: '#70d7c7',
            textColor: 'white',
          };
        } else if (index === range.length - 1) {
          rangeObject[date] = {
            endingDay: true,
            color: '#70d7c7',
            textColor: 'white',
          };
        } else {
          rangeObject[date] = {
            color: '#95e9da',
            textColor: 'white',
          };
        }
      });

      setEndDate(selectedDate);
      setMarkedDates(rangeObject);

      // ✅ Calculate total rent if daily rent exists
      if (range.length > 0 && DailyRent) {
        const days = range.length;
        const rent = parseInt(DailyRent) * days;
        setTotalRent(rent);
      }
    }
  };

  // Helper: Get all dates in range
  const getDateRange = (start, end) => {
    const range = [];
    let current = moment(start);
    const last = moment(end);

    if (current.isAfter(last)) {
      [current, last] = [last, current];
    }

    while (current <= last) {
      range.push(current.format('YYYY-MM-DD'));
      current.add(1, 'days');
    }

    return range;
  };

  return (
    <SafeAreaView style={styles.container}>
      {NextStep ? (
        <PGManagment />
      ) : (
        <ScrollView style={{flex: 1}}>
          <View style={styles.PaymentBox}>
            <Text style={styles.Heading}>Payment Management</Text>

            <View>
              <Text style={styles.TitleText}>Accommodation Type</Text>
              <TextInput
                style={styles.TextInput}
                value="Dormitory"
                editable={false}
              />
            </View>

            <View style={{marginTop: 10}}>
              <Text style={[styles.TitleText, {marginVertical: 5}]}>
                Daily Rent (₹)
              </Text>
              <TextInput
                style={styles.TextInput}
                value={DailyRent}
                keyboardType="numeric"
                onChangeText={setDailyRent}
                placeholder="Enter Daily Rent"
                placeholderTextColor={Colors.BLUELITE}
              />
            </View>

            <View>
              <Text style={[styles.TitleText, {padding: 10}]}>
                CheckIn & CheckOut
              </Text>
              <Calendar
                markingType={'period'}
                markedDates={markedDates}
                onDayPress={handleDateSelect}
              />
            </View>

            <Text style={styles.RentText}>Total Rent: {totalRent}</Text>

            <View style={styles.BoxTime}>
              <Text style={[styles.TitleText, {color: Colors.BLACK}]}>
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
                  Original Refundable Amount:
                </Text>
                <Text style={styles.NormalText}>₹200</Text>
              </View>
              <View style={styles.flex}>
                <Text style={styles.NormalText}>Late Fee Deducted:</Text>
                <Text style={styles.NormalText}>₹0</Text>
              </View>
              <View style={styles.flex}>
                <Text style={styles.NormalText}>Lock Replacement Fee:</Text>
                <Text style={styles.NormalText}>₹0</Text>
              </View>
              <View
                style={[
                  styles.flex,
                  {borderTopWidth: 1, borderColor: Colors.GRAY},
                ]}>
                <Text style={[styles.NormalText, {paddingTop: 10}]}>
                  Total Refundable Amount:
                </Text>
                <Text style={styles.NormalText}>₹200</Text>
              </View>
            </View>

            <View style={styles.LASTBOX}>
              <Text style={[styles.TitleText, {color: Colors.BLACK}]}>
                Lock Replacement Fee
              </Text>
              <TextInput
                style={[styles.TextInput, {marginTop: 10}]}
                placeholder="Enter amount"
                placeholderTextColor={Colors.GRAY44}
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
                <Text style={[styles.TitleText, {color: Colors.BLACK}]}>
                  Lock lost by tenant.
                </Text>
              </View>
            </View>

            <View style={{flexDirection: 'row', gap: 10, marginTop: 10}}>
              <TouchableOpacity
                style={styles.BTN}
                onPress={() => navigate('DRManagement')}>
                <Text style={styles.BtnText}>Finalize Payment</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.BTN}>
                <Text style={styles.BtnText}>Calculate Due</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.BTN,
                  {
                    backgroundColor: 'transparent',
                    borderWidth: 1,
                    borderColor: Colors.BLUELITE,
                  },
                ]}>
                <Text style={[styles.BtnText, {color: Colors.BLUELITE}]}>
                  Cancel
                </Text>
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
    backgroundColor: Colors.WHITEDARK,
  },
  PaymentBox: {
    width: '95%',
    alignSelf: 'center',
    backgroundColor: Colors.WHITELITE,
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  Heading: {
    color: Colors.BLUELITE,
    fontSize: RFValue(16),
    fontWeight: '700',
    marginBottom: 15,
  },
  TitleText: {
    color: Colors.BLACK,
    fontWeight: '500',
    fontSize: RFValue(12),
  },
  TextInput: {
    backgroundColor: Colors.WHITEDARK,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: Colors.BLUELITE,
    color: Colors.BLUELITE,
    padding: 10,
    marginTop: 5,
  },
  RentText: {
    fontSize: RFValue(12),
    color: Colors.BLACK,
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
    backgroundColor: Colors.WHITEDARK,
  },
  ColorBox: {
    backgroundColor: '#08b10865',
    width: '60%',
    alignSelf: 'center',
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
    backgroundColor: Colors.WHITEDARK,
    marginTop: 10,
    borderRadius: 7,
  },
  NormalText: {
    fontSize: RFValue(11),
    fontWeight: '500',
    color: Colors.BLACK,
  },
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  LASTBOX: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: Colors.WHITEDARK,
    marginTop: 10,
    borderRadius: 7,
  },
  BTN: {
    backgroundColor: Colors.BLUELITE,
    borderRadius: 7,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  BtnText: {
    color: Colors.WHITELITE,
    fontWeight: '600',
    fontSize: RFValue(12),
  },
});
