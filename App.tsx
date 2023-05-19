
import React from 'react'
import {NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from './src/screens/HomeScreen'
import MovieScreen from './src/screens/MovieScreen'
// import useFonts from 'fonts'
const Stack = createStackNavigator()
export default function App(){
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
                name='Home' 
                component={HomeScreen} 
                options={{ headerShown:false }}/>
        <Stack.Screen 
                name='Movie' 
                component={MovieScreen}  
                options={{ headerShown:false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}