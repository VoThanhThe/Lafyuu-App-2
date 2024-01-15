import { StyleSheet, Text, View, ScrollView, TextInput, Image, FlatList, Button, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'

const Add_Card = (props) => {
    const { navigation } = props;
    return (
        <View style={styles.container}>
            {/* Start Header */}
            <View style={styles.groupHeader}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <Ionicons name="chevron-back" color="#9098B1" size={20} />
                    </TouchableOpacity>
                    <Text style={styles.textHeader}>Add Card</Text>
                </View>

            </View>
            {/* End Header */}
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ padding: 16 }}>
                    {/* Item 1 */}
                    <Text style={styles.textItem}>Card Number</Text>
                    <TextInput style={styles.input} placeholder='Enter Card Number' />

                    <View style={styles.groupItem}>
                        {/* Item 2 */}
                        <View style={styles.groupItemLeft}>
                            <Text style={styles.textItem}>Expiration Date</Text>
                            <TextInput style={styles.input} placeholder='Expiration Date' />
                        </View>
                        {/* Item 3 */}
                        <View style={styles.groupItemRight}>
                            <Text style={styles.textItem}>Security Code</Text>
                            <TextInput style={styles.input} placeholder='Security Code' />
                        </View>
                    </View>
                    {/* Item 4 */}
                    <Text style={styles.textItem}>Card Holder</Text>
                    <TextInput style={styles.input} placeholder='Enter Card Number' />
                </View>
            </ScrollView>
            <TouchableOpacity style={styles.buttonAdd}>
                <Text style={styles.textButton}>Add Card</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Add_Card

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
        marginBottom: 24,

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
    groupItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    groupItemLeft: {
        width: '48%'
    },
    groupItemRight: {
        width: '48%'
    },
})