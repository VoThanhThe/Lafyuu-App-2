import { StyleSheet, Text, View, ScrollView, TextInput, Image, FlatList, Button, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon1 from 'react-native-vector-icons/Feather'
import Icon2 from 'react-native-vector-icons/Ionicons'

const Notification = (props) => {
    const { navigation } = props;
    return (
        <View style={styles.container}>
            {/* Start Header */}
            <View style={styles.groupHeader}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <Icon2 name="chevron-back" color="#9098B1" size={20} />
                    </TouchableOpacity>
                    <Text style={styles.textHeader}>Notification</Text>
                </View>

            </View>
            {/* End Header */}
            <TouchableOpacity onPress={() => {navigation.navigate('Notification_Offer')}}>
                <View style={[styles.viewFlex, { padding: 19 }]}>
                    <View style={styles.viewFlex_1}>
                        <Icon name="tag" color="#40BFFF" size={18} />
                        <Text style={styles.textItem}>Offer</Text>
                    </View>
                    <Text style={styles.textNotify}>2</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {navigation.navigate('Notification_Feed')}}>
                <View style={[styles.viewFlex, { padding: 19 }]}>
                    <View style={styles.viewFlex_1}>
                        <Icon name="list-alt" color="#40BFFF" size={18} />
                        <Text style={styles.textItem}>Feed</Text>
                    </View>
                    <Text style={styles.textNotify}>3</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {navigation.navigate('Notification_Activity')}}>
                <View style={[styles.viewFlex, { padding: 19 }]}>
                    <View style={styles.viewFlex_1}>
                        <Icon2 name="notifications-outline" color="#40BFFF" size={18} />
                        <Text style={styles.textItem}>Acivity</Text>
                    </View>
                    <Text style={styles.textNotify}>3</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default Notification

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
        fontSize: 12,
        fontWeight: '700',
        lineHeight: 18,
        color: '#223263',
        marginStart: 19
    },
    textNotify: {
        width: 20,
        height: 20,
        borderRadius: 10,
        fontSize: 10,
        fontWeight: '700',
        lineHeight: 20,
        color: '#ffffff',
        backgroundColor: '#FB7181',
        textAlign: 'center'
    }
})