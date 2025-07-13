import { createContext, useState } from "react";

export const ScreenContext = createContext('HomeScreen')

import { View, Text } from 'react-native'
import React from 'react'

export default function ScreenContextFun({children}) {
    const [CurrentScreen,setCurrentScreen] = useState('Dashboard')
  return (
   <ScreenContext.Provider value={{CurrentScreen,setCurrentScreen}}>
    {children}
   </ScreenContext.Provider>
  )
}