import { StyleSheet, Text, View, Image, TextInput, FlatList, Pressable, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useSelector } from 'react-redux';
import AxiosIntance from '../ultil/AxiosIntance';
import LoadingScreen from './LoadingScreen'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'

const Profile = (props) => {
    const { navigation } = props;
    const user = useSelector(state => state.UserReducer.user);
    const [dataUser, setDataUser] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [imageProfile, setImageProfile] = useState('');
    const avatarProfileDefault = 'https://firebasestorage.googleapis.com/v0/b/app-shoes-6fd12.appspot.com/o/undraw_Male_avatar_g98d.png?alt=media&token=d645bc28-46c6-43bb-8cdb-749cb6019c41'

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await AxiosIntance().get('/api/user/get-user?user_id=' + user._id);
                console.log("Profile: ", response)
                if (response.returnData.error === false) {
                    setDataUser(response.user);
                }
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching data user :", error);
            }

        }
        getUser()

        return () => {
        }
    }, [])

    return (
        <View style={styles.container}>
            {/* Start Header */}
            <View style={styles.groupHeader}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => { navigation.navigate('AccountStack') }}>
                        <Ionicons name="chevron-back" color="#9098B1" size={20} />
                    </TouchableOpacity>
                    <Text style={styles.textHeader}>Profile</Text>
                </View>

            </View>
            {/* End Header */}
            {
                isLoading ? (<LoadingScreen />) :
                    (
                        <View style={{ padding: 19 }}>
                            <View style={styles.viewFlex_1}>
                                <TouchableOpacity>
                                    <Image style={styles.image} source={{ uri: dataUser.profile.avatar == "" ? avatarProfileDefault : dataUser.profile.avatar }} />
                                    <Ionicons style = {{position: 'absolute', right: 10, bottom: 0}} name="camera" color="#40BFFF" size={18} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { navigation.navigate('Change_Name', { name: dataUser.profile.name, user_id: dataUser._id }) }}>
                                    <View style={{ marginStart: 15 }}>
                                        <Text style={styles.textName}>{dataUser.profile.name}</Text>
                                        <Text style={styles.textEmail}>{dataUser.email}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={() => { navigation.navigate('Gender', { gender: dataUser.profile.gender, user_id: dataUser._id }) }}>
                                <View style={[styles.viewFlex, { paddingVertical: 19 }]}>
                                    <View style={styles.viewFlex_1}>
                                        <Ionicons name="female" color="#40BFFF" size={18} />
                                        <Text style={styles.textItem}>Gender</Text>
                                    </View>
                                    <View style={styles.viewFlex_1}>
                                        <Text style={styles.textNotify}>{dataUser.profile.gender}</Text>
                                        <Ionicons name="chevron-forward" color="#9098B1" size={20} />
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { navigation.navigate('BirthDay', { birthday: dataUser.profile.birthday, user_id: dataUser._id }) }}>
                                <View style={[styles.viewFlex, { paddingVertical: 19 }]}>
                                    <View style={styles.viewFlex_1}>
                                        <Ionicons name="calendar-sharp" color="#40BFFF" size={18} />
                                        <Text style={styles.textItem}>Birthday</Text>
                                    </View>
                                    <View style={styles.viewFlex_1}>
                                        <Text style={styles.textNotify}>{dataUser.profile.birthday}</Text>
                                        <Ionicons name="chevron-forward" color="#9098B1" size={20} />
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { navigation.navigate('Phone_Number', { phone: dataUser.profile.phone, user_id: dataUser._id }) }}>
                                <View style={[styles.viewFlex, { paddingVertical: 19 }]}>
                                    <View style={styles.viewFlex_1}>
                                        <Ionicons name="phone-portrait-outline" color="#40BFFF" size={18} />
                                        <Text style={styles.textItem}>Phone Number</Text>
                                    </View>
                                    <View style={styles.viewFlex_1}>
                                        <Text style={styles.textNotify}>{dataUser.profile.phone}</Text>
                                        <Ionicons name="chevron-forward" color="#9098B1" size={20} />
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { navigation.navigate('Change_Password') }}>
                                <View style={[styles.viewFlex, { paddingVertical: 19 }]}>
                                    <View style={styles.viewFlex_1}>
                                        <Ionicons name="lock-closed-outline" color="#40BFFF" size={18} />
                                        <Text style={styles.textItem}>Change Password</Text>
                                    </View>
                                    <View style={styles.viewFlex_1}>
                                        <Text style={styles.textNotify}>•••••••••••••••••</Text>
                                        <Ionicons name="chevron-forward" color="#9098B1" size={20} />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )
            }


        </View>
    )
}

export default Profile

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