import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


const AddressPickup = ({
    placeholderText,
    fetchAddress
}) => {
    const onPressAddress = (data, details) => {
        // console.log("Details =>>>" , details)
        const lat = details.geometry.location.lat
        const lng = details.geometry.location.lng
        fetchAddress(lat, lng)
    }
    return (
        <>
            <View style={{ flex: 1, backgroundColor: '#fff', }}>
                <GooglePlacesAutocomplete style={{ marginTop: 20 }}
                    placeholder={placeholderText}
                    onPress={onPressAddress}
                    fetchDetails={true}
                    query={{
                        key: 'AIzaSyA2E_mdGheX09IYjb1KWg0LTBXsdStLgT4',
                        language: 'en',
                    }}

                    styles={{
                        textInputContainer: styles.containerstyle,
                        textInput: styles.textInputstyle
                    }}
                />
            </View>
        </>
    );
}

export default AddressPickup

const styles = StyleSheet.create({
    containerstyle: {
        backgroundColor: '#e5e5e5',
        marginTop: 30,
        marginHorizontal: 10,
        paddingHorizontal: 10,
    },
    textInputstyle: {
        height: 48,
        color: 'black',
        fontSize: 16,
        backgroundColor: ' #000',


    }
})