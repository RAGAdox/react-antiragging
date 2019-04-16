import React from "react";
import { Component } from "react-native";
import {
  Button,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Text,
  View,
  AsyncStorage
} from "react-native";
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
      token: ""
    };
  }
  /*didBlurSubscription = this.props.navigation.addListener(
    'didBlur',
    payload => {
      console.debug('didBlur', payload);
      console.warn('didBlur')
    }
  );*/
  willFocusSubscription=this.props.navigation.addListener(
    'didFocus',
    payload=>{
      //console.warn('willFocus')
      this.tkn().then(() => {
        fetch(urlAPI.url + "/passauth/checktoken", {
          method: "GET",
          headers: {
            Authorization: "Bearer " + this.state.token
          }
        })
          .then(response => response.json())
          .then(responseJSON => {
            this.setState({
              isLoading: false,
              message: responseJSON.message,
              success: responseJSON.success
            });
          }).then(()=>this.forceUpdate());
      });
    }
  )
  
  // Remove the listener when you are done
  //didBlurSubscription.remove();
  async tkn() {
    this.setState({
      token: await AsyncStorage.getItem("secure_token"),
    });
    authUser.token=await AsyncStorage.getItem("secure_token")
    authUser.username=await AsyncStorage.getItem("username")
  }
  componentDidMount() {
    return this.tkn().then(() => {
      fetch(urlAPI.url + "/passauth/checktoken", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + this.state.token
        }
      })
        .then(response => response.json())
        .then(responseJSON => {
          this.setState({
            isLoading: false,
            message: responseJSON.message,
            success: responseJSON.success
          });
        });
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      );
    }
    if (this.state.success == false) {
      console.warn(this.state.success + this.state.message + this.state.token);
      return (
        <View style={styles.container}>
          <Text>Must login First{this.state.message}</Text>
          <Button title="Go To Login" onPress={() => navigate("Login")} />
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
        <View style={styles.container}>
          <Button
            style={styles.button}
            title="COMPLAIN"
            onPress={() => navigate("Complain")}
          />
          <Text>{"\n\n"}</Text>
          <Button title="HELP A FRIEND" onPress={() => navigate("Help")} />
        </View>
      );
    } else {
      return (
        <View>
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
