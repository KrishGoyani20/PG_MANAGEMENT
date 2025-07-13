import { Image, StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native'
import React, { useState } from 'react'
import { Images } from '../assets/image/image';
import { moderateScale, screenHeight, screenWidth } from '../utils/Metrics';
import { Colors } from '../utils/Theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const DRselect = ({ route }) => {
    const { filteredData } = route.params || {};
    const { navigate } = useNavigation()

    console.log('DRselect -> filteredData:', filteredData);



    const [isTrueRound, setIsTrueRound] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [isFilled, setIsFilled] = useState(false);
    const [filledItems, setFilledItems] = useState([]);

    const {
        RoomType,
        Status,
        RentType,
        FloorNumber: floorNumber,
        RoomNumber: roomNumber,
        capacity,
        RentAmount: roomAmountNumber,
        Amenities,
    } = filteredData || {};

    //   const [isAddRoomPG, setIsAddRoomPG] = useState(false);
    const RoomNumber = [
        {
            id: 1,
            image: Images.RBAD,
            badW: Images.RBAD2,
            num: 1,
            isBooked: false,
        },
        {
            id: 2,
            image: Images.RBAD,
            badW: Images.RBAD2,
            num: 2,
            isBooked: false,
        },
        {
            id: 3,
            image: Images.RBAD,
            badW: Images.RBAD2,
            num: 3,
            isBooked: false,
        },
        {
            id: 4,
            image: Images.RBAD,
            badW: Images.RBAD2,
            num: 4,
            isBooked: false,
        },
        {
            id: 5,
            image: Images.RBAD,
            badW: Images.RBAD2,
            num: 5,
            isBooked: false,
        },
        {
            id: 6,
            image: Images.RBAD,
            badW: Images.RBAD2,
            num: 6,
            isBooked: false,
        },
        {
            id: 7,
            image: Images.RBAD,
            badW: Images.RBAD2,
            num: 7,
            isBooked: false,
        },
        {
            id: 8,
            image: Images.RBAD,
            badW: Images.RBAD2,
            num: 8,
            isBooked: false,
        },
        {
            id: 9,
            image: Images.RBAD,
            badW: Images.RBAD2,
            num: 9,
            isBooked: false,
        },
        {
            id: 10,
            image: Images.RBAD,
            badW: Images.RBAD2,
            num: 10,
            isBooked: false,
        },
        {
            id: 11,
            image: Images.RBAD,
            badW: Images.RBAD2,
            num: 11,
            isBooked: false,
        },
        {
            id: 12,
            image: Images.RBAD,
            badW: Images.RBAD2,
            num: 12,
            isBooked: false,
        },
    ];


    const groupRoomPairsDormitory = data => {
        const grouped = [];
        for (let i = 0; i < data.length; i += 2) {
            const pair = [data[i]];
            if (data[i + 1]) {
                pair.push(data[i + 1]);
            }
            grouped.push(pair);
        }
        return grouped;
    };

    const pairedRoomsD = groupRoomPairsDormitory(RoomNumber);




    return (
        <SafeAreaView style={{
            height: screenHeight, width: screenWidth, justifyContent: 'center', alignItems: 'center'
        }}>
            <View
                style={{
                    width: screenWidth * 0.9,
                    height: 'auto',
                    marginTop: moderateScale(20),
                    backgroundColor: Colors.WHITE,
                    borderRadius: moderateScale(20),
                }}>
                <View
                    style={{
                        paddingHorizontal: moderateScale(20),
                        height: moderateScale(70),
                        backgroundColor: '#5B7CE9',
                        borderTopLeftRadius: moderateScale(20),
                        borderTopRightRadius: moderateScale(20),
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                    <View
                        style={{
                            width: moderateScale(46),
                            height: moderateScale(46),
                            borderRadius: moderateScale(50),
                            backgroundColor: '#8BEA7C',
                            justifyContent: 'flex-end',
                            alignItems: 'flex-end',
                        }}>
                        <View
                            style={{
                                width: moderateScale(42),
                                height: moderateScale(42),
                                borderRadius: moderateScale(50),
                                backgroundColor: Colors.WHITE,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <Image
                                style={{
                                    width: moderateScale(26),
                                    height: moderateScale(26),
                                    resizeMode: 'contain',
                                }}
                                source={Images.RBAD}
                            />
                        </View>
                    </View>

                    <View style={{ flex: 1, marginLeft: 10 }}>
                        <View>
                            <Text
                                style={{
                                    fontSize: moderateScale(20),
                                    fontWeight: 800,
                                    color: Colors.WHITE,
                                }}>
                                Room {roomNumber}
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row', gap: 10 }}>
                            <View
                                style={{
                                    width: 'auto',
                                    backgroundColor: 'rgba(250, 249, 246, 0.4)',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    borderRadius: 4,
                                    paddingHorizontal: 4,
                                }}>
                                <Image
                                    style={{ width: 14, height: 14, resizeMode: 'contain' }}
                                    source={Images.RFLOOR}
                                />
                                <Text
                                    style={{
                                        fontSize: 14,
                                        color: Colors.WHITE,
                                        fontWeight: 600,
                                    }}>
                                    {' '}
                                    floor {floorNumber}
                                </Text>
                            </View>

                            <View
                                style={{
                                    width: 'auto',
                                    backgroundColor: 'rgba(250, 249, 246, 0.4)',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    borderRadius: 4,
                                    paddingHorizontal: 4,
                                }}>
                                <Image
                                    style={{ width: 10, height: 10, resizeMode: 'contain' }}
                                    source={Images.RMONEY}
                                />
                                <Text
                                    style={{
                                        fontSize: 14,
                                        color: Colors.WHITE,
                                        fontWeight: 600,
                                    }}>

                                    {roomAmountNumber || ' 00'}
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ height: 60, alignItems: 'flex-start', marginTop: moderateScale(14) }}>
                        <View
                            style={{
                                width: 'auto',
                                backgroundColor: '#35C625',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 10,
                                paddingHorizontal: 6,
                            }}>
                            <Image
                                style={{ width: 10, height: 10, resizeMode: 'contain' }}
                                source={Images.RTRUE}
                            />
                            <Text
                                style={{
                                    fontSize: 14,
                                    color: Colors.WHITE,
                                    fontWeight: 600,
                                }}>
                                {' '}
                                Vacant
                            </Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => { navigate('RoomsScreen') }}
                            style={{
                                width: 'auto',
                                justifyContent: 'flex-end',
                                alignItems: 'flex-end',
                                paddingHorizontal: 4,
                            }}>
                            <Image style={{ width: moderateScale(42), height: moderateScale(42), }} source={Images.REDIT} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View
                    style={{
                        paddingHorizontal: moderateScale(8),
                        marginTop: moderateScale(10),
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <Image
                                style={{
                                    width: moderateScale(24),
                                    height: moderateScale(24),
                                    resizeMode: 'contain',
                                }}
                                source={Images.RUSER}
                            />
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontWeight: 500,
                                    marginLeft: moderateScale(4),
                                }}>
                                Capacity : {capacity || '0/12'}
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <Image
                                style={{
                                    width: moderateScale(18),
                                    height: moderateScale(18),
                                    resizeMode: 'contain',
                                }}
                                source={Images.RMONEY}
                            />
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontWeight: 500,
                                    marginLeft: moderateScale(4),
                                }}>
                                Rent : {roomAmountNumber || ' 0.00'}/-
                            </Text>
                        </View>
                    </View>

                    <View>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginTop: moderateScale(4),
                            }}>
                            <Image
                                style={{
                                    width: moderateScale(24),
                                    height: moderateScale(24),
                                    resizeMode: 'contain',
                                }}
                                source={Images.RTHREELINE}
                            />
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontWeight: 500,
                                    marginLeft: moderateScale(4),
                                }}>
                                Amenities: {Amenities && 'select amenities'}
                            </Text>
                        </View>

                        <View style={{ marginTop: moderateScale(10) }}>
                            <Text
                                style={{
                                    fontSize: moderateScale(18),
                                    fontWeight: 500,
                                    marginLeft: moderateScale(4),
                                }}>
                                Bed Status:
                            </Text>

                            <View
                                style={{
                                    margin: moderateScale(10),
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: moderateScale(8),
                                }}>
                                {/* Vacant Button */}
                                <TouchableOpacity
                                    style={{
                                        width: moderateScale(15),
                                        height: moderateScale(15),
                                        borderWidth: 1,
                                        borderRadius: moderateScale(50),
                                        backgroundColor: isTrueRound
                                            ? Colors.GREEN35
                                            : 'transparent',
                                        borderColor: isTrueRound ? Colors.GREEN35 : '#ccc',
                                    }}
                                    onPress={() => setIsTrueRound(true)}
                                />
                                <Text style={{ fontSize: 14, fontWeight: '700' }}> Vacant</Text>

                                {/* Filled Button */}
                                <TouchableOpacity
                                    style={{
                                        width: moderateScale(15),
                                        height: moderateScale(15),
                                        borderWidth: 1,
                                        borderRadius: moderateScale(50),
                                        backgroundColor: !isTrueRound
                                            ? Colors.GREEN35
                                            : 'transparent',
                                        borderColor: !isTrueRound ? Colors.GREEN35 : '#ccc',
                                    }}
                                    onPress={() => setIsTrueRound(false)}
                                />
                                <Text style={{ fontSize: 14, fontWeight: '700' }}> Filled</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View>
                    <FlatList
                        data={pairedRoomsD}
                        keyExtractor={(_, index) => index.toString()}
                        numColumns={3}
                        columnWrapperStyle={{
                            justifyContent: 'space-between',
                            marginBottom: moderateScale(10),
                        }}
                        renderItem={({ item }) => (
                            <View
                                style={{
                                    borderWidth: 1,
                                    borderColor: '#ccc',
                                    borderRadius: moderateScale(6),
                                    overflow: 'hidden',
                                    backgroundColor: '#fff',
                                    width: moderateScale(70),
                                    justifyContent: 'center',
                                }}>
                                {item.map(bed => {
                                    const isSelected = selectedItems.includes(bed.id);
                                    const isAlreadyBooked = bed.isBooked;

                                    const isDisabled = isAlreadyBooked && !isFilled;

                                    const isCurrentlyFilled =
                                        isFilled && filledItems.includes(bed.id);

                                    return (
                                        <TouchableOpacity
                                            key={bed.id}
                                            disabled={isDisabled}
                                            onPress={() => {
                                                if (bed.isBooked && isTrueRound) return; // Disable click in Vacant mode if already booked

                                                if (isFilled) {
                                                    setFilledItems(
                                                        prev =>
                                                            prev.includes(bed.id)
                                                                ? prev.filter(id => id !== bed.id)
                                                                : [...prev, bed.id],
                                                        setIsFilled(true),
                                                    );
                                                } else {
                                                    setSelectedItems(prev =>
                                                        prev.includes(bed.id)
                                                            ? prev.filter(id => id !== bed.id)
                                                            : [...prev, bed.id],
                                                    );
                                                }
                                                navigate('TenantScreen');
                                            }}
                                            style={{
                                                height: moderateScale(40),
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                borderBottomWidth: 1,
                                                borderColor: '#eee',
                                                backgroundColor: bed.isBooked
                                                    ? isTrueRound
                                                        ? 'transparent'
                                                        : Colors.GREEN35
                                                    : isSelected
                                                        ? Colors.GREEN35
                                                        : Colors.WHITE,

                                                opacity: isDisabled ? 0.8 : 1,
                                            }}>

                                            <View
                                                style={{
                                                    width: '100%',
                                                    // backgroundColor: '#8ED1FC',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}>
                                                <Image
                                                    style={{
                                                        width: moderateScale(24),
                                                        height: moderateScale(24),
                                                        resizeMode: 'contain',
                                                    }}
                                                    source={
                                                        isSelected || isCurrentlyFilled
                                                            ? bed.badW
                                                            : bed.image
                                                    }
                                                />
                                                <Text style={{ fontSize: 10, fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.4)' }}>
                                                    {filledItems.includes(bed.id)
                                                        ? filledItems.indexOf(bed.id) + 1
                                                        : bed.num}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        )}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

export default DRselect

const styles = StyleSheet.create({})