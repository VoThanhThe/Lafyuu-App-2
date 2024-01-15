import { StyleSheet, Text, View, ScrollView, TextInput, Image, FlatList, Button, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'

const Notification_Activity = (props) => {
    const { navigation } = props;
    return (
        <View style={styles.container}>
            {/* Start Header */}
            <View style={styles.groupHeader}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <Ionicons name="chevron-back" color="#9098B1" size={20} />
                    </TouchableOpacity>
                    <Text style={styles.textHeader}>Activity</Text>
                </View>

            </View>
            {/* End Header */}

            {/* Item 1 */}
            <TouchableOpacity>
                <View style={styles.groupItem}>
                    <Ionicons name="md-swap-vertical" color="#40BFFF" size={18} />
                    <View style={styles.groupTextRight}>
                        <Text style={styles.textTitle}>Transaction Nike Air Zoom Product</Text>
                        <Text style={styles.textContent}>Culpa cillum consectetur labore nulla nulla magna irure. Id veniam culpa officia aute dolor amet deserunt ex proident commodo</Text>
                        <Text style={styles.textDate}>April 30, 2014 1:01 PM</Text>
                    </View>
                </View>
            </TouchableOpacity>
            {/* Item 1 */}

            {/* Item 2 */}
            <TouchableOpacity>
                <View style={styles.groupItem}>
                    <Ionicons name="md-swap-vertical" color="#40BFFF" size={18} />
                    <View style={styles.groupTextRight}>
                        <Text style={styles.textTitle}>Transaction Nike Air Zoom Pegasus 36 Miami</Text>
                        <Text style={styles.textContent}>Culpa cillum consectetur labore nulla nulla magna irure. Id veniam culpa officia aute dolor</Text>
                        <Text style={styles.textDate}>April 30, 2014 1:01 PM</Text>
                    </View>
                </View>
            </TouchableOpacity>
            {/* Item 2 */}

            {/* Item 3 */}
            <TouchableOpacity>
                <View style={styles.groupItem}>
                    <Ionicons name="md-swap-vertical" color="#40BFFF" size={18} />
                    <View style={styles.groupTextRight}>
                        <Text style={styles.textTitle}>Transaction Nike Air Max</Text>
                        <Text style={styles.textContent}>Culpa cillum consectetur labore nulla nulla magna irure. Id veniam culpa officia aute dolor amet deserunt ex proident commodo</Text>
                        <Text style={styles.textDate}>April 30, 2014 1:01 PM</Text>
                    </View>
                </View>
            </TouchableOpacity>
            {/* Item 3 */}

        </View >
    )
}

export default Notification_Activity

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
    groupTextRight: {
        marginStart: 15
    },
    groupItem: {
        flexDirection: 'row',
        padding: 16
    },
    textTitle: {
        fontSize: 14,
        fontWeight: '700',
        lineHeight: 21,
        color: '#223263',
        textAlign: 'left',
        letterSpacing: 0.5
    },
    textContent: {
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 21.6,
        color: '#9098B1',
        textAlign: 'left',
        letterSpacing: 0.5,
        marginTop: 8
    },
    textDate: {
        fontSize: 10,
        fontWeight: '400',
        lineHeight: 15,
        color: '#223263',
        textAlign: 'left',
        letterSpacing: 0.5,
        marginTop: 8
    },
    icon: {
        transform: [{ rotate: '45deg' }]
    }
})