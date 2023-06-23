import axios from 'axios';
import AppLoader from './AppLoader';
import { BASE_URL } from './Config';
import React, { useState } from 'react';
import { COLOURS } from './Components/ThemeColours';
import * as Animatable from 'react-native-animatable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity, StatusBar } from 'react-native';

const OtpHere = ({ navigation, route }) => {

    const [otpcode, setOtpcode] = useState('');
    const [loading, setLoading] = useState(false);
    const [otperror, setOtperror] = useState(false);
    const [otpvalid, setOtpvalid] = useState(true);

    const Send_Email = async () => {

        if (otpcode.length == 0 && otperror == false) {
            setOtperror(true)
        }

        else if (otpcode.length != 0 && otperror != false) {

            setLoading(true);
        }

        else {
            setOtperror(false);
        }

        let user_email = route.params.email;


        await axios({
            method: 'post',
            url: BASE_URL + '/user/otp',

            data: {
                otp: otpcode,
                email: user_email,
            },

            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(function (response) {
                console.log(response.data)

                let code = response.data.code
                setLoading(false);
                if (code != 200) {
                    setLoading(false);
                    setOtpvalid(response.data)
                }

                if (code == 200) {
                    setLoading(false);
                    navigation.navigate('ResetPassword', { email: user_email, otp: otpcode })
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
                                    <Text style={styles.frgt_name}>Your OTP Here</Text>
                                </View>
                                <Text style={{ color: COLOURS.apple, fontSize: 15, marginTop: 40, paddingVertical: 10, fontFamily: 'Roboto-Medium', letterSpacing: 1, textAlign: 'center' }}>Your OTP</Text>

                                <Animatable.View animation={otperror == true && otpcode.length == 0 ? 'shake' : ''} delay={2000} >
                                    <View>
                                        <TextInput placeholder='' keyboardType='number-pad' placeholderTextColor={'grey'} onChangeText={setOtpcode}
                                            style={[styles.inpt_here, { borderColor: otperror == true && otpcode.length == 0 ? COLOURS.red : otpcode.length == 2 ? COLOURS.peach : COLOURS.peach }]}
                                        />
                                    </View>
                                </Animatable.View>
                                <View>
                                    <Text style={{ color: COLOURS.red, fontFamily: 'Roboto-Bold', letterSpacing:.4, }} >
                                        {otpcode.length == 2 || otpvalid.message == true ? otpvalid.message = false : ''}
                                        {otpvalid.message}
                                    </Text>
                                </View>

                                <TouchableOpacity style={styles.btn} onPress={Send_Email}>
                                    <Text style={{ color: 'white', fontSize: 12, paddingVertical: 15, textAlign: 'center', fontFamily: 'Roboto-Bold', letterSpacing: .5, }}>Reset Password</Text>
                                </TouchableOpacity>
                                {/* <FlashMessage position="top"
                                    titleStyle={{ fontFamily: 'Roboto-Bold', }}
                                    textStyle={{ width: '100%', textAlign: 'center', justifyContent: 'center' }}
                                    animationDuration={500} hideOnPress={true} duration={1000} /> */}
                            </View>
                        </View>

                    </ScrollView>
            }
        </>
    )
}

export default OtpHere

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

    inpt_here: {
        height: 45,
        width: 120,
        borderWidth: 1,
        borderRadius: 5,
        letterSpacing: 3,
        marginVertical: 5,
        textAlign: 'center',
        color: COLOURS.black,
        paddingHorizontal: 10,
        fontFamily: 'Roboto-Bold',
    },

    btn: {
        width: 300,
        marginTop: 25,
        borderRadius: 5,
        backgroundColor: COLOURS.apple,
    },
})