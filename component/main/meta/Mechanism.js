import React, { useState, useEffect} from 'react'
import {Text, View, StyleSheet, Image, Dimensions} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

export default function Mechanism() {
    const patchNote = "https://orbital-riot-api.herokuapp.com/patchNote"
    const [mechanism, setMechanism] = useState([])

    useEffect(() => {
        let isMounted = true
        fetch(patchNote, {
            "method": "GET"
        })
        .then(response => response.json())
        .then(response => {
            if (isMounted) {
                setMechanism(response["mechanism"]["updates"])
            }
            return () => { isMounted = false }    
        })
        .catch((error) => console.error(error))
    }, [])

    const mechanismIndexArr = []
    for (var i = 0; i < mechanism.length; i ++) {
        mechanismIndexArr[i] = i
    }

    const updates = mechanismIndexArr.map(index => (
        <View key={index}>
            <Text style={styles.text} >{mechanism[index]}</Text>
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
        alignSelf: 'center',
    }
})