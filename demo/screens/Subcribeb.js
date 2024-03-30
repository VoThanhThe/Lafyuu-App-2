import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const Subcribeb = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Image source={require(".//assets/logo.png")} style={{ width: 180, height: 46.16 }} />
            <Text style={{ width: 300, fontFamily: "Teko", fontSize: 24, fontWeight: "300", lineHeight: 26, letterSpacing: 0.5, textAlign: "center", marginTop: 16, textTransform: "uppercase", color: "#333333", marginBottom: 4 }}>
                DO every task of your daily life into a source of income
            </Text>
            <TextInput style={styles.textInput} placeholder='Email' />
            <TextInput style={styles.textInput} placeholder='Password' secureTextEntry={true} />
            <LinearGradient colors={['#2AD3F8', '#933CFF']} start={{ x: 0, y: 1 }} end={{ x: 1.7, y: 1 }} style={styles.button}>
                <TouchableOpacity style = {{width: '100%'}} onPress={() => navigation.navigate("CreateAction1")}>
                    <Text style={styles.textButton}>Sign in</Text>
                </TouchableOpacity>
            </LinearGradient>
            <View style={{ marginTop: 16, flexDirection: "row" }}>
                <Text style={styles.text}>Don't have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate("Imnew")}>
                    <Text style={[styles.text, { color: '#627EEA' }]}>Register</Text>
                </TouchableOpacity>
            </View>

            <LinearGradient colors={['#852AF8', '#FF3CB1']} start={{ x: 0, y: 1 }} end={{ x: 1.7, y: 1 }} style={[styles.button,{marginTop: 130}]}>
                <TouchableOpacity style = {{width: '100%'}} onPress={() => navigation.navigate("Login")}>
                    <Text style={styles.textButton}>Connect Wallet</Text>
                </TouchableOpacity>
            </LinearGradient>
        </View>
    )
}

export default Subcribeb

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center', paddingHorizontal: 18
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
        width: "100%",
        height: 50,
        marginTop: 20,
        paddingVertical: 12,
        flexDirection: 'row',
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: "#2AD3F8",
        borderRadius: 30
    },
    textButton: {
        fontSize: 16,
        fontWeight: "500",
        color: "#ffffff",
        textAlign: "center"
    },
    icon: {

    },
    textInput: {
        width: "100%",
        height: 51,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: "#D8D8D8",
        paddingLeft: 20,
        paddingRight: 12,
        paddingVertical: 16,
        fontSize: 16,
        fontWeight: "300",
        lineHeight: 28,
        color: "#333333",
        marginTop: 16
    },
    text: {
        fontSize: 14,
        fontWeight: "300",
        lineHeight: 24,
        color: "#333333",
    }
})