import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screen/HomeScreen';
import { Colors } from '../utils/Theme';
import SplashScreen from '../screen/SplashScreen';
import DrawerNavigator from './DrawerNavigator';
import RoomsScreen from '../screen/RoomsScreen';
import RentManagement from '../screen/RentManagement';
import TenantScreen from '../screen/TenantScreen';
import UserImageCapture from '../component/UserImageCapture';


export default function AppNavigator() {

    const Stack = createNativeStackNavigator();


    return (
        <>
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='SplashScreen'>
                <Stack.Screen name='HomeScreen' component={HomeScreen} />
                <Stack.Screen name='SplashScreen' component={SplashScreen} />
                <Stack.Screen name='DrawerNavigator' component={DrawerNavigator} />
                <Stack.Screen name='Rooms' component={RoomsScreen} />
                <Stack.Screen name='Rent Management' component={RentManagement} />
                <Stack.Screen name='TenantScreen' component={TenantScreen} />
                <Stack.Screen name='UserImageCapture' component={UserImageCapture} />
            </Stack.Navigator>
        </>
    )
}