import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const CreateAction4 = () => {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
            <View style={{ paddingHorizontal: 18 }}>
                <View style={{ alignSelf: "flex-end" }}>
                    <Image source={require(".//assets/logo.png")} style={{ width: 120, height: 31 }} />
                </View>
                <View style={{ backgroundColor: "#333333", height: 3, width: "100%", borderRadius: 5, marginTop: 20 }}>
                    <View style={{ backgroundColor: "#2AD3F8", height: 3, width: "40%", borderRadius: 5, }}></View>
                </View>
            </View>
            <View style={{ marginTop: 60 }}>
                <Text style={{ fontFamily: "Teko", fontSize: 24, fontWeight: '500', lineHeight: 26, letterSpacing: 0.5, textAlign: "center", color: "#333333" }}>
                What do you weight?
                </Text>
                <Text style={{ fontSize: 14, fontWeight: '300', lineHeight: 18, letterSpacing: 0.5, textAlign: "center", color: "#333333" }}>
                    We’re asking this to offer you a customized experience
                </Text>
            </View>

            <TextInput style={styles.textInput} placeholder='Enter your weight' keyboardType='numeric' />
            <View style = {{justifyContent: "center", alignItems: "center", marginTop: 300}}>
                <LinearGradient colors={['#2AD3F8', '#933CFF']} start={{ x: 0, y: 1 }} end={{ x: 1.7, y: 1 }} style={styles.button}>
                    <TouchableOpacity style={{ width: '100%' }} onPress={() => navigation.navigate("CreateAction5")}>
                        <Text style={styles.textButton}>Next</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </View>
        </View>
  )
}

export default CreateAction4

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        paddingVertical: 10
    },
    textInput: {
        width: '100%',
        fontSize: 24,
        fontWeight: '300',
        lineHeight: 18,
        letterSpacing: 0.5,
        textAlign: "center",
        fontFamily: "Teko",
        marginTop: 138,
        color: "#333333"
    },
    button: {
        width: 270,
        height: 50,
        paddingVertical: 12,
        flexDirection: 'row',
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: "#2AD3F8",
        borderRadius: 30
    },
    textButton: {
        fontSize: 20,
        fontWeight: "400",
        color: "#ffffff",
        textAlign: "center",
        fontFamily: "Teko",
        letterSpacing: 1,
        textTransform: 'uppercase'
    },
})