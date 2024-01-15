import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Icon2 from 'react-native-vector-icons/Ionicons'
import AxiosIntance from '../ultil/AxiosIntance';
import { validaEmpty } from "../constants/validation";

const Change_Name = (props) => {
    const { navigation, route } = props;
    const { name, user_id } = route.params;
    const [firstName, setfirstName] = useState(name);
    const [errName, setErrName] = useState('');

    const onSave = async () => {
        if (validaEmpty(firstName)) {
            setErrName("");
            try {
                const response = await AxiosIntance().post(`/api/user/${user_id}/edit_profile`, { name: firstName });
                console.log("Result: ", response);
                if (response.returnData.error == false) {
                    navigation.push("Profile")
                } else {
                }
            } catch (e) {
                console.log(e);
                setErrResult(true);
            }
        } else {
            setErrName("This field cannot be left blank.");
        }
    }
    return (
        <View style={styles.container}>
            {/* Start Header */}
            <View style={styles.groupHeader}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => { navigation.push("Profile") }}>
                        <Icon2 name="chevron-back" color="#9098B1" size={20} />
                    </TouchableOpacity>
                    <Text style={styles.textHeader}>Name</Text>
                </View>

            </View>
            {/* End Header */}
            <View style={{ padding: 16 }}>
                <Text style={styles.textItem}>Full Name</Text>
                <TextInput style={styles.input} onChangeText={setfirstName} value={firstName} />
                {
                    errName.length > 0 ? (<Text style={{ color: 'red', fontSize: 16, marginTop: 8 }}>{errName}</Text>) : (<Text style={{ height: 0 }}></Text>)
                }
            </View>

            <TouchableOpacity style={styles.buttonSave} onPress={onSave}>
                <Text style={styles.textButtonSave}>Save</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Change_Name

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