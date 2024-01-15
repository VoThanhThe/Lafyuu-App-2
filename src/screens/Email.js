import { StyleSheet, Text, View, Image, TextInput, FlatList, Pressable, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Email = (props) => {
    const [email, setemail] = useState('Derlaxy@yahoo.com');
    const {navigation} = props;
  return (
    <View style={styles.container}>
            {/* Start Header */}
            <View style={styles.groupHeader}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <Ionicons name="chevron-back" color="#9098B1" size={20} />
                    </TouchableOpacity>
                    <Text style={styles.textHeader}>Email</Text>
                </View>

            </View>
            {/* End Header */}
            <View style={{ padding: 16 }}>
                <Text style={styles.textItem}>Change Email</Text>
                <View style={styles.inputHeader} >
                    <TextInput style={[styles.input]} onChangeText={setemail} value={email}/>
                    <FontAwesome style={styles.icon} name="envelope-o" color="#9098B1" size={20} />
                </View>
                <Text style={styles.textbottom}>We Will Send verification to your New Email</Text>
            </View>

            <TouchableOpacity style={styles.buttonSave}>
                <Text style={styles.textButtonSave}>Save</Text>
            </TouchableOpacity>
        </View>
  )
}

export default Email
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