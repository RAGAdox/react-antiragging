import React from "react";
import { Component } from "react-native";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  AsyncStorage,
  TouchableOpacity
} from "react-native";
import ActionBar from "react-native-action-bar";
import styles from "../screens/stylesheet/style";
import authUser from "../Services/tokens";
import urlAPI from "../config";
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
  /*didBlurSubscription = this.props.navigation.addListener(
    "didBlur",
    payload => {
      this.setState({
        username: "",
        password: "",
        success: "",
        message: "",
        token: ""
      });
    }
  );
  willFocusSubscription = this.props.navigation.addListener(
    "didFocus",
    payload => {
      if (this.editable()) {
        this.setState({ message: "" });
      } else {
        console.warn("editable function returns false");
        this.setState({ message: "Already Logged in" });
      }
    }
  );*/
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
  editable() {
    if (authUser.username && authUser.token) {
      return false;
    } else return true;
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
      let responseJson = await response.json();
      if (responseJson.success == true) {
        authUser.username = details.username;
        authUser.token = responseJson.token;
        authUser.name = responseJson.name;
        //await SecureStore.setItemAsync('secure_token',responseJson.token);
        await AsyncStorage.setItem("secure_token", responseJson.token).then(
          () => console.warn("token saved" + responseJson.token)
        );
        await AsyncStorage.setItem("username", details.username);
        this.setState({
          //token:await SecureStore.getItemAsync('secure_token'),
          token: await AsyncStorage.getItem("secure_token"),
          success: responseJson.success,
          message: responseJson.message
        });
        await AsyncStorage.setItem("name", responseJson.name);
      } else {
        this.setState({
          token: "Invalid",
          success: responseJson.success,
          message: responseJson.message
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.main}>
        <ActionBar
          containerStyle={styles.bar}
          title={this.props.navigation.state.routeName}
        />
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={this.state.username}
            editable={this.editable()}
            onChangeText={username => this.setState({ username })}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            value={this.state.password}
            editable={this.editable()}
            onChangeText={password => this.setState({ password })}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              console.warn("press");
              this.getTokenFromAPI().then(() => {
                console.warn("get API");
                if (this.state.success) navigate("Profile");
              });
            }}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <Text>{this.state.message}</Text>
        </View>
      </View>
    );
  }
}
export default Login;
