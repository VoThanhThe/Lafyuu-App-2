import { StyleSheet, Text, View, ScrollView, TextInput, Image, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import Icon2 from 'react-native-vector-icons/Ionicons'
import ItemFavoriteProduct from '../item_screen/ItemFavoriteProduct'
import { useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProductNotFound from './404';
import LoadingScreen from './LoadingScreen'
import AxiosIntance from '../ultil/AxiosIntance'


const FavoriteProduct = (props) => {
    const { navigation } = props;
    const [dataFavorite, setDataFavorite] = useState([]);
    const data = useSelector(state => state.ReducersWishlist.favorites);
    const user = useSelector(state => state.UserReducer.user);
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const getFavoriteProduct = async () => {
        try {
            const response = await AxiosIntance().get('/api/favorites/get-all-favorites/?user_id=' + user._id);
            if (response.returnData.error === false) {
                setDataFavorite(response.favorites);
                setIsLoading(false);
            }
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching data favorites :", error);
        }

    }
    useEffect(() => {
        getFavoriteProduct()
        return () => {
        }
    }, [])

    const handleRefresh = () => {
        setRefreshing(true);
        getFavoriteProduct()
        setRefreshing(false);
    };
    return (
        <>
            {
                isLoading ? (<LoadingScreen />) : 
                // dataFavorite.length == 0 ?
            (
            <>
                {
                    dataFavorite.length == 0 ? (
                        <ProductNotFound navigation={navigation} title={"Go Back"} />
                    ) :
                        (
                            <View style={styles.container}>
                                {/* Start Header */}
                                <View style={styles.groupHeader}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <TouchableOpacity onPress={() => { navigation.navigate('HomeStack') }}>
                                            <Icon2 name="chevron-back" color="#9098B1" size={20} />
                                        </TouchableOpacity>
                                        <Text style={styles.textHeader}>Favorite Product</Text>
                                    </View>
                                </View>
                                {/* End Header */}
                                <View style={{ padding: 16 }}>
                                    <FlatList
                                        numColumns={2}
                                        data={dataFavorite}
                                        renderItem={({ item, index }) => <ItemFavoriteProduct data={item} index={index} />}
                                        keyExtractor={item => item._id}
                                        showsVerticalScrollIndicator={false}
                                        onRefresh={handleRefresh}
                                        refreshing={refreshing}
                                    />
                                </View>
                            </View>
                        )
                }

            </>
            )
            }
        </>


    )
}

export default FavoriteProduct

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
    image: {
        width: '100%',
        height: 206,
        borderRadius: 5,
    },
})