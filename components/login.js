import React from "react";
import { Component } from "react-native";
import { Text, View, Button, TextInput } from "react-native";
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }
  render() {
    return (
      <View style={{ padding: "10%" }}>
        <TextInput
          placeholder="Enter Username"
          value={this.state.username}
          onChange={username => this.setState({ username })}
        />
        <TextInput
          placeholder="Enter Password"
          value={this.state.password}
          onChange={password => this.setState({ password })}
        />
        <Button
          title="Login"
          onPress={() => {
            this.getTokenFromAPI().then(() => {
              if (this.state.success) navigate("Profile");
            });
          }}
        />
      </View>
    );
  }
}
export default Login;
