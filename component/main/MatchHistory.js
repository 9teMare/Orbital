import React, { useState, useEffect }  from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Dimensions, FlatList, Image, ActivityIndicator} from 'react-native'

export default function MatchHistory({ route, navigation}) {
    const {selectedRegion, summonerName, accountId, apiKey} = route.params;
    
    const historyArr = []
    const [history, setHistory] = useState([])
    const [historyState, setHistoryState] = useState(true)

    const matchHistoryUrl = `https://${selectedRegion}.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountId}?api_key=${apiKey}`
    const championUrl = `http://ddragon.leagueoflegends.com/cdn/11.15.1/data/en_US/champion.json`
    const queueTypeUrl = `https://static.developer.riotgames.com/docs/lol/queues.json`

    const [data, setData] = useState({})
    const [gameMode, setGameMode] = useState({})

    const [isLoading, setLoader] = useState(true)

    const gameIdArrTemp = []
    const [gameIdArr, setGameIdArr] = useState([])

    const [historyWithWin, setHistoryWithWin] = useState([])

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
            setLoader(false)
        }
        const historyResponded = await historyResponse.json()

        const championResponse = await fetch(championUrl, {"method": "GET"})
        const championResponded = await championResponse.json()

        const queueResponse = await fetch(queueTypeUrl, {"method": "GET"})
        const queueResponded = await queueResponse.json()

        if (isMounted) {
            for (var j = 0; j < historyResponded["matches"].length; j++) {
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

            const queueToGameMode = new Object()
            for (var k in queueResponded) {
                queueToGameMode[queueResponded[k]["queueId"]] = queueResponded[k]["description"]
            }
            setGameMode(queueToGameMode)
            setLoader(false)
        }
        return () => { isMounted = false }    
    } 

    const winArr = []
    const [win, setWin] = useState([])

    const getWin = async() => {
        let isMounted = true
        const gameUrl = (gameId) => `https://na1.api.riotgames.com/lol/match/v4/matches/${gameId}?api_key=RGAPI-ae963366-d570-4d4a-9f0e-9ace29576110`

        if (isMounted) {
            for (var i in gameIdArr) {
                const fetchId = await fetch(gameUrl(gameIdArr[i]), {"method": "GET"})
                const fetchIdResponse = await fetchId.json()

                const participant = fetchIdResponse.participants
                const identity = fetchIdResponse["participantIdentities"]
                for (var j in identity) {
                    if (identity[j]["player"]["summonerName"] === summonerName) {
                        var temp = identity[j]["participantId"]
                        if (participant[temp-1]["stats"]["win"]) {
                            winArr.push("win")
                        } else {
                            winArr.push("fail")
                        }
                    }
                }
            }
            setWin(winArr)

            const tempHistory = history
            for (var k in tempHistory) {
                tempHistory[k]["win"] = win[k]
            }
            setHistoryWithWin(tempHistory)
        }
        return () => { isMounted = false }    
    }

    // const winArr = []
    // const [win, setWin] = useState({})
    
    // const getWin = async(gameId) => {
    //     let isMounted = true
    //     const gameUrl = `https://na1.api.riotgames.com/lol/match/v4/matches/${gameId}?api_key=${apiKey}`
    //     const response = await fetch(gameUrl, {'method': 'GET'})
    //     const responded = await response.json()
       
    //     if (isMounted) {
    //         // for (var i in response["participantIdentities"]) {
    //         //     if (summonerName === response["participantIdentities"][i]["player"]["summonerName"]) {
    //         //         var temp = response["participantIdentities"][i]["participantId"]
    //         //         //setWin(response["participants"][temp - 1]["stats"]["win"])
    //         //         return `response["participants"][temp - 1]["stats"]["win"]`
    //         //     }
    //         // }
    //         // winArr.push(responded["participants"])
    //         const temp = responded.participants
    //         setWin(temp)
    //     }
    //     return () => { isMounted = false }
    // }

    const Item = ({ champion, gameId, queue, win }) => (
        <View>
            <TouchableOpacity style={styles.item} onPress={() => {navigation.navigate("Match History Detail", {selectedRegion, gameId, apiKey, data, summonerName, gameMode, queue})}}>
                <View style={styles.iconAndName}>
                    <Image
                        source={{uri: `http://ddragon.leagueoflegends.com/cdn/11.15.1/img/champion/${data[champion]}.png`}}
                        style= {styles.icon}
                    />
                    <Text style={styles.name}>{data[champion]}</Text>
                </View>
                <Text style={{position: 'absolute', right: 10, top: 35}}>{gameMode[queue].replace(" games", "")}</Text>
                <Text style={{position: 'absolute', right: 10, top: 10}}>{win}</Text>
            </TouchableOpacity>
        </View>
    );

    const renderItem = ({ item }) => (
        <View>
            <Item champion={item["champion"]} gameId={item["gameId"]} queue={item["queue"]}  win={item["win"]}/>
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
            <View style={{marginTop: height / 4, marginLeft: 10, marginRight: 10, width: 300, alignSelf: 'center'}}>
                <Text style={{fontSize: 15, fontWeight: 'bold', color: 'grey', lineHeight: 40, textAlign: 'center'}}>No Match History Found.</Text>
                <Text style={{fontSize: 15, fontWeight: 'bold', color: 'grey', lineHeight: 40, textAlign: 'center'}}>Maybe it is because you have not played any games in the past year, or you have not yet linked to your LOL username.</Text>
            </View>
        )
    }

    // const oneByOne = async() => {
    //     const temp1 = await getHistory();
    //     const temp2 = await getWin();
    //     setLoader(false)
    // }

    useEffect(() => {
        getHistory()
    }, []);   

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