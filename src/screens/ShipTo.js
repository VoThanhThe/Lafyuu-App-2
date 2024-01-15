import { StyleSheet, Text, View, ScrollView, Pressable, TouchableOpacity, FlatList, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AxiosIntance from '../ultil/AxiosIntance'
import { useSelector } from 'react-redux'
import ItemShipTo from '../item_screen/ItemShipTo'
import LoadingScreen from './LoadingScreen'

const ShipTo = (props) => {
    const { navigation, route } = props;
    const {totalPrice} = route.params
    const [dataAdress, setDataAdress] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const user = useSelector(state => state.UserReducer.user);
    const [refreshing, setRefreshing] = useState(false);
    const [selectedIdAddress, setSelectedIdAddress] = useState(null);
    const getAddress = async () => {
        try {
            const response = await AxiosIntance().get('/api/addresses/get-all-addresses/?user_id=' + user._id);
            console.log("Address: ", response)
            if (response.returnData.error === false) {
                setDataAdress(response.addresses);
            }
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching data address :", error);
        }

    }
    useEffect(() => {

        getAddress()

        return () => {
        }
    }, [setDataAdress])

    const handleRefresh = () => {
        setRefreshing(true);
        getAddress()
        setRefreshing(false);
    };

    const renderItemShipTo = ({ item }) => {
        const borderColor = item._id === selectedIdAddress ? "#40BFFF" : "#EBF0FF";
        return (
            <ItemShipTo
                data={item}
                onPress={() => setSelectedIdAddress(item._id)}
                borderColor={borderColor}
                totalPrice = {totalPrice}
            />
        );
    };

    const onNext = (item) => {
        if (selectedIdAddress != null) {
            navigation.navigate("PaymentMethod", { shipping_info: selectedIdAddress, totalPrice: totalPrice })
        } else {
            Alert.alert("Please select");
        }
    }
    return (
        <View style={styles.container}>
            {/* Start Header */}
            <View style={styles.groupHeader}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => { navigation.navigate('CartStack') }}>
                        <Ionicons name="chevron-back" color="#9098B1" size={20} />
                    </TouchableOpacity>
                    <Text style={styles.textHeader}>Ship To</Text>
                </View>
                <TouchableOpacity onPress={() => { navigation.navigate("Add_Address") }}>
                    <Ionicons name="add" color="#40BFFF" size={24} />
                </TouchableOpacity>
            </View>
            {/* End Header */}
            <View style={{ flex: 1 }}>
                {
                    isLoading ? (<LoadingScreen />) :
                        (
                            <View style={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 71 }}>
                                <FlatList showsVerticalScrollIndicator={false} style = {{height: '100%'}}
                                    data={dataAdress}
                                    renderItem={renderItemShipTo}
                                    keyExtractor={item => item._id}
                                    onRefresh={handleRefresh}
                                    refreshing={refreshing} />

                            </View>
                        )
                }
            </View>
            <View></View>
            <TouchableOpacity style={styles.buttonAdd} onPress={onNext}>
                <Text style={styles.textButton}>Next</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ShipTo

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
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0
    },
})