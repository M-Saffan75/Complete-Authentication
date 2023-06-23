
import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';


const CustomBtn = ({
    onPress = () => {},
    btnStyle = {},
    btnText
}) => {
    return (
     <TouchableOpacity
     onPress={onPress}
     style={{...styles.btnStyle, ...btnStyle}}
     >
         <Text style={{color:'black'}}>{btnText}</Text>
     </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
        btnStyle: {
            height: 48,
            borderWidth:3,
            borderRadius:5,
            marginHorizontal:10,
            alignItems:"center",
            paddingHorizontal: 16,
            justifyContent:'center',
            backgroundColor: 'white',
        }
});


export default CustomBtn;