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
import authUser from "./Services/tokens";
const MainNavigator = createStackNavigator({
  Home: { screen: HomeScreen },
  Login: { screen: LoginScreen },
  Profile: { screen: ProfileScreen },
  Signup: { screen: SignUpScreen },
  Complain: { screen: ComplainScreen },
  Help: { screen: HelpScreen }
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
  Help: { screen: HelpScreen }
});
class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      isFetching:true,
      token:'',
      username:'',
      success:false
    }
    this.CheckToken=this.CheckToken.bind(this);
  }
  static username='ADMIN'
  async tkn() {
    this.setState({
      token: await AsyncStorage.getItem("secure_token"),
      username:await AsyncStorage.getItem('username')
    });
  }
  CheckToken() {
    return this.tkn().then(() => {
      fetch(urlAPI.url + "/passauth/checktoken", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + this.state.token
        }
      })
        .then(response => response.json())
        .then(responseJSON => {
          //console.warn(this.state.token + "   success=" + responseJSON.success);
          this.setState({
            isFetching: false,
            message: responseJSON.message,
            success: responseJSON.success
          });
        });
    }).then('Component Mounted in App.js');
  }
  
}
App = createAppContainer(MyDrawerNavigator);
export default App;
