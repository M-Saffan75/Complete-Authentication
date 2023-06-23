import React, { useEffect, useState } from 'react'
import { COLOURS } from './Components/ThemeColours';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import auth, { firebase, FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';


const Google_Logout = ({navigation}) => {

    const [token, setToken] = useState(null);

    // useEffect(() => {
    //     checkLogin();
    // }, [])

    // const checkLogin = async () => {

    //     let t = await AsyncStorage.getItem("token");

    //     setToken(t);

    //     if (t == null) {
    //         navigation.replace('Google');
    //     }
    // }

    const removeToken = async () => {
        await AsyncStorage.removeItem("token");
    };

    const signout_Here = async () => {
        try {
            await GoogleSignin.revokeAccess();
            navigation.replace('Login');
            removeToken();
            await auth().signOut();
            console.log('sign Out Success');
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={0.6} onPress={() => signout_Here()} style={styles.btn2}>
                <Text style={{ color: "#fff" }}>𝐆𝐨𝐨𝐠𝐥𝐞 𝐥𝐨𝐠𝐨𝐮𝐭</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Google_Logout
const styles = StyleSheet.create({

    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        backgroundColor: COLOURS.white
    },

    btn2: {
        height: 50,
        padding: 10,
        width: '80%',
        marginTop: 20,
        borderRadius: 3,
        marginHorizontal: 30,
        alignItems: 'center',
        paddingHorizontal: 20,
        justifyContent: 'center',
        backgroundColor: '#4081ec',
    },

})