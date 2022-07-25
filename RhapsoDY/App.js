import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import MainContainer from './screens/MainContainer';
import ProductInfo from './screens/menuBarScreens/ProductInfo';
import MyFave from './screens/menuBarScreens/MyFave';
import RegisterAccount from './screens/RegisterAccount';
import Header from './shared/HeaderBar';
import ProfileScreen from './screens/ProfileScreen';
import UpdateProfileScreen from './screens/UpdateProfileScreen';
import DisplayListing from './screens/DisplayListing';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options= {{ headerShown: false}} name="Login" component={LoginScreen} />
        <Stack.Screen options= {{ headerShown: false}} name="RegisterAccount" component={RegisterAccount} />
        <Stack.Screen options = {{ headerShown: false}} name="Main" component={MainContainer} /> 
        <Stack.Screen options = {{ headerShown: false}} name="Header" component={Header} />
        <Stack.Screen name="Profile Overview" component={ProfileScreen} />
        <Stack.Screen name="Update Profile" component={UpdateProfileScreen} />
        <Stack.Screen name="Your Listings" component={DisplayListing} />
        <Stack.Screen name = "ProductInfo" component = {ProductInfo} />
        <Stack.Screen name= "MyFave" component= {MyFave} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}