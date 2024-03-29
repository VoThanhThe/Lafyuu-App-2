import { StyleSheet, Text, View, Alert, TextInput, FlatList, TouchableOpacity, ScrollView, Button } from 'react-native'
import React, { useState, useEffect } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon1 from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { SelectList } from 'react-native-dropdown-select-list'
import ItemGengerExplore from '../item_screen/ItemGengerExplore'
import AxiosIntance from '../ultil/AxiosIntance';
import LoadingScreen from './LoadingScreen';
import ItemSearch from '../item_screen/ItemSearch'
import Voice from '@react-native-voice/voice';

const Search = (props) => {
    const { navigation, route } = props;
    const [dataProduct, setDataProduct] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [inputValue, setInputValue] = useState("");
    const [isRecording, setIsRecording] = useState(false);
    const [result, setResult] = useState("");
    const [error, setError] = useState('');

    useEffect(() => {
        Voice.onSpeechResults = onSpeechResults;
        Voice.onSpeechEnd = onSpeechEnd;
    
        return () => {
          Voice.destroy().then(Voice.removeAllListeners);
        };
      }, []);
    
      const startRecording = async () => {
        try {
          setIsRecording(true);
          await Voice.start('en-US');
        } catch (error) {
          console.error(error);
        }
      };
    
      const stopRecording = async () => {
        try {
          setIsRecording(false);
          await Voice.stop();
        } catch (error) {
          console.error(error);
        }
      };
    
      const handleToggleRecording = () => {
        if (isRecording) {
          stopRecording();
        } else {
          startRecording();
        }
      };
    
      const onSpeechResults = (e) => {
        // Xử lý kết quả nhận dạng giọng nói ở đây
        setInputValue(e.value[0]);
      };
    
      const onSpeechEnd = () => {
        // Bắt sự kiện khi ghi âm hoàn thành
        setIsRecording(false); // Tắt trạng thái ghi âm sau khi hoàn thành
      };

    const handleInputChange = (text) => {
        setInputValue(text);
    };

    const handleClearInput = () => {
        // Xóa giá trị của TextInput bằng cách đặt giá trị cho biến trạng thái về rỗng
        setInputValue('');
        console.log("Input: ", inputValue)
    };
    console.log("Input: ", inputValue)
    // http://localhost:3000/api/product/search/name?keyword=nike&sort=-1
    useEffect(() => {
        if (inputValue.length > 0) {
            countDownSearch();
        } else if (inputValue.length == 0) {
            setDataProduct([]);
        }
        return () => {
        }
    }, [inputValue]);

    const search = async () => {
        //http://localhost:3000/api/product/search/name?keyword=nike
        const response = await AxiosIntance().get("/api/product/search/name?keyword=" + inputValue + "&sort=" + 1);
        if (response.returnData.error == false) {
            setDataProduct(response.products);
            setIsLoading(false);
        } else {
            console.log("Lấy dữ liệu thất bại");
        }
    }
    const onSearch = async () => {
        navigation.navigate("SearchResult", { search: inputValue });
    }

    let timeOut = null;

    const countDownSearch = () => {
        if (timeOut) {
            clearTimeout(timeOut);
        }
        timeOut = setTimeout(() => {
            search();
        }, 0);
    }



    return (
        <View style={styles.container}>
            {/* Start Header */}
            <View style={styles.groupHeader}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" color="#9098B1" size={20} />
                </TouchableOpacity>
                <View style={styles.inputHeader}>
                    <TextInput
                        style={styles.input}
                        placeholder="Search Product"
                        onChangeText={handleInputChange}
                        value={inputValue}
                        autoFocus={true} />
                    <TouchableOpacity onPress={onSearch} style={styles.icon} >
                        <Icon name="search" color="#40BFFF" size={20} />
                    </TouchableOpacity>
                    {
                        inputValue.length == 0 ?
                            (
                                <TouchableOpacity style={{ position: 'absolute', top: 13, right: 18, display: 'none' }}>
                                    <Ionicons name="close" color="#9098B1" size={20} />
                                </TouchableOpacity>
                            ) :
                            (
                                <TouchableOpacity onPress={handleClearInput} style={{ position: 'absolute', top: 13, right: 18, display: 'flex' }}>
                                    <Ionicons name="close" color="#9098B1" size={20} />
                                </TouchableOpacity>
                            )
                    }
                </View>
                <TouchableOpacity onPress={handleToggleRecording}>
                    {isRecording ? (
                        <Ionicons name="mic" color="red" size={24} />
                    ) : (
                        <Ionicons name="mic-outline" color="#9098B1" size={24} />
                    )}
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={isRecording ? stopRecodeing : startRecodeing}>
                <Ionicons name="mic-outline" color={isRecording ? 'red' : "#9098B1"} size={50} />
            </TouchableOpacity> */}
            </View>
            {/* End Header */}
            <View style={{ paddingHorizontal: 16 }}>
                {/* Start Result */}
                <View>
                    <FlatList
                        style={{ marginVertical: 12 }}
                        data={dataProduct}
                        renderItem={({ item }) => <ItemSearch data={item} navigation={navigation} />}
                        keyExtractor={item => item._id}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
                {/* End Result */}
            </View>
        </View >
    )
}

export default Search

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
    icon: {
        position: 'absolute',
        top: 13,
        left: 18
    },
    input: {
        width: 290,
        height: 46,
        borderWidth: 1,
        borderColor: '#EBF0FF',
        backgroundColor: "#ffffff",
        borderRadius: 5,
        paddingLeft: 50,
        paddingRight: 50,
        fontSize: 14,
        fontWeight: '700',
        color: '#223263',
        lineHeight: 18,
    },
    inputHeader: {
        position: 'relative',

    },

    title: {
        fontSize: 14,
        fontWeight: '700',
        color: '#223263',
        lineHeight: 21.6,
    },
})