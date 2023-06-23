import { StyleSheet, Text, View, ImageBackground, Button } from 'react-native'
import React, { useState } from 'react'
import { Path, Svg } from 'react-native-svg'
import { TextInput } from 'react-native-gesture-handler'

const Wave = () => {

    const [name, setName] = useState('');

    // console.log(error)

    const login = () => {

        if (name.length == '') {
            // alert('error')
        }
        else {
            // alert('success')
        }
    }

    return (
        <View style={{ height: '100%', alignItems: 'center', justifyContent: 'center', marginHorizontal: 30 }}>
            {/* <Svg
                height={200}
                viewBox="0 0 1440 320" style={styles.topway}>
                  <Path fill="#0099ff" fill-opacity="1" d="M0,192L26.7,213.3C53.3,235,107,277,160,256C213.3,235,267,149,320,138.7C373.3,128,427,192,480,202.7C533.3,213,587,171,640,138.7C693.3,107,747,85,800,101.3C853.3,117,907,171,960,197.3C1013.3,224,1067,224,1120,192C1173.3,160,1227,96,1280,85.3C1333.3,75,1387,117,1413,138.7L1440,160L1440,0L1413.3,0C1386.7,0,1333,0,1280,0C1226.7,0,1173,0,1120,0C1066.7,0,1013,0,960,0C906.7,0,853,0,800,0C746.7,0,693,0,640,0C586.7,0,533,0,480,0C426.7,0,373,0,320,0C266.7,0,213,0,160,0C106.7,0,53,0,27,0L0,0Z"></Path>
            </Svg> */}
            {/* <ImageBackground source={require('../Images/bg-1.jpg')} style={{ height: '100%', width: '100%' }} resizeMode='cover'  >

          </ImageBackground> */}

            <Text style={{ color: 'black', fontSize: 30, }}>Hello world</Text>

            <TextInput placeholder='name' placeholderTextColor={'grey'} style={{ borderColor: '#000', color: '#000', borderWidth: 1, width: '100%', }} onChangeText={setName} />
            <Text style={{ color: 'red', marginVertical: 30 }} ></Text>

            <Button title='Login' onPress={login} />
        </View>
    )
}

export default Wave

const styles = StyleSheet.create({
    topway: {
        height: 100
    }
})