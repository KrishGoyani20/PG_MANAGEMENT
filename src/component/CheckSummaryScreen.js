import {
    Text,
    TextInput,
    TouchableOpacity,
    View,
    StyleSheet,
    ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { Colors } from '../utils/Theme';
import { moderateScale, screenHeight, screenWidth } from '../utils/Metrics';
import { SafeAreaView } from 'react-native-safe-area-context';

const CheckSummaryScreen = () => {
    const [isModal, setIsModal] = useState(false);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}  >
                <View style={styles.innerContainer}>
                    <Text style={styles.heading}>Check Summary</Text>

                    <View style={styles.summaryBox}>
                        <View style={styles.rowItem}>
                            <Text style={styles.label}>Tenant Name:</Text>
                            <Text style={styles.value}>John Doe</Text>
                        </View>
                        <View style={styles.rowItem}>
                            <Text style={styles.label}>Check-out Date</Text>
                            <Text style={styles.value}>15/01/2025</Text>
                        </View>
                        <View style={styles.rowItem}>
                            <Text style={styles.label}>Advance Paid:</Text>
                            <Text style={styles.value}>₹200</Text>
                        </View>
                        <View style={styles.rowItem}>
                            <Text style={styles.label}>Grace Payment</Text>
                            <Text style={styles.value}>₹200</Text>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Grace Period</Text>
                        <Text style={styles.subText}>
                            If your check-out time has passed, please enter the fee below:
                        </Text>
                        <View style={styles.timerBox}>
                            <Text style={styles.timerText}>
                                Full Advance Charge Applied Time Remaining: 00:00
                            </Text>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Lock Replacement Fee</Text>
                        <Text style={styles.subText}>
                            If the tenant has lost their key or lock, please enter the fee below:
                        </Text>
                        <TextInput
                            placeholder="Enter Fee"
                            placeholderTextColor={Colors.GRAY44}
                            style={styles.input}
                        />
                        <Text style={styles.subText}>Lock lost by tenant.</Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Refundable Amount</Text>
                        <View style={styles.amountRow}>
                            <Text style={styles.amountLabel}>Original Refundable Amount:</Text>
                            <Text style={styles.amountValue}>₹200</Text>
                        </View>
                        <View style={styles.amountRow}>
                            <Text style={styles.amountLabel}>Late Fee Deducted:</Text>
                            <Text style={styles.amountValue}>₹200</Text>
                        </View>
                        <View style={styles.amountRow}>
                            <Text style={styles.amountLabel}>Lock Replacement Fee:</Text>
                            <Text style={styles.amountValue}>₹0</Text>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.finalizeBtn}>
                        <Text style={styles.finalizeBtnText}>Finalize Checkout (₹200 Refundable)</Text>
                    </TouchableOpacity>

                    <View style={styles.actionRow}>
                        <TouchableOpacity style={styles.outlineBtn}>
                            <Text style={styles.outlineBtnText}>Pay Remaining Amount</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.outlineBtn}>
                            <Text style={styles.outlineBtnText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <Text style={styles.outlineBtnText}></Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default CheckSummaryScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.WHITEDARK,
    },
    innerContainer: {
        marginVertical: moderateScale(20),
        height: screenHeight,
        marginHorizontal: moderateScale(10),
        padding: moderateScale(10),
    },
    heading: {
        fontSize: 22,
        fontWeight: '700',
        color: Colors.BLUELITE,
        textAlign: 'left',
        marginVertical: moderateScale(10),
    },
    summaryBox: {
        marginVertical: moderateScale(10),
        borderWidth: 1,
        borderColor: Colors.GRAY,
        borderRadius: 8,
        backgroundColor: Colors.WHITELITE,
        padding: moderateScale(12),
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        rowGap: moderateScale(12),
    },
    rowItem: {
        width: '48%',
    },
    label: {
        fontSize: 16,
        fontWeight: '400',
        color: Colors.BLACK,
    },
    value: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.BLACK,
    },
    section: {
        marginTop: moderateScale(15),
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: Colors.BLUELITE,
        marginBottom: 4,
    },
    subText: {
        fontSize: 14,
        fontWeight: '400',
        color: Colors.BLACK,
        marginVertical: 4,
    },
    timerBox: {
        marginTop: moderateScale(10),
        padding: moderateScale(16),
        backgroundColor: Colors.REDLITE,
        borderRadius: moderateScale(10),
    },
    timerText: {
        fontSize: 16,
        color: Colors.WHITEDARK,
    },
    input: {
        marginTop: moderateScale(8),
        padding: moderateScale(10),
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.BLUELITE,
        color: Colors.BLACK,
        backgroundColor: Colors.WHITELITE,
    },
    amountRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 6,
    },
    amountLabel: {
        fontSize: 14,
        color: Colors.BLACK,
    },
    amountValue: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.BLACK,
    },
    finalizeBtn: {
        backgroundColor: Colors.BLUELITE,
        borderRadius: 10,
        padding: moderateScale(12),
        marginVertical: moderateScale(10),
    },
    finalizeBtnText: {
        fontSize: 16,
        color: Colors.WHITELITE,
        textAlign: 'center',
    },
    actionRow: {
        flexDirection: 'row',
        gap: moderateScale(20),
        marginBottom: 200
    },
    outlineBtn: {
        flex: 1,
        borderWidth: 1,
        borderColor: Colors.BLUELITE,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        padding: moderateScale(10),
    },
    outlineBtnText: {
        fontSize: 16,
        color: Colors.BLUELITE,
        textAlign: 'center',
    },
});


// import {
//     Button,
//     Modal,
//     StyleSheet,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     View,
// } from 'react-native';
// import React, { useState } from 'react';
// import { Colors } from '../utils/Theme';
// import { moderateScale, screenHeight, screenWidth } from '../utils/Metrics';

// const CheckSummaryScreen = () => {
//     const [isModal, setIsModal] = useState(false);
//     return (
//         <View
//             style={{
//                 flex: 1,
//             }}>
//             <View
//                 style={{
//                     marginVertical: moderateScale(20),
//                     height: screenHeight,
//                     marginHorizontal: moderateScale(10),
//                     padding: moderateScale(10),
//                 }}>
//                 <Text
//                     style={{
//                         fontSize: 20,
//                         fontWeight: 600,
//                         color: Colors.BLACK,
//                         textAlign: 'left',
//                         marginVertical: moderateScale(10),
//                     }}>
//                     Check Summary
//                 </Text>
//                 <View
//                     style={{
//                         marginVertical: moderateScale(10),
//                         borderWidth: 1,
//                         borderColor: '#bbb',
//                         borderRadius: 8,
//                         padding: moderateScale(8),
//                         flexDirection: 'row',
//                         justifyContent: 'space-between',
//                         alignSelf: 'center',
//                         flexWrap: 'wrap',
//                         rowGap: moderateScale(10),
//                     }}>
//                     <View style={{ width: '50%' }}>
//                         <Text style={{ fontSize: 16, fontWeight: 400, color: Colors.BLACK }}>
//                             Tenant Name:
//                         </Text>
//                         <Text style={{ fontSize: 16, fontWeight: 600, color: Colors.BLACK }}>
//                             John Doe
//                         </Text>
//                     </View>
//                     <View style={{ width: '50%' }}>
//                         <Text style={{ fontSize: 16, fontWeight: 400, color: Colors.BLACK }}>
//                             Check-out Date
//                         </Text>
//                         <Text style={{ fontSize: 16, fontWeight: 600, color: Colors.BLACK }}>
//                             15/01/2025
//                         </Text>
//                     </View>
//                     <View style={{ width: '50%' }}>
//                         <Text style={{ fontSize: 16, fontWeight: 400, color: Colors.BLACK }}>
//                             Advance Paid:
//                         </Text>
//                         <Text style={{ fontSize: 16, fontWeight: 600, color: Colors.BLACK }}>
//                             200
//                         </Text>
//                     </View>
//                     <View style={{ width: '50%' }}>
//                         <Text style={{ fontSize: 16, fontWeight: 400, color: Colors.BLACK }}>
//                             Grace Peraumont
//                         </Text>
//                         <Text style={{ fontSize: 16, fontWeight: 600, color: Colors.BLACK }}>
//                             200
//                         </Text>
//                     </View>
//                 </View>
//                 <View>
//                     <View style={{}}>
//                         <Text style={{ fontSize: 20, fontWeight: 700, color: Colors.BLACK }}>
//                             Grace Period
//                         </Text>
//                         <Text style={{ fontSize: 14, fontWeight: 400, color: Colors.BLACK }}>
//                             Your check-out time hovr keyv or lock, please enter the fee below:
//                         </Text>
//                         <View
//                             style={{
//                                 marginTop: moderateScale(10),
//                                 padding: moderateScale(16),
//                                 backgroundColor: 'red',
//                                 borderRadius: moderateScale(10),
//                             }}>
//                             <Text style={{ fontSize: 20, color: Colors.WHITE }}>
//                                 Full Advance Charge Applied Time Remaining: 00.00
//                             </Text>
//                         </View>
//                     </View>
//                     <View style={{ marginTop: 10 }}>
//                         <Text style={{ fontSize: 20, fontWeight: 700, color: Colors.BLACK }}>
//                             Lock Replacement Fee
//                         </Text>
//                         <Text style={{ fontSize: 14, fontWeight: 400, color: Colors.BLACK }}>
//                             If the tenant has lost their key or lock, please enter the fee
//                             below:
//                         </Text>
//                         <TextInput
//                             placeholder="Enter Fee"
//                             placeholderTextColor={Colors.BLACK}
//                             style={{
//                                 padding: moderateScale(10),
//                                 borderRadius: 10,
//                                 borderWidth: 1,
//                                 color: Colors.BLACK,
//                             }}
//                         />
//                         <View>
//                             <Text>Lock lost by tenant.</Text>
//                         </View>
//                     </View>
//                 </View>
//                 <View style={{ marginTop: 12 }}>
//                     <Text style={{ fontSize: 20, fontWeight: 700, color: Colors.BLACK }}>
//                         Refundable Amount
//                     </Text>
//                     <View
//                         style={{
//                             flexDirection: 'row',
//                             justifyContent: 'space-between',
//                             marginVertical: 8,
//                         }}>
//                         <Text>Original Refundable Amount: </Text>
//                         <Text style={{ fontSize: 14, fontWeight: 400, color: Colors.BLACK }}>
//                             200
//                         </Text>
//                     </View>
//                     <View
//                         style={{
//                             flexDirection: 'row',
//                             justifyContent: 'space-between',
//                             marginVertical: 8,
//                         }}>
//                         <Text>Late Fee Deducted: </Text>
//                         <Text style={{ fontSize: 14, fontWeight: 400, color: Colors.BLACK }}>
//                             200
//                         </Text>
//                     </View>
//                     <View
//                         style={{
//                             flexDirection: 'row',
//                             justifyContent: 'space-between',
//                             marginVertical: 8,
//                         }}>
//                         <Text>Lock Replacement Fee:</Text>
//                         <Text style={{ fontSize: 14, fontWeight: 400, color: Colors.BLACK }}>
//                             0
//                         </Text>
//                     </View>
//                 </View>

//                 <View>
//                     <TouchableOpacity
//                         style={{
//                             backgroundColor: Colors.BLUE,
//                             borderRadius: moderateScale(10),
//                             padding: moderateScale(8),
//                             marginVertical: moderateScale(10),
//                         }}>
//                         <Text style={{ fontSize: 16, color: Colors.WHITE }}>
//                             Finalize Checkout (€200 Refundable)
//                         </Text>
//                     </TouchableOpacity>

//                     <View style={{ flexDirection: 'row', gap: moderateScale(20) }}>
//                         <TouchableOpacity
//                             style={{
//                                 //   backgroundColor: Colors.BLUE,
//                                 borderWidth: 1,
//                                 borderRadius: moderateScale(10),
//                                 padding: moderateScale(8),
//                                 paddingHorizontal: moderateScale(20),
//                                 marginVertical: moderateScale(10),
//                             }}>
//                             <Text style={{ fontSize: 16, color: Colors.BLACK }}>
//                                 Pay Remaining Amount
//                             </Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity
//                             style={{
//                                 //   backgroundColor: Colors.BLUE,
//                                 borderWidth: 1,
//                                 borderRadius: moderateScale(10),
//                                 padding: moderateScale(8),

//                                 paddingHorizontal: moderateScale(20),
//                                 marginVertical: moderateScale(10),
//                             }}>
//                             <Text style={{ fontSize: 16, color: Colors.BLACK }}>Cancel</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//             </View>
//             {/* </Modal> */}
//         </View>
//     );
// };

// export default CheckSummaryScreen;

// const styles = StyleSheet.create({});
