import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ContentLoader, { FacebookLoader, InstagramLoader } from "react-native-easy-content-loader";


const ContentLoad = () => {
    return (
        <View style={{ height: '100%', alignItems: 'center', justifyContent: 'center' }}>

            <ContentLoader active avatar pWidth={[0,0,0,0]} >
                <Text style={{ color: '#000' }}>lorem</Text>
            </ContentLoader>

        </View>
    )
}

export default ContentLoad

const styles = StyleSheet.create({})