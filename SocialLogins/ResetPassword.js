import axios from 'axios';
import AppLoader from './AppLoader';
import React, { useEffect, useState } from 'react';
import { COLOURS } from './Components/ThemeColours';
import * as Animatable from 'react-native-animatable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity, StatusBar } from 'react-native';
import { BASE_URL } from './Config';

const ResetPassword = ({ navigation, route }) => {

    const [pswderror, setPswdError] = useState(false);
    const [cnfrmpswderror, setCnfrmPswdError] = useState(false);

    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [password_confirmation, setPassword_Confirmation] = useState('');

    const ResetPasswordHere =  () => {

        if (password.length == 0 &&  pswderror == false && password_confirmation.length == 0 && cnfrmpswderror == false ) {
            setPswdError(true)
            setCnfrmPswdError(true)
        }

        else if (password.length == 0 && pswderror == false ) {
            setPswdError(true)
        }

        else if (password_confirmation.length == 0 && cnfrmpswderror == false ) {
            setCnfrmPswdError(true)
        }

        else if (password.length != 0 && password_confirmation.length != 0 && pswderror == true && cnfrmpswderror == true) {
            setLoading(true);
        }

        else {
            setPswdError(false);
            setCnfrmPswdError(false);
        }


        let user_email = route.params.email;
        let otp = route.params.otp;

         axios({
            method: 'post',
            url: BASE_URL + '/reset-password',

            data: {
                otp: otp,
                email: user_email,
                password: password,
                password_confirmation: password_confirmation,
            },

            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(function (response) {
                console.log(response.data)
                if (response.data.status != 200) {
                    setLoading(false);
                }

                if (response.status == 200) {
                    console.log('password Successfully changed');
                    setLoading(false);
                    navigation.navigate('Login');
                }
            })

            .catch(function (error) {
                console.log(error);
            })
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
                                <TouchableOpacity style={styles.btn_align} activeOpacity={0.6} onPress={() => navigation.goBack()}>
                                    <MaterialIcons name='keyboard-arrow-left' style={styles.name} />
                                </TouchableOpacity>
                                <View>
                                    <Text style={styles.frgt_name}>Reset Password</Text>
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
                                        <TextInput placeholder='Confirm Password' placeholderTextColor={'grey'} onChangeText={setPassword_Confirmation}
                                            style={[styles.inpt_here, { borderColor: cnfrmpswderror == true && password_confirmation.length == '' ? COLOURS.red : password_confirmation.length == 2 ? COLOURS.peach : COLOURS.peach }]}
                                        />
                                    </View>
                                </Animatable.View>

                                <TouchableOpacity style={styles.btn} onPress={ResetPasswordHere} activeOpacity={0.6}>
                                    <Text style={{ color: 'white', fontSize: 12, paddingVertical: 15, textAlign: 'center', fontFamily: 'Roboto-Bold', letterSpacing: .5, }}>Confirm</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </ScrollView>
            }
        </>
    )
}

export default ResetPassword

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
        color: COLOURS.apple,
        paddingHorizontal: 30,
        fontFamily: 'Roboto-Medium'
    },

    cnfrmpswd_name: {
        width: '100%',
        fontSize: 16,
        marginTop: 10,
        paddingVertical: 10,
        color: COLOURS.apple,
        paddingHorizontal: 30,
        fontFamily: 'Roboto-Medium'
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