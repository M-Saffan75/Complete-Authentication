import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Options = ({navigation}) => {
    return (
        <View style={{ height: '100%', backgroundColor: '#eee', alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity activeOpacity={0.6} style={styles.btn} onPress={()=> navigation.navigate('Google')}>
                <MaterialCommunityIcons name='google-plus' style={{ fontSize: 30, color: 'darkblue' }} />
                <Text style={{ color: "#fff" }}>𝐂𝐨𝐧𝐭𝐢𝐧𝐮𝐞 𝐰𝐢𝐭𝐡 𝐆𝐨𝐨𝐠𝐥𝐞</Text>
                <Text style={{ width:30,}}></Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.6} style={styles.btn} onPress={()=> navigation.navigate('Facebook')}>
                <MaterialCommunityIcons name='facebook' style={{ fontSize: 30, color: 'darkblue' }} />
                <Text style={{ color: "#fff" }}>𝐂𝐨𝐧𝐭𝐢𝐧𝐮𝐞 𝐰𝐢𝐭𝐡 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤</Text>
                <Text style={{ width:30,}}></Text>
            </TouchableOpacity>
        </View>
    )
}

export default Options

const styles = StyleSheet.create({
    btn: {
        padding: 10,
        height: 50,
        width: '80%',
        marginTop: 20,
        borderRadius: 3,
        paddingHorizontal: 20,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        backgroundColor: '#4081ec',
      },
})