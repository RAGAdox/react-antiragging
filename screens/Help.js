import React from 'react';
import {Component} from 'react-native';
import { ActivityIndicator,Button, Text, View } from 'react-native';
import styles from './stylesheet/style';
import authUser from '../Services/tokens'
import urlAPI from '../config';
class Help extends React.Component{
    static navigationOptions = {
        title: 'Help',
      };
    render(){
    return(
        <View style={styles.container}>
            <Text>Complain Against Ragging</Text>
            <Button
                title='Help A Friend'
                onPress={()=>{console.warn('PRESS')}}></Button>
        </View>
    )
    }
}
export default Help;