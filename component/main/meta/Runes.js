import React, { useState, useEffect} from 'react'
import {Text, View, StyleSheet, Image, Dimensions, ActivityIndicator} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

export default function Runes() {
    const patchNote = "https://orbital-riot-api.herokuapp.com/patchNote"
    const [rune, setRune] = useState([])
    const [isLoading, setLoader] = useState(true)

    const getRunesUpdates = async() => {
        let isMounted = true
        const patchNoteResponse = await fetch(patchNote, {"method": "GET"})
        const patchNoteResponded = await patchNoteResponse.json()
        if (isMounted) {
            setRune(patchNoteResponded["rune"]["updates"])
            setLoader(false)
        }
        return () => { isMounted = false }    
    }

    const runeIndexArr = []
    for (var i = 0; i < rune.length; i ++) {
        runeIndexArr[i] = i
    }

    const updates = () => runeIndexArr.map(index => (
        <View key={index}>
            <Text style={styles.text} >{rune[index]}</Text>
        </View>
    ))

    useEffect(() => {
        getRunesUpdates()
    }, [])

    if (isLoading) {
        return (
            <View style={{height: width / 3, width: width / 2, backgroundColor: '#b8bab9c0', alignSelf: 'center', marginTop: height / 3, borderRadius: 10}}>
                <ActivityIndicator size="large" color="grey" style={{alignSelf: 'center', marginTop: 20}}/>
                <Text style={{fontSize: 20, fontWeight: 'bold', alignSelf: 'center', marginTop: 20, color: 'grey'}}> 
                    Loading...
                </Text>
            </View>
        )
    }   

    return (
        <ScrollView>
            {updates()}
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
