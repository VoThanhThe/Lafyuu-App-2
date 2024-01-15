import { StyleSheet, Text, View, ScrollView, Pressable, TouchableOpacity, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AxiosIntance from '../ultil/AxiosIntance'
import { useSelector } from 'react-redux'
import ItemAddress from '../item_screen/ItemAddress'
import LoadingScreen from './LoadingScreen'

const Address = (props) => {
  const { navigation } = props;
  const [dataAdress, setDataAdress] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const user = useSelector(state => state.UserReducer.user);
  const getAddress = async () => {
    try {
      const response = await AxiosIntance().get('/api/addresses/get-all-addresses/?user_id=' + user._id);
      console.log("Address: ", response)
      if (response.returnData.error === false) {
        setDataAdress(response.addresses);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data address :", error);
    }

  }
  useEffect(() => {

    getAddress()

    return () => {
    }
  }, [])

  const handleRefresh = () => {
    setRefreshing(true);
    getAddress()
    setRefreshing(false);
  };
  return (
    <View style={styles.container}>
      {/* Start Header */}
      <View style={styles.groupHeader}>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => { navigation.navigate('AccountStack') }}>
            <Ionicons name="chevron-back" color="#9098B1" size={20} />
          </TouchableOpacity>
          <Text style={styles.textHeader}>Address</Text>
        </View>

      </View>
      {/* End Header */}
      <View style={{ flex: 1 }}>
        {
          isLoading ? (<LoadingScreen />) :
            (
              <View style={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 71 }}>
                <FlatList showsVerticalScrollIndicator={false} style = {{height: '100%'}}
                  data={dataAdress}
                  renderItem={({ item }) => <ItemAddress data={item} />}
                  keyExtractor={item => item._id}
                  onRefresh={handleRefresh}
                  refreshing={refreshing} />

              </View>
            )
        }
      </View>
      <TouchableOpacity style={styles.buttonAdd} onPress={() => { navigation.navigate('Add_Address') }}>
        <Text style={styles.textButton}>Add Address</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Address

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
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 21,
    color: '#223263',
    marginBottom: 12
  },
  textInput: {
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 21.6,
    color: '#9098B1',
    textAlign: 'left',
  },
  input: {
    width: '100%',
    height: 48,
    paddingHorizontal: 16,
    paddingVertical: 13,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#EBF0FF',
    marginBottom: 24,

  },
  icon: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  inputHeader: {
    position: 'relative',
    marginTop: 8
  },

  viewItem: {
    padding: 16,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#EBF0FF",
    marginBottom: 16
  },
  textTitle: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 21,
    color: '#223263',
    textAlign: 'left',
  },
  textContent: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 21.6,
    color: '#9098B1',
    textAlign: 'left',
    letterSpacing: 0.5,
    opacity: 0.5,
    marginTop: 16
  },
  textPhoneNumber: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 21.6,
    color: '#9098B1',
    textAlign: 'left',
    letterSpacing: 0.5,
    opacity: 0.5,
    marginTop: 16
  },

  groupButton: {
    flexDirection: 'row',
    marginTop: 16,
    alignItems: 'center'
  },
  button: {
    width: 77,
    height: 57,
    borderRadius: 5,
    backgroundColor: '#40BFFF',
    marginEnd: 29.25
  },
  textButton: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
    letterSpacing: 0.5,
    lineHeight: 57,
  },
  buttonAdd: {
    height: 57,
    borderRadius: 5,
    backgroundColor: '#40BFFF',
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16
  },
})