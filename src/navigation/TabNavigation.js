import { StyleSheet } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screen/HomeScreen';
import RoomsScreen from '../screen/RoomsScreen';
import NewTenants from '../component/NewTenants';
import History from '../screen/History';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ScreenContext } from '../utils/Context/Screen';


const Tab = createBottomTabNavigator();

const TabNavigation = () => {
    const {CurrentScreen,setCurrentScreen} =useContext(ScreenContext)
const ChangeScreen = (screen) =>{
  screen = CurrentScreen;
}
    // useEffect(()=>{
    //   ChangeScreen();
    // },[CurrentScreen])
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#007BFF',
        tabBarInactiveTintColor: 'gray',
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'HomeScreen') {
            // setCurrentScreen(HomeScreen)
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'RoomsScreen') {
            // setCurrentScreen(RoomsScreen)
            iconName = focused ? 'bed' : 'bed-outline';
          } else if (route.name === 'NewTenants') {
            // setCurrentScreen(NewTenants)
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'History') {
            // setCurrentScreen(History)
            iconName = focused ? 'time' : 'time-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Home' }} />
      <Tab.Screen name="RoomsScreen" component={RoomsScreen} options={{ title: 'Room' }} />
      <Tab.Screen name="NewTenants" component={NewTenants} options={{ title: 'Tenants' }} />
      <Tab.Screen name="History" component={History} options={{ title: 'History' }} />
    </Tab.Navigator>
  );
};

export default TabNavigation;

const styles = StyleSheet.create({});



