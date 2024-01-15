import { StyleSheet, Text, View, Alert, TextInput, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon1 from 'react-native-vector-icons/Feather'
import Icon2 from 'react-native-vector-icons/Ionicons'
import { SelectList } from 'react-native-dropdown-select-list'
import ItemGengerExplore from '../item_screen/ItemGengerExplore'
import AxiosIntance from '../ultil/AxiosIntance';
import LoadingScreen from './LoadingScreen';
import ItemSearchResult from '../item_screen/ItemSearchResult'
import ProductNotFound from './404'

const SearchResult = (props) => {
    const { navigation, route } = props;
    const { search, key, value } = route.params;
    const [dataCategory, setDataCategory] = useState([]);
    const [dataProduct, setDataProduct] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const categoryIdParam = key ? key : "";
    const [selected, setSelected] = React.useState(categoryIdParam);
    const [sort, setSort] = useState(1);
    console.log("Selected", selected);


    const onSort = () => {
        if (sort == -1) {
            setSort(1);
        } else {
            setSort(-1);
        }
        console.log("Sort: ", sort);
    }

    // const gender = ["Male", "Female", "Other",];
    const gender = [
        {
            id: "1",
            name: "Male",
            status: "true",
        },
        {
            id: "2",
            name: "Female",
            status: "true",
        },
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productsResponse, categoriesResponse] = await Promise.all([
                    AxiosIntance().get("/api/product/search/name?keyword=" + search + "&categoryId=" + selected + "&sort=" + sort),
                    AxiosIntance().get("/api/categories/get-all-categories"),
                ]);
                console.log("Query: ", search, selected, sort);
                console.log("Products Response:", productsResponse);
                console.log("Categories Response:", categoriesResponse);

                if (productsResponse.returnData.error === false) {
                    setDataProduct(productsResponse.products);
                } else {
                    console.log("Lấy dữ liệu sản phẩm thất bại");
                }

                if (categoriesResponse.returnData.error === false) {
                    setDataCategory(categoriesResponse.categories);
                } else {
                    console.log("Lấy dữ liệu danh mục thất bại");
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
    }, [search, selected, sort]);

    // Lấy thuộc tính "name" của đối tượng đầu tiên
    let category = dataCategory.length > 0 ? dataCategory[0].name : "";

    // Lọc ra chỉ các thuộc tính "_id" và "name" từ mỗi đối tượng
    let filteredArray = dataCategory.map(obj => ({ key: obj._id, value: obj.name }));

    const handleResetSelection = () => {
        // Cập nhật giá trị đã chọn về giá trị mặc định
        setSelected('');
        // Hiển thị thông báo hoặc thực hiện các hành động khác nếu cần thiết
        Alert.alert('Selection Reset', 'Selected value has been reset to default.');
    };

    return (
        <View style={styles.container}>
            {/* Start Header */}
            <View style={styles.groupHeader}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon2 name="chevron-back" color="#9098B1" size={20} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Search', {searchResult : search})} style={styles.inputHeader}>
                    <Icon name="search" color="#40BFFF" size={20} />
                    <Text style={styles.textInput}>{search}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onSort}>
                    <Icon
                        // sort-amount-asc
                        name={sort == -1 ? "sort-amount-desc" : "sort-amount-asc"}
                        color="#9098B1"
                        size={20}
                    />
                </TouchableOpacity>
                {/* <TouchableOpacity>
                    <Icon1

                        name="filter"
                        color="#40BFFF"
                        size={24}
                    />
                </TouchableOpacity> */}
            </View>
            {/* End Header */}
            <View style={{ paddingHorizontal: 16 }}>
                {/* Start Result */}
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: 'center', marginTop: 16, }}>
                    <View>
                        <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#9098B1' }}>{dataProduct.length} Result</Text>
                    </View>
                    {/* <TouchableOpacity
                        onPress={() => navigation.navigate("ListCategory", { category: dataCategory._id})}
                        style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#223263', marginEnd: 8 }}>{category}</Text>
                        <Icon2 name='chevron-down' size={24} color={'#9098B1'} />
                    </TouchableOpacity> */}
                    <View style={{ width: 200, height: 48 }}>

                    </View>
                    <View style={{ position: "absolute", top: 0, right: 0, width: 200, zIndex: 1 }}>
                        <SelectList
                            setSelected={(val) => setSelected(val)}
                            data={filteredArray}
                            save="key"
                            placeholder='Select Category'
                            searchPlaceholder='Search'
                            dropdownStyles={{ backgroundColor: 'gray' }}
                            dropdownTextStyles={{ color: "white" }}
                            defaultOption={{ key: key, value: value }}
                        />
                    </View>

                </View>
                {/* End Result */}
            </View>
            <>
                {
                    isLoading ?
                        (
                            <LoadingScreen />
                        ) :
                        (
                            dataProduct.length > 0 ?
                                (
                                    <FlatList
                                        style={{ marginHorizontal: 10, marginTop: 10 }}
                                        numColumns={2}
                                        data={dataProduct}
                                        renderItem={({ item }) => <ItemSearchResult data={item} navigation={navigation} />}
                                        keyExtractor={item => item._id}
                                        showsVerticalScrollIndicator={false}
                                    />
                                ) :
                                (

                                    <ProductNotFound navigation={navigation} title={"Go Back"} />
                                )
                        )


                }
            </>

        </View >
    )
}

export default SearchResult

const styles = StyleSheet.create({
    groupButton: {
        width: 72,
        height: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    buttonBannel: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#EBF0FF',
    },
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
    inputHeader: {
        width: 290,
        height: 46,
        borderWidth: 1,
        borderColor: '#EBF0FF',
        backgroundColor: "#ffffff",
        borderRadius: 5,
        paddingLeft: 18,
        flexDirection: "row",
        alignItems: 'center'
    },

    textInput: {
        fontSize: 14,
        fontWeight: '700',
        color: '#223263',
        lineHeight: 18,
        marginStart: 10
    },
})