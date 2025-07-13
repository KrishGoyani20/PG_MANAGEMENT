import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Modal,
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {moderateScale, screenHeight, screenWidth} from '../utils/Metrics';

const Colors = {
  BLACK: '#000',
  BLUE: '#007bff',
  WHITELITE: '#fff',
  RED: 'red',
  GREEN: 'green',
};

export default function History() {
  // ✅ SAMPLE DATA
  const sampleData = [
    {
      name: 'John Doe',
      visits: [
        {
          visitNo: 1,
          checkIn: '01/01/2025',
          checkOut: '15/01/2025',
          rent: '₹10,000',
          advancePaid: '₹2,000',
          lateFee: '₹50',
          status: 'Paid',
          amountDue: '₹0',
          paymentDate: '14/01/2025',
          remainingBalance: '₹0',
        },
        {
          visitNo: 2,
          checkIn: '01/02/2025',
          checkOut: '29/02/2025',
          rent: '₹10,000',
          advancePaid: '₹2,500',
          lateFee: '₹0',
          status: 'Outstanding',
          amountDue: '₹0',
          paymentDate: '22/01/2025',
          remainingBalance: '₹0',
        },
      ],
    },
    {
      name: 'Sarah Smith',
      visits: [
        {
          visitNo: 1,
          checkIn: '06/01/2025',
          checkOut: '16/01/2025',
          rent: '₹12,000',
          advancePaid: '₹5,000',
          lateFee: '₹0',
          status: 'Paid',
          amountDue: '₹0',
          paymentDate: '12/01/2025',
          remainingBalance: '₹0',
        },
      ],
    },
  ];

  const [selectedTenant, setSelectedTenant] = useState(null);
  const [expandedVisit, setExpandedVisit] = useState(null);

  return (
    <SafeAreaView style={styles.container}>
      {/* Dropdown */}
      <View style={styles.dropdown}>
        <Text style={styles.dropdownText}>Last month ▼</Text>
      </View>

      <Text style={styles.title}>Tenant Transaction History</Text>

      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={[styles.headerCell, {flex: 2}]}>Tenant Name</Text>
        <Text style={[styles.headerCell, {flex: 2}]}>Check-in Date</Text>
        <Text style={[styles.headerCell, {flex: 1}]}>Status</Text>
      </View>

      {/* ✅✅ Your FlatList — row opens modal */}
      <FlatList
        data={sampleData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.row}
            onPress={() => setSelectedTenant(item)}>
            <Text style={[styles.cell, {flex: 2}]}>{item.name}</Text>
            <View style={styles.columnDate}>
              {item.visits.map(visit => (
                <Text key={visit.visitNo} style={styles.dateText}>
                  {visit.checkIn} - {visit.checkOut}
                </Text>
              ))}
            </View>
            <View style={[styles.cell, {flex: 1, alignItems: 'flex-end'}]}>
              {item.visits.map(visit => (
                <Text
                  key={visit.visitNo}
                  style={[
                    styles.statusText,
                    visit.status === 'Paid'
                      ? styles.statusPaid
                      : styles.statusOutstanding,
                  ]}>
                  {visit.status}
                </Text>
              ))}
            </View>
          </TouchableOpacity>
        )}
      />

      {/* ✅✅✅ MODAL */}

      <Modal
        visible={selectedTenant !== null}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSelectedTenant(null)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedTenant && (
              <View style={styles.topInfo}>
                {selectedTenant.profileImage ? (
                  <Image
                    source={{uri: selectedTenant.profileImage}}
                    style={styles.profileImage}
                  />
                ) : (
                  <Text style={styles.placeholderText}>No Profile Image</Text>
                )}

                <Text style={styles.topText}>Name: {selectedTenant.name}</Text>
                <Text style={styles.topText}>
                  Aadhar: {selectedTenant.aadharCardNo}
                </Text>
                <Text style={styles.topText}>
                  Address: {selectedTenant.address}
                </Text>

                {selectedTenant.aadharImage ? (
                  <Image
                    source={{uri: selectedTenant.aadharImage}}
                    style={styles.profileImage}
                  />
                ) : (
                  <Text style={styles.placeholderText}>No Aadhar Image</Text>
                )}
              </View>
            )}

            {selectedTenant?.visits ? (
              <FlatList
                data={selectedTenant.visits}
                keyExtractor={item => item.visitNo.toString()}
                renderItem={({item}) => (
                  <View>
                    <TouchableOpacity
                      style={styles.visitRow}
                      onPress={() =>
                        setExpandedVisit(
                          expandedVisit === item.visitNo ? null : item.visitNo,
                        )
                      }>
                      <Text style={styles.visitText}>Visit {item.visitNo}</Text>
                      <Text style={styles.visitText}>
                        {item.checkIn} - {item.checkOut}
                      </Text>
                    </TouchableOpacity>

                    <Collapsible collapsed={expandedVisit !== item.visitNo}>
                      <View style={styles.collapsibleContent}>
                        <Text style={styles.visitText}>Rent: {item.rent}</Text>
                        <Text style={styles.visitText}>
                          Advance: {item.advancePaid}
                        </Text>
                        <Text style={styles.visitText}>
                          Late Fee: {item.lateFee}
                        </Text>
                        <Text style={styles.visitText}>
                          Status: {item.status}
                        </Text>
                        <Text style={styles.visitText}>
                          Amount Due: {item.amountDue}
                        </Text>
                        <Text style={styles.visitText}>
                          Payment Date: {item.paymentDate}
                        </Text>
                        <Text style={styles.visitText}>
                          Remaining: {item.remainingBalance}
                        </Text>
                      </View>
                    </Collapsible>
                  </View>
                )}
              />
            ) : (
              <Text style={styles.placeholderText}>No visit data</Text>
            )}

            <TouchableOpacity
              onPress={() => setSelectedTenant(null)}
              style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITELITE,
    padding: 16,
    marginTop: 40,
  },
  dropdown: {
    marginBottom: 10,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  dropdownText: {
    fontSize: 14,
    color: Colors.BLACK,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.BLACK,
    marginBottom: 10,
  },
  headerRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 8,
  },
  headerCell: {
    fontWeight: 'bold',
    color: Colors.BLACK,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 12,
  },
  cell: {
    justifyContent: 'center',
  },
  dateText: {
    fontSize: 12,
    color: Colors.BLACK,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  statusPaid: {
    color: Colors.GREEN,
  },
  statusOutstanding: {
    color: Colors.RED,
  },
  modalContainer: {
    height: screenHeight,
    marginTop: moderateScale(40),
    backgroundColor: 'rgba(255,255,255,0.95)',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: Colors.WHITELITE,
    borderRadius: 10,
    padding: moderateScale(15),
    maxHeight: '80%',
  },
  visitRow: {
    flex: 1,
    marginBottom: moderateScale(10),
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: moderateScale(8),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  collapsibleContent: {
    marginLeft: moderateScale(10),
    marginBottom: moderateScale(10),
  },
  visitText: {
    fontSize: moderateScale(14),
    color: Colors.BLACK,
  },
  closeButton: {
    marginTop: moderateScale(10),
    alignSelf: 'center',
    backgroundColor: Colors.BLUELITE,
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(10),
    borderRadius: 8,
    position: 'absolute',
    bottom: moderateScale(-40),
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: moderateScale(16),
  },
  topInfo: {
    marginBottom: moderateScale(10),
    alignItems: 'center',
  },
  profileImage: {
    width: screenWidth / 1.5,
    height: moderateScale(120),
    borderRadius: moderateScale(10),
    borderWidth: 1,
    borderColor: Colors.BLACK,
    resizeMode: 'cover',
    marginBottom: moderateScale(10),
  },
  topText: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: Colors.BLACK,
    marginVertical: moderateScale(2),
  },
  placeholderText: {
    fontSize: moderateScale(14),
    color: Colors.REDLITE,
    marginVertical: moderateScale(4),
  },
});
