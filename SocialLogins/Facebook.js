import axios from 'axios';
import { BASE_URL } from './Config';
import React, { useEffect, useState } from 'react';
import { COLOURS } from './Components/ThemeColours';
// import { getAuth, signOut } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth, { firebase, FirebaseAuthTypes } from '@react-native-firebase/auth';
import { LoginManager, AccessToken, LoginButton } from 'react-native-fbsdk-next';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';

const Facebook = ({ navigation }) => {

  const [userdata, setUserData] = useState('');
  const [token, setToken] = useState(null);

  // Token Save

  // useEffect(() => {
  //   checkLogin()
  // }, [])

  // const checkLogin = async () => {

  //   let t = await AsyncStorage.getItem("token");

  //   setToken(t);

  //   console.log('Soical Login Token :', t)

  //   if (t != null) {
  //     navigation.replace('Home');
  //   }
  // }

  // const setAuth = async (token) => {
  //   try {
  //     await AsyncStorage.setItem("token", token);
  //     setToken(token);
  //     // console.log(await AsyncStorage.getItem("token"))
  //   } catch (error) {
  //     Promise.reject(error);
  //   }
  // };

  // Facebook authentication Start

  // const facebooklogin = async () => {

  //   const result = await LoginManager.logInWithPermissions(["email", "public_profile", "user_friends"]);

  //   if (result.isCancelled) {
  //     throw 'User cancelled the login process';
  //   }
  //   const data = await AccessToken.getCurrentAccessToken();

  //   if (!data) {
  //     throw 'Something went wrong obtaining access token';
  //   }

  //   const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
  //   return auth().signInWithCredential(facebookCredential);
  // }

  // const signOut = () => {
  //   firebase.auth().signOut().then(() => {
  //     // removeToken();
  //     // navigation.replace('Facebook');
  //     console.log('logout successfully')
  //   }).catch((error) => {
  //     console.log(error)
  //   });
  // }


  // const api_Here = async () => {
  //   const login_data = {
  //     email: userdata.email,
  //     name: userdata.displayName,
  //   }

  //   await axios.post(BASE_URL + '/user/Social_Login',
  //     login_data,
  //   )
  //     .then(function (response) {
  //       console.log(response.data)
  //       if (response.data.code == 200) {
  //         setAuth(response.data.token);
  //         // console.log(response.data.token)
  //         // console.log('Succesfully login')
  //         navigation.replace('Home');

  //       }
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     })


  // }

  return (
    <View style={{ /* height: '100%', */ ackgroundColor: COLOURS.white, justifyContent: 'center' }}>
      {/* 
      <View>
        <Text style={{ color: "#000" }}>
          UID : <Text style={{ color: "#000" }}>{userdata.uid}</Text>
        </Text>
        <Text style={{ color: "#000" }}>
          Name : <Text style={{ color: "#000" }}>{userdata.displayName}</Text>{''}
        </Text>
        <Text style={{ color: "#000" }}>
          Email : <Text style={{ color: "#000" }}>{userdata.email}</Text>{''}
        </Text>
      </View> */}

      {/* <TouchableOpacity activeOpacity={0.6} style={styles.facebook_btn}
        onPress={() => facebooklogin()
          .then(res => {
            // console.log(res);
            setUserData(res.user);   
            api_Here();   
          
          })
          .catch(error => console.log(error))
        }
      >
        <Image source={require('../Images/facebook.png')}
          style={{ height: 40, width: 40 }} />
        <Text style={{ color: COLOURS.black, marginLeft: 10, fontFamily: 'Roboto-Medium' }}>Continue with Facebook</Text>
      </TouchableOpacity> */}

      {/* <TouchableOpacity activeOpacity={0.6} style={styles.btn2} onPress={signOut}>
        <Text style={{ color: "#fff" }}>𝐋𝐨𝐠𝐨𝐮𝐭 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤</Text>
      </TouchableOpacity> */}

    </View>
  )
}

export default Facebook

const styles = StyleSheet.create({
  nameinpt: {
    width: '80%',
    color: '#000',
    borderWidth: 1,
    borderColor: '#000',
    marginHorizontal: 10,
  },
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
  facebook_btn: {
    height: 55,
    width: '83%',
    elevation: 1,
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: COLOURS.white,
  }
})
