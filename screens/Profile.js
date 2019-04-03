import React from "react";
import { Component } from "react-native";
import {
  ActivityIndicator,
  Text,
  View,
  Button,
  AsyncStorage
} from "react-native";
import styles from "./stylesheet/style";
import authUser from "../Services/tokens";
import urlAPI from "../config";

class Profile extends React.Component {
  static navigationOptions = {
    title: "Profile"
  };
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      success: false,
      message: "",
      user: ""
    };
  }
  /*componentDidUpdate(){
        return this.getMsgFromApi().then(()=>{
          this.setState({isLoading:false})
          
        }  
      )
      }*/
  componentDidMount() {
    return this.getMsgFromApi().then(() => {
      this.setState({ isLoading: false });
    });
  }
  async getMsgFromApi() {
    let formBody = [];
    formBody.push(
      encodeURIComponent("username") +
        "=" +
        encodeURIComponent(authUser.username)
    );
    try {
      let response = await fetch(urlAPI.url + "/passauth/profile", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + authUser.token,
          username: authUser.username
        }
      });
      let responseJson = await response.json();
      //console.warn(responseJson)
      if ((responseJson.success = true))
        this.setState({
          success: responseJson.success,
          user: responseJson.user
        });
      else if ((responseJson.success = false))
        this.setState({
          success: responseJson.success,
          message: responseJson.message
        });
      //return responseJson.msg;
    } catch (error) {
      console.error(error);
    }
  }
  /* render() {
      const {navigate} = this.props.navigation;
    if(this.state.isLoading)
    {
      return(<View><Text>Loading</Text><ActivityIndicator/>
        </View>)
    }
    else{
      if(this.state.success&&this.state.user)
        return (
        <View onload={this.getMsgFromApi} style={styles.container}>
          <Text>this is Profile{"\n"}</Text>
          <Text style={styles.text}>Username{'\t'}{this.state.user.username}</Text>
          <Text>Name{'\t'}{this.state.user.name}</Text>
          <Text>Email{'\t'}{this.state.user.email}</Text>
          <Text>College{'\t'}{this.state.user.collegeName}</Text>
          <Text>Present Address{'\t'}{this.state.user.presentAddress}</Text>
          <Text>Phone Number{'\t'}{this.state.user.phoneNumber}</Text>
        </View>
      
      )
      else{
        //navigate('Login')
        return(
          <View style={styles.container}>
            <Button title='Login' onPress={()=>navigate('Login')} />
            <Text>{'\n\n'}</Text>
            <Button title='Sign Up' onPress={()=>navigate('SignUp')} />
          </View>
        )
    return(
        <View  onload={()=>{if(authUser.username)this.setState({isLoading:true})}} style={styles.container}>
          <Text>{this.state.success}Error Occured{'\n'}{authUser.username}{this.state.message}</Text>
        </View>
      )
    }}
    
    }*/
  whichScreen() {
    if (this.state.isLoading) {
      return (
        <React.Fragment>
          <Text>Loading</Text>
          <ActivityIndicator />
        </React.Fragment>
      );
    } else {
      if (this.state.success && this.state.user) {
        return (
          <React.Fragment>
            <Text>this is Profile{"\n"}</Text>
            <Text style={styles.text}>
              Username{"\t"}
              {this.state.user.username}
            </Text>
            <Text>
              Name{"\t"}
              {this.state.user.name}
            </Text>
            <Text>
              Email{"\t"}
              {this.state.user.email}
            </Text>
            <Text>
              College{"\t"}
              {this.state.user.collegeName}
            </Text>
            <Text>
              Present Address{"\t"}
              {this.state.user.presentAddress}
            </Text>
            <Text>
              Phone Number{"\t"}
              {this.state.user.phoneNumber}
            </Text>
          </React.Fragment>
        );
      } else {
        return (
          <React.Fragment>
            <Button title="Login" onPress={() => navigate("Login")} />
            <Text>{"\n\n"}</Text>
            <Button title="Sign Up" onPress={() => navigate("SignUp")} />
            <Text>{"\n\n"}</Text>
            <Button
              title="Sign Up"
              onPress={() => {
                AsyncStorage.removeItem("secure_token").then(() => {
                  console.warn("Removed");
                });
              }}
            />
          </React.Fragment>
        );
      }
    }
  }
  render() {
    return (
      <View
        onload={() => {
          console.warn("Is not Executing"),
            this.getMsgFromApi().then(() => {
              console.warn("onLoaded"), this.setState({ isLoading: false });
            });
        }}
        style={styles.container}
      >
        {this.whichScreen()}
      </View>
    );
  }
}

export default Profile;
