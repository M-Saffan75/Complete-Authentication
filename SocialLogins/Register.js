import axios from 'axios';
import { BASE_URL } from './Config';
import React, { useEffect, useState } from 'react';
import { COLOURS } from './Components/ThemeColours';
import * as Animatable from 'react-native-animatable';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, StatusBar, ScrollView } from 'react-native';


const Register = ({ navigation }) => {


  const [name, setName] = useState('');
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwod_confirmation, setPassword_Confirmation] = useState('');

  useEffect(() => {
    checkLogin()
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

      console.log(await AsyncStorage.getItem("token"))

    } catch (error) {
      Promise.reject(error);
    }
  };


  const [pswderror, setPswderror] = useState(false);
  const [nameerror, setNameError] = useState(false);
  const [emailerror, setEmailError] = useState(false);
  const [cnfrmpswderror, setConfrmpswdError] = useState(false);

  const UserRegister = () => {

    if (email.length == '' &&
      password.length == '' &&
      name.length == 0 &&
      passwod_confirmation.length == 0 ||
      emailerror == false &&
      pswderror == false &&
      nameerror == false &&
      cnfrmpswderror == false 

    ) {
      setNameError(true)
      setEmailError(true)
      setPswderror(true)
      setConfrmpswdError(true)
    }

    if (name.length == '' && nameerror == false) {
      setNameError(true)
    }

    else if (email.length == '' && emailerror == false) {
      setEmailError(true)
    }

    else if (password.length == '' && pswderror == false) {
      setPswderror(true)
    }

    else if (passwod_confirmation.length == '' && cnfrmpswderror == false) {
      setConfrmpswdError(true)
    }


    else {
      setNameError(false);
      setPswderror(false);
      setEmailError(false);
      setConfrmpswdError(false);
    }

    axios.post(BASE_URL + '/registerhere', {
      name: name,
      email: email,
      password: password,
      passwod_confirmation: passwod_confirmation,
    })

      .then(function (response) {
        console.log(response.data)

        if (response.data.code != 201 && response.data.status == 'failed') {
          console.log(response.data.message)
        }

        else if (response.data.code == 201) {
          setAuth(response.data.token);
          navigation.replace('Home');
        }
      })
      .catch(function (error) {
        console.log(error);
      })
  }


  return (
    <>
      <StatusBar backgroundColor={'#eee'} barStyle='dark-content' />
      <ScrollView alwaysBounceVertical showsVerticalScrollIndicator={false} style={{ height: '100%', backgroundColor: COLOURS.white }}>


        <View style={styles.container}>
          <View style={styles.child_container}>
            <Text style={styles.name}>Register Here</Text>

            <Text style={styles.inpt_names}>Name</Text>
            <Animatable.View animation={nameerror == true && name.length == 0 ? 'shake' : ''} delay={1000} >
              <View>
                <TextInput placeholder='Your Name' placeholderTextColor={'grey'} onChangeText={setName}

                  style={[styles.inpt_here, { borderColor: nameerror == true && name.length == 0 ? COLOURS.red : name.length == 2 ? COLOURS.peach : COLOURS.peach }]}


                />
              </View>
            </Animatable.View>

            <Text style={styles.inpt_names}>Email</Text>
            <Animatable.View animation={emailerror == true && email.length == 0 ? 'shake' : ''} delay={1000} >
              <View>
                <TextInput placeholder='Your Email' placeholderTextColor={'grey'} onChangeText={setEmail}

                  style={[styles.inpt_here, { borderColor: emailerror == true && email.length == 0 ? COLOURS.red : email.length == 2 ? COLOURS.peach : COLOURS.peach }]}


                />
              </View>
            </Animatable.View>

            <Text style={styles.inpt_names}>Password</Text>

            <Animatable.View animation={pswderror == true && password.length == 0 ? 'shake' : ''} delay={1000} >
              <View>
                <TextInput placeholder='Your Password' placeholderTextColor={'grey'} onChangeText={setPassword}

                  style={[styles.inpt_here, { borderColor: pswderror == true && password.length == 0 ? COLOURS.red : password.length == 2 ? COLOURS.peach : COLOURS.peach }]}

                />
              </View>
            </Animatable.View>


            <Text style={styles.inpt_names}>Confirm Password</Text>
            <Animatable.View animation={cnfrmpswderror == true && passwod_confirmation.length == 0 ? 'shake' : ''} delay={1000} >
              <View>
                <TextInput placeholder='Confirm Password' placeholderTextColor={'grey'} onChangeText={setPassword_Confirmation}

                  style={[styles.inpt_here, { borderColor: cnfrmpswderror == true && passwod_confirmation.length == 0 ? COLOURS.red : passwod_confirmation.length == 2 ? COLOURS.peach : COLOURS.peach }]}


                />
              </View>
            </Animatable.View>

            <TouchableOpacity style={styles.btn} onPress={UserRegister}>
              <Text style={styles.btn_name}>Register Here</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ width: '100%', }} onPress={() => navigation.replace('Login')} activeOpacity={0.6}>
              <Text style={styles.alreadyaccount}>Already Have an Account ?</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    </>
  )
}

export default Register

const styles = StyleSheet.create({

  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOURS.white
  },

  child_container: {
    width: '100%',
    alignItems: 'center',
  },

  name: {
    fontSize: 25,
    marginTop: 50,
    paddingVertical: 10,
    color: COLOURS.apple,
    fontFamily: 'Roboto-Bold',
  },

  inpt_names: {
    width: '100%',
    fontSize: 16,
    letterSpacing: .5,
    paddingVertical: 10,
    paddingHorizontal: 30,
    color: COLOURS.apple,
    fontFamily: 'Roboto-Medium',
  },

  inpt_here: {
    width: 300,
    color: 'black',
    borderWidth: 1,
    borderRadius: 5,
    letterSpacing: .4,
    marginVertical: 5,
    paddingHorizontal: 10,
    fontFamily: 'Roboto-Regular',
    // borderColor: COLOURS.peach,
  },

  btn: {
    width: 300,
    marginTop: 30,
    borderRadius: 5,
    backgroundColor: COLOURS.apple,
  },

  btn_name: {
    color: 'white',
    fontSize: 12,
    letterSpacing: .9,
    paddingVertical: 15,
    textAlign: 'center',
    fontFamily: 'Roboto-Bold',
  },

  alreadyaccount: {
    fontSize: 12,
    marginTop: 20,
    color: '#1b1b1b',
    textAlign: 'left',
    letterSpacing: .3,
    paddingHorizontal: 30,
    fontFamily: 'Roboto-Medium',
  },

})