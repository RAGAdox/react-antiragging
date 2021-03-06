import React from "react";
import { Component } from "react-native";
import {
  ActivityIndicator,
  Text,
  View,
  AsyncStorage,
  TouchableOpacity
} from "react-native";
import ActionBar from "react-native-action-bar";
import styles from "./stylesheet/style";
import urlAPI from "../config";
import authUser from "../Services/tokens";
import Login from "./Login";
import App from "../App";

class Home extends React.Component {
  static navigationOptions = {
    title: "Welcome"
  };
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      message: "",
      success: false,
      token: "",
      username: ""
    };
  }
  willFocusSubscription = this.props.navigation.addListener(
    "willFocus",
    payload => {
      //console.warn('willFocus')
      this.tkn().then(() => {
        fetch(urlAPI.url + "/passauth/checktoken", {
          method: "GET",
          headers: {
            Authorization: "Bearer " + this.state.token,
            username: this.state.username
          }
        })
          .then(response => response.json())
          .then(responseJSON => {
            this.setState({
              isLoading: false,
              message: responseJSON.message,
              success: responseJSON.success
            });
            if (this.state.success) {
              authUser.token = this.state.token;
              authUser.username = this.state.username;
              authUser.name = responseJSON.name;
            }
          })
          .then(() => this.forceUpdate());
      });
    }
  );

  async tkn() {
    this.setState({
      token: await AsyncStorage.getItem("secure_token"),
      username: await AsyncStorage.getItem("username"),
      name: await AsyncStorage.getItem("name")
    });
  }
  componentDidMount() {
    return this.tkn().then(() => {
      fetch(urlAPI.url + "/passauth/checktoken", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + this.state.token,
          username: this.state.username
        }
      })
        .then(response => response.json())
        .then(responseJSON => {
          this.setState({
            isLoading: false,
            message: responseJSON.message,
            success: responseJSON.success
          });
          if (this.state.success) {
            authUser.token = this.state.token;
            authUser.username = this.state.username;
            authUser.name = responseJSON.name;
          }
        });
    });
  }
  showIndicator() {
    if (authUser.username)
      return (
        <React.Fragment>
          <ActivityIndicator />
        </React.Fragment>
      );
  }
  render() {
    const { navigate } = this.props.navigation;
    if (this.state.isLoading) {
      return (
        <View style={styles.main}>
          <ActionBar
            containerStyle={styles.bar}
            title={this.props.navigation.state.routeName}
          />
          <View style={styles.container}>
            <ActivityIndicator />
          </View>
        </View>
      );
    }
    if (this.state.success == false) {
      //console.warn(this.state.success + this.state.message + this.state.token);
      return (
        <View style={styles.main}>
          <ActionBar
            containerStyle={styles.bar}
            title={this.props.navigation.state.routeName}
          />
          <View style={styles.container}>
            <Text style={styles.heading}>Must login First</Text>
            <TouchableOpacity
              style={styles.button}
              title="Go To Login"
              onPress={() => navigate("Login")}
            >
              <Text style={styles.buttonText}>Go To Login</Text>
            </TouchableOpacity>
            {this.showIndicator()}
          </View>
        </View>
      );
    }
    //this was commented
    /*return (
      
      <View style={styles.container}>
        <Text style={styles.text}>this is home .Lets Code{'\n'}{this.state.message}</Text>
        <Text>{this.state.dataSource}</Text>
        <Button title="Go to Login" onPress={() => navigate('Login') }/>
      </View>
       
    );*/

    if (this.state.success == true) {
      return (
        <View style={styles.main}>
          <ActionBar
            containerStyle={styles.bar}
            title={this.props.navigation.state.routeName}
          />

          <View style={styles.container}>
            <Text style={styles.heading}>
              Welcome {authUser.name}
              {"\n\n"}
            </Text>
            <TouchableOpacity
              style={styles.button}
              title="COMPLAIN"
              onPress={() => navigate("Complain")}
            >
              <Text style={styles.buttonText}>Complain</Text>
            </TouchableOpacity>
            <Text>{"\n\n"}</Text>
            <TouchableOpacity
              style={styles.button}
              title="HELP A FRIEND"
              onPress={() => navigate("Help")}
            >
              <Text style={styles.buttonText}>Help A Friend</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.main}>
          <Login />
        </View>
      );
    }
  }
  /*render() {
  const { navigate } = this.props.navigation;
  if (this.props.isFetching) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }
  if (this.props.success == false) {
    return (
      <View style={styles.container}>
        <Text>Must login First</Text>
        <Button title='Go To Login' onPress={()=>navigate('Login')}></Button>
      </View>
    );
  }
  //this was commented
  return (
        <View style={styles.container}>
            <Text style={styles.text}>this is home .Lets Code{'\n'}{this.state.message}</Text>
          
      <Text>{this.state.dataSource}</Text>
            <Button
      title="Go to Login"
      onPress={() => navigate('Login')}
    />
        </View>
      
    );
  if (this.props.success == true) {
    return (
      <View>
        <Text>
          {this.props.message}
          {this.props.token}
        </Text>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text>{this.props.isFetching}</Text>
        <Text>Login First</Text>
        <Button title='Go to login' onPress={()=>{
          console.warn(App)
          console.warn(this.props)
          navigate('Login')
          }}/>
      </View>
    );
  }
}*/
}

//Home= createAppContainer(TabNavigator);
export default Home;
