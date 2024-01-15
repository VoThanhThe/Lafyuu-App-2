import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const ItemListCategory = (props) => {
    const { data, navigation } = props;

    return (
        <TouchableOpacity style={styles.cotainer}>
            <View style = {{flexDirection: 'row', alignItems: 'center'}}>
                <Image style={styles.image} resizeMode='contain' source={{uri: data.image}} />
                <Text style={styles.name}>{data.name}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default ItemListCategory

const styles = StyleSheet.create({
    cotainer: {
        width: "100%",
        height: 56,
        padding: 16, 
    },
    image: {
        width: 24,
        height: 24,
    },
    name: {
        fontSize: 14,
        fontWeight: '700',
        color: "#223263",
        lineHeight: 18,
        textAlign: 'center',
        letterSpacing: 0.5,
        marginStart: 16
    }

})