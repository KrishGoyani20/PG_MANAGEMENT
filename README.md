npm i react-native-responsive-screen
<<<<<<< HEAD
npm i react-native-modal
npm i react-native-file-picker
npm i react-native-date-picker



npm install react-native-element-dropdown

adb devices(with cable)
adb tcpip 5553 reply:- restarting in TCP mode port: 5553
adb connect 192.168.112.214:5553 reply:- connected to 192.168.112.214:5553




npm i react-native-otp-entry



snack bar use karva nu ke ne to aa install karva nu che okay

npm i react-native-snack     // snackbar 
npm i react-native-sms-retriever    // autofill otp
npm i react-native-text-recognition   // image se text fatch karne ke liye
npm i @twotalltotems/react-native-otp-input    // otp input ke liye

npm i @twotalltotems/react-native-otp-input // auto enter OTP





text local



https://www.textlocal.in/signup















<<<<<<< HEAD
Payment Management file code

import { View, Text, StyleSheet, TextInput, Modal, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { use, useState } from 'react'
import { Colors, Fonts } from '../utils/Theme'
import { SafeAreaView } from 'react-native-safe-area-context'
import { RFValue } from 'react-native-responsive-fontsize'
import { Dropdown } from 'react-native-element-dropdown';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { Images } from '../assets/image/image'
export default function PaymentManagament() {
    const [value, setValue] = useState(null);
    const [calendarVisible, setCalendarVisible] = useState(false);
    const [calendarVisible1, setCalendarVisible1] = useState(false);
    const [isFocus, setIsFocus] = useState(false)
    const [DailyRent, setDailyRent] = useState('');
    const [CheckIn, setCheckIn] = useState('');
    const [CheckOut, setCheckOut] = useState('')
    const [Replacement, setReplacement] = useState('')
    const data = [
        { label: "Dormitory", value: "Dormitory" },
        { label: "PG Rent Management", value: "PG Rent Management" },
    ];

    const handleDateSelect = (day) => {
        // const [year, month, date] = day.dateString.split('-');
        setCheckIn(day.dateString)
        // const formattedDate = `${date}-${month}-${year}`; // DD-MM-YYYY
        setCalendarVisible(false); // close calendar
        
    };
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={{flex:1}}>
            <View style={styles.PaymentBox}>
                <Text style={styles.Heading}>Payment Management</Text>
                <View>
                    <Text style={styles.TitleText}>Accommodation Type</Text>
                     <TextInput
                        style={styles.TextInput}
                        value='Dormitory'
                    />
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text style={styles.TitleText}>Daily Rent (₹)</Text>
                    <TextInput
                        style={styles.TextInput}
                        value={DailyRent}
                        onChangeText={setDailyRent}
                    />
                </View>

                <View >
                    <Text style={[styles.TitleText,{padding:10}]}>CheckIn & CheckOut</Text>
                    <Calendar
                        onDayPress={handleDateSelect}
                        
                        markedDates={{
                            [ CheckIn ]: {
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
                    <Text style={[styles.TitleText, { color: 'black' }]}>Grace Period</Text>

                    <View style={styles.ColorBox}>
                        <Text style={styles.TimerText}>45:00</Text>
                    </View>
                </View>
                <View style={styles.AmountBox}>
                    <Text style={[styles.TitleText, { color: Colors.BLACK }]}>Refundable Amount</Text>
                    <View style={styles.flex}>
                        <Text style={styles.NormalText}>Original Refundable Amoun:</Text>
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
                    <View style={[styles.flex, { borderTopWidth: 1, borderColor: '#d3d1d1', }]}>
                        <Text style={[styles.NormalText, { paddingTop: 10 }]}>Total Refundable Amount:</Text>
                        <Text style={styles.NormalText}>₹200</Text>
                    </View>
                </View>
                <View style={styles.LASTBOX}>
                    <Text style={[styles.TitleText, { color: 'black' }]}>Lock Replacement Fee</Text>
                    <TextInput
                        style={[styles.TextInput, { borderWidth: 1, paddingHorizontal: 10, marginTop: 10 }]}
                        placeholder='Lock lost by tenant.'
                        value={Replacement}
                        onChangeText={setReplacement}
                    />
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 10 }}>
                        <Image
                            source={Images.Warnings}
                            style={{ width: 20, height: 20 }}
                        />
                        <Text style={[styles.TitleText, { color: 'black', }]}>Lock lost by tenant.</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', gap: 10, marginTop: 10 }}>
                    <TouchableOpacity style={styles.BTN}>
                        <Text style={styles.TitleText}>Finalize Payment</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.BTN}>
                        <Text style={styles.TitleText}>Calculate Due</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.BTN, { backgroundColor: 'transparent', borderWidth: 1, borderColor: 'white' }]}>
                        <Text style={styles.TitleText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Modal
                transparent={true}
                visible={calendarVisible || calendarVisible1}
                animationType="slide"
                onRequestClose={() => { setCalendarVisible(false); setCalendarVisible1(false) }}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.calendarContainer}>
                        <Calendar
                            onDayPress={handleDateSelect}
                            markedDates={{
                                [calendarVisible ? CheckIn : CheckOut]: {
                                    selected: true,
                                    selectedColor: '#00adf5',
                                },
                            }}
                        />
                    </View>
                </View>
            </Modal>

            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.GUNMETAL
    },
    PaymentBox: {
        width: '95%',
        marginHorizontal: 'auto',
        backgroundColor: 'gray',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 7
    },
    Heading: {
        color: Colors.WHITE,
        fontSize: RFValue(15),
        fontWeight: '500',
        fontFamily: Fonts.POPPINS_REGULAR,
        marginVertical: 15
    },
    dropdown: {
        width: '90%',

        marginTop: 10,
        padding: 10,
        backgroundColor: Colors.WHITE,
        borderRadius: 7
    },
    selectedTextStyle: {
        color: Colors.BLACK
    },
    TitleText: {
        color: Colors.WHITE,
        fontWeight: '500',
        fontSize: RFValue(12),
    },
    TextInput: {
        backgroundColor: Colors.WHITE,
        borderRadius: 7,
        width: '90%'
    },
    CHECKIN: {
        backgroundColor: Colors.WHITE,
        height: RFValue(35),
        borderRadius: 7, marginTop: 15
    },
    HalfWidth: {
        width: '100%',
        height: RFValue(30),
        backgroundColor: Colors.WHITE,
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    calendarContainer: {
        width: '80%',
        borderRadius: 7
    },
    flex: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15
    },
    RentText: {
        fontSize: RFValue(12),
        color: Colors.WHITE,
        fontWeight: '500',
        marginTop: 10
    },
    BoxTime: {
        marginTop: 10,
        borderWidth: 0.5,
        borderColor: Colors.GRAY,
        borderRadius: 7,
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: Colors.WHITE
    },
    ColorBox: {
        backgroundColor: '#08b10865',
        width: '60%',
        marginHorizontal: 'auto',
        marginTop: 10,
        borderRadius: 7
    },
    TimerText: {
        fontSize: RFValue(18),
        color: 'green',
        fontWeight: '600',
        textAlign: 'center',
        paddingVertical: 15
    },
    AmountBox: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: Colors.WHITE,
        marginTop: 10,
        borderRadius: 7
    },
    NormalText: {
        fontSize: RFValue(11),
        fontWeight: "500",
        color: Colors.BLACK
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
        paddingHorizontal: 12
    }
})
=======





      <Modal
        transparent
        animationType="fade"
        visible={isFiltter}
        onRequestClose={() => setIsFiltter(false)}>
        <View
          style={{
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ScrollView
            style={{
              width: screenWidth * 0.9,
              backgroundColor: '#fff',
              borderRadius: 10,
              padding: 20,
            }}>
            {/* Header */}
            <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10}}>
              Filter Room
            </Text>

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
            <Text style={{fontWeight: '600', marginTop: 10}}>Floor Number</Text>
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
            <Text style={{fontWeight: '600', marginTop: 10}}>Room Number</Text>
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

            {/* Bed Number Input */}
            <Text style={{fontWeight: '600', marginTop: 10}}>Bed Number</Text>
            <TextInput
              placeholder="Enter Bed Number 1 to 12"
              placeholderTextColor={'#ccc'}
              value={bedNumber}
              onChangeText={setBedNumber}
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
            <Text style={{fontWeight: '600', marginTop: 20}}>Amenities</Text>
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
              <TouchableOpacity
                onPress={() => [setIsFiltter(false), {handalSubmitData}]}>
                <Text style={{marginRight: 20, color: '#999'}}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  // TODO: apply filter logic using selectedRoomType, selectedStatus, selectedRentType
                  setIsFiltter(false);
                  console.log(
                    selectedRentType,
                    selectedStatus,
                    selectedRoomType,
                    roomNumber,
                    bedNumber,
                  );
                }}>
                <Text style={{color: '#5B7CE9', fontWeight: 'bold'}}>
                  Apply
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Modal>
>>>>>>> 4f66fa1 (Some Cahnge on Filtter Room Screen.....!!!!K)
