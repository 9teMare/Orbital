import React, { useState, useEffect} from 'react'
import {Text, View, StyleSheet, Image, Dimensions, ActivityIndicator} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

export default function Skin() {
    const patchNote = "https://orbital-riot-api.herokuapp.com/patchNote"
    const skinArr = []
    const skinNameArr = []
    const [skin, setSkin] = useState([])
    const [skinName, setSkinName] = useState([])
    const [isLoading, setLoader] = useState(true)
    
    const getNewSkin = async () => {
        let isMounted = true
        const patchNoteResponse = await fetch(patchNote, {"method": "GET"})
        const patchNoteResponded = await patchNoteResponse.json()
        if (isMounted) {
            for (var i = 0; i < patchNoteResponded["skins"]["num"].length; i ++) {
                skinArr.push(patchNoteResponded["skins"]["num"][i])
                skinNameArr.push(patchNoteResponded["skins"]["name"][i])
            }
            setSkin(skinArr)
            setSkinName(skinNameArr)
            setLoader(false)
        }
        return () => { isMounted = false }    
    }

    const skinIdArr = []

    for (var i = 0; i < skin.length; i ++) {
        skinIdArr[i] = i
    }
    
    const displaySkins = () => skinIdArr.map(index => (
        <View key={index}>
            <View style={styles.skinWrap}>
                <Image source={{uri: `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${skin[index]}.jpg`}} 
                    style={styles.skins}/>
                <Text style={styles.skinName}>{skinName[index]}</Text>
            </View>
        </View>
    ))

    useEffect(() => {
        getNewSkin()
    }, []);

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
        <View>
            <ScrollView>
                {displaySkins()}
            </ScrollView> 
        </View>
    )
}

const {width, height} = Dimensions.get("window")

const styles = StyleSheet.create({
    skins: {
        marginTop: 20,
        alignSelf: 'center',
        height: height/3,
        width: width - 30,
        borderWidth: 3, 
        borderColor: '#000000c0'
      },
      skinName: {
        alignSelf: 'center',
        fontSize: 21,
        marginTop: 5,
        marginBottom: 10
      },
      skinWrap: {
        backgroundColor:"white", 
        marginBottom: 10,
        elevation: 3
      }
})

