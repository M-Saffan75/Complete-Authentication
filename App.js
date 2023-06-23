import React from 'react';
import { Easing } from 'react-native';
import Wave from './SocialLogins/Wave';
import Home from './SocialLogins/Home';
import Login from './SocialLogins/Login';
import Google from './SocialLogins/Google';
import Logout from './SocialLogins/Logout';
import Message from './SocialLogins/Message';
import OtpHere from './SocialLogins/OtpHere';
import Options from './SocialLogins/Options';
import Facebook from './SocialLogins/Facebook';
import Register from './SocialLogins/Register';
import AppLoader from './SocialLogins/AppLoader';
import ContentLoad from './SocialLogins/ContentLoad';
import LiveTracking from './SocialLogins/LiveTracking';
import ResetPassword from './SocialLogins/ResetPassword';
import Google_Logout from './SocialLogins/Google_Logout';
import ChooseLocation from './SocialLogins/ChooseLocation';
import ForgotPassword from './SocialLogins/ForgotPassword';
import ChangePassword from './SocialLogins/ChangePassword';
import Facebook_Logout from './SocialLogins/Facebook_Logout';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

const App = () => {

  // const Stack = createNativeStackNavigator();
  const Stack = createStackNavigator();


  const config = {
    animation: 'spring',
    config: {
      stiffness: 200,
      damping: 80,
      overshootClamping: false,
      resDisplacementThreshold: 0.1,
      restSpeedThreshold: 0.1
    }
  }
  const closeConfig = {
    animation: 'timing',
    config: {
      duration: 300,
      easing: Easing.linear
    }
  }

  return (
    <>
      <NavigationContainer>

        <Stack.Navigator screenOptions={{
          headerShown: false,
          // ...TransitionPresets.SlideFromRightIOS
          gestureEnabled: true,
          gestureDirection: "horizontal",
          transitionSpec: {
            open: config,
            close: closeConfig
          },
        }}
          animation='slide'
          initialRouteName='Home'>

          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="OtpHere" component={OtpHere} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="AppLoader" component={AppLoader} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="ChangePassword" component={ChangePassword} />
        </Stack.Navigator>

      </NavigationContainer>

    </>
  );
};

export default App;

// git init
// git status
// git add .
// git commit -m "first commit"
// 1st time you have to manually publish
// git push

// after editing

// git add filename(App.js)
// git commit -m "message"
// git push

