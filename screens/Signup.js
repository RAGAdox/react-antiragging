import React from 'react';
import {Component} from 'react-native';
import {Text,View,TextInput,Button } from 'react-native';
import styles from './stylesheet/style';
import authUser from '../Services/tokens'
import { ScrollView } from 'react-native-gesture-handler';
import urlAPI from '../config';
class Signup extends React.Component{
    static navigationOptions = {
        title: 'SignUp',
      };
    constructor(props){
        super(props);
        this.state ={
            username:'',
            name:'',
            password:'',
            passwordConfirm:'',
            collegeName:'',
            presentAddress:'',
            phoneNumber:'',
            email:'',
            warning:'',
            success:''
        }
    }
    async postSaveUser()
    {
        var users = {
            'username': this.state.username,
            'name':this.state.name,
            'password': this.state.password,
            'staffStatus':true,
            'collegeName':this.state.collegeName,
            'presentAddress':this.state.presentAddress,
            'phoneNumber':this.state.phoneNumber,
            'email':this.state.email,
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
              let response = await fetch(
                urlAPI.url+'/passauth/signup',
                  {
                  method:'POST',
                  headers:{
                    'Accept': 'application/json',
                    'Content-Type':'application/x-www-form-urlencoded'
                    },
                  body:formBody
                  }   
              );
              let responseJSON=await response.json();
              //console.warn(responseJSON)
              //return responseJSON.success;
              if(responseJSON.success==true)
                  this.setState({success:true});
                else {
                  
                  let errorMessage='';
                  console.warn(typeof(responseJSON.message))
                  if(typeof(responseJSON.message)=="string")
                  {
                    errorMessage=responseJSON.message
                    //console.warn('error message= after for loop'+errorMessage)
                  }
                  else{
                    console.warn(responseJSON.message.length)
                    var i;
                    for(i=0;i<responseJSON.message.length;i++)
                    errorMessage+=responseJSON.message[i].msg+' of '+responseJSON.message[i].param +'\n'
                    //console.warn('error message= not for loop'+errorMessage)
                  }
                  
                  this.setState({
                    success:false,
                    warning:errorMessage
                  })
                  /*for(var tag in responseJSON.error)
                    console.warn(tag)*/
                  //console.warn(users)
                };
            }
            catch(err){
                //return null;
                this.setState({
                    success:false,
                    warning:'Some error occured'
                  });
            }
    }
    render() {
        const {navigate} = this.props.navigation;
        return (
        <View style={styles.container}>
            <Text style={styles.heading}>Signup</Text>
            <ScrollView style={styles.forms}>
                <Text style={styles.lable}>Username</Text>
                <TextInput placeholder="Username" style={styles.input} onChangeText={(username) => this.setState({username})}></TextInput>
                <Text style={styles.lable}>Full Name</Text>
                <TextInput placeholder="Name" style={styles.input} onChangeText={(name) => this.setState({name})}></TextInput>
                <Text style={styles.lable}>Password</Text>
                <TextInput placeholder="Password" style={styles.input} onChangeText={(password) => this.setState({password})}></TextInput>
                <Text style={styles.lable}>Confirm Password</Text>
                <TextInput placeholder="Confirm Password" style={styles.input} onChangeText={(passwordConfirm) => {this.setState({passwordConfirm})}}></TextInput>
                <Text style={styles.lable}>College Name</Text>
                <TextInput placeholder="College Name" style={styles.input} onChangeText={(collegeName) => this.setState({collegeName})}></TextInput>
                <Text style={styles.lable}>Present Address</Text>
                <TextInput placeholder="Present Address" style={styles.input} onChangeText={(presentAddress) => this.setState({presentAddress})}></TextInput>
                <Text style={styles.lable}>Phone Number</Text>
                <TextInput placeholder="Phone Number" style={styles.input} onChangeText={(phoneNumber) => this.setState({phoneNumber})}></TextInput>
                <Text style={styles.lable}>Email Address</Text>
                <TextInput placeholder="Email Adderss" style={styles.input} onChangeText={(email) => this.setState({email})}></TextInput>
            </ScrollView> 
            <Text>{this.state.warning}</Text>
            <Button title="Signup" onPress={()=>{
              console.warn('Button Press')
                this.postSaveUser().then(()=>{
                    /*console.warn(this.state.success)*/
                    if(this.state.success==true)
                        navigate('Login');
                })
            }} />
        </View>
        );
    }
}
export default Signup;