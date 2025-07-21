import React, { useEffect } from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // make sure you have vector icons installed
import {moderateScale, screenWidth} from '../utils/Metrics'; // adjust to your utils or remove

const NewTenants = () => {

  useEffect(() => {
    
  }, []);
  return (
    <View style={styles.container}>
      {/* Top Profile Header */}
      <View style={styles.header}>
        <View style={styles.avatarWrapper}>
          <Image
            source={{
              uri: 'https://via.placeholder.com/50',
            }}
            style={styles.avatar}
          />
        </View>
        <View style={styles.nameStatus}>
          <Text style={styles.name}>Dummy Data</Text>
          <View style={styles.statusBadge}>
            <Icon name="close-circle" size={14} color="#fff" />
            <Text style={styles.statusText}>Inactive</Text>
          </View>
        </View>
      </View>

      {/* Floor & Room Tags */}
      <View style={styles.tagsRow}>
        <View style={styles.tag}>
          <Icon name="layers-outline" size={14} color="#fff" />
          <Text style={styles.tagText}>Floor 1</Text>
        </View>
        <View style={styles.tag}>
          <Icon name="bed-outline" size={14} color="#fff" />
          <Text style={styles.tagText}>Room 1</Text>
        </View>
      </View>

      {/* Details List */}
      <View style={styles.detailsList}>
        {/* <DetailItem icon="layers-outline" label="Floor:" value="1" /> */}
        {/* <DetailItem icon="bed-outline" label="Room:" value="1" /> */}
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
      </View>

      {/* Buttons */}
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
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    width: screenWidth * 0.9,
    alignSelf: 'center',
    marginVertical: 30,
    elevation: 4,
  },
  header: {
    backgroundColor: '#1cc7a7',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    paddingVertical: 20,
  },
  avatarWrapper: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: 10,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  nameStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  statusBadge: {
    flexDirection: 'row',
    backgroundColor: '#e74c3c',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignItems: 'center',
    marginTop: 5,
  },
  statusText: {
    color: '#fff',
    marginLeft: 4,
    fontSize: 12,
  },
  tagsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: -15,
  },
  tag: {
    flexDirection: 'row',
    backgroundColor: '#1cc7a7',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  tagText: {
    color: '#fff',
    marginLeft: 5,
    fontSize: 12,
  },
  detailsList: {
    marginTop: 20,
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
    justifyContent: 'space-between',
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
