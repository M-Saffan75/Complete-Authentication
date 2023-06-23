import React, { useState, useRef } from 'react'
import { StyleSheet, Text, View, Image,  TouchableOpacity, Dimensions } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'
import ImagePath from './ImagePath'


const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const LiveTracking = ({navigation}) => {

    const [state, setState] = useState({

        startingCords: {
            latitude: 30.7046,
            longitude: 76.7179,
        },
        destinationCords: {
            latitude: 30.7333,
            longitude: 76.7794,
        }
    })

    const mapRef = useRef()

    const { startingCords, destinationCords } = state

    const onPressLocation = () => {
        navigation.navigate('ChooseLocation' , {getCordinates: fetchValues});
    }

    const fetchValues = (data) => {
        setState({
            startingCords: {
                latitude: data.pickupCords.latitude,
                longitude: data.pickupCords.longitude,
            },

            destinationCords :{
                latitude: data.destinationCords.latitude,
                longitude: data.destinationCords.longitude,
            }
        })
        console.log('Data ==>>>>' , data )
    }
    return (
        <>
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <MapView
                        ref={mapRef}
                        style={StyleSheet.absoluteFill}
                        initialRegion={{...startingCords,
                            latitudeDelta:LATITUDE_DELTA,
                            longitudeDelta: LONGITUDE_DELTA,    
                        }}
                        >

                        <Marker coordinate={startingCords}>
                            <Image source={ImagePath.icCurLoc} style={{ height: 45, width: 45 }} tintColor="green" />
                        </Marker>
                        <Marker coordinate={destinationCords} >
                            <Image source={ImagePath.icGreenMarker} style={{ height: 45, width: 45 }} tintColor="green" />
                        </Marker>

                        <MapViewDirections origin={startingCords}
                            destination={destinationCords}
                            apikey={'AIzaSyA2E_mdGheX09IYjb1KWg0LTBXsdStLgT4'}
                            strokeWidth={3}
                            strokeColor="hotpink"
                            optimizeWaypoints={true}
                            onReady={result => {
                                mapRef.current.fitToCoordinates(result.coordinates, {
                                    edgePadding: {
                                        top: 100,
                                        left: 30,
                                        right: 30,
                                        bottom: 300,
                                    }
                                })
                            }}
                        />

                    </MapView>
                </View>
                <View style={styles.bottomCard}>
                    <Text style={{color:'black'}}>Where are you going..?</Text>
                    <TouchableOpacity
                        onPress={onPressLocation}
                        style={styles.inpuStyle}
                    >
                        <Text style={{color:'black'}}>Choose your location</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

export default LiveTracking

const styles = StyleSheet.create({
    bottomCard: {
        backgroundColor: 'white',
        width: '100%',
        padding: 30,
        borderTopEndRadius: 24,
        borderTopStartRadius: 24
    },
    inpuStyle: {
        backgroundColor: 'white',
        borderRadius: 4,
        borderWidth: 1,
        alignItems: 'center',
        height: 48,
        justifyContent: 'center',
        marginTop: 16
    }
})