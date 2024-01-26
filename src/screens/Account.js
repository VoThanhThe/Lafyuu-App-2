import { StyleSheet, Text, View, Image, TextInput, FlatList, Alert, ScrollView, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import { AppContext } from '../ultil/AppContext';
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../redux2/actions/UserAction'
import Modal from 'react-native-modal';

const Account = (props) => {
    const { navigation } = props;
    const { isLogin, setisLogin } = useContext(AppContext);
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const dispatch = useDispatch();
    const onLogout = () => {
        setisLogin(false);
        dispatch(logoutUser());
        handleLogout()
    }

    const handleLogout = async () => {
        try {
          await GoogleSignin.revokeAccess();
          await GoogleSignin.signOut();
          // Thực hiện các bước khác sau khi đăng xuất
        } catch (error) {
          console.log('Error during logout:', error);
        }
      };
    return (
        <View style={styles.container}>
            {/* Start Header */}
            <View style={styles.groupHeader}>
                <Text style={styles.header}>Account</Text>
            </View>
            {/* End Header */}
            <ScrollView showsHorizontalScrollIndicator={false}>
                <TouchableOpacity onPress={() => { navigation.navigate('Profile') }}>
                    <View style={{ padding: 16, flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome name="user-o" color="#40BFFF" size={20} />
                        <Text style={styles.text}>Profile</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { navigation.navigate('Order') }}>
                    <View style={{ padding: 16, flexDirection: 'row', alignItems: 'center' }}>
                        <Feather name="shopping-bag" color="#40BFFF" size={20} />
                        <Text style={styles.text}>Order</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { navigation.navigate('Address') }}>
                    <View style={{ padding: 16, flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="location-outline" color="#40BFFF" size={20} />
                        <Text style={styles.text}>Address</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleModal}>
                    <View style={{ padding: 16, flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialIcons name="logout" color="red" size={20} />
                        <Text style={styles.text}>Log out</Text>
                    </View>
                </TouchableOpacity>
                <Modal isVisible={isModalVisible} animationIn="slideInUp" animationOut="slideOutDown">
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <View style={{ backgroundColor: "#ffffff", justifyContent: "center", alignItems: 'center', paddingHorizontal: 16 }}>
                                <Ionicons name='alert-circle-sharp' size={100} color={"#FB7181"} />
                                <Text style={{ fontSize: 26, fontWeight: "700", color: "#223263", marginTop: 16 }}>Confirmation</Text>
                                <Text style={{ fontSize: 14, fontWeight: "400", color: "#9098B1", marginTop: 8, textAlign: "center" }}>Are you sure you want to log out of your account?</Text>
                                <TouchableOpacity
                                    onPress={() => { onLogout() }}
                                    style={{ backgroundColor: "#40BFFF", width: '100%', height: 57, borderRadius: 5, marginTop: 16 }}
                                >
                                    <Text style={{ fontSize: 18, fontWeight: "700", color: "#ffffff", lineHeight: 57, textAlign: "center", }}>Logout</Text>
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

            </ScrollView>
        </View>
    )
}

export default Account

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
    text: {
        fontSize: 12,
        fontWeight: '700',
        color: '#223263',
        lineHeight: 18,
        marginStart: 19
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