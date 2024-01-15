import { StyleSheet, Text, View, ScrollView, TextInput, Image, FlatList, Button, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
const CreaditCardAndDebit = (props) => {
    const {navigation} = props;
    return (
        <View style={styles.container}>
            {/* Start Header */}
            <View style={styles.groupHeader}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <Ionicons name="chevron-back" color="#9098B1" size={20} />
                    </TouchableOpacity>
                    <Text style={styles.textHeader}>Credit Card And Debit</Text>
                </View>

            </View>
            {/* End Header */}
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ padding: 16 }}>
                    <View style={styles.groupCard}>
                        <Ionicons name="card" color="#ffffff" size={24} />

                        <Text style={styles.textNumberCard}>6326    9124    8124    9875</Text>
                        <View style={styles.groupContent}>
                            <View>
                                <Text style={styles.textTitle}>CARD HOLDER</Text>
                                <Text style={styles.textContent}>Lailyfa Febrina</Text>
                            </View>
                            <View style={styles.groupRight}>
                                <Text style={styles.textTitle}>CARD SAVE</Text>
                                <Text style={styles.textContent}>19/2042</Text>
                            </View>
                        </View>
                    </View>

                    <View style={[styles.groupCard,{backgroundColor: '#5C61F4'}]}>
                        <Ionicons name="card" color="#ffffff" size={24} />

                        <Text style={styles.textNumberCard}>6326    9124    8124    9875</Text>
                        <View style={styles.groupContent}>
                            <View>
                                <Text style={styles.textTitle}>CARD HOLDER</Text>
                                <Text style={styles.textContent}>Lailyfa Febrina</Text>
                            </View>
                            <View style={styles.groupRight}>
                                <Text style={styles.textTitle}>CARD SAVE</Text>
                                <Text style={styles.textContent}>19/2042</Text>
                            </View>
                        </View>
                    </View>

                </View>
            </ScrollView>
            <TouchableOpacity style={styles.buttonAdd} onPress={() => {navigation.navigate('Add_Card')}}>
                <Text style={styles.textButton}>Add Card</Text>
            </TouchableOpacity>
        </View>
    )
}

export default CreaditCardAndDebit

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
    groupOval: {
        flexDirection: 'row',
        position: 'relative',
    },
    textOval_1: {
        width: 22,
        height: 22,
        borderRadius: 11,
        backgroundColor: '#C4C4C4',
    },
    textOval_2: {
        width: 22,
        height: 22,
        borderRadius: 11,
        backgroundColor: '#C4C4C4',
        position: 'absolute',
        left: 38
    },
    groupCard: {
        backgroundColor: '#40BFFF',
        borderRadius: 5,
        padding: 21,
        marginBottom: 16
    },
    textNumberCard: {
        fontSize: 24,
        fontWeight: '700',
        color: '#ffffff',
        textAlign: 'center',
        letterSpacing: 0.5,
        lineHeight: 36,
        marginTop: 31,
    },
    textTitle: {
        fontSize: 10,
        fontWeight: '400',
        color: '#ffffff',
        textAlign: 'left',
        letterSpacing: 0.5,
        lineHeight: 15,
        marginTop: 19,
        opacity: 0.5
    },
    textContent: {
        fontSize: 10,
        fontWeight: '700',
        color: '#ffffff',
        textAlign: 'left',
        letterSpacing: 0.5,
        lineHeight: 15,
        marginTop: 4,
    },
    groupContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    groupRight: {
        marginStart: 27
    }
})