import { StyleSheet, Text, TouchableOpacity, View, } from 'react-native'
import React from 'react'
import { Button } from 'react-native/types_generated/index'
import { Modal } from 'react-native/types_generated/index'
import { RFValue } from 'react-native-responsive-fontsize'
import { Colors } from '../utils/Theme'
import { useNavigation } from '@react-navigation/native'
import { screenHeight, screenWidth } from '../utils/Metrics'

const DRManagement = () => {
    const { navigate } = useNavigation();
    return (
        <View style={{ width: screenWidth, height: screenHeight, backgroundColor: '#999', justifyContent: 'center' }}>

            <View style={{ width: '90%', height: 300, borderRadius: 10, backgroundColor: 'white', alignItems: 'center', alignSelf: 'center', padding: 10 }}>
                <Text style={{ fontSize: 20, fontWeight: 600, textAlign: 'center', }}>Dormitory Rent Payment</Text>
                <Text style={{ fontSize: 16, fontWeight: 600, textAlign: 'center', color: Colors.BLUELITE }}>Rent: 200/day</Text>
                <View style={{
                    width: '95%',
                    justifyContent: 'center',
                    backgroundColor: '#FFF',
                    marginVertical: 10,
                    borderRadius: 10,
                    padding: 10,

                    // Shadow for iOS
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,

                    // Shadow for Android
                    elevation: 5,
                }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.Text}>Total Rent</Text>
                        <Text style={styles.Text}> ₹800</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.Text}>Advance Paid</Text>
                        <Text style={styles.Text}> ₹500</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.Text}>Remaining Balance</Text>
                        <Text style={styles.Text}> ₹800</Text>
                    </View>
                </View>

                <View style={{ width: '100%', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', }}>
                    <TouchableOpacity style={{
                        width: '45%',
                        height: 50,
                        backgroundColor: '#007BFF',
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginVertical: 10,
                    }}
                        onPress={() => navigate('NewTenants')}
                    >
                        <Text style={{ color: '#FFF', fontSize: 16, fontWeight: 'bold' }}>Pay Now</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        width: '45%',
                        height: 50,
                        backgroundColor: '#6C757D',
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }} onPress={() => navigate('RoomsScreen')}>
                        <Text style={{ color: '#FFF', fontSize: 16, fontWeight: 'bold' }}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default DRManagement

const styles = StyleSheet.create({
    Text: {
        fontSize: RFValue(14),
        fontWeight: '500',
        marginVertical: 2,
        color: Colors.BLACK
    }
})
