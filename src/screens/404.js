import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';

const ProductNotFound = (props) => {
    const {navigation, title, route} = props;
    // const {navigation, title} = route.params;
    return (
        <View style={{ flex: 1, backgroundColor: "#ffffff", justifyContent: "center", alignItems: 'center', paddingHorizontal: 16 }}>
            <Ionicons name='close-circle' size={100} color={"#40BFFF"} />
            <Text style={{ fontSize: 26, fontWeight: "700", color: "#223263", marginTop: 16 }}>Product Not Found</Text>
            <Text style={{ fontSize: 14, fontWeight: "400", color: "#9098B1", marginTop: 8 }}>thank you for shopping using lafyuu</Text>
            <TouchableOpacity
                onPress={() => navigation.navigate('HomeStack')}
                style={{ backgroundColor: "#40BFFF", width: '100%', height: 57, borderRadius: 5, marginTop: 16 }}
            >
                <Text style={{ fontSize: 18, fontWeight: "700", color: "#ffffff", lineHeight: 57, textAlign: "center", }}>{title}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ProductNotFound

const styles = StyleSheet.create({})