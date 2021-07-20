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

    useEffect(() => {
        let isMounted = true
        fetch(patchNote)
        .then((response) => response.json())
        .then((response) => {
            if (isMounted) {
                for (var i in response["champions"]) {
                    nameArr.push(i)

                    var temp = []
                    for (var j in response["champions"][i]["updates"]) {
                        temp.push([<Text style={styles.skill} key={j}>{response["champions"][i]["updates"][j]["skill"]}</Text>])
                    }
                    skillArr.push(temp)
                    setSkill(skillArr)
                    
                    var temp2 = []
                    for (var k in response["champions"][i]["updates"]) {
                        temp2.push([<Text style={styles.skill} key={k}>{response["champions"][i]["updates"][k]["description"]}</Text>])
                    }
                    descriptionArr.push(temp2)
                    setDescription(descriptionArr)
                }
                setName(nameArr)
            }   
            return () => { isMounted = false }    
        })
        .catch((error) => console.error(error))
        }, [])

    const championSectionArr = []

    for (var i = 0; i < name.length; i ++) {
        championSectionArr[i] = i;
    }

    const skillAndDescription = []

    // const combine = (arr1, arr2) => {
    //     for (var i = 0; i < arr1.length; i ++) {
    //         for (var j = 0; j < arr1[i].length; j ++) {
    //             skillAndDescription[i][j] = [arr1[i][j], arr2[i][j]];
    //         }
    //     }
    // }
    
    // combine(skill, description)

    const championSection = championSectionArr.map(index => (
        <View key={index} style={styles.championSection}>
            <Image 
                source={{uri: `http://ddragon.leagueoflegends.com/cdn/11.14.1/img/champion/${name[index]}.png`}}
                style= {[styles.image]}
            />
            <Text style={styles.name}>{name[index]}</Text>
            
            <View style={styles.skillWrap}>
                {skill[index]}
                <View>{description[index]}</View>
                {/* {skillAndDescription[index]} */}
            </View>
        </View>
    ))

    return (
        <View>
            <Text>{description.length}</Text>
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
        minHeight: height/8
    },
    image: {
        position: 'absolute',
        width: width/6, 
        height: width/6, 
        marginLeft: 20,
        marginTop: 20,
    },
    name: {
        fontSize: 20,
        textAlign: 'left',
        marginLeft: width/6 + 40,
        marginTop: 10,
        fontWeight: 'bold'
    },
    skillWrap: {
        flex: 1,
        marginLeft: width/6 + 40,
        marginBottom: 10
    },
    skill: {
        fontSize: 15,
        marginTop: 3,
        marginBottom: 3,
    }
})