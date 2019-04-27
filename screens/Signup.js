import React from "react";
import { Component } from "react-native";
import {
  Text,
  View,
  TextInput,
  Button,
  Keyboard,
  KeyboardAvoidingView,
  TouchableOpacity
} from "react-native";
import ActionBar from "react-native-action-bar";

import styles from "./stylesheet/style";
import authUser from "../Services/tokens";
import { ScrollView } from "react-native-gesture-handler";
import urlAPI from "../config";
class Signup extends React.Component {
  static navigationOptions = {
    title: "SignUp"
  };
  constructor(props) {
    super(props);
    this.state = {
      validated: false,
      username: "",
      name: "",
      password: "",
      passwordConfirm: "",
      collegeName: "",
      presentAddress: "",
      phoneNumber: "",
      email: "",
      warning: "",
      success: "",
      showKeyboard: false
    };
  }
  static keyboardShow = false;
  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        this.setState({
          showKeyboard: true
        });
      }
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        this.setState({
          showKeyboard: false
        });
      }
    );
  }
  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  editable() {
    if (authUser.username && authUser.token) {
      /*this.setState({
          message: "Already Logged in"
        });*/
      return false;
    } else return true;
  }
  willFocusSubscription = this.props.navigation.addListener(
    "willFocus",
    payload => {
      if (this.editable()) {
        this.setState({ message: "" });
      } else {
        console.warn("editable function returns false");
        this.setState({ message: "Already Logged in" });
      }
    }
  );
  async postSaveUser() {
    var users = {
      username: this.state.username,
      name: this.state.name,
      password: this.state.password,
      staffStatus: false,
      collegeName: this.state.collegeName,
      presentAddress: this.state.presentAddress,
      phoneNumber: this.state.phoneNumber,
      email: this.state.email
    };

    var formBody = [];
    for (var property in users) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(users[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    //console.warn(formBody)
    try {
      let response = await fetch(urlAPI.url + "/passauth/signup", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: formBody
      });
      let responseJSON = await response.json();
      //console.warn(responseJSON)
      //return responseJSON.success;
      if (responseJSON.success == true)
        this.setState({ success: true, message: responseJSON.message });
      else {
        let errorMessage = "";
        console.warn(typeof responseJSON.message);
        if (typeof responseJSON.message == "string") {
          errorMessage = responseJSON.message;
          //console.warn('error message= after for loop'+errorMessage)
        } else {
          console.warn(responseJSON.message.length);
          var i;
          for (i = 0; i < responseJSON.message.length; i++)
            errorMessage +=
              responseJSON.message[i].msg +
              " of " +
              responseJSON.message[i].param +
              "\n";
          //console.warn('error message= not for loop'+errorMessage)
        }

        this.setState({
          success: false,
          warning: errorMessage,
          message: responseJSON.message
        });
        /*for(var tag in responseJSON.error)
                    console.warn(tag)*/
        //console.warn(users)
      }
    } catch (err) {
      //return null;
      this.setState({
        success: false,
        warning: "Some error occured"
      });
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

        <Text style={styles.heading}>Signup</Text>
        <ScrollView
          style={[
            styles.scroller,
            this.state.showKeyboard == true ? styles.resize : null
          ]}
          alwaysBounceVertical="true"
        >
          <Text style={styles.lable}>Username</Text>
          <TextInput
            editable={this.editable()}
            placeholder="Username"
            style={[
              styles.input,
              this.state.username == "INVALID" ? styles.invalid : null
            ]}
            onChangeText={username => this.setState({ username })}
            onBlur={() => {
              if (this.state.username.length < 5) {
                this.setState({
                  validated: false,
                  username: "INVALID"
                });
              } else {
                this.setState({
                  validated: true
                });
              }
            }}
          />
          <Text style={styles.lable}>Full Name</Text>
          <TextInput
            editable={this.editable()}
            placeholder="Name"
            style={[
              styles.input,
              this.state.name == "INVALID" ? styles.invalid : null
            ]}
            onChangeText={name => this.setState({ name })}
            onBlur={() => {
              if (this.state.name.length == 0) {
                this.setState({
                  validated: false,
                  name: "INVALID"
                });
              } else {
                this.setState({
                  validated: true
                });
              }
            }}
          />
          <Text style={styles.lable}>Password</Text>
          <TextInput
            editable={this.editable()}
            secureTextEntry={true}
            placeholder="Password"
            style={[
              styles.input,
              this.state.password == "INVALID" ? styles.invalid : null
            ]}
            onChangeText={password => this.setState({ password })}
            onBlur={() => {
              if (this.state.password.length < 5) {
                this.setState({
                  validated: false,
                  password: "INVALID"
                });
              } else {
                this.setState({
                  validated: true
                });
              }
            }}
          />
          <Text style={styles.lable}>Confirm Password</Text>
          <TextInput
            editable={this.editable()}
            placeholder="Confirm Password"
            style={[
              styles.input,
              this.state.passwordConfirm == "INVALID" ? styles.invalid : null
            ]}
            secureTextEntry={true}
            onChangeText={passwordConfirm => {
              this.setState({ passwordConfirm });
            }}
            onBlur={() => {
              if (this.state.passwordConfirm != this.state.password) {
                this.setState({
                  validated: false,
                  passwordConfirm: "INVALID"
                });
              } else {
                this.setState({
                  validated: true
                });
              }
            }}
          />
          <Text style={styles.lable}>College Name</Text>
          <TextInput
            editable={this.editable()}
            placeholder="College Name"
            style={[
              styles.input,
              this.state.collegeName == "INVALID" ? styles.invalid : null
            ]}
            onChangeText={collegeName => this.setState({ collegeName })}
            onBlur={() => {
              if (this.state.collegeName.length == 0) {
                this.setState({
                  validated: false,
                  collegeName: "INVALID"
                });
              } else {
                this.setState({
                  validated: true
                });
              }
            }}
          />
          <Text style={styles.lable}>Present Address</Text>
          <TextInput
            editable={this.editable()}
            placeholder="Present Address"
            style={[
              styles.input,
              this.state.presentAddress == "INVALID" ? styles.invalid : null
            ]}
            onChangeText={presentAddress => this.setState({ presentAddress })}
            onBlur={() => {
              if (this.state.presentAddress.length == 0) {
                this.setState({
                  validated: false,
                  presentAddress: "INVALID"
                });
              } else {
                this.setState({
                  validated: true
                });
              }
            }}
          />
          <Text style={styles.lable}>Phone Number</Text>
          <TextInput
            editable={this.editable()}
            placeholder="Phone Number"
            style={[
              styles.input,
              this.state.phoneNumber == "INVALID" ? styles.invalid : null
            ]}
            onChangeText={phoneNumber => this.setState({ phoneNumber })}
            onBlur={() => {
              if (
                !isNaN(this.state.phoneNumber) &&
                this.state.phoneNumber.length == 10
              ) {
                this.setState({
                  validated: true
                });
              } else {
                this.setState({
                  validated: false,
                  phoneNumber: "INVALID"
                });
              }
            }}
          />
          <Text style={styles.lable}>Email Address</Text>
          <TextInput
            editable={this.editable()}
            placeholder="Email Adderss"
            style={[
              styles.input,
              this.state.email == "INVALID" ? styles.invalid : null
            ]}
            onChangeText={email => this.setState({ email })}
            onBlur={() => {
              var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
              if (re.test(this.state.email))
                this.setState({
                  validated: true
                });
              else {
                console.warn("Invalid Email");
                this.setState({
                  email: "INVALID",
                  validated: false
                });
              }
            }}
          />
          <Text>{this.state.warning}</Text>
          <Text>{this.state.message}</Text>
          <TouchableOpacity
            style={styles.button}
            title="Signup"
            onPress={() => {
              console.warn("Button Press");
              if (
                this.state.username != "INVALID" &&
                this.state.password != "INVALID" &&
                this.state.passwordConfirm != "INVALID" &&
                this.state.name != "INVALID" &&
                this.state.collegeName != "INVALID" &&
                this.state.presentAddress != "INVALID" &&
                this.state.phoneNumber != "INVALID" &&
                this.state.email != "INVALID" &&
                this.state.validated == true
              ) {
                this.postSaveUser().then(() => {
                  /*console.warn(this.state.success)*/
                  if (this.state.success == true) navigate("Login");
                });
              }
            }}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}
export default Signup;
