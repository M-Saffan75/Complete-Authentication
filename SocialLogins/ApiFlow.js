import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';


const ApiFlow = ({ navigation }) => {

  const [data, setData] = useState('');
  const [name, setName] = useState(null);
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [passwod_confirmation, setPassword_Confirmation] = useState(null);


  const setAuth = async (token) => {
    try {
        await AsyncStorage.setItem("token", token);
        setToken(token);

        console.log(await AsyncStorage.getItem("token"))

    } catch (error) {
        Promise.reject(error);
    }
};

  const getAllStudent = () => {

   axios.post('https://safanapitest.gmgsolutions.io/api/registerhere', {
      name: name,
      email: email,
      password: password,
      passwod_confirmation: passwod_confirmation,
    })
      .then(function (response) {
        console.log(response.data)

        if (response.data.code != 201 && response.data.status == 'failed') {
          alert(response.data.message)
        }

        else if (response.data.code == 201 ) {
          setAuth(response.data.token);
          // alert(response.data.token);
          navigation.navigate('Login');
        }
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  return (
    <View style={{ height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
      <TextInput placeholder='Name' placeholderTextColor={'grey'} onChangeText={setName} style={styles.nameinpt} />
      <TextInput placeholder='Email' placeholderTextColor={'grey'} onChangeText={setEmail} style={styles.nameinpt} />
      <TextInput placeholder='Password' keyboardType='password' placeholderTextColor={'grey'} onChangeText={setPassword} style={styles.nameinpt} />
      <TextInput placeholder='Password' keyboardType='password' placeholderTextColor={'grey'} onChangeText={setPassword_Confirmation} style={styles.nameinpt} />

      <TouchableOpacity onPress={getAllStudent} style={{ backgroundColor: '#000', padding: 10, width: '80%', marginTop: 20, }}>
        <Text style={{ color: '#fff,', textAlign: 'center' }}>Register</Text>
      </TouchableOpacity>

    </View>
  )
}

export default ApiFlow

const styles = StyleSheet.create({
  nameinpt: {
    width: '80%',
    color: '#000',
    borderWidth: 1,
    borderColor: '#000',
    marginHorizontal: 10,
  },

  btn: {
    padding: 10,
    height: 50,
    width: '80%',
    marginTop: 20,
    borderRadius: 3,
    paddingHorizontal: 20,
    backgroundColor: 'darkblue',
  },
})