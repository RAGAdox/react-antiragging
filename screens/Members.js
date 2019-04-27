import React from "react";
import { Component } from "react-native";
import {
  ActivityIndicator,
  TextInput,
  Button,
  Text,
  View,
  Platform,
  ScrollView,
  TouchableOpacity
} from "react-native";
import ActionBar from "react-native-action-bar";

import styles from "./stylesheet/style";
import authUser from "../Services/tokens";
import urlAPI from "../config";
class Members extends React.Component {
  static navigationOptions = {
    title: "Members"
  };
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      success: false,
      isLoading: true
    };
  }
  willFocusSubscription = this.props.navigation.addListener(
    "willFocus",
    payload => {
      fetch(urlAPI.url + "/passauth/members", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + authUser.token
        }
      })
        .then(response => response.json())
        .then(responseJSON => {
          if (responseJSON.success == true) {
            this.setState({
              isLoading: false,
              success: true,
              superUser: responseJSON.superUser,
              staffUsers: responseJSON.staffUsers
            });
          } else if (responseJSON.success == false) {
            this.setState({
              isLoading: false,
              success: false
            });
          }
        });
    }
  );
  componentDidMount() {
    fetch(urlAPI.url + "/passauth/members", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + authUser.token
      }
    })
      .then(response => response.json())
      .then(responseJSON => {
        if (responseJSON.success == true) {
          this.setState({
            isLoading: false,
            success: true,
            superUser: responseJSON.superUser,
            staffUsers: responseJSON.staffUsers
          });
        } else if (responseJSON.success == false) {
          this.setState({
            isLoading: false,
            success: false
          });
        }
      });
  }
  superUserList() {
    return this.state.superUser.map(data => {
      return (
        <View style={styles.card}>
          <Text>Name:- {data.name}</Text>
          <Text>Phone Number :- {data.phoneNumber}</Text>
          <Text>Present Address :- {data.presentAddress}</Text>
          <Text>Email Address :- {data.email}</Text>
        </View>
      );
    });
  }
  staffUsersList() {
    return this.state.staffUsers.map(data => {
      return (
        <View style={styles.card}>
          <Text>Name:- {data.name}</Text>
          <Text>Phone Number :- {data.phoneNumber}</Text>
          <Text>Present Address :- {data.presentAddress}</Text>
          <Text>Email Address :- {data.email}</Text>
        </View>
      );
    });
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
    } else if (!this.state.isLoading && this.state.success) {
      console.warn(this.state.staffUsers);
      return (
        <View style={styles.main}>
          <ActionBar
            containerStyle={styles.bar}
            title={this.props.navigation.state.routeName}
          />
          <ScrollView style={styles.scroller}>
            <Text style={styles.heading}>Anti Ragging Commity Head</Text>
            {this.superUserList()}
            <Text style={styles.heading}>Anti Ragging Commity Members</Text>
            {this.staffUsersList()}
          </ScrollView>
        </View>
      );
    } else if (!this.state.isLoading && !this.state.success) {
      return (
        <View style={styles.main}>
          <ActionBar
            containerStyle={styles.bar}
            title={this.props.navigation.state.routeName}
          />
          <View style={styles.container}>
            <TouchableOpacity
              style={styles.button}
              title="Go To Login"
              onPress={() => navigate("Login")}
            >
              <Text style={styles.buttonText}>Go To Login</Text>
            </TouchableOpacity>
            <Text>{"\n\n"}</Text>
            <TouchableOpacity
              style={styles.button}
              title="Sign Up"
              onPress={() => navigate("Signup")}
            >
              <Text style={styles.buttonText}>Sign Up as a New User</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
}
export default Members;
