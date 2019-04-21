import React from "react";
import { Component } from "react-native";
import { Text, View, TextInput, Button } from "react-native";
import ActionBar from 'react-native-action-bar';

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
      username: "",
      name: "",
      password: "",
      passwordConfirm: "",
      collegeName: "",
      presentAddress: "",
      phoneNumber: "",
      email: "",
      warning: "",
      success: ""
    };
  }
  editable() {
    if (authUser.username && authUser.token) {
      /*this.setState({
          message: "Already Logged in"
        });*/
      return false;
    } else return true;
  }
  willFocusSubscription=this.props.navigation.addListener(
    'didFocus',
    payload=>{
      if(this.editable())
      {
        this.setState({message:''})
      }
      else{
        console.warn('editable function returns false')
        this.setState({message:'Already Logged in'})
      }
    })
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
      <View>
          <ActionBar
    containerStyle={styles.bar}
    title={this.props.navigation.state.routeName}></ActionBar>
      <View style={styles.container}>
        <Text style={styles.heading}>Signup</Text>
        <ScrollView style={styles.scroller}>
          <Text style={styles.lable}>Username</Text>
          <TextInput
            editable={this.editable()}
            placeholder="Username"
            style={styles.input}
            onChangeText={username => this.setState({ username })}
          />
          <Text style={styles.lable}>Full Name</Text>
          <TextInput
            editable={this.editable()}
            placeholder="Name"
            style={styles.input}
            onChangeText={name => this.setState({ name })}
          />
          <Text style={styles.lable}>Password</Text>
          <TextInput
            editable={this.editable()}
            secureTextEntry={true}
            placeholder="Password"
            style={styles.input}
            onChangeText={password => this.setState({ password })}
          />
          <Text style={styles.lable}>Confirm Password</Text>
          <TextInput
            editable={this.editable()}
            placeholder="Confirm Password"
            style={styles.input}
            secureTextEntry={true}
            onChangeText={passwordConfirm => {
              this.setState({ passwordConfirm });
            }}
          />
          <Text style={styles.lable}>College Name</Text>
          <TextInput
            editable={this.editable()}
            placeholder="College Name"
            style={styles.input}
            onChangeText={collegeName => this.setState({ collegeName })}
          />
          <Text style={styles.lable}>Present Address</Text>
          <TextInput
            editable={this.editable()}
            placeholder="Present Address"
            style={styles.input}
            onChangeText={presentAddress => this.setState({ presentAddress })}
          />
          <Text style={styles.lable}>Phone Number</Text>
          <TextInput
            editable={this.editable()}
            placeholder="Phone Number"
            style={styles.input}
            onChangeText={phoneNumber => this.setState({ phoneNumber })}
          />
          <Text style={styles.lable}>Email Address</Text>
          <TextInput
            editable={this.editable()}
            placeholder="Email Adderss"
            style={styles.input}
            onChangeText={email => this.setState({ email })}
          />
        </ScrollView>
        <Text>{this.state.warning}</Text>
        <Text>{this.state.message}</Text>
        <Button
          title="Signup"
          onPress={() => {
            console.warn("Button Press");
            this.postSaveUser().then(() => {
              /*console.warn(this.state.success)*/
              if (this.state.success == true) navigate("Login");
            });
          }}
        />
      </View>
      </View>
    );
  }
}
export default Signup;
