import axios from 'axios';
import AppLoader from './AppLoader';
import React, { useEffect, useState } from 'react';
import { COLOURS } from './Components/ThemeColours';
import * as Animatable from 'react-native-animatable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity, StatusBar } from 'react-native';
import { BASE_URL } from './Config';

const ForgotPassword = ({ navigation, route }) => {

    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [emailerror, setEmailError] = useState(false);

    const Send_Email = async () => {

        if (email.length == '' && emailerror == false) {
            setEmailError(true)
        }

        else if (email.length != '' && emailerror != true) {

            setLoading(true);
        }

        else {
            setEmailError(false);
        }

        await axios({
            method: 'post',
            url: BASE_URL + '/send-password-reset-email',

            data: {
                email: email,
            },

            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(function (response) {
                console.log(response.data)
                if (response.data.code != 200) {
                    setLoading(false)
                }
                if (response.status == 200) {
                    setLoading(false)
                    navigation.replace('OtpHere', { email: email })
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
                                    <Text style={styles.frgt_name}>Forget Password</Text>
                                </View>

                                <Text style={styles.email_name}>Your Email</Text>
                                <Animatable.View animation={emailerror == true && email.length == '' ? 'shake' : ''} delay={2000} >
                                    <View>

                                        <TextInput placeholder='Email' placeholderTextColor={'grey'} onChangeText={setEmail}
                                            style={[styles.inpt_here, { borderColor: emailerror == true && email.length == '' ? COLOURS.red : email.length == 2 ? COLOURS.peach : COLOURS.peach }]}
                                        />

                                    </View>
                                </Animatable.View>

                                <TouchableOpacity style={styles.btn} onPress={Send_Email}>
                                    <Text style={{ color: 'white', fontSize: 12, paddingVertical: 15, textAlign: 'center', fontFamily: 'Roboto-Bold', letterSpacing: .5, }}>Reset Password</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </ScrollView>
            }
        </>
    )
}

export default ForgotPassword

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
        marginTop: 100,
        letterSpacing: .5,
        paddingVertical: 10,
        color: COLOURS.apple,
        fontFamily: 'Roboto-Bold',
    },

    email_name: {
        width: '100%',
        fontSize: 16,
        marginTop: 40,
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