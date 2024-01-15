import { StyleSheet, Text, View, ScrollView, TextInput, Image, FlatList, Button } from 'react-native'
import React, { useState, useEffect } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon1 from 'react-native-vector-icons/Feather'
import Icon2 from 'react-native-vector-icons/Ionicons'
import ItemProduct from '../item_screen/ItemProduct'
import { TouchableOpacity } from 'react-native-gesture-handler'
import AxiosIntance from '../ultil/AxiosIntance';
import LoadingScreen from './LoadingScreen';


const Offer = (props) => {
    const { navigation } = props;
    const [dataProduct, setDataProduct] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productsResponse, categoriesResponse] = await Promise.all([
                    AxiosIntance().get("/api/product"),
                ]);

                console.log("Products Response:", productsResponse);
                if (productsResponse.returnData.error === false) {
                    setDataProduct(productsResponse.products);
                } else {
                    console.log("Lấy dữ liệu sản phẩm thất bại");
                }
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        // Call the fetchData function to fetch data from both APIs
        fetchData();

        return () => {
            // Cleanup logic if needed
        };
    }, []);
    return (
        <View style={styles.container}>
            {/* Start Header */}
            <View style={styles.groupHeader}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon2 name="chevron-back" color="#9098B1" size={20} />
                    </TouchableOpacity>
                    <Text style={styles.textHeader}>Super Flash Sale</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate("Search")}>
                    <Icon name="search" color="#9098B1" size={20} />
                </TouchableOpacity>

            </View>
            {/* End Header */}
            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={{ padding: 16, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                    {/* Bannel */}
                    <Image style={styles.image} source={require('../assets/img_bannel.png')} />

                    {/* Bannel 1 */}
                    {
                        dataProduct.map((item) => <ItemProduct key={item._id} data={item} navigation={navigation} />)
                    }
                </View>
            </ScrollView>
        </View>

    )
}

export default Offer

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