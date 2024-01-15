import { StyleSheet, Text, View, ScrollView, TextInput, Image, FlatList, Button, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'

const Notification_Feed = (props) => {
    const {navigation} = props;
  return (
    <View style={styles.container}>
            {/* Start Header */}
            <View style={styles.groupHeader}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <Ionicons name="chevron-back" color="#9098B1" size={20} />
                    </TouchableOpacity>
                    <Text style={styles.textHeader}>Feed</Text>
                </View>

            </View>
            {/* End Header */}

            {/* Item 1 */}
            <TouchableOpacity>
                <View style={styles.groupItem}>
                    <Image style={styles.image} source={require('../assets/product_1.png')}/>
                    <View style={styles.groupTextRight}>
                        <Text style={styles.textTitle}>New Product</Text>
                        <Text style={styles.textContent}>Nike Air Zoom Pegasus 36 Miami - Special For your Activity</Text>
                        <Text style={styles.textDate}>June 3, 2015 5:06 PM</Text>
                    </View>
                </View>
            </TouchableOpacity>
            {/* Item 1 */}

            {/* Item 2 */}
            <TouchableOpacity>
                <View style={styles.groupItem}>
                <Image style={styles.image} source={require('../assets/product_2.png')}/>
                    <View style={styles.groupTextRight}>
                        <Text style={styles.textTitle}>Best Product</Text>
                        <Text style={styles.textContent}>Nike Air Zoom Pegasus 36 Miami - Special For your Activity</Text>
                        <Text style={styles.textDate}>June 3, 2015 5:06 PM</Text>
                    </View>
                </View>
            </TouchableOpacity>
            {/* Item 2 */}

            {/* Item 3 */}
            <TouchableOpacity>
                <View style={styles.groupItem}>
                <Image style={styles.image} source={require('../assets/product_3.png')}/>
                    <View style={styles.groupTextRight}>
                        <Text style={styles.textTitle}>New Product</Text>
                        <Text style={styles.textContent}>Nike Air Zoom Pegasus 36 Miami - Special For your Activity</Text>
                        <Text style={styles.textDate}>June 3, 2015 5:06 PM</Text>
                    </View>
                </View>
            </TouchableOpacity>
            {/* Item 3 */}

        </View >
  )
}

export default Notification_Feed

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
    groupTextRight: {
        marginStart: 15,
        width: '90%'
    },
    groupItem: {
        flexDirection: 'row',
        padding: 16
    },
    textTitle: {
        fontSize: 14,
        fontWeight: '700',
        lineHeight: 21,
        color: '#223263',
        textAlign: 'left',
        letterSpacing: 0.5
    },
    textContent: {
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 21.6,
        color: '#9098B1',
        textAlign: 'left',
        letterSpacing: 0.5,
        marginTop: 8
    },
    textDate: {
        fontSize: 10,
        fontWeight: '400',
        lineHeight: 15,
        color: '#223263',
        textAlign: 'left',
        letterSpacing: 0.5,
        marginTop: 8
    },
    image: {
        width: 48,
        height: 48,
        borderRadius: 5,

    }
})