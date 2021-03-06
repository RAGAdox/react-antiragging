import React from "react";
import {
  createStackNavigator,
  createBottomTabNavigator,
  createDrawerNavigator,
  createAppContainer
} from "react-navigation";
import HomeScreen from "./screens/Home";
import LoginScreen from "./screens/Login";
import ProfileScreen from "./screens/Profile";
import SignUpScreen from "./screens/Signup";
import ComplainScreen from "./screens/Complain";
import HelpScreen from "./screens/Help";
import MembersScreen from "./screens/Members";
import MyComplainsScreen from "./screens/MyComplains";
const MainNavigator = createStackNavigator({
  Home: { screen: HomeScreen },
  Login: { screen: LoginScreen },
  Profile: { screen: ProfileScreen },
  Signup: { screen: SignUpScreen },
  Complain: { screen: ComplainScreen },
  Help: { screen: HelpScreen },
  Members: { screen: MembersScreen },
  MyComplains: { screen: MyComplainsScreen }
});
const TabNavigator = createBottomTabNavigator({
  Home: { screen: HomeScreen },
  Login: { screen: LoginScreen }
});
const MyDrawerNavigator = createDrawerNavigator({
  Home: { screen: HomeScreen },
  Login: { screen: LoginScreen },
  Profile: { screen: ProfileScreen },
  Signup: { screen: SignUpScreen },
  Complain: { screen: ComplainScreen },
  Help: { screen: HelpScreen },
  Members: { screen: MembersScreen },
  MyComplains: { screen: MyComplainsScreen }
});
App = createAppContainer(MyDrawerNavigator);
export default App;
