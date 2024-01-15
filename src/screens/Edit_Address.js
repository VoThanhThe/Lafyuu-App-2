import { StyleSheet, Text, View, ScrollView, TextInput, Image, FlatList, Button, Pressable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { validaAddress, validaName, validaPhone } from "../constants/validation";
import { useSelector } from 'react-redux'
import AxiosIntance from '../ultil/AxiosIntance'

const Edit_Address = (props) => {
    const { navigation, route } = props;
    const {data} = route.params;
    const receiver_name = data.receiver_name;
    const addressData = data.address;
    const phoneNumber = data.phone;
    const user = useSelector(state => state.UserReducer.user);
    const [name, setName] = useState(receiver_name);
    const [address, setAddress] = useState(addressData);
    const [phone, setPhone] = useState(phoneNumber);

    console.log("datta: ", data)
    const [errName, setErrName] = useState("");
    const [errAddress, setErrAddress] = useState("");
    const [errPhone, setErrPhone] = useState("");
    const [isResult, setIsResult] = useState(false);

    const onEditAddress = async () => {
        let result = {
            name: name,
            address: address,
            phone: phone,
        }
        if (validaName(name)) {
            setErrName('');
        } else {
            setErrName('This field cannot be left blank.');
        }

        if (validaAddress(address)) {
            setErrAddress('');
        } else {
            setErrAddress('This field cannot be left blank.');
        }

        if (phone.length == 0) {
            setErrPhone('This field cannot be left blank.');
        } else if (phone.length > 0) {
            if (validaPhone(phone)) {
                setErrPhone('');
            } else {
                setErrPhone('Please enter a valid phone number.');
            }
        }

        if (validaName(name) && validaPhone(phone) && validaAddress(address)) {
            console.log(result);
            try {
                const response = await AxiosIntance().post("/api/addresses/update-address/?id="+ data._id, { receiver_name: name, address: address, phone: phone, user_id: user._id });
                console.log("Result: ", response);
                if (response.returnData.error == false) {
                    navigation.pop();
                } else {
                    ToastAndroid.show('Failed!', ToastAndroid.SHORT);
                }
            } catch (e) {
                console.log(e);
            }
        }

    };
    return (
        <View style={styles.container}>
            {/* Start Header */}
            <View style={styles.groupHeader}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <Ionicons name="chevron-back" color="#9098B1" size={20} />
                    </TouchableOpacity>
                    <Text style={styles.textHeader}>Edit Address</Text>
                </View>

            </View>
            {/* End Header */}
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ paddingHorizontal: 16 }}>
                    {/* Item 1 */}
                    <Text style={styles.textItem}>Name</Text>
                    <TextInput style={styles.input} onChangeText={(name) => setName(name)} value={name}/>
                    {
                        errName.length > 0 ? (<Text style={{ color: 'red', fontSize: 16, marginTop: 8 }}>{errName}</Text>) : (<Text style={{ height: 0 }}></Text>)
                    }

                    {/* Item 2 */}
                    <Text style={styles.textItem}>Address</Text>
                    <TextInput style={styles.input} onChangeText={(address) => setAddress(address)} value={address}/>
                    {
                        errAddress.length > 0 ? (<Text style={{ color: 'red', fontSize: 16, marginTop: 8 }}>{errAddress}</Text>) : (<Text style={{ height: 0 }}></Text>)
                    }
                    {/* Item 3 */}
                    <Text style={styles.textItem}>Phone Number</Text>
                    <TextInput style={styles.input} onChangeText={(phone) => setPhone(phone)} value={phone} keyboardType='numeric' />
                    {
                        errPhone.length > 0 ? (<Text style={{ color: 'red', fontSize: 16, marginTop: 8 }}>{errPhone}</Text>) : (<Text style={{ height: 0 }}></Text>)
                    }
                </View>
            </ScrollView>
            <TouchableOpacity style={styles.buttonAdd}
                onPress={onEditAddress}>
                <Text style={styles.textButton}>Edit Address</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Edit_Address

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
        marginBottom: 12,
        marginTop: 16
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


    },
    icon: {
        position: 'absolute',
        top: 15,
        right: 15,
    },
    inputHeader: {
        position: 'relative',
        marginTop: 8
    },

    viewItem: {
        padding: 16,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#EBF0FF",
        marginBottom: 16
    },
    textTitle: {
        fontSize: 14,
        fontWeight: '700',
        lineHeight: 21,
        color: '#223263',
        textAlign: 'left',
    },
    textContent: {
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 21.6,
        color: '#9098B1',
        textAlign: 'left',
        letterSpacing: 0.5,
        opacity: 0.5,
        marginTop: 16
    },
    textPhoneNumber: {
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 21.6,
        color: '#9098B1',
        textAlign: 'left',
        letterSpacing: 0.5,
        opacity: 0.5,
        marginTop: 16
    },

    groupButton: {
        flexDirection: 'row',
        marginTop: 16,
        alignItems: 'center'
    },
    button: {
        width: 77,
        height: 57,
        borderRadius: 5,
        backgroundColor: '#40BFFF',
        marginEnd: 29.25
    },
    textButton: {
        fontSize: 14,
        fontWeight: '700',
        color: '#ffffff',
        textAlign: 'center',
        letterSpacing: 0.5,
        lineHeight: 57,
    },
    buttonAdd: {
        height: 57,
        borderRadius: 5,
        backgroundColor: '#40BFFF',
        margin: 16,
    },
})