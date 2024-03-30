import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { LinearTextGradient } from "react-native-text-gradient";
import MaskedView from '@react-native-community/masked-view';


const Login = () => {
  const navigation = useNavigation()
  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff", justifyContent: "center", alignItems: 'center' }}>
      <Image source={require(".//assets/logo.png")} style={{ width: 180, height: 46.16 }} />
      <Text style={{ width: 300, fontFamily: "Teko", fontSize: 24, fontWeight: "300", lineHeight: 26, letterSpacing: 0.5, textAlign: "center", marginTop: 16, textTransform: "uppercase", color: "#333333" }}>
        DO every task of your daily life into a source of income
      </Text>
      <LinearGradient
        colors={['#2AD3F8', '#933CFF']}
        start={{ x: 0, y: 1 }} end={{ x: 1.7, y: 1 }}
        style={styles.grediant}
      >
        <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate("Imnew")}>
          {/* <Text style={styles.buttonText}>
            LOGIN
          </Text> */}
          <LinearTextGradient
            style={styles.buttonText}
            locations={[0, 1]}
            colors={['#2AD3F8', '#933CFF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text>
              I HAVE SUBCRIBED
            </Text>
          </LinearTextGradient>
          <Ionicons name="chevron-forward-circle-sharp" size={30} color="#2AD3F8" />
        </TouchableOpacity>
      </LinearGradient>
      <LinearGradient
        colors={['#852AF8', '#FF3CB1']}
        start={{ x: 0, y: 1 }} end={{ x: 1.7, y: 1 }}
        style={styles.grediant}
      >
        <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate("Subcribeb")}>
          {/* <Text style={styles.buttonText}>
            LOGIN
          </Text> */}
          <LinearTextGradient
            style={styles.buttonText}
            locations={[0, 1]}
            colors={['#852AF8', '#FF3CB1']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text>
              I HAVE SUBCRIBED
            </Text>
          </LinearTextGradient>
          <Ionicons name="chevron-forward-circle-sharp" size={30} color="#FF3CB1" />
        </TouchableOpacity>
      </LinearGradient>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#40BFFF',
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageContainer: {
    opacity: 1,
  },
  logo: {
    width: 72,
    height: 72,
    resizeMode: "contain"
  },
  button: {
    width: 270,
    height: 50,
    marginTop: 20,
    borderWidth: 4,
    borderRadius: 30,
    paddingHorizontal: 40,
    paddingVertical: 7,
    flexDirection: 'row',
    justifyContent: "space-between",
    alignContent: "center",
    borderColor: "#2AD3F8",

  },
  textButton: {
    fontFamily: "Teko",
    fontSize: 20,
    fontWeight: "400",
    lineHeight: 28,
    letterSpacing: 1,
    color: "#2AD3F8",
    textTransform: "uppercase",
    marginTop: 2
  },
  icon: {

  },
  grediant: {
    height: 50,
    width: 270,
    marginTop: 20,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 30,
    

  },
  buttonContainer: {
    flex: 1.0,
    flexDirection: "row",
    alignSelf: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    width: '96%',
    margin: 4,
    borderRadius: 30,
    paddingHorizontal: 40,
    paddingVertical: 5
  },
  buttonText: {
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: "400",
    lineHeight: 28,
    letterSpacing: 1,
    color: "#2AD3F8",
    textTransform: "uppercase",
    fontFamily: "Teko"
  },
  shadow: {
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },

})

export default Login;
