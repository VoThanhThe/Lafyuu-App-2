import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
// request permission for notifications messages
export const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
        getFCMToken();
    }

}

// get fcmtoken to send notification
export const getFCMToken = async () => {
    let fcmtoken = await AsyncStorage.getItem("fcmtoken");
    if(!fcmtoken) {
        try {
            const token = await messaging().getToken();
            console.log(token);
            if(token) {
                await AsyncStorage.setItem("fcmtoken", token);
            }
            
        } catch (error) {
            console.log(error, "error getting fcmtoken");
        }
    }
}