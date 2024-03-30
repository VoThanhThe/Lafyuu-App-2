import React,{useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/ultil/AppNavigator';
import { AppContextProvider } from './src/ultil/AppContext';
import { Provider } from 'react-redux';
import { store } from './src/redux2/stores/Stores';
import { StripeProvider } from '@stripe/stripe-react-native';
import Status from './src/screens/Status';
import { requestUserPermission } from './src/ultil/PushNotificationHelper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from './src/screens/SplashScreen';
import Login from './demo/screens/Login';
import Imnew from './demo/screens/Imnew';
import {createStackNavigator} from '@react-navigation/stack';
import Subcribeb from './demo/screens/Subcribeb';
import CreateAction1 from './demo/screens/CreateAction1';
import CreateAction2 from './demo/screens/CreateAction2';
import CreateAction4 from './demo/screens/CreateAction4';
import CreateAction5 from './demo/screens/CreateAction5';
import CreateAction6 from './demo/screens/CreateAction6';

const Stack = createStackNavigator();

const App = () => {
  const [token, setToken] = useState('');
  const [showSplash, setShowSplash] = useState(true);
  const STRIPE_KEY = 'pk_test_51OAMNGANZv3Twwu9pzJzF1umKF8axh0rzphoESMxaGlGaIa0NDb1q4v18l8WugkxdR72EqNfzDrRKGr1VWv9N2Z400vuFz9UB4';
  
  useEffect(() => {
    requestUserPermission();
    getFCMToken();
    setTimeout(() => {
      setShowSplash(false); // Ẩn màn hình flash sau một khoảng thời gian
    }, 3000); // Đặt thời gian hiển thị màn hình flash
  }, [])
  
  const getFCMToken = async () => {
    const token = await AsyncStorage.getItem("fcmtoken");
    if(token) {
      setToken(token);
      console.log("Token Notification: ", token);
    }
  }
    return (
      // <Provider store={store}>
      //   <StripeProvider publishableKey={STRIPE_KEY}>
      //     <AppContextProvider>
      //       <NavigationContainer>
      //         {
      //           showSplash ? <SplashScreen /> : <AppNavigator />
      //         }
      //         {/* <AppNavigator /> */}
      //       </NavigationContainer>
      //     </AppContextProvider>
      //   </StripeProvider>
      // </Provider>
      // <Imnew></Imnew>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login' screenOptions={{
          headerShown: false,
        }}>
          <Stack.Screen name='Login' component={Login}/>
          <Stack.Screen name='Imnew' component={Imnew}/>
          <Stack.Screen name='Subcribeb' component={Subcribeb}/>
          <Stack.Screen name='CreateAction1' component={CreateAction1}/>
          <Stack.Screen name='CreateAction2' component={CreateAction2}/>
          <Stack.Screen name='CreateAction4' component={CreateAction4}/>
          <Stack.Screen name='CreateAction5' component={CreateAction5}/>
          <Stack.Screen name='CreateAction6' component={CreateAction6}/>
        </Stack.Navigator>
      </NavigationContainer>
      // <Login></Login>
    );
  }


export default App;
