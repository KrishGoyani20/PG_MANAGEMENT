import React, {useEffect, useRef} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Modalize} from 'react-native-modalize';
import {moderateScale, screenWidth} from '../utils/Metrics';

import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {getTenants} from '../server/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NewTenants = () => {
  const modalRef = useRef(null);

  const onOpen = () => {
    modalRef.current?.open();
  };

  useEffect(() => {
    const callGetTenants = async () => {
      const userData = await AsyncStorage.getItem('user');
      const parsedUser = JSON.parse(userData);
      const token = parsedUser?.token;

      if (!token) {
        console.log('No token found!');
        return;
      }

      const res = await getTenants(token);
      console.log('--->',res)
    };

    callGetTenants();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header row: Image | Name | Status */}
      <TouchableOpacity style={styles.headerRow} onPress={onOpen}>
        {/* {props.imageUri ? (
          <Image source={{uri: imageUri}} style={styles.avatar} />
        ) : ( */}
        <EvilIcons name="user" size={60} />
        {/* )} */}

        <Text style={styles.name}>Dummy Data</Text>

        <View style={styles.statusBadge}>
          <Icon name="close-circle" size={14} color="#fff" />
          <Text style={styles.statusText}>Inactive</Text>
        </View>
      </TouchableOpacity>

      {/* BOTTOM SHEET */}
      <Modalize ref={modalRef} snapPoint={400} modalStyle={styles.modalContent}>
        <Text style={styles.modalTitle}>Tenant Details</Text>

        <DetailItem icon="bed-outline" label="BedNo:" value="3" />
        <DetailItem icon="call-outline" label="" value="0123456789" />
        <DetailItem icon="mail-outline" label="" value="test@gmail.com" />
        <DetailItem
          icon="calendar-outline"
          label="Joined:"
          value="13/11/2025"
        />
        <DetailItem icon="card-outline" label="ID:" value="Aadhar" />
        <DetailItem icon="briefcase-outline" label="" value="Developer" />

        <View style={styles.buttonsRow}>
          <TouchableOpacity style={styles.editButton}>
            <Icon name="create-outline" size={16} color="#fff" />
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton}>
            <Icon name="trash-outline" size={16} color="#fff" />
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </Modalize>
    </View>
  );
};

const DetailItem = ({icon, label, value}) => (
  <View style={styles.detailItem}>
    <Icon name={icon} size={18} color="#20c997" style={{width: 30}} />
    <Text style={styles.detailText}>
      {label ? `${label} ` : ''}
      <Text style={{fontWeight: '500'}}>{value}</Text>
    </Text>
  </View>
);

export default NewTenants;

const styles = StyleSheet.create({
  container: {
    width: screenWidth * 0.9,
    alignSelf: 'center',
    marginVertical: 30,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1cc7a7',
    borderRadius: 15,
    padding: 15,
    justifyContent: 'space-between',
  },
  avatar: {
    width: 50,
    height: 50,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  name: {
    flex: 1,
    color: '#fff',
    fontSize: 18,
    marginLeft: 15,
    fontWeight: 'bold',
  },
  statusBadge: {
    flexDirection: 'row',
    backgroundColor: '#e74c3c',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignItems: 'center',
  },
  statusText: {
    color: '#fff',
    marginLeft: 4,
    fontSize: 12,
  },
  modalContent: {
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f6fa',
    padding: 10,
    borderRadius: 15,
    marginVertical: 5,
  },
  detailText: {
    marginLeft: 5,
    fontSize: 15,
    color: '#333',
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1cc7a7',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e74c3c',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
  },
  buttonText: {
    color: '#fff',
    marginLeft: 5,
    fontSize: 14,
    fontWeight: '600',
  },
});
