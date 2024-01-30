/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';

// Lắng nghe sự kiện khi ứng dụng đang mở
messaging().onNotificationOpenedApp(async remoteMessage => {
    console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
    );
});

// Đặt background message handler để xử lý thông báo khi ứng dụng không hoạt động
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);
