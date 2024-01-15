import { StyleSheet, Text, View, Image, TextInput, FlatList, Pressable, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AxiosIntance from '../ultil/AxiosIntance'
import { useSelector } from 'react-redux'
import ItemOrder from '../item_screen/ItemOrder'
import LoadingScreen from './LoadingScreen'

const Order = (props) => {
    const { navigation } = props;
    const [dataOrder, setDataOrder] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const user = useSelector(state => state.UserReducer.user);
    const [refreshing, setRefreshing] = useState(false);
    const [selectedIdOrder, setSelectedIdOrder] = useState(null);
    const getOrder = async () => {
        try {
            const response = await AxiosIntance().get('/api/order/' + user._id);
            console.log("Order: ", response)
            if (response.returnData.error === false) {
                setDataOrder(response.orders);
            }
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching data order :", error);
        }

    }
    useEffect(() => {
        getOrder()
        return () => {
        }
    }, [])

    const handleRefresh = () => {
        setRefreshing(true);
        getOrder()
        setRefreshing(false);
    };

    const renderItemOrder = ({ item }) => {
        const borderColor = item._id === selectedIdOrder ? "#40BFFF" : "#EBF0FF";
        return (
            <ItemOrder
                data={item}
                onPress={() => setSelectedIdOrder(item._id)}
                borderColor={borderColor}
            />
        );
    };
    return (
        <View style={styles.container}>
            {/* Start Header */}
            <View style={styles.groupHeader}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <Ionicons name="chevron-back" color="#9098B1" size={20} />
                    </TouchableOpacity>
                    <Text style={styles.textHeader}>Order</Text>
                </View>

            </View>
            {/* End Header */}
            {
                isLoading ? (<LoadingScreen />) :
                    (
                        <View style={{ padding: 16 }}>
                            <FlatList showsVerticalScrollIndicator={false}
                                data={dataOrder}
                                renderItem={renderItemOrder}
                                keyExtractor={item => item._id}
                                onRefresh={handleRefresh}
                                refreshing={refreshing} />
                        </View>
                    )
            }

        </View>
    )
}

export default Order

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
    textCode: {
        fontSize: 14,
        fontWeight: '700',
        lineHeight: 21,
        color: '#223263',
        textAlign: 'left',
    },
    textDate: {
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 21.6,
        color: '#223263',
        textAlign: 'left',
        letterSpacing: 0.5,
        opacity: 0.5,
        paddingVertical: 12,
        borderBottomColor: '#EBF0FF',
        borderBottomWidth: 1,
        borderStyle: 'dotted'
    },
    textLeft: {
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 21.6,
        color: '#223263',
        textAlign: 'left',
        letterSpacing: 0.5,
        opacity: 0.5
    },
    textRight: {
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 21.6,
        color: '#223263',
        textAlign: 'right',
        letterSpacing: 0.5,
    }


})