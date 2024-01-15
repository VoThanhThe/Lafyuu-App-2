import { StyleSheet, Text, View, Image, TextInput, FlatList, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import AxiosIntance from '../ultil/AxiosIntance'
import LoadingScreen from './LoadingScreen'
import ItemProductOrderDetail from '../item_screen/ItemProductOrderDetail';

const Order_Detail = (props) => {
    const { navigation, route } = props;
    const { order_id } = route.params;
    const [dataOrderDetail, setDataOrderDetail] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isPacking, setIsPacking] = useState(false);
    const [isShipping, setIsShipping] = useState(false);
    const [isArriving, setIsArriving] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    var shipPrice = 40.00;
    var changesPrice = 128.00;
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    // Định dạng số tiền đô la
    const USD = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    });
    useEffect(() => {
        const getOrder = async () => {
            try {
                const response = await AxiosIntance().get('/api/order/' + order_id + "/order-detail");
                console.log("Order: ", response)
                if (response.returnData.error === false) {
                    setDataOrderDetail(response.orders);
                    const totalPrices = response.orders.items.reduce((total, item) => {
                        return total + item.price;
                    }, 0);
                    const status = response.orders.status;
                    switch (status) {
                        case "Packing": {
                            setIsPacking(true);
                            setIsShipping(false);
                            setIsArriving(false);
                            setIsSuccess(false);
                            break;
                        }
                        case "Shipping": {
                            setIsPacking(true);
                            setIsShipping(true);
                            setIsArriving(false);
                            setIsSuccess(false);
                            break;
                        }
                        case "Arriving": {
                            setIsPacking(true);
                            setIsShipping(true);
                            setIsArriving(true);
                            setIsSuccess(false);
                            break;
                        }
                        case "Success": {
                            setIsPacking(true);
                            setIsShipping(true);
                            setIsArriving(true);
                            setIsSuccess(true);
                            break;
                        }
                        default: {
                            setIsPacking(true);
                            setIsShipping(false);
                            setIsArriving(false);
                            setIsSuccess(false);
                            break;
                        }
                    }
                    setTotalPrice(totalPrices);
                }
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching data order :", error);
            }

        }
        getOrder()
        return () => {
        }
    }, [])
    return (
        <View style={styles.container}>
            {/* Start Header */}
            <View style={styles.groupHeader}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <Ionicons name="chevron-back" color="#9098B1" size={20} />
                    </TouchableOpacity>
                    <Text style={styles.textHeader}>Order Details</Text>
                </View>

            </View>
            {/* End Header */}
            {
                isLoading ? (<LoadingScreen />) :
                    (
                        <>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <View style={{ padding: 16, marginBottom: 70 }}>
                                    {/* Start Checking */}
                                    <SafeAreaView>
                                        <View style={{ flexDirection: 'row', alignItems: "center", paddingHorizontal: 14 }}>
                                            <View>
                                                <Ionicons name="checkmark-circle" color={isPacking ? "#40BFFF" : "#EBF0FF"} size={30} />
                                            </View>
                                            <View style={{ width: '21.5%', height: 2, backgroundColor: isShipping ? "#40BFFF" : "#EBF0FF" }}></View>
                                            <View>
                                                <Ionicons name="checkmark-circle" color={isShipping ? "#40BFFF" : "#EBF0FF"} size={30} />
                                            </View>
                                            <View style={{ width: '21.5%', height: 2, backgroundColor: isArriving ? "#40BFFF" : "#EBF0FF" }}></View>
                                            <View>
                                                <Ionicons name="checkmark-circle" color={isArriving ? "#40BFFF" : "#EBF0FF"} size={30} />
                                            </View>
                                            <View style={{ width: '21.5%', height: 2, backgroundColor: isSuccess ? "#40BFFF" : "#EBF0FF" }}></View>
                                            <View>
                                                <Ionicons name="checkmark-circle" color={isSuccess ? "#40BFFF" : "#EBF0FF"} size={30} />
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>
                                            <Text>Packing</Text>
                                            <Text>Shipping</Text>
                                            <Text>Arriving</Text>
                                            <Text>Success</Text>
                                        </View>
                                    </SafeAreaView>
                                    {/* <View style={styles.viewFlex}>
                                        <View style={styles.viewFlex_2}>
                                            <Ionicons name="checkmark-circle" color="#40BFFF" size={24} />
                                            <Text style={styles.textChecking}>Packing</Text>
                                        </View>
                                        <View style={styles.viewFlex_2}>
                                            <Ionicons name="checkmark-circle" color="#40BFFF" size={24} />
                                            <Text style={styles.textChecking}>Shipping</Text>
                                        </View>
                                        <View style={styles.viewFlex_2}>
                                            <Ionicons name="checkmark-circle" color="#40BFFF" size={24} />
                                            <Text style={styles.textChecking}>Arriving</Text>
                                        </View>
                                        <View style={styles.viewFlex_2}>
                                            <Ionicons name="checkmark-circle" color="#EBF0FF" size={24} />
                                            <Text style={styles.textChecking}>Success</Text>
                                        </View>
                                    </View> */}
                                    {/* End Checking */}
                                    {/* Start Product */}
                                    <Text style={styles.textTitle}>Product</Text>
                                    <FlatList
                                        data={dataOrderDetail.items}
                                        renderItem={({ item }) => <ItemProductOrderDetail data={item} />}
                                        keyExtractor={item => item._id}
                                        scrollEnabled={false} />

                                    {/* End Product */}

                                    {/* Shipping Detail */}
                                    <Text style={styles.textTitle}>Shipping Details</Text>
                                    {/* Start Item 1 */}
                                    <View style={styles.viewItem}>
                                        <View style={[styles.viewFlex_3]}>
                                            <Text style={styles.textLeft}>Receiver Name:</Text>
                                            <Text style={styles.textRight}>{dataOrderDetail.shipping_info.receiver_name}</Text>
                                        </View>
                                        <View style={[styles.viewFlex_3, { marginTop: 12 }]}>
                                            <Text style={styles.textLeft}>Phone:</Text>
                                            <Text style={styles.textRight}>{dataOrderDetail.shipping_info.phone}</Text>
                                        </View>
                                        <View style={[styles.viewFlex_3, { marginTop: 12 }]}>
                                            <Text style={styles.textLeft}>Address:</Text>
                                            <Text style={styles.textRight}>{dataOrderDetail.shipping_info.address}</Text>
                                        </View>
                                    </View>
                                    {/* End Item 1 */}

                                    {/* End Shipping detail */}

                                    <Text style={styles.textTitle}>Payment Details</Text>

                                    {/* Start Item 1 */}
                                    <View style={styles.viewItem}>
                                        <View style={[styles.viewFlex_3]}>
                                            <Text style={styles.textLeft}>Items ({dataOrderDetail.items.length})</Text>
                                            <Text style={styles.textRight}>{USD.format(totalPrice)}</Text>
                                        </View>
                                        <View style={[styles.viewFlex_3, { marginTop: 12 }]}>
                                            <Text style={styles.textLeft}>Shipping</Text>
                                            <Text style={styles.textRight}>{USD.format(shipPrice)}</Text>
                                        </View>
                                        <View style={[styles.viewFlex_3, { paddingVertical: 12, borderBottomColor: '#EBF0FF', borderBottomWidth: 1, borderStyle: 'dotted' }]}>
                                            <Text style={styles.textLeft}>Import charges</Text>
                                            <Text style={styles.textRight}>{USD.format(changesPrice)}</Text>
                                        </View>
                                        <View style={[styles.viewFlex_3, { marginTop: 12 }]}>
                                            <Text style={styles.totalPrice}>Total Price</Text>
                                            <Text style={[styles.textRight, { color: '#40BFFF', fontWeight: '700' }]}>{USD.format(dataOrderDetail.total_price)}</Text>
                                        </View>
                                    </View>
                                    {/* End Item 1 */}


                                </View>
                            </ScrollView>
                            {/* Button */}
                            <TouchableOpacity style={styles.button} onPress={toggleModal}>
                                <Text style={styles.textButton}>Notify Me</Text>
                            </TouchableOpacity>
                            
                            <Modal isVisible={isModalVisible} animationIn="slideInUp" animationOut="slideOutDown">
                                <View style={styles.modalContainer}>
                                    <View style={styles.modalContent}>
                                        <View style={{ backgroundColor: "#ffffff", justifyContent: "center", alignItems: 'center', paddingHorizontal: 16 }}>
                                            <Ionicons name='checkmark-circle' size={100} color={"#40BFFF"} />
                                            <Text style={{ fontSize: 26, fontWeight: "700", color: "#223263", marginTop: 16 }}>Success</Text>
                                            <Text style={{ fontSize: 14, fontWeight: "400", color: "#9098B1", marginTop: 8, textAlign: "center" }}>Thank you for choosing us! We'll keep you in the loop throughout the order fulfillment process.</Text>
                                            <TouchableOpacity
                                                onPress={toggleModal}
                                                style={{ backgroundColor: "#40BFFF", width: '100%', height: 57, borderRadius: 5, marginTop: 16 }}
                                            >
                                                <Text style={{ fontSize: 18, fontWeight: "700", color: "#ffffff", lineHeight: 57, textAlign: "center", }}>Ok</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </Modal>
                        </>

                    )
            }
        </View >
    )
}

export default Order_Detail

const styles = StyleSheet.create({
    itemContainer: {
        marginTop: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 8,
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    itemQuantity: {
        fontSize: 14,
        color: 'gray',
    },
    itemPrice: {
        fontSize: 14,
        color: 'green',
    },
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
    viewFlex_2: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    viewFlex_3: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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

    textChecking: {
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 21.6,
        color: '#9098B1',
        textAlign: 'center',
        marginTop: 12,
    },
    group_card: {
        width: '100%',
        height: 104,
        backgroundColor: '#ffffff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#EBF0FF',
        padding: 16,
        flexDirection: 'row',
        marginTop: 8,

    },
    image: {
        width: 72,
        height: 72,
        borderRadius: 5,
    },
    group_right: {
        width: '70%',
        height: 72,
        marginStart: 12,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },

    group_button: {
        width: 104,
        height: 24,
        borderWidth: 1,
        borderColor: '#EBF0FF',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: '#EBF0FF'
    },
    textButton: {
        width: 32,
        height: 24,
        backgroundColor: '#ffffff',
        lineHeight: 24,
        textAlign: 'center',
        borderRadius: 20
    },
    textWatch: {
        width: 40,
        height: 24,
        lineHeight: 24,
        textAlign: 'center',
    },
    textName: {
        fontSize: 12,
        fontWeight: '700',
        lineHeight: 18,
        color: '#223263'
    },
    textPrice: {
        fontSize: 12,
        fontWeight: '700',
        lineHeight: 18,
        color: '#40BFFF'
    },
    textTitle: {
        fontSize: 14,
        fontWeight: '700',
        lineHeight: 21,
        color: '#223263',
        textAlign: 'left',
        marginTop: 24,
        marginBottom: 4,
    },
    viewItem: {
        padding: 16,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#EBF0FF",
        marginTop: 8,
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
        width: "60%",
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 21.6,
        color: '#223263',
        textAlign: 'right',
        letterSpacing: 0.5,
    },
    totalPrice: {
        fontSize: 12,
        fontWeight: '700',
        lineHeight: 18,
        color: '#223263',
        textAlign: 'left',
        letterSpacing: 0.5,
    },
    button: {
        height: 57,
        borderRadius: 5,
        backgroundColor: '#40BFFF',
        margin: 16,
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0
    },
    textButton: {
        fontSize: 14,
        fontWeight: '700',
        lineHeight: 57,
        color: '#ffffff',
        textAlign: 'center',
        letterSpacing: 0.5,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
})