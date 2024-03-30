import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/Ionicons';
import ItemCategory from '../item_screen/ItemCategory';
import ItemFlashSale from '../item_screen/ItemFlashSale';
import { ScrollView } from 'react-native-gesture-handler';
import ItemProduct from '../item_screen/ItemProduct';
import { AppContext } from '../ultil/AppContext';
import AxiosIntance from '../ultil/AxiosIntance';
import LoadingScreen from './LoadingScreen';
import { useSelector } from 'react-redux'

const Home = (props) => {
  const { navigation } = props;
  const [dataProduct, setDataProduct] = useState([]);
  const [dataCategory, setDataCategory] = useState([]);
  const [dataNotification, setDataNotification] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector(state => state.UserReducer.user);

  // Giới hạn số phần tử hiển thị
  const limit = 10;
  const dataFlashSale = dataProduct.slice(0, limit);
  const dataMegaSale = dataProduct.slice(10, limit + 10);

  const fetchData = async () => {
    try {
      const [productsResponse, categoriesResponse, notificationsResponse] = await Promise.all([
        AxiosIntance().get(`/api/product`),
        AxiosIntance().get("/api/categories/get-all-categories"),
        AxiosIntance().get('/api/notification?user_id=' + user._id),
      ]);

      console.log("Products Response:", productsResponse);

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

      if (notificationsResponse.returnData.error === false) {
        setDataNotification(notificationsResponse.notification);
      } else {
        console.log("Lấy dữ liệu thông báo thất bại");
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {

    // Call the fetchData function to fetch data from both APIs
    fetchData();

    return () => {
      // Cleanup logic if needed
    };
  }, [setDataNotification]);


  return (
    < >
      {
        isLoading ? (
          <LoadingScreen />
        ) : (
          <View style={styles.container}>
            {/* Start Header */}
            <View style={styles.groupHeader}>
              <TouchableOpacity
                onPress={() => navigation.navigate("Search")}
                style={{
                  width: "80%",
                  height: 46,
                  backgroundColor: "red",
                  borderWidth: 1,
                  borderColor: '#EBF0FF',
                  backgroundColor: '#ffffff',
                  borderRadius: 5,
                  flexDirection: 'row',
                  alignItems: "center",
                  paddingHorizontal: 15
                }}>
                <Icon name="search" color="#40BFFF" size={20} />
                <Text style={{ fontSize: 14, marginLeft: 15, color: "#9098B1", fontWeight: "400", letterSpacing: 0.5 }}>Search Product</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  {
                    navigation.navigate('FavoriteProduct');
                  }
                }}>
                <Icon1
                  name="heart"
                  color="#9098B1"
                  size={20}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  {
                    navigation.navigate('NotificationStack');
                  }
                }}>
                <Icon2

                  name="notifications-outline"
                  color="#9098B1"
                  size={20}
                />
                <View style = {{backgroundColor: "red", 
                width: 10, height: 10, 
                borderRadius: 100, 
                position: 'absolute',
                top: 0,right: 0,
                opacity: 1
                }}></View>
              </TouchableOpacity>
            </View>
            {/* End Header */}

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{ padding: 16 }}>
                {/* Bannel 1 */}
                <TouchableOpacity
                  onPress={() => {
                    {
                      navigation.navigate('Offer');
                    }
                  }}>
                  <Image
                    style={styles.image}
                    source={require('../assets/banner_2.png')}
                  />
                </TouchableOpacity>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 16,
                  }}>
                  <View style={styles.groupButton}>
                    <Text style={styles.buttonBannel}></Text>
                    <Text style={styles.buttonBannel}></Text>
                    <Text
                      style={[
                        styles.buttonBannel,
                        { backgroundColor: '#40BFFF' },
                      ]}></Text>
                    <Text style={styles.buttonBannel}></Text>
                    <Text style={styles.buttonBannel}></Text>
                  </View>
                </View>
                {/* Bannel 1 */}

                {/* Start Flatlist Category */}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text style={styles.title}>Category</Text>
                  <TouchableOpacity onPress={() => navigation.navigate('Explore')}>
                    <Text style={[styles.title, { color: '#40BFFF' }]}>
                      More Category
                    </Text>
                  </TouchableOpacity>
                </View>

                <FlatList
                  style={{ marginVertical: 12 }}
                  data={dataCategory}
                  renderItem={({ item }) => <ItemCategory data={item} navigation={navigation} />}
                  keyExtractor={item => item._id}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                />
                {/* End Flatlist Category */}

                {/* Start Flatlist FlashSale */}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text style={styles.title}>Flash Sale</Text>
                  <TouchableOpacity onPress={() => navigation.navigate("SeeAllProduct", { title: "Flash Sale" })}>
                    <Text style={[styles.title, { color: '#40BFFF' }]}>See More</Text>
                  </TouchableOpacity>
                </View>

                <FlatList
                  style={{ marginVertical: 12 }}
                  data={dataFlashSale}
                  renderItem={({ item }) => <ItemFlashSale data={item} navigation={navigation} />}
                  keyExtractor={item => item._id}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                />
                {/* End Flatlist FlashSale */}

                {/* Start Flatlist MegaSale */}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text style={styles.title}>Mega Sale</Text>
                  <TouchableOpacity onPress={() => navigation.navigate("SeeAllProduct", {title: "Mega Sale"})}>
                    <Text style={[styles.title, { color: '#40BFFF' }]}>See More</Text>
                  </TouchableOpacity>
                </View>

                <FlatList
                  style={{ marginVertical: 12 }}
                  data={dataMegaSale}
                  renderItem={({ item }) => <ItemFlashSale data={item} navigation={navigation} />}
                  keyExtractor={item => item._id}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                />
                {/* End Flatlist MegaSale */}
                {/* Bannel 2 */}
                <Image
                  style={styles.image}
                  source={require('../assets/img_bannel_2.png')}
                />
                {/* Bannel 2 */}
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                  <FlatList
                    style={{ marginVertical: 12 }}
                    numColumns={2}
                    data={dataProduct}
                    scrollEnabled={false}
                    renderItem={({ item }) => <ItemProduct data={item} navigation={navigation} />}
                    keyExtractor={item => item._id}
                    showsHorizontalScrollIndicator={false}
                  />
                </View>

              </View>
            </ScrollView>
          </View>
        )
      }

    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  groupButton: {
    width: 72,
    height: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    borderBottomWidth: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  icon: {
    position: 'absolute',
    top: 13,
    left: 18,
  },
  input: {
    width: 290,
    height: 46,
    borderWidth: 1,
    borderColor: '#EBF0FF',
    backgroundColor: '#ffffff',
    borderRadius: 5,
    paddingLeft: 50,
  },
  image: {
    width: '100%',
    height: 206,
    borderRadius: 5,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: '#223263',
    lineHeight: 21.6,
  },
});

// const dataCategory = [
//   {
//     id: '1',
//     title: 'Man Shirt',
//     imageURL:
//       'https://firebasestorage.googleapis.com/v0/b/app-shoes-6fd12.appspot.com/o/ic_man_shirt.png?alt=media&token=ec71fd13-82d1-4f31-b863-f091f8f14ec8',
//   },
//   {
//     id: '2',
//     title: 'Man Work Equipment',
//     imageURL:
//       'https://firebasestorage.googleapis.com/v0/b/app-shoes-6fd12.appspot.com/o/ic_Man%20Work%20Equipment.png?alt=media&token=78574219-2cd5-4f4e-bf4f-25a079df3e0f',
//   },
//   {
//     id: '3',
//     title: 'Man Pants',
//     imageURL:
//       'https://firebasestorage.googleapis.com/v0/b/app-shoes-6fd12.appspot.com/o/ic_Man%20Pants.png?alt=media&token=9c973769-712f-4447-ad1e-9c6b7677c7b6',
//   },
//   {
//     id: '4',
//     title: 'Man Shoes',
//     imageURL:
//       'https://firebasestorage.googleapis.com/v0/b/app-shoes-6fd12.appspot.com/o/ic_Man%20Shoes.png?alt=media&token=f1bf8ed0-0637-48d9-93f2-3e754974c3cb',
//   },
//   {
//     id: '5',
//     title: 'Man Underwear',
//     imageURL:
//       'https://firebasestorage.googleapis.com/v0/b/app-shoes-6fd12.appspot.com/o/ic_Man%20Underwear.png?alt=media&token=9c2a1064-ab52-4d20-9d24-2c1a68547473',
//   },

//   {
//     id: '6',
//     title: 'Dress',
//     imageURL:
//       'https://firebasestorage.googleapis.com/v0/b/app-shoes-6fd12.appspot.com/o/ic_Dress.png?alt=media&token=e19c2ce8-26c9-4b11-966a-509c96e5671f',
//   },

//   {
//     id: '7',
//     title: 'Woman Bag',
//     imageURL:
//       'https://firebasestorage.googleapis.com/v0/b/app-shoes-6fd12.appspot.com/o/ic_Woman%20Bag.png?alt=media&token=b34d5d98-6013-4fd8-b045-69017a941644',
//   },

//   {
//     id: '8',
//     title: 'Woman Pants',
//     imageURL:
//       'https://firebasestorage.googleapis.com/v0/b/app-shoes-6fd12.appspot.com/o/ic_woman_pants.png?alt=media&token=a8a05a69-9756-4526-82b3-53419e90efb5',
//   },

//   {
//     id: '9',
//     title: 'High Heels',
//     imageURL:
//       'https://firebasestorage.googleapis.com/v0/b/app-shoes-6fd12.appspot.com/o/ic_high_heel.png?alt=media&token=14f43a04-5f99-4375-9b77-ba8302774f1c',
//   },

//   {
//     id: '10',
//     title: 'Bikini',
//     imageURL:
//       'https://firebasestorage.googleapis.com/v0/b/app-shoes-6fd12.appspot.com/o/ic_bikini.png?alt=media&token=fb81bb1a-bd01-4730-b1df-27239dcb232b',
//   },
//   {
//     id: '11',
//     title: 'Woman T-Shirt',
//     imageURL:
//       'https://firebasestorage.googleapis.com/v0/b/app-shoes-6fd12.appspot.com/o/ic_woman_tshirt.png?alt=media&token=038bc741-209d-452f-8261-35db3f557163',
//   },
//   {
//     id: '12',
//     title: 'Skirt',
//     imageURL:
//       'https://firebasestorage.googleapis.com/v0/b/app-shoes-6fd12.appspot.com/o/ic_shirt.png?alt=media&token=9464c2f1-34c9-474b-b34d-25ccb35675aa',
//   },
// ];
