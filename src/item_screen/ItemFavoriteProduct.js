import { StyleSheet, Text, View, Image, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AxiosIntance from '../ultil/AxiosIntance'
import { useDispatch } from 'react-redux';
import Modal from 'react-native-modal';

import {
    addToWishlist,
    removeFromWishlist
} from '../redux2/actions/Actions'
import { useNavigation } from '@react-navigation/native'

const ItemFavoriteProduct = (props) => {
    const { data } = props;
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [showBox, setShowBox] = useState(true);
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const USD = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    });

    const onDeleteFavorite = async () => {
        try {
            const response = await AxiosIntance()
                .post("/api/favorites/delete-favorite/?id=" + data._id);

            if (response.returnData.error == false) {
                navigation.push("FavoriteProduct");
                ToastAndroid.show("Thanh cong!", ToastAndroid.SHORT);
            } else {
                ToastAndroid.show('That bai!', ToastAndroid.SHORT);
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <TouchableOpacity style={styles.container}
            >
            <Image style={styles.image} resizeMode='contain' source={{ uri: data.product_id.image }} />
            <Text style={styles.title}>{data.product_id.name}</Text>
            <View style={styles.groupView}>
                <FontAwesome style={styles.icon} name="star" color="#FFC833" size={12} />
                <FontAwesome style={styles.icon} name="star" color="#FFC833" size={12} />
                <FontAwesome style={styles.icon} name="star" color="#FFC833" size={12} />
                <FontAwesome style={styles.icon} name="star" color="#FFC833" size={12} />
                <FontAwesome style={styles.icon} name="star" color="#EBF0FF" size={12} />
            </View>
            <Text style={styles.priceNew}>{USD.format(data.product_id.price)}</Text>
            <View style={styles.groupBottom}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <Text style={styles.priceOld}>$534,22</Text>
                    <Text style={styles.sale}>24% Off</Text>
                </View>
                <TouchableOpacity onPress={toggleModal} style={{ padding: 5 }}>
                    <FontAwesome style={styles.icon} name="trash-o" color="#9098B1" size={20} />
                </TouchableOpacity>
            </View>
            <Modal isVisible={isModalVisible} animationIn="slideInUp" animationOut="slideOutDown">
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

export default ItemFavoriteProduct

const styles = StyleSheet.create({
    groupView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4
    },
    groupBottom: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 4
    },
    groupStar: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4
    },
    container: {
        width: "47.8%",
        height: 282,
        backgroundColor: '#ffffff',
        padding: 16,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#EBF0FF',
        marginEnd: 16,
        marginBottom: 16

    },
    image: {
        width: "100%",
        height: 133,
        borderRadius: 5,
    },
    title: {
        fontSize: 12,
        fontWeight: '700',
        lineHeight: 18,
        color: '#223263',
        marginTop: 8
    },
    priceNew: {
        fontSize: 12,
        fontWeight: '700',
        lineHeight: 21.6,
        color: '#40BFFF',
        marginTop: 16
    },
    priceOld: {
        fontSize: 10,
        fontWeight: '400',
        lineHeight: 15,
        color: '#9098B1',
        textDecorationLine: 'line-through'
    }
    ,
    sale: {
        fontSize: 10,
        fontWeight: '700',
        lineHeight: 15,
        color: '#FB7181',
        marginStart: 8
    },
    icon: {
        marginEnd: 2,
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