import React, { useState, useEffect} from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import {Text, View, Image, StyleSheet, Dimensions, ActivityIndicator} from 'react-native'

export default function Item() {
    const patchNote = "https://orbital-riot-api.herokuapp.com/patchNote"

    const itemNameArr = []
    const [itemName, setItemName] = useState([])
    const itemIdArr = []
    const [itemId, setItemIdArr] = useState([])
    const itemDescriptionArr = []
    const [itemDescription, setItemDescriptionArr] = useState([])
    const [isLoading, setLoader] = useState(true)

    const getItemUpdates = async() => {
        let isMounted = true
        const patchNoteResponse = await fetch(patchNote, {"method": "GET"})
        const patchNoteResponded = await patchNoteResponse.json()
        if (isMounted) { 
            for (var i in patchNoteResponded["items"]) {
                itemNameArr.push(i)
                itemIdArr.push(patchNoteResponded["items"][i]["id"])
                itemDescriptionArr.push(patchNoteResponded["items"][i]["description"])
            }
            setItemName(itemNameArr)
            setItemIdArr(itemIdArr)
            setItemDescriptionArr(itemDescriptionArr)
            setLoader(false)
        }
        return () => { isMounted = false }    
    }

    // useEffect(() => {
    //     let isMounted = true
    //     fetch(patchNote, {
    //         "method": "GET"
    //     })
    //     .then(response => response.json())
    //     .then(response => {
    //         if (isMounted) { 
    //             for (var i in response["items"]) {
    //                 itemNameArr.push(i)
    //                 itemIdArr.push(response["items"][i]["id"])
    //                 itemDescriptionArr.push(response["items"][i]["description"])
    //             }
    //             setItemName(itemNameArr)
    //             setItemIdArr(itemIdArr)
    //             setItemDescriptionArr(itemDescriptionArr)
    //         }
    //         return () => { isMounted = false }    
    //     })
    //     .catch((error) => console.error(error))
    // }, [])

    const itemUpdateSectionIndexArr = []

    for (var i = 0; i < itemName.length; i ++) {
        itemUpdateSectionIndexArr[i] = i
    }

    const itemUpdateSection = () => itemUpdateSectionIndexArr.map(index => (
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

   useEffect(() => {
        getItemUpdates()
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
        <ScrollView>
            {itemUpdateSection()}
        </ScrollView>
    )
}

const {width, height} = Dimensions.get("window")

const styles = StyleSheet.create({
    itemSection: {
        width: width,
        //alignItems: 'center',
        backgroundColor:"white", 
        marginBottom: 10,
        minHeight: height/8,
        elevation: 3
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
