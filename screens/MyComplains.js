import React from 'react';
import { Component, Text, View, ScrollView, ActivityIndicator, CheckBox } from 'react-native';
import ActionBar from 'react-native-action-bar'
import styles from './stylesheet/style';

import authUser from '../Services/tokens'
import urlAPI from '../config';
class MyColplains extends React.Component {
    static navigationOptions = {
        title: 'My Complaints'
    }
    constructor(props) {
        super(props)
        this.state = {
            message: '',
            isLoading: true,
            success: false
        }
    }
    willFocusSubscription = this.props.navigation.addListener(
        'didFocus',
        payload => {
            fetch(urlAPI.url + '/passauth/complainAll', {
                method: 'GET',
                headers: {
                    Authorization: "Bearer " + authUser.token,
                    username: authUser.username
                }
            }).then(response => response.json())
                .then(responseJSON => {
                    if (responseJSON.success = true) {
                        this.setState({
                            isLoading: false,
                            success: true,
                            complains: responseJSON.complain,
                        })
                    }
                })
        }
    )
    componentDidMount() {
        fetch(urlAPI.url + '/passauth/complainAll', {
            method: 'GET',
            headers: {
                Authorization: "Bearer " + authUser.token,
                username: authUser.username
            }
        }).then(response => response.json())
            .then(responseJSON => {
                if (responseJSON.success = true) {
                    this.setState({
                        isLoading: false,
                        success: true,
                        complains: responseJSON.complain,
                    })
                }
            })
    }
    showComplainsAll() {
        return this.state.complains.map((data) => {
            return (
                <View style={styles.card}>
                    <Text>Name of Victim :-{data.name}</Text>
                    <Text>Name of Ragger :-{data.ragger}</Text>
                    <Text>Date of Complain :- {data.created_at}</Text>
                    <Text>Attended Status :-</Text><CheckBox disabled value={data.attendedStatus}></CheckBox>
                </View>
            )
        })
    }
    render() {
        const { navigate } = this.props.navigation;
        if (this.state.isLoading) {
            return (
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
        else if (!this.state.isLoading && this.state.success) {
            return (
                <View>
                    <ActionBar
                        containerStyle={styles.bar}
                        title={this.props.navigation.state.routeName}></ActionBar>
                    <ScrollView style={styles.scroller} >
                        {this.showComplainsAll()}
                    </ScrollView>

                </View>
            )
        }
    }
}
export default MyColplains;
