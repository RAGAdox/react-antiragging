import React from 'react';
import {Component} from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import styles from './stylesheet/style';


class Profile extends React.Component {
    static navigationOptions = {
        title: 'Profile',
      };
      async getMsgFromApi() {
        try {
          let response = await fetch(
            'http://192.168.42.83:2000/passauth/profile'
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
    render() {
      return (
          <View style={styles.container}><Text>this is Profile</Text></View>
        
      );
    }
  }
  

  export default Profile;