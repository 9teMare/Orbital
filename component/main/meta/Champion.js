import React, { useState, useEffect, version } from 'react'
import {Text, View, StyleSheet, Image, Dimensions, FlatList} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import WebView from 'react-native-webview'

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

    const testArray = (arr) => {
        if (Array.isArray(arr)) return "true"
        return "false"
    }

    useEffect(() => {
        let isMounted = true
        fetch(patchNote, {
            "method": "GET"
        })
        .then((response) => response.json())
        .then((response) => {
            if (isMounted) {
                for (var i in response["champions"]) {
                    nameArr.push(i)
                    // var temp = []
                    // for (var j in response["champions"][i]["updates"]) {
                    //     temp.push([<Text style={styles.skill} key={j}>{response["champions"][i]["updates"][j]["skill"]}</Text>])
                    // }
                    // skillArr.push(temp)
                    // setSkill(skillArr)
                    
                    // var temp2 = []
                    // for (var k in response["champions"][i]["updates"]) {
                    //     temp2.push([<Text style={styles.skill} key={k}>{response["champions"][i]["updates"][k]["description"]}</Text>])
                    // }
                    // descriptionArr.push(temp2)
                    // setDescription(descriptionArr)
                }
                setName(nameArr)

                var v = 0
                for (var i in response["champions"]) {
                    combinedArr.push([])

                    for (var j in response["champions"][i]["updates"]) {
                        combinedArr[v].push(<Text style={styles.skill} key={j}>{response["champions"][i]["updates"][j]["skill"]}</Text>)
                        // combinedArr[v].push(<Text style={styles.description} key={j}>{response["champions"][i]["updates"][j]["description"]}</Text>)
                        combinedArr[v].push(<Text style={styles.description} key={j}>{response["champions"][i]["updates"][j]["description"]}</Text>)
                    }
                    v += 1
                }

                setCombined(combinedArr)
            }   
            return () => { isMounted = false }    
        })
        .catch((error) => console.error(error))
        }, [])

    const championSectionArr = []

    for (var i = 0; i < name.length; i ++) {
        championSectionArr[i] = i;
    }

    const championSection = championSectionArr.map(index => (
        <View key={index} style={styles.championSection}>
            <Image 
                source={{uri: `http://ddragon.leagueoflegends.com/cdn/11.15.1/img/champion/${name[index]}.png`}}
                style= {[styles.image]}
            />
            <Text style={styles.name}>{name[index]}</Text>
            <View style={styles.skillWrap}>
                {combined[index]}
            </View>
        </View>
    ))

    return (
        <View>
            <ScrollView style={styles.ScrollView}>
                {championSection}
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
        backgroundColor:"white", 
        marginTop: 10,
        minHeight: height/8,
        elevation: 3
    },
    image: {
        position: 'absolute',
        width: width/6, 
        height: width/6, 
        marginLeft: 20,
        marginTop: 20,
    },
    name: {
        fontSize: 25,
        textAlign: 'left',
        marginLeft: width/6 + 40,
        marginTop: 15,
        fontWeight: 'bold'
    },
    skillWrap: {
        flex: 1,
        marginLeft: width/6 + 40,
        marginBottom: 10
    },
    skill: {
        fontSize: 20,
        marginTop: 10,
        marginBottom: 1,
        fontWeight: 'bold'
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