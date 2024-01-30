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

const App = () => {
  const [token, setToken] = useState('');
  const STRIPE_KEY = 'pk_test_51OAMNGANZv3Twwu9pzJzF1umKF8axh0rzphoESMxaGlGaIa0NDb1q4v18l8WugkxdR72EqNfzDrRKGr1VWv9N2Z400vuFz9UB4';
  
  useEffect(() => {
    requestUserPermission();
    getFCMToken();
  }, [])
  
  const getFCMToken = async () => {
    const token = await AsyncStorage.getItem("fcmtoken");
    if(token) {
      setToken(token);
      console.log("Token Notification: ", token);
    }
  }
  return (
    <Provider store={store}>
      <StripeProvider publishableKey={STRIPE_KEY}>
        <AppContextProvider>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </AppContextProvider>
      </StripeProvider>
    </Provider>
  );
}

export default App;
