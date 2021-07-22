import React, { useState, useEffect} from 'react'
import {Text, View, StyleSheet, Image, Dimensions} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

export default function Runes() {
    const patchNote = "https://orbital-riot-api.herokuapp.com/patchNote"
    const [rune, setRune] = useState([])

    useEffect(() => {
        let isMounted = true
        fetch(patchNote, {
            "method": "GET"
        })
        .then(response => response.json())
        .then(response => {
            if (isMounted) {
                setRune(response["rune"]["updates"])
            }
            return () => { isMounted = false }    
        })
        .catch((error) => console.error(error))
    }, [])

    const runeIndexArr = []
    for (var i = 0; i < rune.length; i ++) {
        runeIndexArr[i] = i
    }

    const updates = runeIndexArr.map(index => (
        <View key={index}>
            <Text style={styles.text} >{rune[index]}</Text>
        </View>
    ))

    return (
        <ScrollView>
            {updates}
        </ScrollView>
    )
}

const {width, height} = Dimensions.get("window")

const styles = StyleSheet.create({
    text: {
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: height / 3,
        color: 'grey',
        alignSelf: 'center'
    }
})
