import React, { useState, useEffect} from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import {Text, View, Image, StyleSheet, Dimensions} from 'react-native'

export default function Item() {
    const patchNote = "https://orbital-riot-api.herokuapp.com/patchNote"

    const itemNameArr = []
    const [itemName, setItemName] = useState([])
    const itemIdArr = []
    const [itemId, setItemIdArr] = useState([])
    const itemDescriptionArr = []
    const [itemDescription, setItemDescriptionArr] = useState([])

    useEffect(() => {
        let isMounted = true
        fetch(patchNote, {
            "method": "GET"
        })
        .then(response => response.json())
        .then(response => {
            if (isMounted) { 
                for (var i in response["items"]) {
                    itemNameArr.push(i)
                    itemIdArr.push(response["items"][i]["id"])
                    itemDescriptionArr.push(response["items"][i]["description"])
                }
                setItemName(itemNameArr)
                setItemIdArr(itemIdArr)
                setItemDescriptionArr(itemDescriptionArr)
            }
            return () => { isMounted = false }    
        })
        .catch((error) => console.error(error))
    }, [])

    const itemUpdateSectionIndexArr = []

    for (var i = 0; i < itemName.length; i ++) {
        itemUpdateSectionIndexArr[i] = i
    }

    const itemUpdateSection = itemUpdateSectionIndexArr.map(index => (
        <View key={index} style={styles.itemSection}>
            <Image
                source={{uri: `http://ddragon.leagueoflegends.com/cdn/11.15.1/img/item/${itemId[index]}.png`}}
                style={styles.image}
            />
            <View style={styles.itemWrap}>
                <Text style={styles.name}>{itemName[index]}</Text>
                <Text style={styles.description}>· {itemDescription[index]}</Text>
            </View>
        </View>
    ))

    return (
        <ScrollView>
            <Text>
                {itemUpdateSection}
            </Text>
        </ScrollView>
    )
}

const {width, height} = Dimensions.get("window")

const styles = StyleSheet.create({
    itemSection: {
        width: width,
        //alignItems: 'center',
        backgroundColor:"white", 
        marginTop: 10,
        minHeight: height/8,
        elevation: 3,
    },
    image: {
        position: 'absolute',
        width: width/6, 
        height: width/6, 
        marginLeft: 20,
        marginTop: 20,
        borderColor: 'black',
        borderWidth: 3
    },
    name: {
        fontSize: 25,
        textAlign: 'left',
        marginTop: 15,
        fontWeight: 'bold'
    },
    description: {
        fontSize: 15,
        marginTop: 5,
        lineHeight: 25, 
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
    },
    itemWrap: {
        flex: 1,
        marginLeft: width/6 + 40,
        marginBottom: 10
    },
})
