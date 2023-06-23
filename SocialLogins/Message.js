import Toast from 'react-native-toast-message';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import { Button, StyleSheet, View, Image, StatusBar, ScrollView } from 'react-native';

const Message = () => {

    const showToast = () => {

        // Toast.show({
        //     type: 'success',
        //     text1: 'Hello',
        //     text2: 'This is some something 👋'
        // });
        showMessage({
            message: "Your Credntials Are Wrong",
            type: "danger",
            backgroundColor: "purple",
            color: "#fff",
            icon: props => <FontAwesome5 name='exclamation-circle' color={'#fff'} size={20} {...props} />
        });
    }

    return (
        <>
            <StatusBar backgroundColor={'#eee'} barStyle="dark-content" />

            <View style={{ height: '100%', backgroundColor: '#eee' }}>


                {/* Flash Message */}

                <View style={{ marginHorizontal: 20, marginTop: 80 }}>
                    <Button onPress={showToast}
                        //  onPress={() => {
                        //     showMessage({
                        //         message: "Your Credntials Are Wrong",
                        //         type: "danger",
                        //         backgroundColor: "purple",
                        //         color: "#fff",
                        //         // icon: props => <Image source={require("../Images/Destination.png")} {...props} />,
                        //         icon: props => <FontAwesome5 name='exclamation-circle' color={'#fff'} size={20} {...props} />
                        //     });
                        // }}
                        title="Request Details"
                        color="#841584"
                    />
                </View>

                <FlashMessage position="top" />

                {/* // otp code */}

                <OTPInputView
                    style={{ width: '100%', height: '60%', padding: 30 }}
                    pinCount={4}
                    autoFocusOnLoad
                    keyboardAppearance={'Yes'}
                    keyboardType='numeric'
                    codeInputFieldStyle={styles.underlineStyleBase}
                    codeInputHighlightStyle={styles.underlineStyleHighLighted}
                    onCodeFilled={(code => {
                        console.log(`Code is ${code}, you are good to go!`)
                    })}
                />
            </View>

        </>
    )
}

export default Message

const styles = StyleSheet.create({
    borderStyleBase: {
        width: 30,
        height: 45
    },

    borderStyleHighLighted: {
        borderWidth: 1,
        borderColor: "grey",
    },

    underlineStyleBase: {
        width: 50,
        height: 45,
        color: '#000',
        borderColor: "grey",
        borderWidth: 1,
        borderBottomWidth: 1,
    },

    underlineStyleHighLighted: {
        borderColor: "grey",
        borderWidth: 1,
        borderBottomWidth: 1,
    },
})