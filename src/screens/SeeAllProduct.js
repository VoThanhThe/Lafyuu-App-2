import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useSelector } from 'react-redux';
import AxiosIntance from '../ultil/AxiosIntance';
import LoadingScreen from './LoadingScreen'
import ItemProduct from '../item_screen/ItemProduct';

const SeeAllProduct = (props) => {
    const { navigation, route } = props;
    const { title } = route.params;
    const user = useSelector(state => state.UserReducer.user);
    const [dataProduct, setDataProduct] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await AxiosIntance().get('/api/product');
                if (response.returnData.error === false) {
                    setDataProduct(response.products);
                }
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching data product :", error);
            }

        }
        getProducts()

        return () => {
        }
    }, [])

    return (
        <View style={styles.container}>
            {/* Start Header */}
            <View style={styles.groupHeader}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <Ionicons name="chevron-back" color="#9098B1" size={20} />
                    </TouchableOpacity>
                    <Text style={styles.textHeader}>{title}</Text>
                </View>

            </View>
            {/* End Header */}
            {
                isLoading ? (<LoadingScreen />) :
                    (
                            <FlatList
                                style={{ margin: 12, }}
                                numColumns={2}
                                data={dataProduct}
                                renderItem={({ item }) => <ItemProduct data={item} navigation={navigation} />}
                                keyExtractor={item => item._id}
                                showsVerticalScrollIndicator={false}
                            />
                    )
            }


        </View>
    )
}

export default SeeAllProduct

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
    textItem: {
        fontSize: 12,
        fontWeight: '700',
        lineHeight: 18,
        color: '#223263',
        marginStart: 19
    },
    textNotify: {
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 21.6,
        color: '#9098B1',
        textAlign: 'right',
        marginEnd: 15,
    },
    image: {
        width: 72,
        height: 72,
        borderRadius: 36
    }
    , textName: {
        fontSize: 14,
        fontWeight: '700',
        lineHeight: 21,
        color: '#223263',
    }
    , textEmail: {
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 21.6,
        color: '#9098B1',
    }
})