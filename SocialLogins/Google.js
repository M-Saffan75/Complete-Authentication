import auth from '@react-native-firebase/auth';
import React, { useEffect, useState } from 'react';
import { COLOURS } from './Components/ThemeColours';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginManager, AccessToken, LoginButton } from 'react-native-fbsdk-next';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';

const Google = () => {

    const navigation = useNavigation();

    const [userdata, setUserData] = useState('');
    const [token, setToken] = useState(null);

    // useEffect(() => {
    //     checkLogin()
    //     GoogleSignin.configure({
    //         webClientId: '215467301347-iahd0r4jmqe7dreprs16lhas019sevcl.apps.googleusercontent.com',
    //     });
    // }, [])

    // const checkLogin = async () => {
    //     let t = await AsyncStorage.getItem("token");
    //     console.log('Google :' , t )

    //     if (t != null) {
    //         // navigation.navigate('Google_Logout');
    //         //  navigation.navigate('Home');
    //     }
    // }

    // const setAuth = async (token) => {
    //     try {
    //         await AsyncStorage.setItem("token", token);
    //         setToken(token);
    //         console.log(await AsyncStorage.getItem("token"))
    //     } catch (error) {
    //         Promise.reject(error);
    //     }
    // };

    // Google authentication Start


    // const GoogleSignInasync = async () => {
    //     await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    //     const { idToken } = await GoogleSignin.signIn();
    //     let token = idToken;
    //     setAuth(token);

    //     const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    //     return auth().signInWithCredential(googleCredential);
    // }


    // const signout = async () => {
    //     try {
    //         await GoogleSignin.revokeAccess();
    //         await auth().signOut();
    //         console.log('sign Out Success');
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    return (
        <View style={{ /* height:'100%', */ width: '100%', backgroundColor: COLOURS.white, justifyContent: 'center' }}>
            {/* <View>
                <Text style={{ color: "#000" }}>
                    UID : <Text style={{ color: "#000" }}>{userdata.uid}</Text>{''}
                </Text>
                <Text style={{ color: "#000" }}>
                    Name : <Text style={{ color: "#000" }}>{userdata.displayName}</Text>{''}
                </Text>
                <Text style={{ color: "#000" }}>
                    Email : <Text style={{ color: "#000" }}>{userdata.email}</Text>{''}
                </Text>
            </View> */}

            {/* <TouchableOpacity activeOpacity={0.6} style={styles.google_btn}
                onPress={() => GoogleSignInasync().then(res => {
                    console.log(res);
                    setUserData(res.user);
                })
                    .catch(error => console.log(error))
                }
            >
                <Image source={require('../Images/google.png')} style={{ height: 40, width: 40 }} />
                <Text style={{ color: COLOURS.black, marginLeft: 10, fontFamily: 'Roboto-Medium' }}>Continue with Google</Text>
            </TouchableOpacity> */}

            {/* <TouchableOpacity activeOpacity={0.6} onPress={() => signout()} style={styles.btn2}>
                <Text style={{ color: "#fff" }}>𝐆𝐨𝐨𝐠𝐥𝐞 𝐥𝐨𝐠𝐨𝐮𝐭</Text>
            </TouchableOpacity> */}
        </View>
    )
}


export default Google

const styles = StyleSheet.create({
    nameinpt: {
        width: '80%',
        color: '#000',
        borderWidth: 1,
        borderColor: '#000',
        marginHorizontal: 10,
    },

    // btn: {
    //     padding: 10,
    //     height: 50,
    //     width: '80%',
    //     marginTop: 20,
    //     borderRadius: 3,
    //     paddingHorizontal: 20,
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     justifyContent: 'space-between',
    //     backgroundColor: '#4081ec',
    // },
    btn2: {
        padding: 10,
        height: 50,
        width: '80%',
        marginTop: 20,
        borderRadius: 3,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#4081ec',
    },

    google_btn: {
        height: 55,
        width: '83%',
        elevation: 1,
        marginTop: 20,
        borderRadius: 10,
        marginHorizontal: 30,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: COLOURS.white,
    }
})