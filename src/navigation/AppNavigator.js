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
import PGselectBad from '../component/PGselectBad';
import DRselect from '../component/DRselect';
import DRManagement from '../component/DRManagement';
import CheckSummaryScreen from '../component/CheckSummaryScreen';
import LoginScreen from '../screen/LoginScreen';
import RegisterScreen from '../screen/RegisterScreen';
import TransactionScreen from '../component/TransactionScreen';
// import NewPGRoom from '../component/PGselectBad';
import PaymentManagament from '../component/PaymentManagement';
import ScreenContextFun from '../utils/Context/Screen';
import NewPGRoom from '../screen/NewPGRoom';


export default function AppNavigator() {

    const Stack = createNativeStackNavigator();


    return (
        <>
            <ScreenContextFun>
                <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='SplashScreen'>
                    <Stack.Screen name='SplashScreen' component={SplashScreen} />
                    <Stack.Screen name='LoginScreen' component={LoginScreen} />
                    <Stack.Screen name='RegisterScreen' component={RegisterScreen} />


                    <Stack.Screen name='DrawerNavigator' component={DrawerNavigator} />
                    <Stack.Screen name='HomeScreen' component={HomeScreen} />
                    <Stack.Screen name='RoomsScreen' component={RoomsScreen} />
                    <Stack.Screen name='TenantScreen' component={TenantScreen} />
                    <Stack.Screen name='TransactionScreen' component={TransactionScreen} />

                    <Stack.Screen name='Rent Management' component={RentManagement} />
                    <Stack.Screen name='UserImageCapture' component={UserImageCapture} />
                    <Stack.Screen name='PaymentManagament' component={PaymentManagament} />
                    <Stack.Screen name='DRManagement' component={DRManagement} />
                    <Stack.Screen name='CheckSummaryScreen' component={CheckSummaryScreen} />

                    <Stack.Screen name='PGselectBad' component={PGselectBad} />
                    {/* <Stack.Screen name='NewPGRoom' component={NewPGRoom} /> */}
                    {/* <Stack.Screen name='NewTenants' component={NewTenants} /> */}
                    <Stack.Screen name='DRselect' component={DRselect} />
                    <Stack.Screen name='NewPGRoom' component={NewPGRoom} />

                </Stack.Navigator>
            </ScreenContextFun>
        </>
    )
}