import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

import Ionicons from 'react-native-vector-icons/Ionicons';
import { validaBirthday } from "../constants/validation";
import AxiosIntance from '../ultil/AxiosIntance';
import DatePicker from 'react-native-date-picker';

const BirthDay = (props) => {
    const { navigation, route } = props;
    const { birthday, user_id } = route.params;
    const [birthdayString, setBirthdayString] = useState(birthday);
    const [errBirthday, setErrBirthday] = useState('');
    const [currentDate, setCurrentDate] = useState(new Date());
    const [open, setOpen] = useState(false);

    const onSave = async () => {
        if (birthdayString.length == 0) {
            setErrBirthday('This field cannot be left blank.');
        } else if (birthdayString.length > 0) {
            if (validaBirthday(birthdayString)) {
                setErrBirthday("");
                try {
                    const response = await AxiosIntance().post(`/api/user/${user_id}/edit_profile`, { birthday: birthdayString });
                    console.log("Result: ", response);
                    if (response.returnData.error == false) {
                        navigation.push("Profile")
                    } else {
                    }
                } catch (e) {
                    console.log(e);
                }
            } else {
                setErrBirthday("Please use the format DD/MM/YYYY.");
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
                    <Text style={styles.textHeader}>Birthday</Text>
                </View>

            </View>
            {/* End Header */}
            <View style={{ padding: 16 }}>
                <Text style={styles.textItem}>Your Birhday</Text>
                <View style={styles.inputHeader} >
                    <TextInput style={[styles.input]} onChangeText={setBirthdayString} value={birthdayString} placeholder='DD/MM/YYYY' />
                    <TouchableOpacity style={styles.icon} onPress={() => setOpen(true)}>
                        <Ionicons name="calendar-sharp" color="#9098B1" size={20} />
                    </TouchableOpacity>
                    {
                        errBirthday.length > 0 ? (<Text style={{ color: 'red', fontSize: 16, marginTop: 8 }}>{errBirthday}</Text>) : (<Text style={{ height: 0 }}></Text>)
                    }
                </View>

            </View>
            <DatePicker
                modal
                open={open}
                androidVariant="iosClone"
                mode="date"
                minimumDate={new Date('1970-01-01')}
                maximumDate={new Date('2024-01-13')}
                date={currentDate}
                onConfirm={date => {
                    setOpen(false);
                    var day = date.getDate().toString().padStart(2, '0');
                    var month = (date.getMonth() + 1).toString().padStart(2, '0');
                    var year = date.getFullYear();
                    // setDate(day + '/' + month + '/' + year);
                    setBirthdayString(day + '/' + month + '/' + year);
                    setErrBirthday(
                        validaBirthday(day + '/' + month + '/' + year),
                    );
                    // console.log(day + '/' + month + '/' + year);
                }}
                onCancel={() => {
                    setOpen(false)
                }} />
            <TouchableOpacity style={styles.buttonSave} onPress={onSave}>
                <Text style={styles.textButtonSave}>Save</Text>
            </TouchableOpacity>
        </View>
    )
}

export default BirthDay

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