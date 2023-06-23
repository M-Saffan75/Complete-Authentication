import React, { useEffect, useState } from 'react'
import { COLOURS } from './Components/ThemeColours'
import { firebase } from '@react-native-firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const Facebook_Logout = ({ navigation }) => {

    const [token, setToken] = useState(null);


    useEffect(() => {
        checkLogin();
    }, [])

    const checkLogin = async () => {

        let t = await AsyncStorage.getItem("token");

        setToken(t);

        if (t == null) {
            navigation.replace('Facebook');
        }
    }

    const removeToken = async () => {
        await AsyncStorage.removeItem("token");
    };


    // const signOut = () => {
    //     firebase.auth().signOut().then(() => {
    //         removeToken();
    //         navigation.replace('Facebook');
    //         console.log('logout successfully')
    //     }).catch((error) => {
    //         console.log(error)
    //     });
    // }

    return (
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={0.6} style={styles.btn2} onPress={signOut}>
                <Text style={{ color: "#fff" }}>𝐋𝐨𝐠𝐨𝐮𝐭 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Facebook_Logout

const styles = StyleSheet.create({

    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        backgroundColor: COLOURS.white
    },

    btn2: {
        padding: 10,
        height: 50,
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