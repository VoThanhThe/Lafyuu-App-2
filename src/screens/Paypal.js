import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import WebView from 'react-native-webview'
import { useNavigation } from '@react-navigation/native'

const Paypal = () => {
    const navigation = useNavigation()
    const [initalData, setInitalData] = useState({
        accessToken: null,
        approvalUrl: null,
        paymentId: null
    })

    componentDidMount= () => {
        const dataDetail = {
            "intent": "sale",
            "payer": {
                payment_method: "paypal",
            },
            "transactions": [{
                "amount": {
                    "total": "0.01",
                    "currency": "USD",
                    "details": {
                        "subtotal": "0.01",
                        "tax": "0",
                        "shipping": "0",
                        "handling_fee": "0",
                        "shipping_discount": "0",
                        "insurance": "0"
                    }
                }
            }],
            "redirect_urls": {
                "return_url": "https://example.com",
                "cancel_url": "https://example.com",
            }
        }

        fetch("https://api-m.sandbox.paypal.com/v1/oauth2/token",
            {
                method: "POST",
                headers: {
                    "Content-Type": 'application/x-www-form-urlencoded',
                    "Authorization": 'Bearer A21AAKL88jegW0O0YbJu_CHWwIjS46z3UhTdBdWXDoLKtXIUSV2_YSrelhWSbffZzCggeN548H2rQ0B0iBtUFS303Xa1PM3UA'
                },
                body: 'grant_type=client_credentials'
            }
        )
            .then(res => res.json())
            .then(response => {
                console.log("response: ", response);
                setInitalData({
                    accessToken: response.access_token
                })

                fetch('https://api.sandbox.paypal.com/v1/payments/payment',
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${response.access_token}`
                        },
                        body: JSON.stringify(dataDetail)
                    }
                )
                    .then(res => res.json())
                    .then(response => {
                        console.log("response: ", response);
                        const { id, links } = response
                        const approvalUrl = links.find(data => data.rel == "approval_url")
                        console.log("approvalUrl: ", approvalUrl);
                        setInitalData({
                            paymentId: id,
                            approvalUrl: approvalUrl.href
                        })
                    }).catch(err => {
                        console.log({ ...err })
                    })
            }).catch(err => {
                console.log({ ...err })
            })
    }

    _onNavigationStateChange = (webViewState) => {
        console.log("WebViewState", webViewState);
        if (webViewState.url.includes("http://example.com")) {
            setInitalData({
                approvalUrl: null,
            })
            const { PayerID, paymentId } = webViewState.url
            fetch(`https://api.sandbox.paypal.com/v1/payments/payment/${paymentId}/execute`, {
                method: 'POST',
                body: { payer_id: PayerID },

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${initalData.accessToken}`
                }
            })
                .then(res => res.json())
                .then(response => {
                    console.log("res: ", response);
                    if(response.name == "INVALID_RESOURCE_ID") {
                        alert("Payment failed. Please try again")
                        setInitalData({
                            approvalUrl: null,
                        })
                        navigation.pop()
                    }
                }).catch(err => {
                    console.log({ ...err })
                })
        }
    }
    const {approvalUrl} = this.initalData;
    return (
        <View style={{flex: 1}}>
            <Text>Paypal</Text>
            <TouchableOpacity style = {{padding: 20, backgroundColor: "green"}} 
            onPress={() => {
                checkout()
            }}>
                <Text>Thanh Toan</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Paypal

const styles = StyleSheet.create({})