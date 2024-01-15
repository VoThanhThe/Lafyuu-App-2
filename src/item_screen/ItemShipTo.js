import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native'
import Reac, { useState } from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AxiosIntance from '../ultil/AxiosIntance';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';

const ItemShipTo = (props) => {
  const navigation = useNavigation();
  const { data, borderColor, onPress, totalPrice } = props;
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const onDeleteAddress = async () => {
    try {
      const response = await AxiosIntance().post('/api/addresses/delete-address/?id=' + data._id);
      if (response.returnData.error === false) {
        navigation.push("ShipTo", { totalPrice: totalPrice });
      }

    } catch (error) {
      console.error("Error fetching data address :", error);
    }
  }

  const onEditAddress = () => {
    navigation.navigate("Edit_Address", { data: data });
  }
  return (
    <TouchableOpacity style={[styles.viewItem, { borderColor: borderColor }]} onPress={onPress}>
      <Text style={styles.textTitle}>{data.receiver_name}</Text>
      <Text style={styles.textContent}>{data.address}</Text>
      <Text style={styles.textPhoneNumber}>{data.phone}</Text>
      <View style={styles.groupButton}>
        <TouchableOpacity style={styles.button} onPress={onEditAddress}>
          <Text style={styles.textButton}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ padding: 10 }} onPress={toggleModal}>
          <FontAwesome name="trash-o" color="#223263" size={20} />
        </TouchableOpacity>
        <Modal isVisible={isModalVisible} animationIn="slideInUp" animationOut="slideOutDown">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={{ backgroundColor: "#ffffff", justifyContent: "center", alignItems: 'center', paddingHorizontal: 16 }}>
                <Ionicons name='alert-circle-sharp' size={100} color={"#FB7181"} />
                <Text style={{ fontSize: 26, fontWeight: "700", color: "#223263", marginTop: 16 }}>Confirmation</Text>
                <Text style={{ fontSize: 14, fontWeight: "400", color: "#9098B1", marginTop: 8, textAlign: "center" }}>Are you sure wanna delete address</Text>
                <TouchableOpacity
                  onPress={() => { onDeleteAddress() }}
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
      </View>
    </TouchableOpacity>

  )
}

export default ItemShipTo

const styles = StyleSheet.create({
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