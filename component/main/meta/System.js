import React, { useState, useEffect} from 'react'
import {Text, View, Dimensions, StyleSheet, ActivityIndicator} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

export default function System() {
    const patchNote = "https://orbital-riot-api.herokuapp.com/patchNote"
    const [system, setSystem] = useState([])
    const [isLoading, setLoader] = useState(true)

    const getSystemUpdates = async() => {
        let isMounted = true
        const patchNoteResponse = await fetch(patchNote, {"method": "GET"})
        const patchNoteResponded = await patchNoteResponse.json()
        if (isMounted) {
            setSystem(patchNoteResponded["system"]["bugfix"])
            setLoader(false)
        }
        return () => { isMounted = false }    
    }

    const systemIndexArr = []
    for (var i = 0; i < system.length; i ++) {
        systemIndexArr[i] = i
    }

    const bugfix = () => systemIndexArr.map(index => (
        <View key={index} style={styles.lineView}>
            <Text style={styles.line}>· {system[index]}</Text>
        </View>
    ))

    useEffect(() => {
        getSystemUpdates()
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
        <ScrollView style={styles.ScrollView}>
            <Text style={styles.title}>Bugfixes: </Text>
            {bugfix()}
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
