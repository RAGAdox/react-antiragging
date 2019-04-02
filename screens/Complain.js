import React from 'react';
import {Component} from 'react-native';
import { ActivityIndicator,TextInput,Button, Text, View } from 'react-native';
import styles from './stylesheet/style';
import authUser from '../Services/tokens'
import urlAPI from '../config';
class Complain extends React.Component{
    static navigationOptions = {
        title: 'Complain',
      };
      constructor(props){
          super(props);
          this.state={
              ragger:'',
              message:''
          }
      }
      async postComplainAPI(){
        let details={
            'ragger':this.state.ragger,
        }
        var formBody=[]
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
          }
        formBody = formBody.join("&");
        try {
            let response = await fetch(
              urlAPI.url+'/passauth/complain',
              {
                method:'POST',
                headers:{
                  'Authorization':"Bearer "+authUser.token,
                  'username':authUser.username,
                  'Accept': 'application/json',
                  'Content-Type':'application/x-www-form-urlencoded'
                },
                body:formBody
              }
            );
            let responseJson = await response.json();
            if(responseJson.success)
              this.setState({
                  message:responseJson.message
              })
              //console.warn(responseJson.message)
            else
              console.warn('Error In registrring Complain')
        }catch(error){
            console.error(error)
        }
    }
    render(){
    return(
        <View style={styles.container}>
            <Text>Complain Against Ragging</Text>
            <TextInput
          style={{height: 40}}
          placeholder="Name of the Ragger"
          onChangeText={(ragger) => this.setState({ragger})}
        />
            <Button
                title='Complain'
                onPress={()=>{this.postComplainAPI().then(()=>console.warn('Complain Executed'))}}></Button>
            <Text>{this.state.message}</Text>
        </View>
    )
    }
}
export default Complain;