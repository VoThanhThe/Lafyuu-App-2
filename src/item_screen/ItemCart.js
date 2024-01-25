import { StyleSheet, Text, View, Image, TextInput, FlatList, Alert, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useDispatch, useSelector } from 'react-redux'
import Modal from 'react-native-modal';
import AxiosIntance from '../ultil/AxiosIntance';

import {
    removeFromCart,
    addToWishlist,
    updateCartItem
} from '../redux2/actions/Actions'
import LoadingScreen from '../screens/LoadingScreen'
import { useNavigation } from '@react-navigation/native'

const ItemCart = (props) => {
    const dispatch = useDispatch();
    const { data } = props;
    const navigation = useNavigation()
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(data.price);
    const [isModalVisible, setModalVisible] = useState(false);
    const [isModalVisibleFavorite, setModalVisibleFavorite] = useState(false);
    const [dataFavorite, setDataFavorite] = useState([]);
    const [isFavorite, setIsFavorite] = useState([]);
    const [isProductInFavorite, setIsProductInFavorite] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const user = useSelector(state => state.UserReducer.user);
    console.log("Data dataFavorite: ", dataFavorite);
    console.log("isFavorite: ", isFavorite);
    console.log("isProductInFavorite: ", isProductInFavorite);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const toggleModalFavorite = () => {
        setModalVisibleFavorite(!isModalVisibleFavorite);
    };

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
        setPrice(price + data.price);
        dispatch(updateCartItem(data._id, quantity, price));
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
            setPrice(price - data.price);
            dispatch(updateCartItem(data._id, quantity, price));
        }
    };

    const USD = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    });

    useEffect(() => {
        // Thực hiện cập nhật khi quantityCart hoặc priceCart thay đổi
        const fetchData = async () => {
            try {
                const response = await AxiosIntance().get('/api/favorites/get-all-favorites/?user_id=' + user._id);
                console.log("Address: ", response)
                if (response.returnData.error === false) {
                    setDataFavorite(response.favorites);
                    let dataFavoriteLength = response.favorites.length;

                    for (let i = 0; i < dataFavoriteLength; i++) {
                        if (response.favorites[i].product_id._id === data._id) {
                            setIsFavorite(response.favorites[i]);
                            setIsProductInFavorite(true);
                            break; // Nếu tìm thấy, thoát khỏi vòng lặp
                        }
                    }
                } else {
                    console.log("Lấy dữ liệu favorite thất bại");
                }

                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        // Call the fetchData function to fetch data from both APIs
        fetchData();
        dispatch(updateCartItem(data._id, quantity, price));
    }, [dispatch, data._id, quantity, price, setIsProductInFavorite, setIsFavorite]);


    const onDeleteFavorite = async () => {
        try {
            const response = await AxiosIntance()
                .post("/api/favorites/delete-favorite/?id=" + isFavorite._id);

            if (response.returnData.error == false) {
                // navigation.push("FavoriteProduct");
                toggleModalFavorite();
                setIsProductInFavorite(false);
                ToastAndroid.show("Thanh cong!", ToastAndroid.SHORT);
            } else {
                ToastAndroid.show('That bai!', ToastAndroid.SHORT);
            }
        } catch (e) {
            console.log(e);
        }
    }


    const onAddFavorite = async () => {
        try {
            if (isProductInFavorite == true) {
                toggleModalFavorite();
            } else {
                const response = await AxiosIntance()
                    .post("/api/favorites/add-new-favorite",
                        { user_id: user._id, product_id: data._id });

                if (response.returnData.error == false) {
                    setIsProductInFavorite(true);
                } else {
                }
            }

        } catch (e) {
            console.log(e);
        }
    }
    return (
        <TouchableOpacity style={styles.container}
            onPress={() => navigation.navigate('ProductDetail', { data })}>
            <View style={styles.group_card}>
                <Image style={styles.image} source={{ uri: data.image }} />
                <View style={styles.group_right}>
                    <View style={styles.group_right_up}>
                        <Text style={styles.textName}>
                            {
                                data?.name.length > 25 ? (data?.name).slice(0, 25) + "..." : data?.name
                            }
                        </Text>
                        <TouchableOpacity onPress={() => { onAddFavorite() }}>
                            {
                                isProductInFavorite ? (<Ionicons name="heart" color="red" size={18} />) :
                                    (<Ionicons name="heart-outline" color="#9098B1" size={18} />)
                            }
                        </TouchableOpacity>
                        {/* <TouchableOpacity onPress={() => showConfirmDialog()}> */}
                        <TouchableOpacity onPress={toggleModal}>
                            <FontAwesome style={styles.icon} name="trash-o" color="#9098B1" size={20} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.group_right_down}>
                        <Text style={styles.textPrice}>{USD.format(price)}</Text>
                        <View style={styles.group_button}>
                            <TouchableOpacity onPress={() => { decreaseQuantity() }}>
                                <View style={styles.viewButtonQuantity}>
                                    <FontAwesome style={styles.icon} name="minus" color="#9098B1" size={15} />
                                </View>
                            </TouchableOpacity>
                            <View style={[styles.viewButtonQuantity, { width: 40, backgroundColor: '#EBF0FF' }]}>
                                <Text style={styles.textQuantity}>{quantity}</Text>
                            </View>
                            <TouchableOpacity onPress={() => { increaseQuantity() }}>
                                <View style={styles.viewButtonQuantity}>
                                    <FontAwesome style={styles.icon} name="plus" color="#9098B1" size={15} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
            <Modal isVisible={isModalVisibleFavorite} animationIn="slideInUp" animationOut="slideOutDown">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={{ backgroundColor: "#ffffff", justifyContent: "center", alignItems: 'center', paddingHorizontal: 16 }}>
                            <Ionicons name='alert-circle-sharp' size={100} color={"#FB7181"} />
                            <Text style={{ fontSize: 26, fontWeight: "700", color: "#223263", marginTop: 16 }}>Confirmation</Text>
                            <Text style={{ fontSize: 14, fontWeight: "400", color: "#9098B1", marginTop: 8, textAlign: "center" }}>Are you sure wanna delete product</Text>
                            <TouchableOpacity
                                onPress={() => { onDeleteFavorite() }}
                                style={{ backgroundColor: "#40BFFF", width: '100%', height: 57, borderRadius: 5, marginTop: 16 }}
                            >
                                <Text style={{ fontSize: 18, fontWeight: "700", color: "#ffffff", lineHeight: 57, textAlign: "center", }}>Delete</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={toggleModalFavorite}
                                style={{ width: '100%', height: 57, borderRadius: 5, marginTop: 16, borderColor: "#EBF0FF", borderWidth: 2 }}
                            >
                                <Text style={{ fontSize: 18, fontWeight: "700", color: "#9098B1", lineHeight: 57, textAlign: "center", }}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal isVisible={isModalVisible} animationIn="slideInUp" animationOut="slideOutDown">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={{ backgroundColor: "#ffffff", justifyContent: "center", alignItems: 'center', paddingHorizontal: 16 }}>
                            <Ionicons name='alert-circle-sharp' size={100} color={"#FB7181"} />
                            <Text style={{ fontSize: 26, fontWeight: "700", color: "#223263", marginTop: 16 }}>Confirmation</Text>
                            <Text style={{ fontSize: 14, fontWeight: "400", color: "#9098B1", marginTop: 8, textAlign: "center" }}>Are you sure wanna delete product</Text>
                            <TouchableOpacity
                                onPress={() => { dispatch(removeFromCart(data._id)) }}
                                style={{ backgroundColor: "#40BFFF", width: '100%', height: 57, borderRadius: 5, marginTop: 16 }}
                            >
                                <Text style={{ fontSize: 18, fontWeight: "700", color: "#ffffff", lineHeight: 57, textAlign: "center", }}>Delete</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={toggleModal}
                                style={{ width: '100%', height: 57, borderRadius: 5, marginTop: 16, borderColor: "#EBF0FF", borderWidth: 2 }}
                            >
                                <Text style={{ fontSize: 18, fontWeight: "700", color: "#9098B1", lineHeight: 57, textAlign: "center", }}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </TouchableOpacity>
    )
}

export default ItemCart

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',

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
        width: "100%",
        height: 57,
        backgroundColor: '#40BFFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginVertical: 16,
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
});