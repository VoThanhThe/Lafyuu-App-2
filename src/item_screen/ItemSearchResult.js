import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon1 from 'react-native-vector-icons/Feather'
import Icon2 from 'react-native-vector-icons/Ionicons'
import { TouchableOpacity } from 'react-native-gesture-handler'

const ItemSearchResult = (props) => {
    const { data, navigation } = props;

    const USD = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    });
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => navigation.navigate("ProductDetail", {data})}>
                <Image style={styles.image} source={{ uri: data.image }}  resizeMode='contain'/>
                <Text style={styles.title}>{data.name}</Text>
                <View style={styles.groupView}>
                    <Icon style={styles.icon} name="star" color="#FFC833" size={12} />
                    <Icon style={styles.icon} name="star" color="#FFC833" size={12} />
                    <Icon style={styles.icon} name="star" color="#FFC833" size={12} />
                    <Icon style={styles.icon} name="star" color="#FFC833" size={12} />
                    <Icon style={styles.icon} name="star" color="#EBF0FF" size={12} />
                </View>
                <Text style={styles.priceNew}>{USD.format(data.price)}</Text>
                <View style={styles.groupView}>
                    <Text style={styles.priceOld}>$534,22</Text>
                    <Text style={styles.sale}>24% Off</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default ItemSearchResult

const styles = StyleSheet.create({
    groupView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4
    },
    groupStar: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4
    },
    container: {
        flex: 1,
        height: 282,
        backgroundColor: '#ffffff',
        padding: 16,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#EBF0FF',
        margin: 6
    },
    image: {
        width: "100%",
        height: 133,
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
        marginTop: 16
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
    },
    icon: {
        marginEnd: 2
    }
})