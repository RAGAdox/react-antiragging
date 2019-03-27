import React from 'react';
import {Component} from 'react-native';
import { StyleSheet, Text, View,Button,TextInput } from 'react-native';
import styles from './stylesheet/style';
let uname="admin",upass="admin";

class Login extends React.Component {
    static navigationOptions = {
        title: 'Login',
      };
      constructor(props) {
        super(props);
        this.state = {
            username: '',
            password:'',
            dataSource1:'',
            success:'',
            token:'',
        };
      }
      async getMsgFromApi() {
        try {
          let response = await fetch(
            'http://192.168.42.83:2000'
          );
          let responseJson = await response.json();
          this.setState({
              dataSource1:responseJson.msg,
          })
          //return responseJson.msg;
        } catch (error) {
          console.error(error);
        }
      }
      async getTokenFromAPI(){
        var details = {
          'username': this.state.username,
          'password': this.state.password
      };
      
      var formBody = [];
      for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
      //console.warn(formBody)
        try {
            let response = await fetch(
              'http://192.168.42.83:2000/passauth/login',
                {
                method:'POST',
                headers:{
                  'Accept': 'application/json',
                  'Content-Type':'application/x-www-form-urlencoded'
                  },
                body:formBody
                }   
            );
        let responseJson = await response.json();
        if(responseJson.success==true)
        this.setState({
            token:responseJson.token,
            success:responseJson.success
            })
        else{
          this.setState({
            token:'Invalid',
            success:responseJson.success
          })
        }
        }
         
        catch (error) {
            console.error(error);
        }
    }
    render() {
        const {navigate} = this.props.navigation;
      return (
        <View style={styles.container}>
            <Text>this is Login</Text>
            <TextInput
          style={{height: 40}}
          placeholder="Username"
          onChangeText={(username) => this.setState({username})}
        />
        <TextInput
          style={{height: 40}}
          placeholder="Password"
          onChangeText={(password) => this.setState({password})}
        />
             <Button
                 title="Login"
              onPress={()=>{this.getTokenFromAPI()}} ></Button>
              <Text>{this.state.token}</Text>
        </View>
      );
    }
  }
  

  export default Login;