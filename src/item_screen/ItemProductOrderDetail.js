import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AxiosIntance from '../ultil/AxiosIntance';
import { useNavigation } from '@react-navigation/native';

const ItemProductOrderDetail = (props) => {
    const navigation = useNavigation();
    const { data } = props;

    // Định dạng số tiền đô la
    const USD = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    });
    

    return (
        <View style={styles.group_card}>
            <Image style={styles.image} source={{uri: data.product_id.image}} />
            <View style={styles.group_right}>
                <Text style={styles.textName}>{data.product_id.name}</Text>
                <Text style={[styles.textName,{color: '#223263', fontWeight: "400", opacity: 0.5}]}>Quantity: {data.quantity}</Text>
                <Text style={styles.textPrice}>Price: {USD.format(data.product_id.price)}</Text>
            </View>
            <Ionicons name="heart-outline" color="#9098B1" size={20} />
        </View>
    )
}

export default ItemProductOrderDetail

const styles = StyleSheet.create({
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
})