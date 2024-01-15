import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView,
    TouchableOpacity
} from 'react-native'
import React, { useState } from 'react'
import ItemCart from '../item_screen/ItemCart'
import { useDispatch, useSelector } from 'react-redux'
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProductNotFound from './404';
const Cart = (props) => {
    const { navigation } = props;
    const cartData = useSelector(state => state.Reducers.cartItems);
    console.log("Data List: ", cartData);
    console.log("Data length: ", cartData.length);
    var shipPrice = 40.00;
    var changesPrice = 128.00;
    var tong = 0;
    const sumPrice = (cartData) => {
        const cartDataLength = cartData.length;
        for (let index = 0; index < cartDataLength; index++) {
            tong += cartData[index].priceCart;
        }
        console.log("Tong;: ", tong)
        return tong;
    }

    const totalPrice = () => {
        return tong + shipPrice + changesPrice;
    }
    // Định dạng số tiền đô la
    const USD = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    });

    return (
        <>
            {
                cartData.length == 0 ?
                    (
                        <ProductNotFound navigation={navigation} title={"Back to Home"} />
                    )
                    :
                    (
                        <View style={styles.container}>
                            {/* Start Header */}
                            <View style={styles.groupHeader}>
                                <Text style={styles.header}>Your Cart</Text>
                            </View>
                            {/* End Header */}
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <View style={{ paddingHorizontal: 16 }}>
                                    {
                                        cartData.map((item, index) => <ItemCart key={item._id} data={item} index={index} />)
                                    }

                                    <View style={styles.inputHeader}>
                                        <TextInput style={styles.input} placeholder='Enter Cupon Code' />
                                        <TouchableOpacity style={styles.button}>
                                            <Text style={styles.textButton}>Apply</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={{ padding: 16, borderWidth: 1, borderColor: '#EBF0FF', borderRadius: 5, marginTop: 16, marginBottom: 80 }}>
                                        <View style={[styles.viewFlex, { marginBottom: 12 }]}>
                                            <Text style={styles.textItemLeft}>Items ({cartData.length})</Text>
                                            <Text style={styles.textItemRight}>{USD.format(sumPrice(cartData))}</Text>
                                        </View>
                                        <View style={[styles.viewFlex, { marginBottom: 12 }]}>
                                            <Text style={styles.textItemLeft}>Shipping</Text>
                                            <Text style={styles.textItemRight}>${shipPrice}</Text>
                                        </View>
                                        <View style={[styles.viewFlex, { marginBottom: 12 }]}>
                                            <Text style={styles.textItemLeft}>Import charges</Text>
                                            <Text style={styles.textItemRight}>${changesPrice}</Text>
                                        </View>
                                        <View style={{ borderWidth: 1, borderStyle: 'dashed', borderColor: '#EBF0FF', marginBottom: 12 }}></View>
                                        <View style={[styles.viewFlex, {}]}>
                                            <Text style={[styles.textItemLeft, { fontWeight: '700', color: '#223263', }]}>Total Price</Text>
                                            <Text style={[styles.textItemRight, { fontWeight: '700', color: '#40BFFF', }]}>{USD.format(totalPrice())}</Text>
                                        </View>
                                    </View>

                                </View>


                            </ScrollView>
                            <TouchableOpacity style={styles.buttonCheckOut} onPress={() => navigation.navigate("ShipTo", { totalPrice: totalPrice() })}>
                                <Text style={styles.textButtonCheckOut}>Check Out</Text>
                            </TouchableOpacity>
                        </View>
                    )
            }
        </>

    )
}

export default Cart

const styles = StyleSheet.create({
    groupHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomColor: '#EBF0FF',
        borderBottomWidth: 1
    },
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    header: {
        fontSize: 16,
        fontWeight: '700',
        color: '#223263',
        lineHeight: 24,
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
        marginTop: 16,

    },
    image: {
        width: 72,
        height: 72,
        borderRadius: 5,
    },
    group_right: {
        width: '75%',
        height: 72,
        marginStart: 12,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    group_right_up: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    group_right_down: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
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
        lineHeight: 24,
        textAlign: 'center',
        fontSize: 12,
        fontWeight: '700',
        color: '#223263'
    },
    textQuantity: {
        lineHeight: 24,
        textAlign: 'center',
        fontSize: 12,
        fontWeight: '700',
        color: '#223263'
    },
    textName: {
        width: '70%',
        height: 36,
        fontSize: 12,
        fontWeight: '700',
        lineHeight: 18,
        color: '#223263'
    },
    textPrice: {
        width: '50%',
        height: 36,
        fontSize: 12,
        fontWeight: '700',
        lineHeight: 18,
        color: '#40BFFF'
    },
    input: {
        width: '100%',
        height: 56,
        backgroundColor: '#ffffff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#EBF0FF',
        paddingStart: 16,
        paddingEnd: 90
    },
    button: {
        width: 87,
        height: 56,
        backgroundColor: '#40BFFF',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        right: 0,
        borderBottomEndRadius: 5,
        borderTopEndRadius: 5
    },
    textButton: {
        fontSize: 12,
        fontWeight: '700',
        lineHeight: 21.6,
        color: "#ffffff",
    },
    inputHeader: {
        position: 'relative',
        marginTop: 32
    },
    viewFlex: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    viewFlex_1: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    textItemLeft: {
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 21.6,
        color: "#9098B1",
    },
    textItemRight: {
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 21.6,
        color: "#223263",
    },
    buttonCheckOut: {
        position: "absolute",
        bottom: 16,
        left: 16,
        right: 16,
        height: 57,
        backgroundColor: '#40BFFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    textButtonCheckOut: {
        fontSize: 14,
        fontWeight: '700',
        lineHeight: 25.2,
        color: "#ffffff",
    },
    viewButtonQuantity: {
        width: 32,
        height: 24,
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#EBF0FF',
        justifyContent: 'center',
        alignItems: 'center'
    }
})