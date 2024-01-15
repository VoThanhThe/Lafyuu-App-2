import { StyleSheet, Text, View,Image, TouchableOpacity } from 'react-native'
import React from 'react'

const ItemFlashSale = (props) => {
    const {data, navigation} = props;

    const USD = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    });

  return (
    <TouchableOpacity style = {styles.container}
    onPress={() => navigation.push('ProductDetail', {data})}> 
      <Image style = {styles.image} source={{uri : data.image}} resizeMode='contain'/>
      <Text style = {styles.title}>{data.name}</Text>
      <Text style = {styles.priceNew}>{USD.format(data.price)}</Text>
      <View style = {styles.groupView}>
        <Text style = {styles.priceOld}>$534,22</Text>
        <Text style = {styles.sale}>24% Off</Text>
      </View>
    </TouchableOpacity>
  )
}

export default ItemFlashSale

const styles = StyleSheet.create({
    groupView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8
    },
    container: {
        width: 141,
        height: 238,
        backgroundColor: '#ffffff',
        padding: 16,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#EBF0FF',
        marginEnd: 16
    },
    image: {
        width: 109,
        height: 109,
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
        marginTop: 8
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
    }
})