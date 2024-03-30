import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const CreateAction5 = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={{ paddingHorizontal: 18 }}>
                <View style={{ alignSelf: "flex-end" }}>
                    <Image source={require(".//assets/logo.png")} style={{ width: 120, height: 31 }} />
                </View>
                <View style={{ backgroundColor: "#333333", height: 3, width: "100%", borderRadius: 5, marginTop: 20 }}>
                    <View style={{ backgroundColor: "#2AD3F8", height: 3, width: "50%", borderRadius: 5, }}></View>
                </View>
            </View>
            <View style={{ marginTop: 60 }}>
                <View style={{ alignSelf: "center" }}>
                    <Text style={{ width: 300, fontFamily: "Teko", fontSize: 24, fontWeight: '500', lineHeight: 26, letterSpacing: 0.5, textAlign: "center", color: "#333333" }}>
                        How experienced are you with lifting weights?
                    </Text>
                </View>
                <Text style={{ fontSize: 14, fontWeight: '300', lineHeight: 18, letterSpacing: 0.5, textAlign: "center", color: "#333333" }}>
                    We’re asking this to offer you a customized experience
                </Text>
            </View>
            <View style={{ marginTop: 50, paddingHorizontal: 18, }}>
                <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: "center", paddingVertical: 20 }}>
                    <View style={{ width: 300 }}>
                        <Text style={styles.title}>I am New to It</Text>
                        <Text style={styles.body}>I’m new or have only tried it for a bit</Text>
                    </View>
                    <View style={{ width: 18, height: 18, backgroundColor: "#ffffff", borderWidth: 1, borderColor: "#627EEA", borderRadius: 10, justifyContent: 'center', alignItems: "center" }}>
                        <View style={{ width: 13, height: 13, backgroundColor: "#627EEA", borderRadius: 10 }}></View>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: "center", paddingVertical: 20, borderTopWidth: 1, borderBottomWidth: 1, borderColor: "#D8D8D8" }}>
                    <View style={{ width: 300 }}>
                        <Text style={styles.title}>I have Lifted before</Text>
                        <Text style={styles.body}>
                            I have lifted weights before but never stuck to a balanced routine</Text>
                    </View>
                    <View style={{ width: 18, height: 18, backgroundColor: "#ffffff", borderWidth: 1, borderColor: "#D8D8D8", borderRadius: 10, justifyContent: 'center', alignItems: "center" }}>
                        <View style={{ width: 13, height: 13, backgroundColor: "#D8D8D8", borderRadius: 10 }}></View>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: "center", paddingVertical: 20 }}>
                    <View style={{ width: 300 }}>
                        <Text style={styles.title}>I am Advanced</Text>
                        <Text style={styles.body}>I have stuck to a balanced routine for years</Text>
                    </View>
                    <View style={{ width: 18, height: 18, backgroundColor: "#ffffff", borderWidth: 1, borderColor: "#D8D8D8", borderRadius: 10, justifyContent: 'center', alignItems: "center" }}>
                        <View style={{ width: 13, height: 13, backgroundColor: "#D8D8D8", borderRadius: 10 }}></View>
                    </View>
                </View>
            </View>

            <View style={{ justifyContent: "center", alignItems: "center", marginTop: 140 }}>
                <LinearGradient colors={['#2AD3F8', '#933CFF']} start={{ x: 0, y: 1 }} end={{ x: 1.7, y: 1 }} style={styles.button}>
                    <TouchableOpacity style={{ width: '100%' }} onPress={() => navigation.navigate("CreateAction6")}>
                        <Text style={styles.textButton}>Next</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </View>
        </View>
    )
}

export default CreateAction5

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
    title: {
        fontSize: 16,
        fontWeight: "500",
        lineHeight: 24,
        letterSpacing: 0.5,
        textAlign: 'left',
        color: "#333333"
    }
    ,
    body: {
        fontSize: 14,
        fontWeight: "400",
        lineHeight: 21,
        letterSpacing: 0.5,
        textAlign: 'left',
        color: "#333333"
    }
})