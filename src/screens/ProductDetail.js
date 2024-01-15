import { StyleSheet, Text, View, ScrollView, TextInput, Image, FlatList, Button, Pressable, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import ItemSize from '../item_screen/ItemSize'
import ItemColor from '../item_screen/ItemColor'
import ItemFlashSale from '../item_screen/ItemFlashSale'
import { useDispatch, useSelector } from 'react-redux'
import Modal from 'react-native-modal';

import {
  addItemToCart,
  addToWishlist,
} from '../redux2/actions/Actions'

import AxiosIntance from '../ultil/AxiosIntance';
import LoadingScreen from './LoadingScreen'
import { dataColor, dataSize } from '../data/Data'

const ProductDetail = (props) => {
  const { navigation, route } = props;
  const { data } = route.params;

  // console.log("Data id: ", data);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedIdSize, setSelectedIdSize] = useState('2');
  const [selectedIdColor, setSelectedIdColor] = useState('1');
  const [dataProduct, setDataProduct] = useState([]);
  const [dataFavorite, setDataFavorite] = useState([]);
  const [isFavorite, setIsFavorite] = useState([]);
  const [isProductInFavorite, setIsProductInFavorite] = useState(false);
  console.log("Data dataFavorite: ", dataFavorite);
  console.log("isFavorite: ", isFavorite);
  console.log("isProductInFavorite: ", isProductInFavorite);
  const user = useSelector(state => state.UserReducer.user);
  const dispatch = useDispatch();

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const USD = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  });

  const itemWishlist = useSelector((state) => state.ReducersWishlist);
  console.log(itemWishlist);

  const renderItemSize = ({ item }) => {
    const borderColor = item.id === selectedIdSize ? "#40BFFF" : '#EBF0FF';
    return (
      <ItemSize
        dataSize={item}
        onPress={() => setSelectedIdSize(item.id)}
        borderColor={borderColor} />
    );
  };

  const renderItemColor = ({ item }) => {
    const backgroundColor = item.id === selectedIdColor ? "#ffffff" : "black";
    const borderRadius = item.id === selectedIdColor ? 12 : 12;
    const width = item.id === selectedIdColor ? 24 : 0;
    const height = item.id === selectedIdColor ? 24 : 0;
    return (
      <ItemColor
        dataColor={item}
        onPress={() => setSelectedIdColor(item.id)}
        backgroundColor={backgroundColor}
        borderRadius={borderRadius}
        width={width}
        height={height} />
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsResponse, favoriresResponse] = await Promise.all([
          AxiosIntance().get("/api/product"),
          AxiosIntance().get('/api/favorites/get-all-favorites/?user_id=' + user._id),
        ]);

        console.log("Products Response:", productsResponse);
        console.log("Favorires Response:", favoriresResponse);

        if (productsResponse.returnData.error === false) {
          setDataProduct(productsResponse.products);
        } else {
          console.log("Lấy dữ liệu sản phẩm thất bại");
        }

        if (favoriresResponse.returnData.error === false) {
          setDataFavorite(favoriresResponse.favorites);
          let isProductInArray = false;
          let dataFavoriteLength = favoriresResponse.favorites.length;

          // for (let i = 0; i < dataFavoriteLength; i++) {
          //   console.log("Chạy rôi id 1: "+ favoriresResponse.favorites[i].product_id._id);
          //   console.log("Chạy rôi id 2: "+ data._id);
          //   if (favoriresResponse.favorites[i].product_id._id === data._id) {
          //     isProductInArray = true;
          //     console.log("Thấy rồi nha: "+ data._id);
          //     return; // Nếu tìm thấy, thoát khỏi vòng lặp
          //   }
          // }

          // if (isProductInArray) {
          //   setIsFavorite(true);
          // }else {
          //   setIsFavorite(false);
          // }

          for (let i = 0; i < dataFavoriteLength; i++) {
            if (favoriresResponse.favorites[i].product_id._id === data._id) {
              setIsFavorite(favoriresResponse.favorites[i]);
              setIsProductInFavorite(true);
              break; // Nếu tìm thấy, thoát khỏi vòng lặp
            }
          }
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
  }, [setIsProductInFavorite,]);

  const onDeleteFavorite = async () => {
    try {
      const response = await AxiosIntance()
        .post("/api/favorites/delete-favorite/?id=" + isFavorite._id);

      if (response.returnData.error == false) {
        // navigation.push("FavoriteProduct");
        toggleModal();
        setIsProductInFavorite(false);
      } else {
      }
    } catch (e) {
      console.log(e);
    }
  }


  const onAddFavorite = async () => {
    try {
      if (isProductInFavorite == true) {
        toggleModal();
      } else {
        const response = await AxiosIntance()
          .post("/api/favorites/add-new-favorite",
            { user_id: user._id, product_id: data._id });

        if (response.returnData.error == false) {
          setIsProductInFavorite(true);
        } else {
        }
      }

    } catch (e) {
      console.log(e);
    }
  }

  const onSearch = async () => {
    navigation.navigate("SearchResult", { search: data.name, key: data.category._id, value: data.category.name });
  }
  return (

    < >
      {
        isLoading ? (
          <LoadingScreen />
        ) : (
          <View style={styles.container}>
            {/* Start Header */}
            <View style={styles.groupHeader}>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Ionicons name="chevron-back" color="#9098B1" size={20} />
                </TouchableOpacity>
                <Text style={styles.textHeader}>{
                  data?.name.length > 30 ? (data?.name).slice(0, 30) + "..." : data?.name
                }</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={onSearch}>
                  <FontAwesome name="search" color="#9098B1" size={20} />
                </TouchableOpacity>
                <FontAwesome style={{ marginStart: 32.25 }} name="ellipsis-v" color="#9098B1" size={20} />
              </View>
            </View>
            {/* End Header */}
            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Image Detail */}

              <Image style={styles.image} resizeMode='contain' source={{ uri: data.image }} />
              <View style={{ justifyContent: 'center', alignItems: 'center', padding: 16 }}>
                <View style={styles.groupButton}>
                  <Text style={styles.buttonBannel}></Text>
                  <Text style={styles.buttonBannel}></Text>
                  <Text style={[styles.buttonBannel, { backgroundColor: '#40BFFF' }]}></Text>
                  <Text style={styles.buttonBannel}></Text>
                  <Text style={styles.buttonBannel}></Text>
                </View>
              </View>
              {/* Image Detail */}
              <View style={{ paddingHorizontal: 16 }}>
                {/* Start Title */}
                <View style={styles.groupTitle}>
                  <Text style={styles.title}>{data.name}</Text>
                  {/* <TouchableOpacity onPress={() => { setIsAddWishlist(true), dispatch(addToWishlist(data)) }}> */}
                  <TouchableOpacity onPress={() => { onAddFavorite() }}>
                    {
                      isProductInFavorite ? (<Ionicons name="heart" color="red" size={18} />) :
                        (<Ionicons name="heart-outline" color="#9098B1" size={18} />)
                    }


                  </TouchableOpacity>
                </View>
                {/* End Title */}

                {/* 5 Star */}
                <View style={styles.groupStar}>
                  <FontAwesome style={styles.icon} name="star" color="#FFC833" size={16} />
                  <FontAwesome style={styles.icon} name="star" color="#FFC833" size={16} />
                  <FontAwesome style={styles.icon} name="star" color="#FFC833" size={16} />
                  <FontAwesome style={styles.icon} name="star" color="#FFC833" size={16} />
                  <FontAwesome style={styles.icon} name="star" color="#EBF0FF" size={16} />
                </View>
                {/* 5 Star */}

                {/* Price */}
                <Text style={styles.price}>{USD.format(data.price)}</Text>
                {/* Price */}

                {/* Select Size */}
                <Text style={styles.titleItem}>Select Size</Text>
                <FlatList
                  data={dataSize}
                  renderItem={renderItemSize}
                  keyExtractor={item => item.id}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  horizontal={true}
                  extraData={selectedIdSize}
                />
                {/* Select Size */}

                {/* Select Color */}
                <Text style={styles.titleItem}>Select Color</Text>
                <FlatList
                  data={dataColor}
                  renderItem={renderItemColor}
                  keyExtractor={item => item.id}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  horizontal={true}
                  extraData={selectedIdColor}
                />
                {/* Select Color */}

                {/* Specification */}
                <Text style={styles.titleItem}>Specification</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                  <Text style={styles.item}>Shown:</Text>
                  <Text style={[styles.item, { color: '#9098B1', textAlign: 'right' }]}>Laser{'\n'} Blue/Anthracite/Watermelon/White</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 16, }}>
                  <Text style={styles.item}>Style:</Text>
                  <Text style={[styles.item, { color: '#9098B1', textAlign: 'right' }]}>CD0113-400</Text>
                </View>

                <Text style={[styles.item, { color: '#9098B1', textAlign: 'left', }]}>The Nike Air Max 270
                  React ENG combines a full-length React
                  foam midsole with a 270 Max Air unit for
                  unrivaled comfort and a striking visual
                  experience.</Text>

                {/* Specification */}

                {/* Review Product */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingEnd: 16 }}>
                  <Text style={[styles.titleItem, { marginBottom: 8 }]}>Review Product</Text>
                  <Text style={[styles.titleItem, { color: '#40BFFF', marginBottom: 8 }]}>See More</Text>
                </View>
                {/* 5 Star */}
                <View style={[styles.groupStar, { marginBottom: 16 }]}>
                  <FontAwesome style={styles.icon} name="star" color="#FFC833" size={16} />
                  <FontAwesome style={styles.icon} name="star" color="#FFC833" size={16} />
                  <FontAwesome style={styles.icon} name="star" color="#FFC833" size={16} />
                  <FontAwesome style={styles.icon} name="star" color="#FFC833" size={16} />
                  <FontAwesome style={styles.icon} name="star" color="#EBF0FF" size={16} />
                  <Text style={styles.textReview} >4.5 (5 Review)</Text>
                </View>
                {/* 5 Star */}

                <View style={[styles.viewflex_1, {}]}>
                  <Image style={styles.image_profile} resizeMode='cover' source={require('../assets/img_profile.png')} />
                  <View style={{ paddingStart: 16 }}>
                    <Text style={styles.textProfile}>James Lawson</Text>
                    {/* 5 Star */}
                    <View style={[styles.groupStar, { marginStart: 0 }]}>
                      <FontAwesome style={styles.icon} name="star" color="#FFC833" size={16} />
                      <FontAwesome style={styles.icon} name="star" color="#FFC833" size={16} />
                      <FontAwesome style={styles.icon} name="star" color="#FFC833" size={16} />
                      <FontAwesome style={styles.icon} name="star" color="#FFC833" size={16} />
                      <FontAwesome style={styles.icon} name="star" color="#EBF0FF" size={16} />
                    </View>

                    {/* 5 Star */}
                  </View>
                </View>

                <Text style={[styles.item, { color: '#9098B1', textAlign: 'left', paddingTop: 16, }]}>air max are always very comfortable fit, clean and just perfect in every way. just the box was too small and scrunched the sneakers up a little bit, not sure if the box was always this small but the 90s are and will always be one of my favorites.</Text>

                <View style={[styles.viewflex_1, { marginTop: 16, marginBottom: 16 }]}>
                  <Image style={styles.image_review} resizeMode='cover' source={require('../assets/img_review_1.png')} />
                  <Image style={styles.image_review} resizeMode='cover' source={require('../assets/img_review_2.png')} />
                  <Image style={styles.image_review} resizeMode='cover' source={require('../assets/img_review_3.png')} />
                </View>

                <Text style={[styles.item, { color: '#9098B1', textAlign: 'left', fontSize: 10 }]}>December 10, 2016</Text>
                {/* Review Product */}


                {/* You Might Also Like */}
                <Text style={styles.titleItem}>You Might Also Like</Text>
                <FlatList style={{ marginVertical: 12, marginBottom: 80 }}
                  data={dataProduct}
                  renderItem={({ item }) => <ItemFlashSale data={item} navigation={navigation} />}
                  keyExtractor={item => item._id}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                />
                {/* You Might Also Like */}


              </View>
            </ScrollView>
            <Modal isVisible={isModalVisible} animationIn="slideInUp" animationOut="slideOutDown">
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <View style={{ backgroundColor: "#ffffff", justifyContent: "center", alignItems: 'center', paddingHorizontal: 16 }}>
                    <Ionicons name='alert-circle-sharp' size={100} color={"#FB7181"} />
                    <Text style={{ fontSize: 26, fontWeight: "700", color: "#223263", marginTop: 16 }}>Confirmation</Text>
                    <Text style={{ fontSize: 14, fontWeight: "400", color: "#9098B1", marginTop: 8, textAlign: "center" }}>Are you sure wanna delete product</Text>
                    <TouchableOpacity
                      onPress={() => { onDeleteFavorite() }}
                      style={{ backgroundColor: "#40BFFF", width: '100%', height: 57, borderRadius: 5, marginTop: 16 }}
                    >
                      <Text style={{ fontSize: 18, fontWeight: "700", color: "#ffffff", lineHeight: 57, textAlign: "center", }}>Delete</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={toggleModal}
                      style={{ width: '100%', height: 57, borderRadius: 5, marginTop: 16, borderColor: "#EBF0FF", borderWidth: 2 }}
                    >
                      <Text style={{ fontSize: 18, fontWeight: "700", color: "#9098B1", lineHeight: 57, textAlign: "center", }}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
            <TouchableOpacity style={styles.button}
              onPress={() => dispatch(addItemToCart(data))}
            >
              <Text style={styles.textButton}>Add To Cart</Text>
            </TouchableOpacity>
          </View>
        )
      }
    </ >


  )
}

export default ProductDetail

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  groupTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 30,
    color: "#223263",
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
    height: 238,
  },
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
  groupStar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  icon: {
    marginEnd: 4
  },
  price: {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 30,
    color: "#40BFFF",
    marginTop: 16
  },
  titleItem: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 21,
    color: "#223263",
    marginTop: 24,
    marginBottom: 12
  },
  item: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 21.6,
    color: "#223263",
  },
  textReview: {
    fontSize: 10,
    fontWeight: '400',
    lineHeight: 15,
    color: "#9098B1",
  },
  textProfile: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 21,
    color: "#223263",
  },
  image_profile: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  viewflex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewflex_1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image_review: {
    width: 72,
    height: 72,
    borderRadius: 8,
    marginEnd: 12
  },
  button: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
    height: 57,
    borderRadius: 5,
    backgroundColor: '#40BFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 57,
    color: "#ffffff",
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
})