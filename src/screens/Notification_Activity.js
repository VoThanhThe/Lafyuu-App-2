import { StyleSheet, Text, View, ScrollView, TextInput, Image, FlatList, Button, Pressable, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AxiosIntance from '../ultil/AxiosIntance'
import { useSelector } from 'react-redux'
import LoadingScreen from './LoadingScreen'
import ItemNotificationActivity from '../item_screen/ItemNotificationActivity'

const Notification_Activity = (props) => {
    const { navigation } = props;
    const [dataNotification, setDataNotification] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const user = useSelector(state => state.UserReducer.user);
    const [refreshing, setRefreshing] = useState(false);

    const getNotification = async () => {
        try {
            const response = await AxiosIntance().get('/api/notification?user_id=' + user._id);
            console.log("Order: ", response)
            if (response.returnData.error === false) {
                setDataNotification(response.notification);
            }
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching data notification :", error);
        }

    }
    useEffect(() => {
        getNotification()
        return () => {
        }
    }, [])

    const handleRefresh = () => {
        setRefreshing(true);
        getNotification()
        setRefreshing(false);
    };

    return (
        <View style={styles.container}>
            {/* Start Header */}
            <View style={styles.groupHeader}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <Ionicons name="chevron-back" color="#9098B1" size={20} />
                    </TouchableOpacity>
                    <Text style={styles.textHeader}>Activity</Text>
                </View>

            </View>
            {/* End Header */}

            {
                isLoading ? (<LoadingScreen />) :
                    (
                        <FlatList
                            style={{ marginVertical: 12 }}
                            data={dataNotification}
                            renderItem={({ item }) => <ItemNotificationActivity data={item} navigation={navigation} />}
                            keyExtractor={item => item._id}
                            showsHorizontalScrollIndicator={false}
                            onRefresh={handleRefresh}
                            refreshing={refreshing} />
                    )
            }

        </View >
    )
}

export default Notification_Activity

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
        padding: 16
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