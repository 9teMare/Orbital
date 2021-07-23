import React, { useState, useEffect} from 'react'
import {Text, View, StyleSheet, Image, Dimensions, ActivityIndicator} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

export default function Mechanism() {
    const patchNote = "https://orbital-riot-api.herokuapp.com/patchNote"
    const [mechanism, setMechanism] = useState([])
    const [isLoading, setLoader] = useState(true)

    const getMechanismUpdates = async() => {
        let isMounted = true
        const patchNoteResponse = await fetch(patchNote, {"method": "GET"})
        const patchNoteResponded = await patchNoteResponse.json()
        if (isMounted) {
            setMechanism(patchNoteResponded["mechanism"]["updates"])
            setLoader(false)
        }
        return () => { isMounted = false }    
    }

    const mechanismIndexArr = []
    for (var i = 0; i < mechanism.length; i ++) {
        mechanismIndexArr[i] = i
    }

    const updates = () => mechanismIndexArr.map(index => (
        <View key={index}>
            <Text style={styles.text} >{mechanism[index]}</Text>
        </View>
    ))

    useEffect(() => {
        getMechanismUpdates()
    }, [])

    if (isLoading) {
        return (
            <View style={{height: width / 3, width: width / 2, backgroundColor: '#b8bab9', alignSelf: 'center', marginTop: height / 3, borderRadius: 10}}>
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
        alignSelf: 'center',
    }
})