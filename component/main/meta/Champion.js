import React, { useState, useEffect, version } from 'react'
import {Text, View, StyleSheet, Image, Dimensions, ActivityIndicator} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import WebView from 'react-native-webview'
import CollapsibleView from "@eliav2/react-native-collapsible-view"
import  MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export default function Champion() {
    const patchNote = "https://orbital-riot-api.herokuapp.com/patchNote"
    const nameArr = []
    const [name, setName] = useState([])
    const skillArr = []
    const [skill, setSkill] = useState([])
    const descriptionArr = []
    const [description, setDescription] = useState([])

    const combinedArr = []
    const [combined, setCombined] = useState([])
    const [isLoading, setLoader] = useState(true)

   const getChampionUpdates = async() =>{
        let isMounted = true
        const patchNoteResponse = await fetch(patchNote, {"method": "GET"})
        const patchNoteResponded = await patchNoteResponse.json()

        if (isMounted) {
            for (var i in patchNoteResponded["champions"]) {
                nameArr.push(i)
            }
            setName(nameArr)

            var v = 0
            for (var i in patchNoteResponded["champions"]) {
                combinedArr.push([])

                for (var j in patchNoteResponded["champions"][i]["updates"]) {
                    combinedArr[v].push(<Text style={styles.skill} key={j+100}>{patchNoteResponded["champions"][i]["updates"][j]["skill"]}</Text>)
                    // combinedArr[v].push(<Text style={styles.description} key={j}>{response["champions"][i]["updates"][j]["description"]}</Text>)
                    combinedArr[v].push(<Text style={styles.description} key={j+500}>{patchNoteResponded["champions"][i]["updates"][j]["description"]}</Text>)
                }
                v += 1
            }
            setCombined(combinedArr)
            setLoader(false)
        }   
        return () => { isMounted = false }    
   }

    const championSectionArr = []

    for (var i = 0; i < name.length; i ++) {
        championSectionArr[i] = i;
    }

    const collapsibleTitle = (index) => {
        return (
            <View style={{flexWrap: 'wrap', flexDirection: 'row', height: 70}}>
                <Image 
                    source={{uri: `http://ddragon.leagueoflegends.com/cdn/11.15.1/img/champion/${name[index]}.png`}}
                    style= {[styles.image]}
                />
                <Text style={styles.name}>{name[index]}</Text>
                <MaterialCommunityIcons name="chevron-down" size={30} style={{position: 'absolute', marginLeft: 140, marginTop: 20}}/>
            </View>
        )
    }

    const championSection = () => championSectionArr.map(index => (
        <CollapsibleView
            title={collapsibleTitle(index)} 
            style={{backgroundColor: 'white', width: width, marginLeft: 0, borderColor: 'white', elevation: 1}}
            noArrow={true}
            key={index}
        >
            <View style={styles.championSection}> 
                <View style={styles.skillWrap}>
                    {combined[index]}
                </View>
            </View>
        </CollapsibleView>  
    ))

    useEffect(() => {
        getChampionUpdates()
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
        <View>
            <ScrollView style={styles.ScrollView}>
                {championSection()}
            </ScrollView>
        </View>
        
    )
}

const {width, height} = Dimensions.get("window")

const styles = StyleSheet.create({
    ScrollView: {
        //alignSelf: 'center',
        //marginBottom: 50
    },
    championSection: {
        width: width,
        //alignItems: 'center',
        //backgroundColor:"white", 
        marginBottom: 10,
        minHeight: height/8,
        //elevation: 3
    },
    image: {
        width: width/6, 
        height: width/6, 
        marginLeft: -160,
        borderRadius: width/6,
        borderColor: '#232323',
        borderWidth: 2,
        marginTop: 5
    },
    name: {
        position: 'absolute',
        fontSize: 20,
        textAlign: 'left',
        marginTop: 20,
        fontWeight: 'bold',
        marginLeft: -70
    },
    skillWrap: {
        flex: 1,
        marginTop: 10,
        marginBottom: 10
    },
    skill: {
        fontSize: 20,
        marginTop: 10,
        marginBottom: 1,
        fontWeight: 'bold',
        marginLeft: 10
    },
    description: {
        fontSize: 15,
        marginTop: 5,
        lineHeight: 25, 
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
    }
})