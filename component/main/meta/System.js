import React, { useState, useEffect} from 'react'
import {Text, View, Dimensions, StyleSheet} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

export default function System() {
    const patchNote = "https://orbital-riot-api.herokuapp.com/patchNote"
    const [system, setSystem] = useState([])

    useEffect(() => {
        let isMounted = true
        fetch(patchNote, {
            "method": "GET"
        })
        .then(response => response.json())
        .then(response => {
            if (isMounted) {
                setSystem(response["system"]["bugfix"])
            }
            return () => { isMounted = false }    
        })
        .catch((error) => console.error(error))
    }, [])

    const systemIndexArr = []
    for (var i = 0; i < system.length; i ++) {
        systemIndexArr[i] = i
    }

    const bugfix = systemIndexArr.map(index => (
        <View key={index} style={styles.lineView}>
            <Text style={styles.line}>· {system[index]}</Text>
        </View>
    ))

    return (
        <ScrollView style={styles.ScrollView}>
            <Text style={styles.title}>Bugfixes: </Text>
            {bugfix}
        </ScrollView>
    )
}

const {width, height} = Dimensions.get("window")

const styles = StyleSheet.create({
    ScrollView: {
        backgroundColor:"white",
    }, 
    lineView: {
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        minHeight: height / 18
    },
    title: {
        marginTop: 10,
        marginLeft: 10,
        fontSize: 20,
        fontWeight: 'bold'
    },
    line: {
        fontSize: 15,
        lineHeight: 25
    }
})
