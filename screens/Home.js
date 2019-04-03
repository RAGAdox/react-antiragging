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
          token:await AsyncStorage.getItem('secure_token'),
        })
      }
      componentDidMount(){
        return this.tkn().then(()=>{
          fetch(urlAPI.url+'/passauth/checktoken',
          {
            method:'GET',
            headers:{
              'Authorization':"Bearer "+this.state.token,
            }
          })
        .then((response)=>response.json())
        .then((responseJSON)=>{
          this.setState({
            isLoading:false,
            dataSource:responseJSON.message,
          })
        }
        )
      })
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
      if(this.state.success=false)
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
      return(<View><Text>All good</Text></View>)
    }
  }
  
  
//Home= createAppContainer(TabNavigator);
export default Home;