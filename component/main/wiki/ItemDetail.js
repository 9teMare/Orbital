import React, { useState, useEffect } from 'react'
import {View, Text, Image, StyleSheet, ImageBackground, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import { WebView } from 'react-native-webview';


export default function ItemDetail({ route, navigation}) {

    const itemId = route.params;
    const [itemName, setItemName] = useState('')
    const [description, setDescription] = useState('')
    const [itemIconUrl, setItemIconUrl] = useState({})
    const fromArr = []
    const intoArr = []
    const [from, setFrom] = useState([])
    const [into, setInto] = useState([])
    const [gold, setGold] = useState('')

    useEffect(() => {
        fetch('http://ddragon.leagueoflegends.com/cdn/11.15.1/data/en_US/item.json')
        .then((response) => response.json())
        .then((response) => {
            setItemName(response["data"][itemId]["name"])
            setDescription(response["data"][itemId]["description"])
            setItemIconUrl({uri: `http://ddragon.leagueoflegends.com/cdn/11.15.1/img/item/${itemId}.png`})
            if ("from" in response["data"][itemId]) {
                for (var i in response["data"][itemId]["from"]) {
                    fromArr.push(response["data"][itemId]["from"][i])
                }
                setFrom(fromArr)
            }
            
            if ("into" in response["data"][itemId]) {
                for (var i in response["data"][itemId]["into"]) {
                    intoArr.push(response["data"][itemId]["into"][i])
                }
                setInto(intoArr)
            }
        
            setGold(response["data"][itemId]["gold"]["total"])
        })
        .catch((error) => console.error(error))
      }, [])

    const indexArrFrom = []
    const indexArrInto = []

    for (var i = 0; i < from.length; i ++) {
        indexArrFrom[i] = i
    }

    for (var j = 0; j < into.length; j ++) {
        indexArrInto[j] = j
    }

    const displayFrom = () => indexArrFrom.map(index => (
        <Image key={index} source={{uri: `http://ddragon.leagueoflegends.com/cdn/11.15.1/img/item/${from[indexArrFrom[index]]}.png`}} style={styles.fromAndInto}/>
    ))

    const displayInto = () => indexArrInto.map(index => (
        <Image key={index} source={{uri: `http://ddragon.leagueoflegends.com/cdn/11.15.1/img/item/${into[indexArrInto[index]]}.png`}} style={styles.fromAndInto}/>
    ))

    const whetherHaveFrom = () => {
        if (indexArrFrom.length !== 0) {
            return (
                <View>
                    <Text style={styles.infoName}>Obtain from: </Text>
                    <View style={styles.fromView}>
                        {displayFrom()}
                    </View>
                </View>
                
            )
        }
        return
    }

    const whetherHaveInto = () => {
        if (indexArrInto.length !== 0) {
            {console.log(into[1])}
            return (
                <View>
                    <Text style={styles.infoName}>Combine into: </Text>
                    <View style={styles.intoView}>
                        {displayInto()}
                    </View>
                </View>
                
            )
        }
        return
    }
    
    const styledDescription = '<div style="font-size: 270%; margin-left: 30px; margin-right: 30px; margin-top: 30px; line-height: 1.5">' + description + '</div>'

    return (
        <View style={{flex : 1}}>
            <View style={styles.headerView}>
                <View style={styles.iconAndName}>
                    <Image source={itemIconUrl} style={styles.icon}/>
                    <Text style={styles.name}>{itemName}</Text>
                </View>
                
                <View style={styles.shortInfo}>
                    <Text style={styles.infoName}>Gold: {gold}</Text>           
                    {whetherHaveFrom()}
                    {whetherHaveInto()}
                    {/* {displayFrom} */}
                </View>
            </View>
            <View style={styles.descriptionView} pointerEvents="none">
                <Text style={styles.descriptionTitle}>Description</Text>
                <WebView
                    originWhitelist={['*']}
                    source={{ html: styledDescription }}
                    style={{flex: 1}}
                    scrollEnabled={false}
                />
            </View>
        </View>
    )
}

const {width, height} = Dimensions.get("window")

const styles = StyleSheet.create({
    headerView: {
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        //marginBottom: 30,
        minHeight: 150
    },
    iconAndName: {
        marginTop: 30,
        //position: 'absolute',
        top: -10,
        left: 50,
        bottom: 10,
        alignItems: 'center'
    },
    fromAndInto: {
        height: 30,
        width: 30,
        marginLeft:1.5,
        marginRight: 1.5,
        marginTop: 3,
        //alignSelf: 'center'
    },
    fromView: {
        flexDirection: 'row',
        width: 133,
        flexWrap: 'wrap',
        marginBottom: 10,
        backgroundColor: 'white',
        alignItems: 'center',
        elevation: 3,
        justifyContent: 'flex-start'
    },
    intoView: {
        flexDirection: 'row',
        width: 133,
        flexWrap: 'wrap',
        marginBottom: 10,
        backgroundColor: 'white',
        alignItems: 'center',
        elevation: 3,
        justifyContent: 'flex-start'
    },
    shortInfo: {
        marginRight: 180,
        left: 150
    },
    icon: {
        height: width/5,
        width: width/5,
        alignSelf: 'center',
        borderColor: '#000000c0', 
        borderWidth: 4
    },
    name: {
        marginTop: 10,
        fontSize: 20,
        width: 110,
        fontWeight: 'bold',
        alignSelf: 'center',
        textAlign: 'center'
    },
    descriptionView: {
        flex: 1,
        backgroundColor: 'white',
        elevation: 30,
        //marginTop: 100
    },
    descriptionTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        marginLeft: 15,
        marginTop: 15
    },
    infoName: {
        fontSize: 15,
        marginTop: 15,
        width: 100,
        fontWeight: 'bold'
    }
})