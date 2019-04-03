import React from 'react';
import {Component} from 'react-native';
import {Button, StyleSheet,FlatList,ActivityIndicator, Text, View,AsyncStorage } from 'react-native';
import styles from './stylesheet/style';
import urlAPI from '../config';
import authUser from '../Services/tokens';

class Home extends React.Component {
    static navigationOptions = {
        title: 'Welcome',
      };
      constructor(props){
        super(props);
        this.state ={ 
          isLoading: false,
          message:''
        }
      }
      async tkn(){
        this.setState({
          message:await AsyncStorage.getItem('secure_token'),
        })
      }
      componentDidMount(){
        return fetch(urlAPI.url)
          .then((response) => response.json())
          .then((responseJson) => {
            this.setState({
              isLoading: false,
              dataSource: responseJson.msg,//+await AsyncStorage.getItem('secure_token'),
            });
    
          }).then(()=>this.tkn())
          .catch((error) =>{
            console.error(error);
          });
      }
     
    render() {
        const {navigate} = this.props.navigation;
        if(this.state.isLoading){
            return(
              <View style={styles.container}>
                <ActivityIndicator/>
              </View>
            )
          }
      
      return (
          <View style={styles.container}>
              <Text style={styles.text}>this is home .Lets Code{'\n'}{this.state.message}</Text>
            
        <Text>{this.state.dataSource}</Text>
              <Button
        title="Go to Login"
        onPress={() => navigate('Login')}
      />
          </View>
        
      );
    }
  }
  
  
//Home= createAppContainer(TabNavigator);
export default Home;