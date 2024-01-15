import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const ItemColor = (props) => {
    const {dataColor, onPress, backgroundColor, borderRadius, width, height} = props
  return (
    <TouchableOpacity 
    style = {[styles.container, {backgroundColor: dataColor.color, justifyContent: "center", alignItems: "center"}]}
    onPress={onPress}>
      <View style = {{backgroundColor: backgroundColor,width: width, height: height, borderRadius: borderRadius, }}></View>
    </TouchableOpacity>
  )
}

export default ItemColor

const styles = StyleSheet.create({
    container: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#ffffff',
        marginEnd: 16,
    },
})