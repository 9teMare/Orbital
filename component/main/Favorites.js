import React, { useState } from 'react'
import { View, Text, StatusBar } from 'react-native'

export default function Favorites() {

    const [cc, setCC] = useState('')
   
    const getCC = async () => {
        const champOtherInfo = "https://orbital-riot-api.herokuapp.com/champOtherInfo"
        await fetch(champOtherInfo, {
            "method": "GET"
        })
        .then(response => response.json())
        .then(response => {
            setCC(response.Aatrox.CC.CCtypes)
        })
    }

    getCC();

    return (
        <View>
            <StatusBar/>
            <Text> {cc} </Text>
        </View>
    )
}