import { StyleSheet, Text, View, ScrollView, TextInput, Image, FlatList, Button, Pressable, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AxiosIntance from '../ultil/AxiosIntance';
import LoadingScreen from './LoadingScreen';
import ItemCategory from '../item_screen/ItemCategory'
import ItemListCategory from '../item_screen/ItemListCategory'

const ListCategory = (props) => {
    const { navigation } = props;
    const [dataCategory, setDataCategory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getCategories = async () => {
            const response = await AxiosIntance().get("/api/categories/get-all-categories");
            console.log(response);
            if (response.returnData.error == false) {
                setDataCategory(response.categories);
                setIsLoading(false);
            } else {
                console.log("Lấy dữ liệu thất bại");
            }
        }
        getCategories();
        return () => {
        }
    }, []);
    return (
        <View style={styles.container}>
            {/* Start Header */}
            <View style={styles.groupHeader}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <Ionicons name="chevron-back" color="#9098B1" size={20} />
                    </TouchableOpacity>
                    <Text style={styles.textHeader}>Category</Text>
                </View>

            </View>
            {/* End Header */}

            {
                isLoading ?
                    (<LoadingScreen />) :
                    (
                        <View>
                            <FlatList
                                style={{ marginVertical: 12 }}
                                data={dataCategory}
                                renderItem={({ item }) => <ItemListCategory data={item} navigation={navigation} />}
                                keyExtractor={item => item._id}
                                showsHorizontalScrollIndicator={false}
                            />
                        </View>
                    )
            }


        </View >
    )
}

export default ListCategory

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
        marginStart: 15
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
    icon: {
        transform: [{ rotate: '45deg' }]
    }
})