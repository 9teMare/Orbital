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

    const gameIdArrTemp = []
    const [gameIdArr, setGameIdArr] = useState([])

    //const [winLose, setWinLose] = useState('')
    
    // const getWinLose = (gameId, name) => {
    //      fetch(`https://na1.api.riotgames.com/lol/match/v4/matches/${gameId}?api_key=${apiKey}`, {"method": "GET"})
    //     .then(res => res.json())
    //     .then(res => {
    //         for (var i = 0 ; i < res["participantIdentities"].length; i ++) {
    //             if (res["participantIdentities"][i]["player"]["summonerName"] === name) {
    //                 var participantId = 1
    //                 if (participantId < 6) {
    //                     var win = "win"
    //                     break
    //                 }
    //                 var win = "fail"
    //             }
    //         }
    //         setWinLose(win)
    //     })
    //     .catch(e => console.log(e))
    // }

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
                gameIdArrTemp.push(historyResponded["matches"][j]["gameId"])
            }
            setHistory(historyArr)
            setGameIdArr(gameIdArrTemp)

            const keyToChampion = new Object()
            for (var i in championResponded["data"]) {
                keyToChampion[championResponded["data"][i]["key"]] = championResponded["data"][i]["id"]
            }
            setData(keyToChampion)
            setLoader(false)
        }
        return () => { isMounted = false }    
    } 

    const winArr = []
    const [win, setWin] = useState([])

    const getWin = async() => {
        let isMounted = true
        const gameUrl = (gameId) => `https://na1.api.riotgames.com/lol/match/v4/matches/${gameId}?api_key=${apiKey}`

        if (isMounted) {
            for (var i in gameIdArr) {
                const fetchId = await fetch(gameUrl(gameIdArr[i]))
                const fetchIdResponse = await fetchId.json()

                const participant = fetchIdResponse.participants
                const identity = fetchIdResponse.participantIdentities
                 for (var j in identity) {
                     if (identity[j]["player"]["summonerName"] === summonerName) {
                         var temp = identity[j]["participantId"]
                         if (participant[j]["participantId"] === temp) {
                            winArr.push(participant[j]["stats"]["win"])
                         }
                     }
                 }
            }
            setWin(winArr)

            for (var k in history) {
                historyArr[k]["win"] = "win"
            }
            setHistory(historyArr)
            setLoader(false)
        }
        return () => { isMounted = false }    
    }

    const Item = ({ champion, gameId, win }) => (
        <View>
            <TouchableOpacity style={styles.item} onPress={() => {navigation.navigate("Match History Detail", {gameId, apiKey, data, summonerName})}}>
                <View style={styles.iconAndName}>
                    <Image
                        source={{uri: `http://ddragon.leagueoflegends.com/cdn/11.15.1/img/champion/${data[champion]}.png`}}
                        style= {styles.icon}
                    />
                    <Text style={styles.name}>{data[champion]}</Text>
                    <Text style={{position: 'absolute', right: 10}}>{win}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );

    const renderItem = ({ item }) => (
        <View>
            <Item champion={item["champion"]} gameId={item["gameId"]} win={item["win"]} />
        </View>
    );

    const whetherHaveMatchHistory = () => {
        if (historyState) {
            return (
                <View>
                    <FlatList
                        data={history}
                        renderItem={renderItem}
                        keyExtractor={item => item.gameId.toString()}
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
        getWin()
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