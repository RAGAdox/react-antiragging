import React from 'react';

import { StyleSheet, Text, View } from 'react-native';
import {createStackNavigator,createBottomTabNavigator,createDrawerNavigator, createAppContainer} from 'react-navigation';

import HomeScreen from './screens/Home';
import LoginScreen from './screens/Login';
import ProfileScreen from './screens/Profile';
const MainNavigator = createStackNavigator({
  Home: {screen: HomeScreen},
  Login: {screen: LoginScreen},
  Profile:{screen:ProfileScreen},
});
const TabNavigator = createBottomTabNavigator({
  Home: {screen: HomeScreen},
  Login: {screen: LoginScreen},
});
const MyDrawerNavigator = createDrawerNavigator({
  Home: {screen: HomeScreen},
  Login: {screen: LoginScreen},
  Profile:{screen:ProfileScreen},
});
App=createAppContainer(MyDrawerNavigator);
export default App;

