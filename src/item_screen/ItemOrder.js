import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native'
import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AxiosIntance from '../ultil/AxiosIntance';
import { useNavigation } from '@react-navigation/native';

const ItemOrder = (props) => {
    const navigation = useNavigation();
    const { data } = props;
    const dateObject = new Date(data.order_date.toString());

    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    const formattedDate = dateObject.toLocaleDateString('en-US', options);

    console.log(formattedDate); // Kết quả: "January 6, 2024"
    const dataProductLength = data.items.length;

    // Định dạng số tiền đô la
    const USD = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    });

    return (
        <TouchableOpacity onPress={() => { navigation.navigate('Order_Detail', {order_id: data._id}) }}>
            <View style={styles.viewItem}>
                <Text style={styles.textCode}>{data._id}</Text>
                <Text style={styles.textDate}>Order at Lafyuu : {formattedDate}</Text>
                <View style={[styles.viewFlex, { marginTop: 12 }]}>
                    <Text style={styles.textLeft}>Order Status</Text>
                    <Text style={styles.textRight}>{data.status}</Text>
                </View>
                <View style={[styles.viewFlex, { marginTop: 12 }]}>
                    <Text style={styles.textLeft}>Items</Text>
                    <Text style={styles.textRight}>{dataProductLength} Items purchased</Text>
                </View>
                <View style={[styles.viewFlex, { marginTop: 12 }]}>
                    <Text style={styles.textLeft}>Total Price</Text>
                    <Text style={[styles.textRight, { color: '#40BFFF', fontWeight: '700' }]}>{USD.format(data.total_price)}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default ItemOrder

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
        borderBottomWidth: 2,
        borderStyle: 'dashed'
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