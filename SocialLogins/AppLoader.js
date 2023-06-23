import React from 'react';
import { COLOURS } from './Components/ThemeColours';
import { Image, StatusBar, StyleSheet, View } from 'react-native';

const AppLoader = () => {
    return (
        <>
            <StatusBar backgroundColor={COLOURS.light} barStyle='dark-content' />
            <View style={{ height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center' , backgroundColor:COLOURS.light}}>
                <Image source={require('../Images/loading-78.gif')} style={{height:200, width:300}} />
            </View>
        </>
    )
}

export default AppLoader

const styles = StyleSheet.create({})