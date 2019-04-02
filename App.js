import React from 'react';
import {createStackNavigator,createBottomTabNavigator,createDrawerNavigator, createAppContainer} from 'react-navigation';
import HomeScreen from './screens/Home';
import LoginScreen from './screens/Login';
import ProfileScreen from './screens/Profile';
import SignUpScreen from './screens/Signup'
const MainNavigator = createStackNavigator({
  Home: {screen: HomeScreen},
  Login: {screen: LoginScreen},
  Profile:{screen:ProfileScreen},
  Signup:{screen:SignUpScreen}

});
const TabNavigator = createBottomTabNavigator({
  Home: {screen: HomeScreen},
  Login: {screen: LoginScreen},
});
const MyDrawerNavigator = createDrawerNavigator({
  Home: {screen: HomeScreen},
  Login: {screen: LoginScreen}, 
  Profile:{screen:ProfileScreen},
  Signup:{screen:SignUpScreen}
});
App=createAppContainer(MyDrawerNavigator);
export default App;

