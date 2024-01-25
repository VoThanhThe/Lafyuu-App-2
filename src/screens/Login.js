import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  Alert,
  Button,
} from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/Feather';
import { AppContext } from '../ultil/AppContext';
import { validaEmpty, validaEmail, validaPassword } from "../constants/validation";
import AxiosIntance from '../ultil/AxiosIntance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux2/actions/UserAction'
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const Login = (props) => {
  const { isLogin, setisLogin } = useContext(AppContext);
  const { navigation } = props;
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errEmail, setErrEmail] = useState(true);
  const [errPassword, setErrPassword] = useState(true);
  const [errResult, setErrResult] = useState(false);
  const click = async () => {
    let result = {
      emai: email,
      password: password,
    }
    if (email.length == 0) {
      setErrEmail('This field cannot be left blank.');
    } else if (email.length > 0) {
      if (validaEmail(email)) {
        setErrEmail('');
      } else {
        setErrEmail('Email address is not valid. Please enter a valid email.');
      }
    }

    if (password.length == 0) {
      setErrPassword('This field cannot be left blank.');
    } else if (email.length > 0) {
      if (validaPassword(password)) {
        setErrPassword('');
      } else {
        setErrPassword('Password must be at least 8 characters long.');
      }
    }

    if (validaEmail(email) && validaPassword(password)) {
      console.log(result);
      try {
        const response = await AxiosIntance().post("/api/user/login", { email: email, password: password });
        console.log("Result: ", response);
        if (response.returnData.error == false) {
          dispatch(loginUser(response.user));
          console.log(response.token);
          await AsyncStorage.setItem("token", response.token);
          ToastAndroid.show('Login Successfully!', ToastAndroid.SHORT);
          setisLogin(true);
          setErrResult(false);
        } else {
          ToastAndroid.show('Login Failed!', ToastAndroid.SHORT);
          Alert.alert('Login Failed!');
        }
      } catch (e) {
        console.log(e);
        setErrResult(true);
      }
    }

  };

  useEffect(() => {
    // Khởi tạo thư viện Google Sign-In
    GoogleSignin.configure({
      webClientId: '536256392189-92ghr4nhfuh1u2horklnrsrnb60p390r.apps.googleusercontent.com', // Cung cấp Web Client ID từ Google Developer Console
    });
  }, []);

  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      // userInfo.idToken chính là token xác thực bạn cần
      const token = userInfo.idToken;
      const user = userInfo.user;
      console.log("Token:", token);
      console.log("User:", user);
      await AsyncStorage.setItem("token", token);
      ToastAndroid.show('Login Successfully!', ToastAndroid.SHORT);
      setisLogin(true);

      // Lưu token và thực hiện các bước khác, chẳng hạn như đăng nhập vào hệ thống của bạn
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // Người dùng huỷ đăng nhập
        console.log('Google Sign-In cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // Đang có quá trình đăng nhập khác đang diễn ra
        console.log('Google Sign-In in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // Google Play Services không khả dụng
        console.log('Google Play Services not available');
      } else {
        // Lỗi khác
        console.error('Google Sign-In error', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Image style={styles.logo} source={require('../assets/logo.png')} />
      </View>
      <Text style={styles.header}>Welcome to Lafyuu</Text>
      <Text style={styles.content}>Sign in to continue</Text>
      <View style={styles.inputHeader}>
        <TextInput style={styles.input} placeholder="Your Email"
          onChangeText={(email) => setEmail(email)} />
        <Icon style={styles.icon} name="envelope-o" color="#9098B1" size={20} />
      </View>
      {
        errEmail.length > 0 ? (<Text style={{ color: 'red', fontSize: 16, marginTop: 8 }}>{errEmail}</Text>) : (<Text style={{ height: 0 }}></Text>)
      }

      <View style={styles.inputHeader}>
        <TextInput style={styles.input} placeholder="Password" secureTextEntry={true}
          onChangeText={(password) => setPassword(password)} />
        <Icon1 style={styles.icon} name="lock" color="#9098B1" size={20} />
      </View>
      {
        errPassword.length > 0 ? (<Text style={{ color: 'red', fontSize: 16, marginTop: 8 }}>{errPassword}</Text>) : (<Text style={{ height: 0 }}></Text>)
      }

      {
        errResult ? (<Text style={{ color: 'red', fontSize: 16, marginTop: 8, textAlign: 'center' }}>Account not found. Please check again.</Text>) : (<Text style={{ height: 0 }}></Text>)
      }

      <TouchableOpacity style={styles.button} onPress={click}>
        <Text style={styles.textButton}>Sign In</Text>
      </TouchableOpacity>

      <Text
        style={[
          styles.header,
          { fontSize: 14, color: '#9098B1', marginTop: 24 },
        ]}>
        OR
      </Text>
      <TouchableOpacity style={styles.buttonSocial} onPress={handleGoogleLogin}>
        <Text style={styles.textButtonSocial}>Login with Google</Text>
        <Image
          style={styles.imageGG}
          source={require('../assets/Google.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonSocial}>
        <Text style={styles.textButtonSocial}>Login with facebook</Text>
        <Image
          style={styles.imageFace}
          source={require('../assets/Facebook.png')}
        />
      </TouchableOpacity>

      <Text style={[styles.header, { color: '#40BFFF' }]}>Forgot Password?</Text>
      <View style={styles.viewFooter}>
        <Text style={styles.textFooter}>Don’t have a account? </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Register');
          }}>
          <Text style={[styles.textFooter, { color: '#40BFFF' }]}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
  },
  logo: {
    width: 72,
    height: 72,
    marginTop: 68,
  },
  header: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
    lineHeight: 24,
    textAlign: 'center',
    marginTop: 16,
  },
  content: {
    fontSize: 12,
    fontWeight: '400',
    color: '#9098B1',
    lineHeight: 21.6,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 48,
    borderWidth: 1,
    borderColor: '#EBF0FF',
    backgroundColor: '#ffffff',
    borderRadius: 5,
    paddingLeft: 50,
  },
  icon: {
    position: 'absolute',
    top: 15,
    left: 18,
  },
  inputHeader: {
    position: 'relative',
    marginTop: 8,
  },
  button: {
    width: '100%',
    height: 57,
    backgroundColor: '#40BFFF',
    borderRadius: 5,
    marginTop: 16,
  },
  textButton: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ffffff',
    lineHeight: 57,
    textAlign: 'center',
  },
  buttonSocial: {
    width: '100%',
    height: 57,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    borderWidth: 1,
    marginTop: 16,
    borderColor: '#EBF0FF',
    position: 'relative',
  },
  textButtonSocial: {
    fontSize: 14,
    fontWeight: '700',
    color: '#9098B1',
    lineHeight: 57,
    textAlign: 'center',
  },
  imageGG: {
    width: 20,
    height: 20,
    position: 'absolute',
    top: 16,
    left: 18,
  },
  imageFace: {
    width: 11,
    height: 20,
    position: 'absolute',
    top: 16,
    left: 18,
  },
  viewFooter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  textFooter: {
    fontSize: 12,
    fontWeight: '700',
    color: '#9098B1',
    lineHeight: 18,
    textAlign: 'center',
  },
});
