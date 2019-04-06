import React from "react";
import { Component } from "react-native";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  AsyncStorage
} from "react-native";
import styles from "./stylesheet/style";
let uname = "admin",
  upass = "admin";
import { SecureStore } from "expo";
import authUser from "../Services/tokens";
import urlAPI from "../config";
import Profile from "./Profile";

class Login extends React.Component {
  static navigationOptions = {
    title: "Login"
  };
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      dataSource1: "",
      success: "",
      token: authUser.token
    };
  }
  async getMsgFromApi() {
    try {
      let response = await fetch(urlAPI.url);
      let responseJson = await response.json();
      this.setState({
        dataSource1: responseJson.msg
      });
      //return responseJson.msg;
    } catch (error) {
      console.error(error);
    }
  }
  async getTokenFromAPI() {
    var details = {
      username: this.state.username,
      password: this.state.password
    };
    //console.warn(details)
    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    //console.warn(formBody)
    try {
      let response = await fetch(urlAPI.url + "/passauth/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: formBody
      });
      let responseJson =await response.json();
      if (responseJson.success == true) {
        
        authUser.username = details.username;
        authUser.token = responseJson.token;
        //await SecureStore.setItemAsync('secure_token',responseJson.token);
        await AsyncStorage.setItem("secure_token", responseJson.token).then(()=>console.warn('token saved'+responseJson.token));
        await AsyncStorage.setItem("username", details.username);
        this.setState({
          //token:await SecureStore.getItemAsync('secure_token'),
          token: await AsyncStorage.getItem("secure_token"),
          success: responseJson.success
        });
      } else {
        this.setState({
          token: "Invalid",
          success: responseJson.success
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>this is Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={username => this.setState({ username })}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
        />
        <Button
          title="Login"
          onPress={() => {
            console.warn('press')
            this.getTokenFromAPI().then(() => {
              console.warn('get API')
              if (this.state.success) navigate("Profile");
            });
          }}
        />
        <Text>{this.state.token}</Text>
      </View>
    );
  }
}

export default Login;
