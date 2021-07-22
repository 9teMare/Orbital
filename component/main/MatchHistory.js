import { parse } from 'dotenv';
import React, { useState, useEffect }  from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Dimensions, FlatList, Image} from 'react-native'

export default function MatchHistory({ route, navigation}) {
    const {selectedRegion, summonerName, accountId, apiKey} = route.params;
    const historyArr = []

    const [history, setHistory] = useState([])
    const [historyState, setHistoryState] = useState(true)

    const matchHistoryUrl = `https://${selectedRegion}.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountId}?api_key=${apiKey}`
    const championUrl = `http://ddragon.leagueoflegends.com/cdn/11.15.1/data/en_US/champion.json`

    const [data, setData] = useState({})

    const [isLoading, setLoader] = useState(true)

    const getHistory = async() => {
        let isMounted = true
        const historyResponse = await fetch(matchHistoryUrl, {"method": "GET"})
        if (!historyResponse.ok) { 
            setHistoryState(false)
        }
        const historyResponded = await historyResponse.json()

        const championResponse = await fetch(championUrl, {"method": "GET"})
        const championResponded = await championResponse.json()

        if (isMounted) {
            for (var j in historyResponded["matches"]) {
                historyArr.push(historyResponded["matches"][j])
                historyArr[j]["winOrLose"] = "win"
            }
            setHistory(historyArr)

            const keyToChampion = new Object()
            for (var i in championResponded["data"]) {
                keyToChampion[championResponded["data"][i]["key"]] = championResponded["data"][i]["id"]
            }
            setData(keyToChampion)
            setLoader(false)
        }
        return () => { isMounted = false }    
    } 

    // const getWinLose = async(gameId, name) => {
    //     const response = await fetch(`https://na1.api.riotgames.com/lol/match/v4/matches/${gameId}?api_key=${apiKey}`, {"method": "GET"})
    //     const responded = await response.json()
    //     for (var i in responded["participantIdentities"]) {
    //         if (responded["participantIdentities"][i]["player"]["summonerName"] === name) {
    //             var participantId = responded["participantIdentities"][i]["participantId"]
    //             if (parseInt(participantId, 10) < 6) {
    //                 var win = responded["teams"][0]["win"]
    //                 break
    //             }
    //             var win = responded["teams"][1]["win"]
    //         }
    //     }
    //     return win
    // }

    const Item = ({ champion, gameId }) => (
        <View>
            <TouchableOpacity style={styles.item} onPress={() => {navigation.navigate("Match History Detail", {gameId, apiKey, data, summonerName})}}>
                <View style={styles.iconAndName}>
                    <Image
                        source={{uri: `http://ddragon.leagueoflegends.com/cdn/11.15.1/img/champion/${data[champion]}.png`}}
                        style= {styles.icon}
                    />
                    <Text style={styles.name}>{data[champion]}</Text>
                </View>

            </TouchableOpacity>
        </View>
    );

    const renderItem = ({ item, gameId }) => (
        <View>
            <Item champion={item["champion"]} gameId={item["gameId"]} />
        </View>
    );

    const whetherHaveMatchHistory = () => {
        if (historyState) {
            return (
                <View>
                    <FlatList
                        data={history}
                        renderItem={renderItem}
                        keyExtractor={item => item.gameId}
                    />
                </View>
            )
        }
        return (
            <View>
                <Text>No Match History Found</Text>
                <Text>Maybe it is because you have not played any games in the past year, or you have not yet linked to LOL username</Text>
            </View>
        )
    }

    useEffect(() => {
        getHistory()
    }, []);   

    if (isLoading) {
        return (
            <View style={{height: width / 3, width: width / 2, backgroundColor: '#b8bab9', alignSelf: 'center', marginTop: height / 3, borderRadius: 10}}>
                <Text style={{fontSize: 20, fontWeight: 'bold', alignSelf: 'center', marginTop: 40, color: 'grey'}}> 
                    Loading...
                </Text>
            </View>
        )
    }

    return (
        <View>
            {/* <Text>{getWinLose(3985050032, "Doublelift")}</Text>
            <Text>{zz}</Text> */}
            {whetherHaveMatchHistory()}
        </View>
    )
}

const {width, height} = Dimensions.get("window")

const styles = StyleSheet.create({
    item: {
      backgroundColor: 'white',
      height: height / 8,
      marginTop: 5,
      marginBottom: 5,
      width: width,
      elevation: 3
    },
    name: {
      fontSize: 15,
      alignSelf: 'center'
    },
    icon: {
        height: 50,
        width: 50,
        borderRadius: 30,
        alignSelf: 'center',
        marginTop: 15
    },
    iconAndName: {
        height: height / 8,
        width: height / 8,
        backgroundColor: '#f0f0f0',
        marginLeft: 20
    },
    gameId: {
        position: 'absolute',
        right: 10
    }
});