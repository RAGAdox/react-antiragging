import React from "react";
import { Component } from "react-native";
import { ActivityIndicator, Button, Text, View, Platform } from "react-native";
import { Constants, Location, Permissions } from "expo";
import ActionBar from "react-native-action-bar";
import styles from "./stylesheet/style";
import authUser from "../Services/tokens";
import urlAPI from "../config";
import { TextInput } from "react-native-gesture-handler";
class Help extends React.Component {
  static navigationOptions = {
    title: "Help"
  };
  constructor(props) {
    super(props);
    this.state = {
      ragger: "",
      name: "",
      message: "",
      location: null,
      errorMessage: null
    };
  }
  editable() {
    if (authUser.username && authUser.token) {
      return true;
    } else return false;
  }
  willFocusSubscription = this.props.navigation.addListener(
    "didFocus",
    payload => {
      if (this.editable()) {
        this.setState({ message: "" });
      } else {
        console.warn("editable function returns false");
        this.setState({ message: "Not Logged in" });
      }
    }
  );
  showLogin() {
    const { navigate } = this.props.navigation;
    if (!this.editable()) {
      return (
        <React.Fragment>
          <Button title="Login" onPress={() => navigate("Login")} />
        </React.Fragment>
      );
    }
  }
  componentWillMount() {
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        errorMessage:
          "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      });
    } else {
      this._getLocationAsync();
    }
  }
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };
  async postComplainAPI() {
    let details = {
      name: this.state.name,
      ragger: this.state.ragger,
      locationLatitude: this.state.location.coords.latitude,
      locationLongitude: this.state.location.coords.longitude,
      details: this.state.details
    };
    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    try {
      let response = await fetch(urlAPI.url + "/passauth/complain", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + authUser.token,
          username: authUser.username,
          name: authUser.name,
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: formBody
      });
      let responseJson = await response.json();
      if (responseJson.success)
        this.setState({
          message: responseJson.message
        });
      //console.warn(responseJson.message)
      else
        this.setState({
          message: responseJson.message
        });
      //console.warn('Error In registrring Complain')
    } catch (error) {
      console.error(error);
    }
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <ActionBar
          containerStyle={styles.bar}
          title={this.props.navigation.state.routeName}
        />
        <View style={styles.container}>
          <Text style={styles.heading}>Help a Friend</Text>
          <TextInput
            style={styles.input}
            editable={this.editable()}
            placeholder="Name of the Student being Ragged"
            onChangeText={name => this.setState({ name })}
          />
          <TextInput
            style={styles.input}
            editable={this.editable()}
            placeholder="Name of the Ragger"
            onChangeText={ragger => this.setState({ ragger })}
          />
          <TextInput
            style={styles.input}
            editable={this.editable()}
            placeholder="Details"
            onChangeText={details => this.setState({ details })}
          />
          <Button
            title="Help A Friend"
            onPress={() => {
              this.postComplainAPI().then(() => {
                console.warn(
                  "Complain Executed := " +
                    JSON.stringify(this.state.location.coords)
                );
                navigate("MyComplains");
              });
            }}
          />
          <Text>{this.state.message}</Text>
          {this.showLogin()}
        </View>
      </View>
    );
  }
}
export default Help;
