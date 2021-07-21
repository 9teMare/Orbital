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

    const statsArr = []
    const statsNumArr = []
    const [stats, setStats] = useState([])
    const [statsNum, setStatsNum] = useState([])

    useEffect(() => {
        fetch('http://ddragon.leagueoflegends.com/cdn/11.14.1/data/en_US/item.json')
        .then((response) => response.json())
        .then((response) => {
            setItemName(response["data"][itemId]["name"])
            setDescription(response["data"][itemId]["description"])
            setItemIconUrl({uri: `http://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${itemId}.png`})
            for (var i in response["data"][itemId]["from"]) {
                fromArr.push(response["data"][itemId]["from"][i])
            }
            setFrom(fromArr)

            for (var i in response["data"][itemId]["into"]) {
                intoArr.push(response["data"][itemId]["into"][i])
            }
            setInto(intoArr)
        
            setGold(response["data"][itemId]["gold"]["base"])
            for (var i in response["data"][itemId]["stats"]) {
                statsArr.push(i)
                statsNumArr.push(response["data"][itemId]["stats"][i])
            }
            setStats(statsArr)
            setStatsNum(statsNumArr)
        })
        .catch((error) => console.error(error))
      }, [])

    const indexArrFrom = []
    const indexArrInto = []

    for (var i = 0; i < from.length; i ++) {
        indexArrFrom[i] = i
    }

    for (var i = 0; i < into.length; i ++) {
        indexArrInto[i] = i
    }

    const displayFrom = indexArrFrom.map(index => (
        <View key={index} style={styles.fromAndIntoView}>
            <Image source={{uri: `http://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${from[indexArrFrom[index]]}.png`}} style={styles.fromAndInto}/>
        </View>
    ))

    const displayInto = indexArrInto.map(index => (
        <View key={index} style={styles.fromAndIntoView}>
            <Image source={{uri: `http://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${into[indexArrFrom[index]]}.png`}} style={styles.fromAndInto}/>
        </View>
    ))

    const styledDescription = '<div style="font-size: 250%; margin-left: 30px; margin-right: 30px; margin-top: 30px">' + description + '</div>'

    return (
        <View style={{flex : 1}}>
            <View style={styles.headerView}>
                <View style={styles.iconAndName}>
                    <Image source={itemIconUrl} style={styles.icon}/>
                    <Text style={styles.name}>{itemName}</Text>
                </View>
                
                <View style={styles.shortInfo}>
                    <Text style={styles.name}>Gold: {gold}</Text>
                    <Text style={styles.name}>from: {from}</Text>
                    <Text style={styles.name}>into: {into.length}</Text>
                    {/* {displayFrom} */}
                </View>
            </View>
            <View style={styles.descriptionView}>
                <Text style={styles.descriptionTitle}>Description</Text>
                <WebView
                    originWhitelist={['*']}
                    source={{ html: styledDescription }}
                    style={{flex: 1}}
                />
            </View>
        </View>
    )
}

const {width, height} = Dimensions.get("window")

const styles = StyleSheet.create({
    headerView: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginBottom: 30,
        marginLeft: width/10
    },
    iconAndName: {
        marginTop: 30
    },
    fromAndInto: {
        height: 30,
        width: 30,
    },
    fromAndIntoView: {
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    shortInfo: {
        marginTop: 30,
        marginRight: width/10,
        alignSelf: 'flex-start',
        maxWidth: width / 2
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
        fontWeight: 'bold',
        alignSelf: 'center'
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
    }
})