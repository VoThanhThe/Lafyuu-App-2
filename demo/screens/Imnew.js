import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const Imnew = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Image source={require(".//assets/logo.png")} style={{ width: 180, height: 46.16 }} />
            <Text style={{ width: 300, fontFamily: "Teko", fontSize: 24, fontWeight: "300", lineHeight: 26, letterSpacing: 0.5, textAlign: "center", marginTop: 16, textTransform: "uppercase", color: "#333333", marginBottom: 4 }}>
                DO every task of your daily life into a source of income
            </Text>
            <TextInput style={styles.textInput} placeholder='Name' />
            <TextInput style={styles.textInput} placeholder='Email' />
            <TextInput style={styles.textInput} placeholder='Password' secureTextEntry={true} />
            <View style={{ flexDirection: 'row', marginTop: 16, }}>
                <View style={{ width: 18, height: 18, borderWidth: 1, borderColor: '#333333', borderRadius: 4, marginRight: 10, marginTop: 5 }}></View>
                <Text style={styles.text}>By creating an account, I agree to Hepius's Terms of Service and Privacy Policy.</Text>
            </View>
            <LinearGradient colors={['#2AD3F8', '#933CFF']} start={{ x: 0, y: 1 }} end={{ x: 1.7, y: 1 }} style={styles.button}>
                <TouchableOpacity style = {{width: '100%'}} onPress={() => navigation.navigate("Subcribeb")}>
                    <Text style={styles.textButton}>Register</Text>
                </TouchableOpacity>
            </LinearGradient>
            {/* <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Subcribeb")}>
                <Text style={styles.textButton}>Register</Text>
            </TouchableOpacity> */}
            <View style={{ marginTop: 16, flexDirection: "row" }}>
                <Text style={styles.text}>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate("Subcribeb")}>
                    <Text style={[styles.text, { color: '#627EEA' }]}>Sign in</Text>
                </TouchableOpacity>
            </View>
            <LinearGradient colors={['#852AF8', '#FF3CB1']} start={{ x: 0, y: 1 }} end={{ x: 1.7, y: 1 }} style={[styles.button,{marginTop: 61}]}>
                <TouchableOpacity style = {{width: '100%'}} onPress={() => navigation.navigate("Login")}>
                    <Text style={styles.textButton}>Connect Wallet</Text>
                </TouchableOpacity>
            </LinearGradient>
            {/* <TouchableOpacity style={[styles.button, { backgroundColor: "#FF3CB1" }]} onPress={() => navigation.navigate("Login")}>
                <Text style={styles.textButton}>Connect Wallet</Text>
            </TouchableOpacity> */}
        </View>
    )
}

export default Imnew

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
        borderRadius: 30,

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