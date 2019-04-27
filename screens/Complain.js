import React from "react";
import { Component } from "react-native";
import {
  ActivityIndicator,
  TextInput,
  Button,
  Text,
  View,
  Picker,
  Platform,
  TouchableOpacity,
  Image
} from "react-native";
import ActionBar from "react-native-action-bar";
import { Constants, Location, Permissions, ImagePicker } from "expo";
import styles from "./stylesheet/style";
import authUser from "../Services/tokens";
import urlAPI from "../config";
import { NavigationEvents } from "react-navigation";
class Complain extends React.Component {
  static navigationOptions = {
    title: "Complain"
  };
  constructor(props) {
    super(props);
    this.state = {
      ragger: "",
      message: "",
      location: null,
      errorMessage: null,
      showDetails: false,
      details: "",
      image: null
    };
  }
  editable() {
    if (
      authUser.username &&
      authUser.token &&
      this.state.errorMessage == null
    ) {
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
          <TouchableOpacity
            style={styles.button}
            title="Login"
            onPress={() => navigate("Login")}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
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
      //console.warn('Error In registrring Complain'+responseJson.message)
    } catch (error) {
      console.error(error);
    }
  }
  showDetails() {
    if (this.state.showDetails)
      return (
        <React.Fragment>
          <TextInput
            style={styles.input}
            editable={this.editable()}
            placeholder="Details"
            onChangeText={details => this.setState({ details })}
          />
        </React.Fragment>
      );
    else return <React.Fragment />;
  }
  _pickImage = async () => {
    console.warn("Image Picker function");
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };
  render() {
    const { navigate } = this.props.navigation;
    let { image } = this.state;
    return (
      <View style={styles.main}>
        <ActionBar
          containerStyle={styles.bar}
          title={this.props.navigation.state.routeName}
        />
        <View style={styles.container}>
          <Text style={styles.heading}>Complain Against Ragging</Text>
          <TextInput
            style={styles.input}
            editable={this.editable()}
            value={this.state.ragger}
            placeholder="Name of the Ragger"
            onChangeText={ragger => this.setState({ ragger })}
          />
          <Picker
            selectedValue={this.state.details}
            //style={{ height: 50, width: 100 }}
            onValueChange={(itemValue, itemIndex) => {
              this.setState({ details: itemValue });
              //console.warn(itemIndex);
              if (itemIndex != 3) this.setState({ showDetails: false });
              else {
                this.setState({ showDetails: true });
              }
              console.warn(this.state.details);
            }}
          >
            <Picker.Item
              label="Dress code ragging"
              value="Dress code ragging"
            />
            <Picker.Item label="Verbal abuse" value="Verbal abuse" />
            <Picker.Item label="Physical abuse" value="Physical abuse" />
            <Picker.Item label="Other" value="other" />
          </Picker>
          {this.showDetails()}

          <TouchableOpacity
            style={styles.button}
            title="Complain"
            onPress={() => {
              this.postComplainAPI().then(() => {
                console.warn(
                  "Complain Executed := " +
                    JSON.stringify(this.state.location.coords)
                );
                navigate("MyComplains");
              });
            }}
          >
            <Text style={styles.buttonText}>Register Complain</Text>
          </TouchableOpacity>
          <Text>{this.state.message}</Text>
          <Text>{this.state.errorMessage}</Text>
          {this.showLogin()}
        </View>
      </View>
    );
  }
}
export default Complain;
