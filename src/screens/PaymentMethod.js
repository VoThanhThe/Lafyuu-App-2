import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useStripe } from '@stripe/stripe-react-native';
import AxiosIntance from '../ultil/AxiosIntance';
import { useDispatch, useSelector } from 'react-redux';
import {
    confirmCart,
} from '../redux2/actions/Actions'
import Modal from 'react-native-modal';

const PaymentMethod = (props) => {
    const { navigation, route } = props;
    const { totalPrice, shipping_info } = route.params;
    const [isModalVisible, setModalVisible] = useState(false);
    const [isModalVisibleFailed, setModalVisibleFailed] = useState(false);
    const cartData = useSelector(state => state.Reducers.cartItems);
    const user = useSelector(state => state.UserReducer.user);
    const dispatch = useDispatch();
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    // Chuyển đổi mảng sản phẩm trong giỏ hàng thành mảng items
    const items = cartData.map(item => ({
        product_id: item._id,
        quantity: item.quantityCart,
        price: item.priceCart
    }));
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const toggleModalFailed = () => {
        setModalVisibleFailed(!isModalVisibleFailed);
    };
    // console.log("CardData: ", items);
    // console.log("Order: ", totalPrice, shipping_info, cartData, user._id);
    const onOrder = async () => {
        try {
            const response = await AxiosIntance().post("/api/order", { total_price: totalPrice, shipping_info: shipping_info, items: items, user_id: user._id });
            console.log("Result: ", response);
            if (response.returnData.error == false) {
                dispatch(confirmCart());
            } else {
                ToastAndroid.show('Failed!', ToastAndroid.SHORT);
            }
        } catch (e) {
            console.log(e);
        }
    }
    const onCheckout = async () => {
        // 1. Create a payment intent
        const response = await AxiosIntance()
            .post("/payments/intent",
                { amount: Math.floor(totalPrice * 100) });
        console.log(response);
        if (response.error) {
            Alert.alert('Something went wrong', response.error);
            return;
        }
        // 2. Initialize the Payment sheet
        const initResponse = await initPaymentSheet({
            merchantDisplayName: "VoThanhThe.dev",
            paymentIntentClientSecret: response.paymentIntent,
        })

        if (initResponse.error) {
            console.log(initResponse.error);
            Alert.alert('Something went wrong', initResponse.error);
            return;
        }

        // 3. Present the Payment Sheet from Stripe
        const { error: paymentError } = await presentPaymentSheet();

        if (paymentError) {
            toggleModalFailed()
            // Alert.alert(`Error code: ${paymentError.code}`, paymentError.message);
            // Alert.alert(`Giao dịch bị hủy bỏ`, "Thanh toán đã bị hủy. Vui lòng thanh toán nếu muốn tiếp tục");
            return;
        } else {
            onOrder();
            navigation.popToTop();
            toggleModal();
        }
        // 4. If payment ok -> create the order
        // onCreateOrder();
    };

    return (
        <View style={styles.container}>
            {/* Start Header */}
            <View style={styles.groupHeader}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <Ionicons name="chevron-back" color="#9098B1" size={20} />
                    </TouchableOpacity>
                    <Text style={styles.textHeader}>Payment</Text>
                </View>

            </View>
            {/* End Header */}
            <TouchableOpacity onPress={onCheckout}>
                <View style={styles.groupItem}>
                    <FontAwesome name="cc-mastercard" color="#40BFFF" size={20} />
                    <Text style={styles.textItem}>International Card</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('CreaditCardAndDebit') }}>
                <View style={styles.groupItem}>
                    <FontAwesome name="credit-card" color="#40BFFF" size={20} />
                    <Text style={styles.textItem}>Credit Card And Debit</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity>
                <View style={styles.groupItem}>
                    <Image style={styles.logo} resizeMode='cover' source={require('../assets/logo_payment.png')} />
                    <Text style={styles.textItem}>Paypal</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity>
                <View style={styles.groupItem}>
                    <FontAwesome name="bank" color="#40BFFF" size={20} />
                    <Text style={styles.textItem}>Bank Transfer</Text>
                </View>
            </TouchableOpacity>
            <Modal isVisible={isModalVisible} animationIn="slideInUp" animationOut="slideOutDown">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={{ backgroundColor: "#ffffff", justifyContent: "center", alignItems: 'center', paddingHorizontal: 16 }}>
                            <Ionicons name='checkmark-circle' size={100} color={"#40BFFF"} />
                            <Text style={{ fontSize: 26, fontWeight: "700", color: "#223263", marginTop: 16 }}>Success</Text>
                            <Text style={{ fontSize: 14, fontWeight: "400", color: "#9098B1", marginTop: 8, textAlign: "center" }}>Your transaction has been completed successfully.</Text>
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

            <Modal isVisible={isModalVisibleFailed} animationIn="slideInUp" animationOut="slideOutDown">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={{ backgroundColor: "#ffffff", justifyContent: "center", alignItems: 'center', paddingHorizontal: 16 }}>
                            <Ionicons name='alert-circle-sharp' size={100} color={"#FB7181"} />
                            <Text style={{ fontSize: 26, fontWeight: "700", color: "#223263", marginTop: 16 }}>Failed</Text>
                            <Text style={{ fontSize: 14, fontWeight: "400", color: "#9098B1", marginTop: 8, textAlign: "center" }}>The payment flow has been canceled.</Text>
                            <TouchableOpacity
                                onPress={toggleModalFailed}
                                style={{ backgroundColor: "#40BFFF", width: '100%', height: 57, borderRadius: 5, marginTop: 16 }}
                            >
                                <Text style={{ fontSize: 18, fontWeight: "700", color: "#ffffff", lineHeight: 57, textAlign: "center", }}>Ok</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default PaymentMethod

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
        letterSpacing: 0.5,
        textAlign: 'left',
        marginStart: 19
    },
    groupItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16
    },
    logo: {
        width: 24,
        height: 24,
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