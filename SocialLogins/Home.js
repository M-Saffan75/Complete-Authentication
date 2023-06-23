import axios from 'axios';
import AppLoader from './AppLoader';
import { ASSET_URL, BASE_URL } from './Config';
import React, { useEffect, useState } from 'react';
import { COLOURS } from './Components/ThemeColours';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { launchImageLibrary } from 'react-native-image-picker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar, TextInput, StyleSheet, Text, TouchableOpacity, View, Image, ToastAndroid } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { firebase } from '@react-native-firebase/auth';

const Home = ({ navigation }) => {


    const [id, setId] = useState('');
    const [data, setData] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [new_imageset, setNewImage] = useState(false);

    useEffect(() => {
        checkLogin();
        userdata();
    }, [])

    const checkLogin = async () => {

        let t = await AsyncStorage.getItem("token");

        setToken(t);

        if (t == null) {
            navigation.replace('Login');
        }
    }

    const removeToken = async () => {
        await AsyncStorage.removeItem("token");
    };


    const Logout = () => {
        // setLoading(true);
        axios({
            method: 'get',
            url: BASE_URL + '/logout',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            }
        })

            .then(function (response) {
                console.log(response.data);
                removeToken();
                setLoading(false)
                navigation.replace("Login");
            })

            .catch(function (error) {
                console.log(error);
            });
    }

    // user data here 

    const userdata = async () => {
        let userToken = await AsyncStorage.getItem("token");
        if (userToken != null) {
            await axios({
                method: 'get',
                url: BASE_URL + '/loggeduser',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer  ${userToken}`,
                }
            })

                .then(function (response) {
                    console.log(response.data)
                    setLoading(false);
                    setData(response.data);
                    setId(response.data.loggeduser.id)
                    setName(response.data.loggeduser.name)
                    setEmail(response.data.loggeduser.email)
                    setImage(response.data.loggeduser.image)
                })

                .catch(function (error) {
                    console.log(error);
                })
        }
    }

    // Update profile here 

    const Update_profile = async () => {

        let userToken = await AsyncStorage.getItem("token");
        if (userToken != null) {
            axios.post(BASE_URL + '/user/update/' + id,

                {
                    name: name,
                    email: email,

                    headers: {
                        "Accept": "application/json",
                        'Authorization': `Bearer ${userToken}`,
                    },
                }
            )
                .then(function (response) {
                    console.log(response.data);
                    if (response.data.code == 200) {
                        ToastAndroid.show(response.data.message,
                            ToastAndroid.SHORT);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    let options = {
        saveTophotos: true,
        mediatype: ' photo',
    };

    const opengallery = async () => {

        let userToken = await AsyncStorage.getItem("token");

        const images = await launchImageLibrary(options);
        setImage(images.assets[0].uri);
        console.log(images.assets[0]);
        setNewImage(true);

        const formdata = new FormData()
        formdata.append('image', {
            uri: images.assets[0].uri,
            type: images.assets[0].type,
            name: images.assets[0].fileName
        })

        await axios.post(BASE_URL + '/user/upload/image', formdata, {

            headers: {
                "Accept": "application/json",
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer  ${userToken}`,
            },
        })
            .then(function (response) {
                console.log(response.data);
            })

            .catch(function (error) {
                console.log(error);
            });
    }

    // Profile Preview Image End

    return (
        <>
            <StatusBar backgroundColor={'#eee'} barStyle='dark-content' />
            {
                (loading == true) ?
                    <AppLoader />
                    :
                    <ScrollView style={{ height: '100%', backgroundColor: COLOURS.white }}>

                        <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: 30, }}>

                            {image == null ?
                                <View style={{ backgroundColor: COLOURS.apple, justifyContent: 'center', alignItems: 'center', width: 180, height: 180, elevation: 41, borderRadius: 100 }} resizeMode='cover' />
                                :
                                (new_imageset == true) ?
                                    < Image source={{ uri: image }} style={{ justifyContent: 'center', alignItems: 'center', width: 180, height: 180, elevation: 41, borderRadius: 100 }} resizeMode='cover' />
                                    :
                                    < Image source={{ uri: ASSET_URL + image }} style={{ justifyContent: 'center', alignItems: 'center', width: 180, height: 180, elevation: 41, borderRadius: 100 }} resizeMode='cover' />

                            }

                            <TouchableOpacity activeOpacity={0.6} onPress={opengallery}
                                style={{ backgroundColor: COLOURS.peach, bottom: 30, left: 50, height: 30, width: 30, justifyContent: 'center', borderRadius: 100 }}>
                                <AntDesign name='plus' style={{ color: COLOURS.coral, fontSize: 20, paddingHorizontal: 5, textAlign: 'center' }} />
                            </TouchableOpacity>

                        </View>

                        <View style={{ marginVertical: 20, marginTop: 50, }}>
                            <TextInput onChangeText={setName} defaultValue={name} style={styles.name} />
                            <TextInput onChangeText={setEmail} defaultValue={email} style={styles.email} />
                        </View>

                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20, }}>

                            <TouchableOpacity style={styles.changepassword} onPress={() => navigation.navigate('ChangePassword')}>
                                <Text style={{ width: 25 }}></Text>
                                <Text style={{ color: COLOURS.white, letterSpacing: .5, textAlign: 'center', fontWeight: 'bold' }}>Change Password</Text>
                                <MaterialIcons name='keyboard-arrow-right' style={{ color: COLOURS.white, fontSize: 26, paddingHorizontal: 5, top: -2 }} />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.btn} onPress={Logout}>
                                <Text style={{ color: COLOURS.white, textAlign: 'center', letterSpacing: .5, fontWeight: 'bold' }}>Logout</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.btn} onPress={Update_profile}>
                                <Text style={{ color: COLOURS.white, textAlign: 'center', letterSpacing: .5, fontWeight: 'bold' }}>Update Profile</Text>
                            </TouchableOpacity>

                        </View>
                    </ScrollView>
            }
        </>
    )
}

export default Home

const styles = StyleSheet.create({
    name: {
        height: 40,
        fontSize: 14,
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 5,
        color: COLOURS.black,
        marginHorizontal: 15,
        paddingHorizontal: 10,
        borderColor: COLOURS.peach,
    },
    email: {
        height: 40,
        fontSize: 14,
        marginTop: 40,
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 5,
        color: COLOURS.black,
        marginHorizontal: 15,
        paddingHorizontal: 10,
        borderColor: COLOURS.peach,
    },

    changepassword: {
        width: 300,
        height: 50,
        width: '90%',
        marginTop: 60,
        borderRadius: 5,
        paddingVertical: 15,
        backgroundColor: COLOURS.apple,

        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    btn: {
        width: 300,
        height: 50,
        width: '90%',
        marginTop: 20,
        borderRadius: 5,
        paddingVertical: 15,
        backgroundColor: COLOURS.apple,
    },
})