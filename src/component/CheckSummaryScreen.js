

import {
    Button,
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useState } from 'react';
import { Colors } from '../utils/Theme';
import { moderateScale, screenHeight, screenWidth } from '../utils/Metrics';

const CheckSummaryScreen = () => {
    const [isModal, setIsModal] = useState(false);
    return (
        <View
            style={{
                flex: 1,
            }}>
            <View
                style={{
                    marginVertical: moderateScale(20),
                    height: screenHeight,
                    marginHorizontal: moderateScale(10),
                    padding: moderateScale(10),
                }}>
                <Text
                    style={{
                        fontSize: 20,
                        fontWeight: 600,
                        color: Colors.BLACK,
                        textAlign: 'left',
                        marginVertical: moderateScale(10),
                    }}>
                    Check Summary
                </Text>
                <View
                    style={{
                        marginVertical: moderateScale(10),
                        borderWidth: 1,
                        borderColor: '#bbb',
                        borderRadius: 8,
                        padding: moderateScale(8),
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignSelf: 'center',
                        flexWrap: 'wrap',
                        rowGap: moderateScale(10),
                    }}>
                    <View style={{ width: '50%' }}>
                        <Text style={{ fontSize: 16, fontWeight: 400, color: Colors.BLACK }}>
                            Tenant Name:
                        </Text>
                        <Text style={{ fontSize: 16, fontWeight: 600, color: Colors.BLACK }}>
                            John Doe
                        </Text>
                    </View>
                    <View style={{ width: '50%' }}>
                        <Text style={{ fontSize: 16, fontWeight: 400, color: Colors.BLACK }}>
                            Check-out Date
                        </Text>
                        <Text style={{ fontSize: 16, fontWeight: 600, color: Colors.BLACK }}>
                            15/01/2025
                        </Text>
                    </View>
                    <View style={{ width: '50%' }}>
                        <Text style={{ fontSize: 16, fontWeight: 400, color: Colors.BLACK }}>
                            Advance Paid:
                        </Text>
                        <Text style={{ fontSize: 16, fontWeight: 600, color: Colors.BLACK }}>
                            200
                        </Text>
                    </View>
                    <View style={{ width: '50%' }}>
                        <Text style={{ fontSize: 16, fontWeight: 400, color: Colors.BLACK }}>
                            Grace Peraumont
                        </Text>
                        <Text style={{ fontSize: 16, fontWeight: 600, color: Colors.BLACK }}>
                            200
                        </Text>
                    </View>
                </View>
                <View>
                    <View style={{}}>
                        <Text style={{ fontSize: 20, fontWeight: 700, color: Colors.BLACK }}>
                            Grace Period
                        </Text>
                        <Text style={{ fontSize: 14, fontWeight: 400, color: Colors.BLACK }}>
                            Your check-out time hovr keyv or lock, please enter the fee below:
                        </Text>
                        <View
                            style={{
                                marginTop: moderateScale(10),
                                padding: moderateScale(16),
                                backgroundColor: 'red',
                                borderRadius: moderateScale(10),
                            }}>
                            <Text style={{ fontSize: 20, color: Colors.WHITE }}>
                                Full Advance Charge Applied Time Remaining: 00.00
                            </Text>
                        </View>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ fontSize: 20, fontWeight: 700, color: Colors.BLACK }}>
                            Lock Replacement Fee
                        </Text>
                        <Text style={{ fontSize: 14, fontWeight: 400, color: Colors.BLACK }}>
                            If the tenant has lost their key or lock, please enter the fee
                            below:
                        </Text>
                        <TextInput
                            placeholder="Enter Fee"
                            placeholderTextColor={Colors.BLACK}
                            style={{
                                padding: moderateScale(10),
                                borderRadius: 10,
                                borderWidth: 1,
                                color: Colors.BLACK,
                            }}
                        />
                        <View>
                            <Text>Lock lost by tenant.</Text>
                        </View>
                    </View>
                </View>
                <View style={{ marginTop: 12 }}>
                    <Text style={{ fontSize: 20, fontWeight: 700, color: Colors.BLACK }}>
                        Refundable Amount
                    </Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginVertical: 8,
                        }}>
                        <Text>Original Refundable Amount: </Text>
                        <Text style={{ fontSize: 14, fontWeight: 400, color: Colors.BLACK }}>
                            200
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginVertical: 8,
                        }}>
                        <Text>Late Fee Deducted: </Text>
                        <Text style={{ fontSize: 14, fontWeight: 400, color: Colors.BLACK }}>
                            200
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginVertical: 8,
                        }}>
                        <Text>Lock Replacement Fee:</Text>
                        <Text style={{ fontSize: 14, fontWeight: 400, color: Colors.BLACK }}>
                            0
                        </Text>
                    </View>
                </View>

                <View>
                    <TouchableOpacity
                        style={{
                            backgroundColor: Colors.BLUE,
                            borderRadius: moderateScale(10),
                            padding: moderateScale(8),
                            marginVertical: moderateScale(10),
                        }}>
                        <Text style={{ fontSize: 16, color: Colors.WHITE }}>
                            Finalize Checkout (€200 Refundable)
                        </Text>
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row', gap: moderateScale(20) }}>
                        <TouchableOpacity
                            style={{
                                //   backgroundColor: Colors.BLUE,
                                borderWidth: 1,
                                borderRadius: moderateScale(10),
                                padding: moderateScale(8),
                                paddingHorizontal: moderateScale(20),
                                marginVertical: moderateScale(10),
                            }}>
                            <Text style={{ fontSize: 16, color: Colors.BLACK }}>
                                Pay Remaining Amount
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                //   backgroundColor: Colors.BLUE,
                                borderWidth: 1,
                                borderRadius: moderateScale(10),
                                padding: moderateScale(8),

                                paddingHorizontal: moderateScale(20),
                                marginVertical: moderateScale(10),
                            }}>
                            <Text style={{ fontSize: 16, color: Colors.BLACK }}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {/* </Modal> */}
        </View>
    );
};

export default CheckSummaryScreen;

const styles = StyleSheet.create({});
