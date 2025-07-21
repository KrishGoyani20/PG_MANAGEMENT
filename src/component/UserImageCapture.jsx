import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  PermissionsAndroid,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Camera, useCameraDevice} from 'react-native-vision-camera';
import FilePickerManager from 'react-native-file-picker';
import {moderateScale, screenWidth} from '../utils/Metrics';
import {useNavigation} from '@react-navigation/native';

const UserImageCapture = () => {
  const {navigate} = useNavigation();
  const [tenantPhoto, setTenantPhoto] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(true);
  const [isAadharCamera, setIsAadharCamera] = useState(false); // Aadhar camera state
  const device = useCameraDevice('front');
  const cameraRef = useRef(null);
  const [manageFormDetails, setManageFromDetails] = useState();
  const [selectProof, setSelectProof] = useState(null); // Aadhaar proof
  const [formData, setFormData] = useState({
    name: '',
    aadhar: '',
    dob: '',
    gender: '',
    address: '',
    profilePhoto: null,
  });

  useEffect(() => {
    const requestCameraPermission = async () => {
      try {
        const status = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        ]);
        setHasCameraPermission(status === 'granted');
      } catch (err) {
        console.warn('Camera permission error:', err);
      }
    };
    requestCameraPermission();
  }, []);

  const SwelectProfileImage = () => {
    FilePickerManager.showFilePicker(null, response => {
      if (response.didCancel) {
        console.log('User cancelled file picker');
      } else if (response.error) {
        console.log('FilePicker Error:', response.error);
      } else {
        console.log('📦 FilePicker Response:', response);
        const fileUri =
          response.uri ||
          (response.assets && response.assets[0] && response.assets[0].uri);

        if (fileUri) {
          setSelectProof(fileUri);
          runOCRonSelectedImage(fileUri);
        } else {
          console.warn('❌ No file URI found in response!');
        }
      }
    });
  };

  const handleTenantPhotoCaptured = async () => {
    try {
      if (cameraRef.current) {
        const photo = await cameraRef.current.takePhoto({
          flash: 'off',
        });
        console.log('Photo captured:', photo);
        setTenantPhoto('file://' + photo.path);
        setIsCameraActive(false);
      }
    } catch (error) {
      console.error('Error capturing photo:', error);
      Alert.alert('Error', 'Failed to capture photo.');
    }
  };

  // ✅ NEW: Capture Aadhar Photo
  const handleAadharPhotoCapture = async () => {
    try {
      if (cameraRef.current) {
        const photo = await cameraRef.current.takePhoto({
          flash: 'off',
        });
        console.log('Aadhar Photo:', photo);
        setSelectProof('file://' + photo.path);
        setIsAadharCamera(false); // Close Aadhar camera
      }
    } catch (error) {
      console.error('Error capturing Aadhar photo:', error);
      Alert.alert('Error', 'Failed to capture Aadhar photo.');
    }
  };

  const handleSubmit = () => {
    Alert.alert('Form Submitted', JSON.stringify(formData, null, 2));
    navigate('PaymentManagament');
  };

  if (hasCameraPermission === null) {
    return (
      <View>
        <Text style={{color: 'red'}}>Run</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ✅ Main Camera */}
        {isCameraActive && !isAadharCamera ? (
          device ? (
            <View style={styles.cameraWrapper}>
              <Camera
                ref={cameraRef}
                style={styles.cameraBox}
                device={device}
                isActive={true}
                photo={true}
              />
            </View>
          ) : (
            <Text style={{textAlign: 'center', marginVertical: 20}}>
              Loading camera...
            </Text>
          )
        ) : tenantPhoto && !isAadharCamera ? (
          <Image source={{uri: tenantPhoto}} style={styles.capturedImage} />
        ) : null}

        {/* ✅ Aadhar Camera */}
        {isAadharCamera ? (
          device ? (
            <View style={[styles.cameraWrapper, {height: 0, width: 0}]}>
              <Camera
                ref={cameraRef}
                style={styles.cameraBox}
                device={device}
                isActive={true}
                photo={true}
              />
              <TouchableOpacity
                onPress={handleAadharPhotoCapture}
                style={styles.button}>
                <Text style={styles.buttonText}>Capture Aadhar</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <Text style={{textAlign: 'center', marginVertical: 20}}>
              Loading camera...
            </Text>
          )
        ) : null}

        {/* ✅ Buttons */}
        <View style={styles.buttonContainer}>
          {!isAadharCamera && (
            <>
              {isCameraActive ? (
                <View
                  style={{
                    width: screenWidth * 0.9,
                    flexDirection: 'row',
                    alignItems: 'center',
                    alignSelf: 'center',
                    justifyContent: 'space-between',
                    marginTop: moderateScale(10),
                  }}>
                  <TouchableOpacity
                    onPress={SwelectProfileImage}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Select</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={handleTenantPhotoCaptured}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Capture</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View
                  style={{
                    width: screenWidth * 0.9,
                    flexDirection: 'row',
                    alignItems: 'center',
                    alignSelf: 'center',
                    justifyContent: 'space-between',
                    marginTop: moderateScale(10),
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      setIsCameraActive(true);
                      setTenantPhoto(null);
                    }}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Cancel</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      setManageFromDetails(true);
                    }}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Next</Text>
                  </TouchableOpacity>
                </View>
              )}
            </>
          )}
        </View>

        {/* ✅ Form */}
        <View>
          {manageFormDetails && (
            <View>
              {/* ✅ If Aadhar Camera Active */}
              {isAadharCamera && (
                <View style={{marginVertical: 20}}>
                  <View style={styles.cameraWrapper}>
                    <Camera
                      ref={cameraRef}
                      style={styles.cameraBox}
                      device={device}
                      isActive={true}
                      photo={true}
                    />
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      marginTop: 10,
                    }}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => setIsAadharCamera(false)}>
                      <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.button}
                      onPress={handleAadharPhotoCapture}>
                      <Text style={styles.buttonText}>Capture</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}

              {!isAadharCamera && (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      setIsAadharCamera(true);
                    }}>
                    <Text style={styles.buttonText}>Aadhar Picture</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.button}
                    onPress={SwelectProfileImage}>
                    <Text style={styles.buttonText}>Aadhar Select</Text>
                  </TouchableOpacity>
                </View>
              )}

              <View style={styles.formContainer}>
                {/* Inputs */}
                <TextInput
                  placeholder="Name"
                  placeholderTextColor={'#000'}
                  value={formData.name}
                  onChangeText={text => setFormData({...formData, name: text})}
                  style={styles.input}
                />
                <TextInput
                  placeholder="Aadhar Number"
                  placeholderTextColor={'#000'}
                  keyboardType="numeric"
                  value={formData.aadhar}
                  onChangeText={text =>
                    setFormData({...formData, aadhar: text})
                  }
                  style={styles.input}
                />
                <TextInput
                  placeholder="Date of Birth (YYYY-MM-DD)"
                  placeholderTextColor={'#000'}
                  value={formData.dob}
                  onChangeText={text => setFormData({...formData, dob: text})}
                  style={styles.input}
                />
                <TextInput
                  placeholder="Gender"
                  placeholderTextColor={'#000'}
                  value={formData.gender}
                  onChangeText={text =>
                    setFormData({...formData, gender: text})
                  }
                  style={styles.input}
                />
                <TextInput
                  placeholder="Address"
                  placeholderTextColor={'#000'}
                  value={formData.address}
                  onChangeText={text =>
                    setFormData({...formData, address: text})
                  }
                  style={styles.input}
                />

                {/* ✅ Show Aadhar Image if exists */}
                {selectProof && (
                  <Image
                    source={{uri: selectProof}}
                    style={styles.selectedImage}
                  />
                )}

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                  <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserImageCapture;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  cameraWrapper: {
    width: '90%',
    aspectRatio: 3 / 4,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#007BFF',
    alignSelf: 'center',
  },
  cameraBox: {
    width: screenWidth * 0.9,
    aspectRatio: 3 / 4,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#007BFF',
    alignSelf: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: moderateScale(20),
  },
  capturedImage: {
    width: screenWidth * 0.9,
    aspectRatio: 3 / 4,
    borderRadius: 20,
    resizeMode: 'cover',
    borderWidth: 3,
    borderColor: '#28a745',
    marginTop: 20,
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
  },
  formContainer: {
    width: screenWidth * 0.9,
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    fontSize: 16,
  },
  selectedImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 20,
  },
});
