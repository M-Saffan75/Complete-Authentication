import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Logout = ({ navigation }) => {

    const [token, setToken] = useState(null);

    useEffect(() => {
        checkLogin();
    }, [])

    const checkLogin = async () => {

        let t = await AsyncStorage.getItem("token");

        setToken(t);

        if (t == null) {
            navigation.replace('Login');
        }
    }

    const removeToken = async () => {
        await AsyncStorage.removeItem("token");
    };

    const Logouthere = () => {

        axios({
            method: 'get',
            url: 'https://safanapitest.gmgsolutions.io/api/logout',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer  ${token}`,
            }
        })

            .then(function (response) {
                console.log(response.data);
                removeToken();
                navigation.replace('Login')
            })


            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <>
            <StatusBar backgroundColor={'#eee'} barStyle='dark-content' />
            <View style={{ height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity style={{ backgroundColor: '#000', paddingHorizontal: 20,width:'80%', paddingVertical: 12, borderRadius: 5 }} onPress={Logouthere}>
                    <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold' }}>Logout</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

export default Logout

const styles = StyleSheet.create({})