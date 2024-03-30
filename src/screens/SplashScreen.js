import React, { useEffect, useRef } from 'react';
import { StyleSheet, Animated, View, Image } from 'react-native';

const SplashScreen = () => {
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(
      scaleAnim,
      {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.imageContainer, { transform: [{ scale: scaleAnim }] }]}>
        <Image style={styles.logo} source={require('../assets/logo_white.png')} />
      </Animated.View>
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
  }
})

export default SplashScreen;
