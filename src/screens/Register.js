import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Pressable,
  TouchableOpacity,
  ToastAndroid
} from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';

// import {validaEmpty, validaEmail, validaPassword} from 'constants/validation';
import { validaEmpty, validaEmail, validaPassword } from "../constants/validation"
import AxiosIntance from '../ultil/AxiosIntance';

const Register = (props) => {
  const { navigation } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');

  const [errEmail, setErrEmail] = useState(true);
  const [errPassword, setErrPassword] = useState(true);
  const [errPasswordAgain, setErrPasswordAgain] = useState(true);

  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisibleFailed, setModalVisibleFailed] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleModalFailed = () => {
    setModalVisibleFailed(!isModalVisibleFailed);
  };

  const subMit = async () => {
    let result = {
      emai: email,
      password: password,
      passwordAgain: passwordAgain
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
      } else if (password.length < 8) {
        setErrPassword('Password must be at least 8 characters long.');
      } else {
        setErrPassword('Password must be at least 8 characters long.');
      }
    }

    if (passwordAgain.length == 0) {
      setErrPasswordAgain('This field cannot be left blank.');
    } else if (email.length > 0) {
      if (validaPassword(passwordAgain)) {
        setErrPasswordAgain('');
      } else {
        setErrPasswordAgain('Password must be at least 8 characters long.');
      }
    }

    if (validaEmail(email) && validaPassword(password) && validaPassword(passwordAgain)) {
      console.log(result);
      try {
        const response = await AxiosIntance()
          // .post("/users/register",
          //   { email: emailUser, password: passwordUser });
          .post("/api/user/register",
            { email: email, password: password, confirm_password: passwordAgain });

        if (response.returnData.error == false) {
          toggleModal();
          ToastAndroid.show("Register Successfully!", ToastAndroid.SHORT);
          // navigation.navigate('Login');
        } else {
          toggleModalFailed();
          ToastAndroid.show('Register Failed!', ToastAndroid.SHORT);
        }
      } catch (e) {
        toggleModalFailed();
        console.log(e);
      }
    }
  }

  return (
    <View style={styles.container}>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Image style={styles.logo} source={require('../assets/logo.png')} />
      </View>
      <Text style={styles.header}>Let’s Get Started</Text>
      <Text style={styles.content}>Create an new account</Text>
      <View style={styles.inputHeader}>
        <TextInput style={styles.input} placeholder="Your Email"
          onChangeText={(email) => setEmail(email)} />
        <Icon style={styles.icon} name="envelope-o" color="#9098B1" size={20} />
      </View>
      <Text style={{ color: 'red', fontSize: 16 }}>{errEmail}</Text>

      <View style={styles.inputHeader}>
        <TextInput style={styles.input} placeholder="Password" secureTextEntry={true}
          onChangeText={(password) => setPassword(password)} />
        <Icon1 style={styles.icon} name="lock" color="#9098B1" size={20} />
      </View>
      <Text style={{ color: 'red', fontSize: 16 }}>{errPassword}</Text>

      <View style={styles.inputHeader}>
        <TextInput style={styles.input} placeholder="Password Again" secureTextEntry={true}
          onChangeText={(passwordAgain) => setPasswordAgain(passwordAgain)} />
        <Icon1 style={styles.icon} name="lock" color="#9098B1" size={20} />
      </View>
      <Text style={{ color: 'red', fontSize: 16 }}>{errPasswordAgain}</Text>

      <TouchableOpacity
        style={styles.button}
        // onPress={() => {
        //   navigation.navigate('Login');
        // }}
        onPress={subMit}
      >
        <Text style={styles.textButton}>Sign Up</Text>
      </TouchableOpacity>

      <View style={styles.viewFooter}>
        <Text style={styles.textFooter}>have a account? </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Login');
          }}>
          <Text style={[styles.textFooter, { color: '#40BFFF' }]}>Sign In</Text>
        </TouchableOpacity>
      </View>
      <Modal isVisible={isModalVisible} animationIn="slideInUp" animationOut="slideOutDown">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={{ backgroundColor: "#ffffff", justifyContent: "center", alignItems: 'center', paddingHorizontal: 16 }}>
              <Ionicons name='checkmark-circle' size={100} color={"#40BFFF"} />
              <Text style={{ fontSize: 26, fontWeight: "700", color: "#223263", marginTop: 16 }}>Success</Text>
              <Text style={{ fontSize: 14, fontWeight: "400", color: "#9098B1", marginTop: 8, textAlign: "center" }}>Please verify your email to complete the registration.</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("Login")}
                style={{ backgroundColor: "#40BFFF", width: '100%', height: 57, borderRadius: 5, marginTop: 16 }}
              >
                <Text style={{ fontSize: 18, fontWeight: "700", color: "#ffffff", lineHeight: 57, textAlign: "center", }}>Ok</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal isVisible={isModalVisibleFailed} animationIn="slideInUp" animationOut="slideOutDown">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={{ backgroundColor: "#ffffff", justifyContent: "center", alignItems: 'center', paddingHorizontal: 16 }}>
              <Ionicons name='alert-circle-sharp' size={100} color={"#FB7181"} />
              <Text style={{ fontSize: 26, fontWeight: "700", color: "#223263", marginTop: 16 }}>Failed</Text>
              <Text style={{ fontSize: 14, fontWeight: "400", color: "#9098B1", marginTop: 8, textAlign: "center" }}>Please check if your email is registered and confirm the password must match your password.</Text>
              <TouchableOpacity
                onPress={toggleModalFailed}
                style={{ backgroundColor: "#40BFFF", width: '100%', height: 57, borderRadius: 5, marginTop: 16 }}
              >
                <Text style={{ fontSize: 18, fontWeight: "700", color: "#ffffff", lineHeight: 57, textAlign: "center", }}>Ok</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
  },
  logo: {
    width: 72,
    height: 72,
    marginTop: 110,
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
    marginTop: 24,
  },
  textFooter: {
    fontSize: 12,
    fontWeight: '700',
    color: '#9098B1',
    lineHeight: 18,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});
