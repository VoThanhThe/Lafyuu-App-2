import { Dimensions, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';

const ScreenWidth = Dimensions.get('window').width;
const NumberOfViews = 4;
const RedViewWidth = ScreenWidth / (NumberOfViews * 2);

const Status = () => {
    return (
        <SafeAreaView>
            <View style={{ width: '100%',flexDirection: 'row', alignItems: "center",paddingStart: 30, paddingEnd: 45 }}>
                <View>
                    <Ionicons name="add-circle" color="green" size={24} />
                </View>
                <View style={{ width: '25%', height: 2, backgroundColor: "red" }}></View>
                <View>
                    <Ionicons name="add-circle" color="green" size={24} />
                </View>
                <View style={{ width: '25%', height: 2, backgroundColor: "red" }}></View>
                <View>
                    <Ionicons name="add-circle" color="green" size={24} />
                </View>
                <View style={{ width: '25%', height: 2, backgroundColor: "red" }}></View>
                <View>
                    <Ionicons name="add-circle" color="green" size={24} />
                </View>
            </View>
            <View style = {{flexDirection: 'row', alignItems: 'center', justifyContent: "space-between", paddingHorizontal: 16}}>
                <Text>Packing</Text>
                <Text>Packing</Text>
                <Text>Packing</Text>
                <Text>Packing</Text>
            </View>
        </SafeAreaView>
    )
}

export default Status

const styles = StyleSheet.create({
    textChecking: {
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 21.6,
        color: '#9098B1',
        textAlign: 'center',
        marginTop: 12,
    },
})