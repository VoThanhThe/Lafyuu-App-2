import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const ItemCategory = (props) => {
  const { data } = props;
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={styles.cotainer}
      onPress={() => navigation.navigate('SearchResult', { search: "", key: data._id, value: data.name })}>
      <View style={styles.circle}>
        <Image style={styles.image} resizeMode='contain' source={{ uri: data.image }} />
      </View>
      <Text style={styles.name}>{data.name}</Text>
    </TouchableOpacity>
  )
}

export default ItemCategory

const styles = StyleSheet.create({
  cotainer: {
    width: 70,
    height: 108,
    marginRight: 12
  },
  image: {
    width: 20,
    height: 20,
  },
  circle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: '#EBF0FF',
    justifyContent: 'center',
    alignItems: 'center'
  },
  name: {
    width: 70,
    height: 30,
    fontSize: 10,
    fontWeight: '400',
    color: "#9098B1",
    lineHeight: 15,
    textAlign: 'center',
    marginTop: 8
  }

})