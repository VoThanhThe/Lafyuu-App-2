import { Dimensions, SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Voice from '@react-native-voice/voice';

const ScreenWidth = Dimensions.get('window').width;
const NumberOfViews = 4;
const RedViewWidth = ScreenWidth / (NumberOfViews * 2);

const Status = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [result, setResult] = useState("");
    const [error, setError] = useState('');

    Voice.onSpeechStart = () => setIsRecording(true);
    Voice.onSpeechEnd = () => setIsRecording(false);
    Voice.onSpeechResults = (result) => setResult(result.value[0]);
    Voice.onSpeechError = (err) => setError(err.error);

    const startRecodeing = async () => {
        try {
            await Voice.start('en-US');
        } catch (error) {
            setError(error);
        }
    }

    const stopRecodeing = async () => {
        try {
            await Voice.stop();
        } catch (error) {
            setError(error);
        }
    }
    return (
        <SafeAreaView style = {{flex: 1, justifyContent: 'center', alignItems: "center"}}>
            <Text>Result:</Text>
            <Text>{result}</Text>
            <TouchableOpacity onPress={isRecording ? stopRecodeing : startRecodeing}>
                <Ionicons name="mic-outline" color={isRecording ? 'red' : "#9098B1"} size={50} />
            </TouchableOpacity>
            {/* <View style={{ width: '100%',flexDirection: 'row', alignItems: "center",paddingStart: 30, paddingEnd: 45 }}>
                <View>
                    <Ionicons name="add-circle" color="green" size={24} />
                </View>
                <View style={{ width: '25%', height: 2, backgroundColor: "red" }}></View>
                <View>
                    <Ionicons name="add-circle" color="green" size={24} />
                </View>
                <View style={{ width: '25%', height: 2, backgroundColor: "red" }}></View>
                <View>
                    <Ionicons name="add-circle" color="green" size={24} />
                </View>
                <View style={{ width: '25%', height: 2, backgroundColor: "red" }}></View>
                <View>
                    <Ionicons name="add-circle" color="green" size={24} />
                </View>
            </View>
            <View style = {{flexDirection: 'row', alignItems: 'center', justifyContent: "space-between", paddingHorizontal: 16}}>
                <Text>Packing</Text>
                <Text>Packing</Text>
                <Text>Packing</Text>
                <Text>Packing</Text>
            </View> */}
        </SafeAreaView>
    )
}

export default Status

const styles = StyleSheet.create({
    textChecking: {
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 21.6,
        color: '#9098B1',
        textAlign: 'center',
        marginTop: 12,
    },
})