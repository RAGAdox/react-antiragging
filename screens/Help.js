import React from 'react';
import {Component} from 'react-native';
import { ActivityIndicator,Button, Text, View,Platform } from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import styles from './stylesheet/style';
import authUser from '../Services/tokens'
import urlAPI from '../config';
import { TextInput } from 'react-native-gesture-handler';
class Help extends React.Component{
    static navigationOptions = {
        title: 'Help',
      };
    constructor(props){
        super(props);
        this.state={
            ragger:'',
            name:'',
            message:'',
            location: null,
            errorMessage: null,
        }
    }
    componentWillMount() {
        if (Platform.OS === 'android' && !Constants.isDevice) {
          this.setState({
            errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
          });
        } 
        else {
          this._getLocationAsync();
        }
    }
    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
          this.setState({
            errorMessage: 'Permission to access location was denied',
          });
        }
    
        let location = await Location.getCurrentPositionAsync({});
        this.setState({ location });
    };
    async postComplainAPI(){
        let details={
            'name':this.state.name,
            'ragger':this.state.ragger,
            'locationLatitude':this.state.location.coords.latitude,
            'locationLongitude':this.state.location.coords.longitude
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
    const { navigate } = this.props.navigation;
    return(
        <View style={styles.container}>
            <Text>Complain Against Ragging</Text>
            <TextInput
          style={{height: 40}}
          placeholder="Name of the Student being Ragged"
          onChangeText={(name) => this.setState({name})}
        />
            <TextInput
          style={{height: 40}}
          placeholder="Name of the Ragger"
          onChangeText={(ragger) => this.setState({ragger})}
        />
            <Button
                title='Help A Friend'
                onPress={()=>{this.postComplainAPI().then(()=>console.warn('Complain Executed := '+JSON.stringify(this.state.location.coords)))}}></Button>
            <Text>{this.state.message}**</Text>
        </View>
    )
    }
}
export default Help;