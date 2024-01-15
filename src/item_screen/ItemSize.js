import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const ItemSize = (props) => {
    const {dataSize, onPress, borderColor} = props;
    return (
        <TouchableOpacity style = {[styles.container,{borderColor: borderColor,}]} onPress={onPress}>
            <Text style = {styles.text}>{dataSize.number}</Text>
        </TouchableOpacity>
    )
}

export default ItemSize

const styles = StyleSheet.create({
    container: {
        width: 48,
        height: 48,
        borderRadius: 24,
        borderWidth: 2,
        borderColor: '#EBF0FF',
        backgroundColor: '#ffffff',
        marginEnd: 16,
    },
    text: {
        fontSize: 14,
        fontWeight: '700',
        lineHeight: 48,
        color: "#223263",
        textAlign: 'center',

    }
})