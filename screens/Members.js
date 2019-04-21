import React from 'react';
import {Component} from 'react-native';
import { ActivityIndicator,TextInput,Button, Text, View ,Platform,ScrollView} from 'react-native';
import ActionBar from 'react-native-action-bar'
import styles from './stylesheet/style';
import authUser from '../Services/tokens'
import urlAPI from '../config';
import { NavigationEvents } from 'react-navigation';
class Members extends React.Component{
    static navigationOptions={
        title:'Members'
    }
    constructor(props){
        super(props);
        this.state={
            message:'',
            success:false,
            isLoading:true,
        }
    }
    componentDidMount(){
        fetch(urlAPI.url+"/passauth/members",{
            method:'GET',
            headers:{
                Authorization: "Bearer " + authUser.token,
            }
        }).then(response=>response.json())
        .then(responseJSON=>{
            if(responseJSON.success==true){
                this.setState({
                    isLoading:false,
                    success:true,
                    superUser:responseJSON.superUser,
                    staffUsers:responseJSON.staffUsers,
                })
            }
        })
    }
    superUserList(){
        return this.state.superUser.map((data) => {
            return (
              <View style={styles.card}>
                  <Text>Name:- {data.name}</Text>
                <Text>Phone Number :- {data.phoneNumber}</Text>
                <Text>Present Address :- {data.presentAddress}</Text>
                <Text>Email Address :- {data.email}</Text>
              </View>
            )
          })
    }
    staffUsersList() {
        return this.state.staffUsers.map((data) => {
          return (
            <View style={styles.card}>
                <Text>Name:- {data.name}</Text>
                <Text>Phone Number :- {data.phoneNumber}</Text>
                <Text>Present Address :- {data.presentAddress}</Text>
                <Text>Email Address :- {data.email}</Text>
            </View>
          )
        })
    
    }
    render(){
        const {navigate}=this.props.navigation;
        if(this.state.isLoading){
            return(
            <View>
                <ActionBar
                    containerStyle={styles.bar}
                    title={this.props.navigation.state.routeName}></ActionBar>
                <View style={styles.container}>
                    <ActivityIndicator />
                </View>
            </View>
            )
        }
        else if(!this.state.isLoading&&this.state.success){
            console.warn(this.state.staffUsers)
            return(
            <View>
                <ActionBar
                    containerStyle={styles.bar}
                    title={this.props.navigation.state.routeName}></ActionBar>
                <ScrollView style={styles.scroller} >
                    <Text style={styles.heading}>Anti Ragging Commity Head</Text>
                    {this.superUserList()}
                    <Text style={styles.heading}>Anti Ragging Commity Members</Text>
                    {this.staffUsersList()}
                    
                </ScrollView>
            </View>
            )
        }
    }
}
/*style={{flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch'}}*/
export default Members;