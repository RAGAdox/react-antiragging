import React from 'react';
import {Component} from 'react-native';
import {Button, StyleSheet,FlatList,ActivityIndicator, Text, View } from 'react-native';
import styles from './stylesheet/style';
class Home extends React.Component {
    static navigationOptions = {
        title: 'Welcome',
      };
      constructor(props){
        super(props);
        this.state ={ isLoading: true}
      }
      componentDidMount(){
        return fetch('http://192.168.42.83:2000')
          .then((response) => response.json())
          .then((responseJson) => {
    
            this.setState({
              isLoading: false,
              dataSource: responseJson.msg,
            }, function(){
    
            });
    
          })
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
              <Text style={styles.text}>this is home .Lets Code</Text>
            
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