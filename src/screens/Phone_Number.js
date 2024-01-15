import { StyleSheet, Text, View, Image, TextInput, FlatList, Pressable, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { validaPhone } from "../constants/validation";
import AxiosIntance from '../ultil/AxiosIntance';

const Phone_Number = (props) => {
    const { navigation, route } = props;
    const { phone, user_id } = route.params;
    const [phoneNumber, setphoneNumber] = useState(phone);
    const [errPhone, setErrPhone] = useState('');

    const onSave = async () => {
        if (phoneNumber.length == 0) {
            setErrPhone('This field cannot be left blank.');
        } else if (phoneNumber.length > 0) {
            if (validaPhone(phoneNumber)) {
                setErrPhone("");
                try {
                    const response = await AxiosIntance().post(`/api/user/${user_id}/edit_profile`, { phone: phoneNumber });
                    console.log("Result: ", response);
                    if (response.returnData.error == false) {
                        navigation.push("Profile");
                    } else {
                    }
                } catch (e) {
                    console.log(e);
                }
            } else {
                setErrPhone("Please enter a valid phone number.");
            }
        }
    }

    return (
        <View style={styles.container}>
            {/* Start Header */}
            <View style={styles.groupHeader}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => { navigation.push("Profile") }}>
                        <Ionicons name="chevron-back" color="#9098B1" size={20} />
                    </TouchableOpacity>
                    <Text style={styles.textHeader}>Phone Number</Text>
                </View>

            </View>
            {/* End Header */}
            <View style={{ padding: 16 }}>
                <Text style={styles.textItem}>Phone Number</Text>
                <View style={styles.inputHeader} >
                    <TextInput style={[styles.input]} onChangeText={setphoneNumber} value={phoneNumber} keyboardType='numeric' />
                    <Ionicons style={styles.icon} name="phone-portrait-outline" color="#9098B1" size={20} />
                    {
                        errPhone.length > 0 ? (<Text style={{ color: 'red', fontSize: 16, marginTop: 8 }}>{errPhone}</Text>) : (<Text style={{ height: 0 }}></Text>)
                    }
                </View>
            </View>

            <TouchableOpacity style={styles.buttonSave} onPress={onSave}>
                <Text style={styles.textButtonSave}>Save</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Phone_Number

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    groupHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomColor: '#EBF0FF',
        borderBottomWidth: 1
    },
    textHeader: {
        fontSize: 16,
        fontWeight: '700',
        lineHeight: 24,
        color: '#223263',
        marginStart: 21
    },
    viewFlex: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    viewFlex_1: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textItem: {
        fontSize: 14,
        fontWeight: '700',
        lineHeight: 21,
        color: '#223263',
        marginBottom: 12
    },
    textInput: {
        fontSize: 12,
        fontWeight: '700',
        lineHeight: 21.6,
        color: '#9098B1',
        textAlign: 'left',
    },
    input: {
        width: '100%',
        height: 48,
        paddingHorizontal: 16,
        paddingVertical: 13,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#EBF0FF',
        marginBottom: 0,
        paddingStart: 50,

    },
    icon: {
        position: 'absolute',
        top: 15,
        left: 18,
    },
    inputHeader: {
        position: 'relative',

    },
    textbottom: {
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 21.6,
        color: '#40BFFF',
        textAlign: 'left',
        marginTop: 8
    },
    buttonSave: {
        position: 'absolute',
        bottom: 10,
        right: 16,
        left: 16,
        height: 57,
        backgroundColor: '#40BFFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginVertical: 16,
    },
    textButtonSave: {
        fontSize: 14,
        fontWeight: '700',
        lineHeight: 25.2,
        color: "#ffffff",
    },

})