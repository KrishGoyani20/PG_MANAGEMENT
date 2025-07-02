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
import {Colors, Fonts} from '../utils/Theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RFValue} from 'react-native-responsive-fontsize';
import {Calendar} from 'react-native-calendars';
import {Images} from '../assets/image/image';
import PGManagment from '../component/PGManagement';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import {screenWidth} from '../utils/Metrics';

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
                keyboardType="numeric"
                value={DailyRent}
                onChangeText={text => {
                  setDailyRent(text);

                  // Recalculate if dates selected
                  if (startDate && endDate) {
                    const range = getDateRange(startDate, endDate);
                    const days = range.length;
                    const rent = parseInt(text) * days;
                    setTotalRent(rent);
                  }
                }}
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

            <Text style={styles.RentText}>Total Rent: ₹{totalRent}</Text>

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
                  Original Refundable Amount:
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
  container: {flex: 1, backgroundColor: Colors.GUNMETAL},
  PaymentBox: {
    width: screenWidth,
    marginHorizontal: 'auto',
    backgroundColor: 'gray',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 7,
  },
  Heading: {
    textAlign: 'center',
    color: Colors.WHITE,
    fontSize: 24,
    fontWeight: '500',
    fontFamily: Fonts.POPPINS_REGULAR,
    marginVertical: 15,
  },
  TitleText: {color: Colors.WHITE, fontWeight: '500', fontSize: RFValue(12)},
  TextInput: {
    backgroundColor: Colors.WHITE,
    borderRadius: 7,
    width: '90%',
    paddingHorizontal: 10,
  },
  RentText: {
    fontSize: RFValue(16),
    color: Colors.WHITE,
    fontWeight: '700',
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
  NormalText: {fontSize: RFValue(11), fontWeight: '500', color: Colors.BLACK},
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
  flex: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
});

// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   Modal,
//   TouchableOpacity,
//   Image,
//   ScrollView,
// } from 'react-native';
// import React, {use, useState} from 'react';
// import {Colors, Fonts} from '../utils/Theme';
// import {SafeAreaView} from 'react-native-safe-area-context';
// import {RFValue} from 'react-native-responsive-fontsize';
// import {Dropdown} from 'react-native-element-dropdown';
// import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
// import {Images} from '../assets/image/image';
// import PGManagment from '../component/PGManagement';
// import moment from 'moment';
// import {useNavigation} from '@react-navigation/native';

// export default function PaymentManagament() {
//   const {navigate} = useNavigation();

//   const [value, setValue] = useState(null);
//   const [NextStep, setNextStep] = useState(false);
//   const [calendarVisible, setCalendarVisible] = useState(false);
//   const [calendarVisible1, setCalendarVisible1] = useState(false);
//   const [isFocus, setIsFocus] = useState(false);
//   const [DailyRent, setDailyRent] = useState('');
//   const [CheckIn, setCheckIn] = useState('');
//   const [CheckOut, setCheckOut] = useState('');
//   const [Replacement, setReplacement] = useState('');
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const [markedDates, setMarkedDates] = useState({});
//   const [totalRent, setTotalRent] = useState(0);

//   const handleDateSelect = day => {
//     const selectedDate = day.dateString;

//     // First date select
//     if (!startDate || (startDate && endDate)) {
//       setStartDate(selectedDate);
//       setEndDate(null);
//       setMarkedDates({
//         [selectedDate]: {
//           startingDay: true,
//           endingDay: true,
//           color: '#70d7c7',
//           textColor: 'white',
//         },
//       });
//     }
//     // Second date select
//     else {
//       const range = getDateRange(startDate, selectedDate);
//       const rangeObject = {};

//       range.forEach((date, index) => {
//         if (index === 0) {
//           rangeObject[date] = {
//             startingDay: true,
//             color: '#70d7c7',
//             textColor: 'white',
//           };
//         } else if (index === range.length - 1) {
//           rangeObject[date] = {
//             endingDay: true,
//             color: '#70d7c7',
//             textColor: 'white',
//           };
//         } else {
//           rangeObject[date] = {
//             color: '#95e9da',
//             textColor: 'white',
//           };
//         }
//       });

//       setStartDate(startDate);
//       setEndDate(selectedDate);
//       setMarkedDates(rangeObject);
//     }
//   };

//   // Get all dates between two dates
//   const getDateRange = (start, end) => {
//     const range = [];
//     let current = moment(start);
//     const last = moment(end);

//     console.log(current, last);

//     if (current.isAfter(last)) {
//       [current, last] = [last, current]; // swap if start > end
//     }

//     while (current <= last) {
//       range.push(current.format('YYYY-MM-DD'));
//       current.add(1, 'days');
//     }

//     return range;
//   };
//   const data = [
//     {label: 'Dormitory', value: 'Dormitory'},
//     {label: 'PG Rent Management', value: 'PG Rent Management'},
//   ];

//   // const handleDateSelect = (day) => {
//   //     // const [year, month, date] = day.dateString.split('-');
//   //     setCheckIn(day.dateString)
//   //     // const formattedDate = `${date}-${month}-${year}`; // DD-MM-YYYY
//   //     setCalendarVisible(false); // close calendar

//   // };
//   return (
//     <SafeAreaView style={styles.container}>
//       {NextStep ? (
//         <PGManagment />
//       ) : (
//         <ScrollView style={{flex: 1}}>
//           <View style={styles.PaymentBox}>
//             <Text style={styles.Heading}>Payment Management</Text>
//             <View>
//               <Text style={styles.TitleText}>Accommodation Type</Text>
//               <TextInput style={styles.TextInput} value="Dormitory" />
//             </View>
//             <View style={{marginTop: 10}}>
//               <Text style={[styles.TitleText, {marginVertical: 5}]}>
//                 Daily Rent (₹)
//               </Text>
//               <TextInput
//                 style={styles.TextInput}
//                 value={DailyRent}
//                 keyboardType="numeric"
//                 onChangeText={text => {
//                   setDailyRent(text);

//                   // If dates selected, update total rent too
//                   if (startDate && endDate) {
//                     const range = getDateRange(startDate, endDate);
//                     const days = range.length;
//                     const rent = parseInt(text) * days;
//                     setTotalRent(rent);
//                   }
//                 }}
//               />
//             </View>

//             <View>
//               <Text style={[styles.TitleText, {padding: 10}]}>
//                 CheckIn & CheckOut
//               </Text>
//               <Calendar
//                 markingType={'period'}
//                 markedDates={markedDates}
//                 onDayPress={handleDateSelect}
//               />

//               {/* <View style={{ width: '45%' }}>
//                         <Text style={[styles.TitleText, { width: '100%', textAlign: 'center' }]}>Check-in Date</Text>
//                         <TouchableOpacity style={styles.HalfWidth} onPress={() => setCalendarVisible(true)}>
//                             <Text>{CheckIn}</Text>
//                         </TouchableOpacity>
//                     </View>
//                     <View style={{ width: '45%' }}>
//                         <Text style={[styles.TitleText, { width: '100%', textAlign: 'center' }]}>Check-out Date</Text>
//                         <TouchableOpacity style={styles.HalfWidth} onPress={() => setCalendarVisible1(true)}>
//                             <Text>{CheckOut}</Text>
//                         </TouchableOpacity>
//                     </View> */}
//             </View>
//             <Text style={styles.RentText}>Total Rent: 0</Text>

//             <View style={styles.BoxTime}>
//               <Text style={[styles.TitleText, {color: 'black'}]}>
//                 Grace Period
//               </Text>

//               <View style={styles.ColorBox}>
//                 <Text style={styles.TimerText}>45:00</Text>
//               </View>
//             </View>
//             <View style={styles.AmountBox}>
//               <Text style={[styles.TitleText, {color: Colors.BLACK}]}>
//                 Refundable Amount
//               </Text>
//               <View style={styles.flex}>
//                 <Text style={styles.NormalText}>
//                   Original Refundable Amoun:
//                 </Text>
//                 <Text style={styles.NormalText}>₹{totalRent}</Text>
//               </View>
//               <View style={styles.flex}>
//                 <Text style={styles.NormalText}>Late Fee Deducted</Text>
//                 <Text style={styles.NormalText}> ₹0</Text>
//               </View>
//               <View style={styles.flex}>
//                 <Text style={styles.NormalText}>Lock Replacement Fee</Text>
//                 <Text style={styles.NormalText}>₹0</Text>
//               </View>
//               <View
//                 style={[
//                   styles.flex,
//                   {borderTopWidth: 1, borderColor: '#d3d1d1'},
//                 ]}>
//                 <Text style={[styles.NormalText, {paddingTop: 10}]}>
//                   Total Refundable Amount:
//                 </Text>
//                 <Text style={styles.NormalText}>₹{totalRent}</Text>
//               </View>
//             </View>
//             <View style={styles.LASTBOX}>
//               <Text style={[styles.TitleText, {color: 'black'}]}>
//                 Lock Replacement Fee
//               </Text>
//               <TextInput
//                 style={[
//                   styles.TextInput,
//                   {borderWidth: 1, paddingHorizontal: 10, marginTop: 10},
//                 ]}
//                 placeholder="Lock lost by tenant."
//                 value={Replacement}
//                 onChangeText={setReplacement}
//               />
//               <View
//                 style={{
//                   flexDirection: 'row',
//                   alignItems: 'center',
//                   gap: 10,
//                   marginTop: 10,
//                 }}>
//                 <Image
//                   source={Images.Warnings}
//                   style={{width: 20, height: 20}}
//                 />
//                 <Text style={[styles.TitleText, {color: 'black'}]}>
//                   Lock lost by tenant.
//                 </Text>
//               </View>
//             </View>
//             <View style={{flexDirection: 'row', gap: 10, marginTop: 10}}>
//               <TouchableOpacity
//                 style={styles.BTN}
//                 onPress={() => navigate('DRManagement')}>
//                 <Text style={styles.TitleText}>Finalize Payment</Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.BTN}>
//                 <Text style={styles.TitleText}>Calculate Due</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={[
//                   styles.BTN,
//                   {
//                     backgroundColor: 'transparent',
//                     borderWidth: 1,
//                     borderColor: 'white',
//                   },
//                 ]}>
//                 <Text style={styles.TitleText}>Cancel</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </ScrollView>
//       )}
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors.GUNMETAL,
//   },
//   PaymentBox: {
//     width: '95%',
//     marginHorizontal: 'auto',
//     backgroundColor: 'gray',
//     paddingVertical: 10,
//     paddingHorizontal: 15,
//     borderRadius: 7,
//   },
//   Heading: {
//     color: Colors.WHITE,
//     fontSize: RFValue(15),
//     fontWeight: '500',
//     fontFamily: Fonts.POPPINS_REGULAR,
//     marginVertical: 15,
//   },
//   dropdown: {
//     width: '90%',
//     marginTop: 10,
//     padding: 10,
//     backgroundColor: Colors.WHITE,
//     borderRadius: 7,
//   },
//   selectedTextStyle: {
//     color: Colors.BLACK,
//   },
//   TitleText: {
//     color: Colors.WHITE,
//     fontWeight: '500',
//     fontSize: RFValue(12),
//   },
//   TextInput: {
//     backgroundColor: Colors.WHITE,
//     borderRadius: 7,
//     width: '90%',
//   },
//   CHECKIN: {
//     backgroundColor: Colors.WHITE,
//     height: RFValue(35),
//     borderRadius: 7,
//     marginTop: 15,
//   },
//   HalfWidth: {
//     width: '100%',
//     height: RFValue(30),
//     backgroundColor: Colors.WHITE,
//     borderRadius: 7,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalBackground: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   calendarContainer: {
//     width: '80%',
//     borderRadius: 7,
//   },
//   flex: {
//     width: '100%',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: 15,
//   },
//   RentText: {
//     fontSize: RFValue(12),
//     color: Colors.WHITE,
//     fontWeight: '500',
//     marginTop: 10,
//   },
//   BoxTime: {
//     marginTop: 10,
//     borderWidth: 0.5,
//     borderColor: Colors.GRAY,
//     borderRadius: 7,
//     paddingVertical: 10,
//     paddingHorizontal: 15,
//     backgroundColor: Colors.WHITE,
//   },
//   ColorBox: {
//     backgroundColor: '#08b10865',
//     width: '60%',
//     marginHorizontal: 'auto',
//     marginTop: 10,
//     borderRadius: 7,
//   },
//   TimerText: {
//     fontSize: RFValue(18),
//     color: 'green',
//     fontWeight: '600',
//     textAlign: 'center',
//     paddingVertical: 15,
//   },
//   AmountBox: {
//     paddingVertical: 10,
//     paddingHorizontal: 15,
//     backgroundColor: Colors.WHITE,
//     marginTop: 10,
//     borderRadius: 7,
//   },
//   NormalText: {
//     fontSize: RFValue(11),
//     fontWeight: '500',
//     color: Colors.BLACK,
//   },
//   LASTBOX: {
//     paddingVertical: 10,
//     paddingHorizontal: 15,
//     backgroundColor: Colors.WHITE,
//     marginTop: 10,
//     borderRadius: 7,
//   },
//   BTN: {
//     backgroundColor: Colors.GRAY44,
//     borderRadius: 7,
//     paddingVertical: 10,
//     paddingHorizontal: 12,
//   },
// });
