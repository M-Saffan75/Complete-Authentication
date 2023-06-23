import CustomBtn from './CustomBtn';
import React, { useState } from 'react';
import AddressPickup from './AddressPickup';
import { showSuccess , showError } from './helperFunction';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const ChooseLocation = (props) => { 
    const navigation = useNavigation

    const [state, setState] = useState({
        pickupCords: {},
        destinationCords: {}
    })

    const {pickupCords , destinationCords } = state

    const checkValid = () => {
        if (Object.keys(destinationCords).length === 0) {
            showError('Please enter your Pickup location')
            return false
        }
        if (Object.keys(destinationCords).length === 0) {
            showError('Please enter your destination location')
            return false
        }
        return true
    }

    const onDone = () => {
        const isValid = checkValid()
        if (isValid) {
            props.route.params.getCordinates({
                pickupCords,
                destinationCords
            })
            showSuccess('You can Back Now')
            navigation.goBack();
        }
    }
    const fetchDestinationCords = (lat, lng, zipCode, cityText) => {
        // console.log("zip code==>>>",zipCode)
        // console.log('city texts',cityText)
        setState({
            ...state,
            pickupCords: {
                latitude: lat,
                longitude: lng
            }
        })
    }

    const fetchAddressCords = (lat, lng) => {
        setState({
            ...state,
            destinationCords: {
                latitude: lat,
                longitude: lng
            }
        })
    }

    console.log('props==>>>>', props);

    return (
        <>
            <ScrollView>
                <View style={{ height: '100%', backgroundColor: '#fff', }}>
                    <AddressPickup
                        placeholderText="Enter Pickup Location"
                        fetchAddress={fetchAddressCords}
                    />
                    <AddressPickup
                        placeholderText="Enter Destination Location"
                        placeholderextcolor={"grey"}
                        fetchAddress={fetchDestinationCords}

                    />
                    <CustomBtn btnText={'Done'}
                        Color={'black'}
                        btnStyle={{ marginTop: 24 }}
                        onPress={onDone}
                    />
                </View>
            </ScrollView>
        </>
    )
}

export default ChooseLocation

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