import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'

const SplashScreen = () => {
  return (
    <View style = {styles.container}>
      <Image style = {styles.logo} source={require('../assets/logo_white.png')}/>
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#40BFFF',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    width: 72,
    height: 72,
  }
})