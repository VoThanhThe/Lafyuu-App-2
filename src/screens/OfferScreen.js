import { StyleSheet, Text, View, Image, TextInput, FlatList, Pressable, ScrollView } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon1 from 'react-native-vector-icons/Feather'
import Icon2 from 'react-native-vector-icons/Ionicons'

const OfferScreen = () => {
    return (
        <View style={styles.container}>
            {/* Start Header */}
            <View style={styles.groupHeader}>
                <Text style={styles.header}>Offer</Text>
            </View>
            {/* End Header */}
            <ScrollView showsHorizontalScrollIndicator={false}>
                <View style={{ padding: 16 }}>
                    <View style={styles.viewHeader}>
                        <Text style={styles.textHeader}>
                        Use “MEGSL” Cupon For {'\n'}Get 90%off
                        </Text>
                    </View>

                    <Image style={styles.image} resizeMode = 'cover' source={require('../assets/img_bannel.png')}/>
                    <Image style={styles.image} resizeMode = 'cover' source={require('../assets/img_bannel_2.png')}/>
                </View>
            </ScrollView>
        </View>
    )
}

export default OfferScreen

const styles = StyleSheet.create({
    groupHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomColor: '#EBF0FF',
        borderBottomWidth: 1
    },
    container: {
        flex: 1,
        backgroundColor: '#ffffff',

    },
    header: {
        fontSize: 16,
        fontWeight: '700',
        color: '#223263',
        lineHeight: 24,
    },

    viewHeader: {
        backgroundColor: '#40BFFF',
        padding: 16,
        borderRadius: 5
    },
    textHeader: {
        fontSize: 16,
        fontWeight: '700',
        color: '#ffffff',
        lineHeight: 24
    },
    image: {
        width: '100%',
        height: 206,
        borderRadius: 5,
        marginTop: 16,
    }
})