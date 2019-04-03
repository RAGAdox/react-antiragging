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
  async tkn() {
    this.setState({
      token: await AsyncStorage.getItem("secure_token")
    });
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
          //console.warn(this.state.token + "   success=" + responseJSON.success);
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
      return (
        <View>
          <Login />
        </View>
      );
    }

    /*return (
          <View style={styles.container}>
              <Text style={styles.text}>this is home .Lets Code{'\n'}{this.state.message}</Text>
            
        <Text>{this.state.dataSource}</Text>
              <Button
        title="Go to Login"
        onPress={() => navigate('Login')}
      />
          </View>
        
      );*/
    if (this.state.success == true) {
      return (
        <View>
          <Text>
            {this.state.message}
            {this.state.token}
          </Text>
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
}

//Home= createAppContainer(TabNavigator);
export default Home;
