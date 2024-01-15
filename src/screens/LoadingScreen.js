import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const LoadingScreen = () => {
    return (
        <View style = {styles.container}>
            <ActivityIndicator size={70} color='#40BFFF' />
            <Text style = {{fontSize: 20, marginTop: 8, color: "#40BFFF"}}>Loading...</Text>
        </View>
    )
}

export default LoadingScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        justifyContent: "center",
        alignItems: "center"
    }
})