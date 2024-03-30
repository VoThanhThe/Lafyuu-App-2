import { StyleSheet, Text, View, ScrollView, TextInput, Image, FlatList, Button, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AxiosIntance from '../ultil/AxiosIntance'

const ItemNotificationActivity = (props) => {
    const { navigation, data } = props;
    const yourDateString = data.timestamp.toString();
    const dateObject = new Date(yourDateString);

    const options = {
        year: "numeric",
        month: "long",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric",
        hour12: true
    };

    const formattedDate = dateObject.toLocaleString("en-US", options);

    const handleOrderDetails = async () => {
        try {
            const response = await AxiosIntance().post("/api/notification/update-notification?id=" +  data._id );
            console.log("Result: ", response);
            console.log("id: ", data._id);
            if (response.notification == true) {
                navigation.navigate('Order_Detail', {order_id: data.metadata.order_id});
            } 
          } catch (e) {
            console.log(e);
          }
    }

    return (
        <TouchableOpacity onPress={handleOrderDetails}>
            <View style={[styles.groupItem, {opacity: data.isRead ? 0.5 : 1 }]}>
                <Ionicons name="swap-vertical" color="#40BFFF" size={24} />
                <View style={styles.groupTextRight}>
                    <Text style={styles.textTitle}>{data.title}</Text>
                    <Text style={styles.textContent}>{data.message}</Text>
                    <Text style={styles.textDate}>{formattedDate}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default ItemNotificationActivity

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
    groupTextRight: {
        marginStart: 15
    },
    groupItem: {
        flexDirection: 'row',
        padding: 16,
    },
    textTitle: {
        fontSize: 14,
        fontWeight: '700',
        lineHeight: 21,
        color: '#223263',
        textAlign: 'left',
        letterSpacing: 0.5
    },
    textContent: {
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 21.6,
        color: '#9098B1',
        textAlign: 'left',
        letterSpacing: 0.5,
        marginTop: 8
    },
    textDate: {
        fontSize: 10,
        fontWeight: '400',
        lineHeight: 15,
        color: '#223263',
        textAlign: 'left',
        letterSpacing: 0.5,
        marginTop: 8
    },
    icon: {
        transform: [{ rotate: '45deg' }]
    }
})