
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import Animated, { FadeInLeft, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { moderateScale, screenHeight, screenWidth } from '../utils/Metrics';
import { Images } from '../assets/image/image';
import LinearGradient from 'react-native-linear-gradient';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

const Colors = {
    BACKGROUND: '#f5f5ef',
    PRIMARY: '#046d92',
    ALERT: '#a6252c',
    CARD: '#ffffff',
    SOFT_CARD: '#f1f2f2',
    WHITE: '#ffffff',
    GRAY85: '#d3d3d3',
}

const Fonts = {
    POPPINS_SEMIBOLD: 'Poppins-SemiBold',
}

export default function DrawerView({
    translateX,
    currentscreen,
    setCurrentScreen,
    setOpen
}) {
    const AnimatedCard = Animated.createAnimatedComponent(TouchableOpacity);
    const [MyWidth, setMyWidth] = useState(Dimensions.get('window').width);
    const { navigate } = useNavigation();

    const draweropenstyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }]
        }
    }, [])

    const NavigationNextScreen = (screen) => {
        setCurrentScreen(screen);
        setOpen(false)
        translateX.value = withTiming(-MyWidth * 0.8, { duration: 500 })
    }

    return (
        <Animated.View style={[styles.container, draweropenstyle]}>
            <View>
                <AnimatedCard
                    entering={FadeInLeft.duration(500).delay(200)}
                    style={styles.HederCenterStyle}
                >
                    <Image
                        style={styles.profileImage}
                        source={Images.SplashScreen}
                    />
                    <View>
                        <Text style={styles.HeaderText}>Sebzy</Text>
                        <Text style={styles.HeaderTextSmall}>PG Management</Text>
                    </View>
                </AnimatedCard>
            </View>

            <AnimatedCard
                entering={FadeInLeft.duration(500).delay(200)}
                style={styles.HederCenterStyle} >
                <Image
                    style={styles.userImage}
                    source={Images.USER}
                />
                <View style={{ marginLeft: moderateScale(8) }}>
                    <Text style={styles.HeaderText}>Johan</Text>
                    <Text style={styles.HeaderTextSmall}>India</Text>
                </View>
            </AnimatedCard>

            {renderMenuItem('Dashboard', currentscreen, Images.USER, NavigationNextScreen)}
            {renderMenuItem('RoomsScreen', currentscreen, Images.ROOMTOTAL, NavigationNextScreen)}
            {renderMenuItem('NewTenants', currentscreen, Images.TENATES, NavigationNextScreen)}
            {renderMenuItem('Rent Management', currentscreen, Images.RENT, NavigationNextScreen)}
            {renderMenuItem('History', currentscreen, Images.History, NavigationNextScreen)}

        </Animated.View >
    )
}

function renderMenuItem(screen, currentscreen, icon, NavigationNextScreen) {
    const isSelected = currentscreen === screen;
    return (
        <View style={[
            styles.menuItemContainer,
            { borderLeftWidth: isSelected ? 5 : 0, borderColor: isSelected ? Colors.PRIMARY : '' }
        ]}>
            {isSelected && <View style={styles.selectedBackground} />}
            <View style={styles.menuItemOverlay}>
                <TouchableOpacity
                    onPress={() => NavigationNextScreen(screen)}
                    style={styles.SelectedStyle}
                >
                    <View style={styles.menuIconContainer}>
                        <Image
                            style={styles.menuIcon}
                            source={icon}
                        />
                    </View>
                    <Text style={styles.HeaderText}>{screen}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: widthPercentageToDP(80),
        height: heightPercentageToDP(87),
        backgroundColor: Colors.BACKGROUND,
        position: 'absolute',
        bottom: 0,
        zIndex: 500,
    },
    HederCenterStyle: {
        width: "90%",
        height: 60,
        paddingLeft: 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap: moderateScale(6),
        padding: moderateScale(2),
        backgroundColor: Colors.SOFT_CARD,
        alignSelf: 'center',
        marginVertical: moderateScale(10),
        borderRadius: moderateScale(16),
        borderWidth: 1,
        borderColor: Colors.PRIMARY
    },
    HeaderText: {
        fontSize: moderateScale(18),
        fontFamily: Fonts.POPPINS_SEMIBOLD,
        color: Colors.PRIMARY,
        fontWeight: '700',
        zIndex: 1
    },
    HeaderTextSmall: {
        fontSize: moderateScale(14),
        fontFamily: Fonts.POPPINS_SEMIBOLD,
        color: Colors.PRIMARY,
    },
    profileImage: {
        width: moderateScale(42),
        height: moderateScale(42),
        borderRadius: moderateScale(8),
    },
    userImage: {
        width: moderateScale(36),
        height: moderateScale(36),
        backgroundColor: Colors.CARD,
        borderRadius: moderateScale(30),
    },
    menuItemContainer: {
        width: '90%',
        height: 60,
        alignSelf: 'center',
        borderRadius: 12,
        overflow: 'hidden',
    },
    selectedBackground: {
        flex: 1,
        backgroundColor: Colors.PRIMARY + '33'
    },
    menuItemOverlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
    },
    SelectedStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: moderateScale(20),
        marginVertical: moderateScale(10),
        borderRadius: moderateScale(16),
        opacity: moderateScale(0.9)
    },
    menuIconContainer: {
        width: moderateScale(40),
        height: moderateScale(40),
        backgroundColor: Colors.SOFT_CARD,
        borderRadius: moderateScale(12),
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: moderateScale(10),
    },
    menuIcon: {
        width: moderateScale(26),
        height: moderateScale(26),
        tintColor: Colors.PRIMARY
    }
})