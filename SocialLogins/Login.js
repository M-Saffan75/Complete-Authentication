import axios from 'axios';
import Google from './Google';
import { BASE_URL } from './Config';
import React, { useEffect, useState } from 'react';
import { COLOURS } from './Components/ThemeColours';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth, { firebase, FirebaseAuthTypes } from '@react-native-firebase/auth';
import { LoginManager, AccessToken, LoginButton } from 'react-native-fbsdk-next';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity, StatusBar, Button, Image } from 'react-native';

const Login = ({ navigation }) => {


  const [email, setEmail] = useState('');
  const [token, setToken] = useState(null);
  const [userdata, setUserData] = useState('');
  const [password, setPassword] = useState('');
  const [userdatagoogle, setUserDataGoogle] = useState('');

  useEffect(() => {
    checkLogin()
    GoogleSignin.configure({
      webClientId: '215467301347-iahd0r4jmqe7dreprs16lhas019sevcl.apps.googleusercontent.com',
    });
  }, [])

  const checkLogin = async () => {


    let t = await AsyncStorage.getItem("token");

    if (t != null) {
      navigation.replace('Home');
    }
  }

  const setAuth = async (token) => {
    try {
      await AsyncStorage.setItem("token", token);
      setToken(token);
      // console.log(await AsyncStorage.getItem("token"))
    } catch (error) {
      Promise.reject(error);
    }
  };

  const [emailerror, setEmailError] = useState(false);
  const [pswderror, setpswdError] = useState(false);

  const LoginHere = async () => {

    if (email.length == '' && emailerror == false && password.length == '' && pswderror == false) {
      setEmailError(true)
      setpswdError(true)
    }

    else if (email.length == '' && emailerror == false) {
      setEmailError(true)
    }

    else if (password.length == '' && pswderror == false) {
      setpswdError(true)
    }

    else {
      setEmailError(false);
      setpswdError(false);
    }

    const data = {
      email: email,
      password: password,
    }

    axios.post(BASE_URL + '/loginhere',
      data,
    )

      .then(function (response) {
        console.log(response.data)
        if (response.data.code == 200 && response.data.token) {
          setAuth(response.data.token);
          navigation.replace('Home');
        }
        else {
          console.log('credentials are wrong');
        }
      })
      .catch(function (error) {
        console.log(error);
      })
  }



  // Google Login Start Here


  const GoogleSignInasync = async () => {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const { idToken } = await GoogleSignin.signIn();

    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCredential);
  }


  // Google Login End Here

  /* -------------------------- */


  // API Google Start Here
  const Google_api_Here = async (data) => {

    const google_data = {
      email: data.email,
      name: data.displayName,
    }
    await axios.post(BASE_URL + '/user/Social_Login',
      google_data,
    )
      .then(function (response) {
        console.log(response.data)
        if (response.data.code == 200) {
          setAuth(response.data.token);
          navigation.replace('Home');
        }
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  // API Google End Here


  //  Facebook Login Start Here


  const facebooklogin = async () => {

    const result = await LoginManager.logInWithPermissions(["email", "public_profile", "user_friends"]);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
    return auth().signInWithCredential(facebookCredential);
  }

  // Facebook Login End Here


  /* ------------------------- */


  // API Facebook Start Here 

  const Facebook_api_Here = async (data) => {

    const login_data = {
      email: data.email,
      name: data.displayName,
    }

    await axios.post(BASE_URL + '/user/Social_Login',
      login_data,
    )
      .then(function (response) {
        console.log(response.data)
        if (response.data.code == 200) {
          setAuth(response.data.token);
          navigation.replace('Home');
        }
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  // API Facebook Start End 




  return (
    <>
      <StatusBar backgroundColor={'#eee'} barStyle='dark-content' />
      <ScrollView style={{ height: '100%', backgroundColor: COLOURS.white }}>
        <View style={styles.container}>
          <View style={styles.child_container}>
            <Text style={styles.name}>Login Here</Text>

            <Text style={styles.email_name}>Email</Text>
            <Animatable.View animation={emailerror == true && email.length == 0 ? 'shake' : ''} delay={2000} >
              <View>
                <TextInput placeholder='Your Email' placeholderTextColor={'grey'} onChangeText={setEmail}
                  style={[styles.inpt_here, { borderColor: emailerror == true && email.length == 0 ? COLOURS.red : email.length == 2 ? COLOURS.peach : COLOURS.peach }]}
                />
              </View>
            </Animatable.View>

            <Text style={styles.pswd_name}>Password</Text>
            <Animatable.View animation={pswderror == true && password.length == 0 ? 'shake' : ''} delay={2000} >
              <View>
                <TextInput placeholder='Your Password' placeholderTextColor={'grey'} onChangeText={setPassword}

                  style={[styles.inpt_here, { borderColor: pswderror == true && password.length == 0 ? COLOURS.red : password.length == 2 ? COLOURS.peach : COLOURS.peach }]}
                />
              </View>
            </Animatable.View>

            <TouchableOpacity style={{ width: '100%', alignItems: 'flex-end', }} onPress={() => navigation.navigate('ForgotPassword')} activeOpacity={0.6}>
              <View style={styles.forgt_background}>
                <Text style={styles.forget_password}>Forget Password ?</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn} onPress={LoginHere} activeOpacity={0.6}>
              <Text style={styles.login_text}>Login Here</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ width: '100%', }} onPress={() => navigation.replace('Register')} activeOpacity={0.6}>
              <Text style={styles.have_not_account}>Don't Have an Account ?</Text>
            </TouchableOpacity>

            <View style={{ width: '100%', }}>
              <TouchableOpacity activeOpacity={0.6} style={styles.google_btn}
                onPress={() => GoogleSignInasync().then(res => {
                  console.log(res);
                  // setUserDataGoogle(res.user);
                  Google_api_Here(res.user);
                })
                  .catch(error => console.log(error))
                }
              >
                <Image source={require('../Images/google.png')} style={{ height: 40, width: 40 }} />
                <Text style={{ color: COLOURS.black, marginLeft: 10, fontFamily: 'Roboto-Medium' }}>Continue with Google</Text>
              </TouchableOpacity>

            </View>

            <View style={{ width: '100%', marginTop: 10, }}>
              <TouchableOpacity activeOpacity={0.6}
                style={styles.facebook_btn}

                onPress={() => facebooklogin()
                  .then(res => {
                    console.log(res);
                    // setUserData(res.user);
                    Facebook_api_Here(res.user);
                  })
                  .catch(error => console.log(error))}>

                <Image source={require('../Images/facebook.png')}
                  style={{ height: 40, width: 40 }} />
                <Text style={{ color: COLOURS.black, marginLeft: 10, fontFamily: 'Roboto-Medium' }}>Continue with Facebook</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </ScrollView>
    </>
  )
}

export default Login

const styles = StyleSheet.create({

  container: {
    backgroundColor: COLOURS.white
  },

  child_container: {
    width: '100%',
    alignItems: 'center',
  },

  name: {
    fontSize: 25,
    marginTop: 100,
    paddingVertical: 10,
    color: COLOURS.apple,
    fontFamily: 'Roboto-Bold',
  },

  inpt_here: {
    width: 300,
    color: 'black',
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 5,
    letterSpacing: .3,
    paddingHorizontal: 10,
    fontFamily: 'Roboto-Regular',
    // borderColor: COLOURS.peach,
  },

  email_name: {
    width: '100%',
    fontSize: 16,
    letterSpacing: .5,
    paddingVertical: 10,
    paddingHorizontal: 30,
    color: COLOURS.apple,
    fontFamily: 'Roboto-Medium',
  },

  pswd_name: {
    fontSize: 16,
    width: '100%',
    marginTop: 10,
    letterSpacing: .5,
    paddingVertical: 10,
    color: COLOURS.apple,
    paddingHorizontal: 30,
    fontFamily: 'Roboto-Medium'
  },

  btn: {
    width: 300,
    marginTop: 30,
    borderRadius: 5,
    backgroundColor: COLOURS.apple,
  },

  have_not_account: {
    fontSize: 12,
    marginTop: 10,
    color: '#1b1b1b',
    textAlign: 'left',
    letterSpacing: .5,
    paddingHorizontal: 30,
    fontFamily: 'Roboto-Medium',
  },

  forget_password: {
    padding: 3,
    fontSize: 10,
    borderRadius: 10,
    letterSpacing: .3,
    textAlign: 'center',
    color: COLOURS.white,
    fontFamily: 'Roboto-Medium',
    backgroundColor: COLOURS.peach,
  },

  login_text: {
    fontSize: 12,
    letterSpacing: 1,
    paddingVertical: 15,
    textAlign: 'center',
    color: COLOURS.white,
    fontFamily: 'Roboto-Bold',
  },

  forgt_background: {
    height: 20,
    width: 150,
    marginTop: 12,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginHorizontal: 25,
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