import { StyleSheet, Text, View, Image, TextInput, FlatList, Pressable, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AxiosIntance from '../ultil/AxiosIntance';
import { validaEmpty } from "../constants/validation";

import { SelectList } from 'react-native-dropdown-select-list'

const Gender = (props) => {
    const { navigation, route } = props;
    const { gender, user_id } = route.params;
    const [selected, setSelected] = useState(defaultKey || "");
    const [errGender, setErrGender] = useState('');
    const data = [
        { key: '1', value: 'Male' },
        { key: '2', value: 'Female' },
    ]
    const getKeyByValue = (value) => {
        const option = data.find(option => option.value === value);
        return option ? option.key : null;
    }
    const defaultKey = getKeyByValue(gender);
    // Hàm để lấy thông tin của option dựa trên giá trị (value)
    const getOptionByValue = (value) => {
        return data.find(option => option.value === value) || null;
    }
    const defaultOption = getOptionByValue(gender);

    console.log("Select: ", selected);


    const onSave = async () => {
        if (validaEmpty(selected)) {
            setErrGender("");
            try {
                const response = await AxiosIntance().post(`/api/user/${user_id}/edit_profile`, { gender: selected });
                console.log("Result: ", response);
                if (response.returnData.error == false) {
                    navigation.push("Profile")
                } else {
                }
            } catch (e) {
                console.log(e);
            }
        } else {
            setErrGender("This field cannot be left blank.");
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
                    <Text style={styles.textHeader}>Gender</Text>
                </View>

            </View>
            {/* End Header */}
            <View style={{ padding: 16 }}>
                <Text style={styles.textItem}>Choose Gender</Text>
                <SelectList
                    setSelected={(val) => setSelected(val)}
                    data={data}
                    save="value"
                    placeholder='Select Gender'
                    searchPlaceholder='Search'
                    // defaultOption={gender !== "" ? { key: '1', value: 'Male' } : undefined}
                    defaultOption={defaultOption}
                />

                {
                    errGender.length > 0 ? (<Text style={{ color: 'red', fontSize: 16, marginTop: 8 }}>{errGender}</Text>) : (<Text style={{ height: 0 }}></Text>)
                }

            </View>

            <TouchableOpacity style={styles.buttonSave} onPress={onSave}>
                <Text style={styles.textButtonSave}>Save</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Gender

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
        marginBottom: 24
    },
    select: {
        width: '100%',
        height: 48,
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#EBF0FF',
        borderRadius: 5,

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