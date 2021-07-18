import React, { useState, Component } from 'react'
import { View, Text, StatusBar, StyleSheet, ActivityIndicator } from 'react-native'
import PagerView from 'react-native-pager-view';
import { WebView } from 'react-native-webview';

export default function Feedback() {
    return (
        // <View>
        //     <StatusBar/>
        //     <Text> Favourite </Text>
        // </View>
        <View style={{ flex: 1 }}>
            <WebView
                source={{ uri: 'https://docs.google.com/forms/d/e/1FAIpQLScOV8aUyHunDyZcF0xTzBLaDqQmrGkM8G6ZOVpeUxzmKGl2TA/viewform?usp=sf_link' }}
                style={{flex: 1}}
            />
        </View>
    )
}