import axios from 'axios';
import AppLoader from './AppLoader';
import React, { useEffect, useState } from 'react';
import { COLOURS } from './Components/ThemeColours';
import * as Animatable from 'react-native-animatable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity, StatusBar } from 'react-native';

import { BASE_URL } from './Config';

const ChangePassword = ({ navigation }) => {

    const [token, setToken] = useState(null);
    const [pswderror, setPswdError] = useState(false);
    const [cnfrmpswderror, setCnfrmPswdError] = useState(false);

    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState('');
    const [password_confirmation, setConfirm_Password] = useState('');


    useEffect(() => {
        checkLogin()
    }, [])

    const checkLogin = async () => {

        let t = await AsyncStorage.getItem("token");

        setToken(t);

        if (t == null) {
            navigation.replace('Login');
        }
    }

    const password_change = async () => {

        // 
        if (password.length == '' && pswderror == false || password_confirmation.length == '' && cnfrmpswderror == false) {
            setPswdError(true)
            setCnfrmPswdError(true)
          }
      
          else if (password.length == '' && pswderror == false) {
            setPswdError(true)
          }
          
          else if (password_confirmation.length == '' && cnfrmpswderror == false) {
            setCnfrmPswdError(true)
          }

          else if (password_confirmation != 0 && password.length != 0) {
            setLoading(true)
          }
          
          else  {
            setLoading(false)
            setPswdError(false);
            setCnfrmPswdError(false);

          }
        
        let userToken = await AsyncStorage.getItem("token");

        if (userToken != null) {

            await axios({
                method: 'post',
                url: BASE_URL + '/changepassword',

                data: {
                    password: password,
                    password_confirmation: password_confirmation,
                },

                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer  ${userToken}`,
                }
            })
                .then(function (response) {
                    console.log(response.data)
                    if (response.status == 200) {
                        setLoading(false)
                        navigation.replace('Login')
                    }
                })

                .catch(function (error) {
                    console.log(error);
                })
        }
    }

    return (
        <>
            <StatusBar backgroundColor={'#eee'} barStyle='dark-content' />
            {
                (loading == true) ?
                    <AppLoader />
                    :
                    <ScrollView style={{ height: '100%', backgroundColor: COLOURS.white }}>

                        <View style={{ height: '100%', width: '100%', backgroundColor: COLOURS.white }}>

                            <View style={styles.child_container}>
                                <TouchableOpacity style={styles.btn_align} activeOpacity={0.6} onPress={() => navigation.goBack()} >
                                    <MaterialIcons name='keyboard-arrow-left' style={styles.name} />
                                </TouchableOpacity>
                                <View>
                                    <Text style={styles.frgt_name}>Change Password</Text>
                                </View>

                                <Text style={styles.pswd_name}>New Password</Text>
                                <Animatable.View animation={pswderror == true && password.length == 0 ? 'shake' : ''} delay={2000} >
                                    <View>
                                        <TextInput placeholder='New Password' placeholderTextColor={'grey'} onChangeText={setPassword}
                                            style={[styles.inpt_here, { borderColor: pswderror == true && password.length == '' ? COLOURS.red : password.length == 2 ? COLOURS.peach : COLOURS.peach }]}
                                        />
                                    </View>
                                </Animatable.View>

                                <Text style={styles.cnfrmpswd_name}>Confirm Password</Text>
                                <Animatable.View animation={cnfrmpswderror == true && password_confirmation.length == 0 ? 'shake' : ''} delay={2000} >
                                    <View>
                                        <TextInput placeholder='Confirm Password' placeholderTextColor={'grey'} onChangeText={setConfirm_Password}
                                            style={[styles.inpt_here, { borderColor: cnfrmpswderror == true && password_confirmation.length == '' ? COLOURS.red : password_confirmation.length == 2 ? COLOURS.peach : COLOURS.peach }]}
                                        />
                                    </View>
                                </Animatable.View>

                                <TouchableOpacity style={styles.btn} onPress={password_change} activeOpacity={0.6}>
                                    <Text style={{ color: 'white', fontSize: 12, paddingVertical: 15, textAlign: 'center', fontFamily: 'Roboto-Bold', letterSpacing: .5, }}>Change </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </ScrollView>
            }
        </>
    )
}

export default ChangePassword

const styles = StyleSheet.create({
    child_container: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    btn_align: {
        marginHorizontal: 20,
        alignSelf: 'flex-start',
    },

    name: {
        width: 40,
        padding: 5,
        fontSize: 30,
        marginTop: 30,
        borderRadius: 7,
        letterSpacing: .5,
        textAlign: 'center',
        color: COLOURS.apple,
        fontFamily: 'Roboto-Bold',
        backgroundColor: COLOURS.peach,
    },

    frgt_name: {
        fontSize: 25,
        marginTop: 60,
        letterSpacing: .5,
        paddingVertical: 10,
        color: COLOURS.apple,
        fontFamily: 'Roboto-Bold',
    },

    pswd_name: {
        width: '100%',
        fontSize: 16,
        marginTop: 40,
        paddingVertical: 10,
        paddingHorizontal: 30,
        color: COLOURS.apple,
        fontFamily: 'Roboto-Medium',
    },

    cnfrmpswd_name: {
        width: '100%',
        fontSize: 16,
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 30,
        color: COLOURS.apple,
        fontFamily: 'Roboto-Medium',
    },

    inpt_here: {
        width: 300,
        borderWidth: 1,
        borderRadius: 5,
        letterSpacing: .3,
        marginVertical: 5,
        color: COLOURS.black,
        paddingHorizontal: 10,
        fontFamily: 'Roboto-Regular',
    },

    btn: {
        width: 300,
        marginTop: 30,
        borderRadius: 5,
        backgroundColor: COLOURS.apple,
    },
})