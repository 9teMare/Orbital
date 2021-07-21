import React, { useState, useEffect} from 'react'
import {Text, View, StyleSheet, Image, Dimensions} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

export default function Skin() {
    const patchNote = "https://orbital-riot-api.herokuapp.com/patchNote"
    const skinArr = []
    const skinNameArr = []
    const [skin, setSkin] = useState([])
    const [skinName, setSkinName] = useState([])
    
    useEffect(() => {
        let isMounted = true
        fetch(patchNote, {
            "method": "GET"
        })
        .then((response) => response.json())
        .then((response) => {
            if (isMounted) {
                for (var i = 0; i < response["skins"]["num"].length; i ++) {
                    skinArr.push(response["skins"]["num"][i])
                    skinNameArr.push(response["skins"]["name"][i])
                }
                setSkin(skinArr)
                setSkinName(skinNameArr)
            }
            return () => { isMounted = false }    
        })
        .catch((error) => console.error(error))
        }, [])

    const skinIdArr = []

    for (var i = 0; i < skin.length; i ++) {
        skinIdArr[i] = i
    }

    const displaySkins = skinIdArr.map(index => (
        <View key={index}>
            <View style={styles.skinWrap}>
                <Image source={{uri: `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${skin[index]}.jpg`}} 
                    style={styles.skins}/>
                <Text style={styles.skinName}>{skinName[index]}</Text>
            </View>
        </View>
    ))

    return (
        <ScrollView>
            {displaySkins}
        </ScrollView>  
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
        marginTop: 10,
        elevation: 3
      }
})

