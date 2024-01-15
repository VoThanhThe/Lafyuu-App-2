import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const ItemSearch = (props) => {
    const { data, navigation } = props;

    return (
        <TouchableOpacity style={styles.cotainer}
            onPress={() => {}}>
            <Text style={styles.name}>{data.name}</Text>
        </TouchableOpacity>
    )
}

export default ItemSearch

const styles = StyleSheet.create({
    cotainer: {
        width: "100%",
        height: 54,
        padding: 16
    },
    name: {
        fontSize: 14,
        fontWeight: '400',
        color: "#9098B1",
        lineHeight: 21.6,
        letterSpacing: 0.5
    }

})