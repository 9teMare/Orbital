import React, { useState, useEffect }  from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Dimensions, FlatList, Image, ActivityIndicator} from 'react-native'
import  MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import firebase from 'firebase'

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

    const likesArr = []
    const [likes, setLikes] = useState([])

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
            for (var j = 0; j < historyResponded["matches"].length/10; j++) {
                historyResponded["matches"][j]["liked"] = false
                historyArr.push(historyResponded["matches"][j])
                gameIdArrTemp.push(historyResponded["matches"][j]["gameId"])
                likesArr.push(false)
            }
            setHistory(historyArr)
            setGameIdArr(gameIdArrTemp)
            setLikes(likesArr)

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

    const winLoseColor = (win) => {
        if (win === 'Win') {
            return (
                <View style={{backgroundColor: '#bae8ff', position: 'absolute', height: height / 8, width: 20}}>
                    <Text style={{marginTop: height / 20, textAlign: 'center', fontSize: 14, color: '#1e73ba', fontWeight: 'bold'}}>W</Text>
                </View>
            )
        }
        return (
            <View style={{backgroundColor: '#ffabb1', position: 'absolute', height: height / 8, width: 20}}>
                <Text style={{marginTop: height / 20, textAlign: 'center', fontSize: 14, color: '#dc0817', fontWeight: 'bold'}}>L</Text>
            </View>
        )
    }

    const Item = ({ champion, gameId, queue }) => {
        const [win, setWin] = useState("")
        const getWin = async(gameId) => {
            let isMounted = true
            const gameUrl = `https://na1.api.riotgames.com/lol/match/v4/matches/${gameId}?api_key=RGAPI-41c65fea-cf7d-4c54-a965-2c2a2daefc20`
    
            if (isMounted) {
                const response = await fetch(gameUrl)
                const responded = await response.json()
                for (var i in responded["participantIdentities"]) {
                    const participantId = 0
                    if (responded["participantIdentities"][i]["player"]["summonerName"] === summonerName) {
                        const teamId = responded["participants"][i]["teamId"]
                        if (teamId === 100) {
                            setWin(responded["teams"][0]["win"]) 
                        }
                        setWin(responded["teams"][1]["win"])
                    }
                }
                setLoader(false)
            }
            return () => { isMounted = false }    
        }

        return (
            <View>
                {/* <TouchableOpacity style={{position: 'absolute', height: height/8, width: 40, marginTop: 5, backgroundColor: 'white', elevation: 3}}
                                    onPress={() => {like ? removeMatchIds(gameId) : saveMatchIds(gameId)}}>
                    <View>
                        {like
                        ?  <MaterialCommunityIcons name="heart" size={26 } style={{position: 'absolute', top: 35, left: 8}}/>
                        :  <MaterialCommunityIcons name="heart-outline" size={26} style={{position: 'absolute', top: 35, left: 8}}/>}
                    </View>
                </TouchableOpacity> */}
            
                <TouchableOpacity style={styles.item} onPress={() => {navigation.navigate("Match Detail", {selectedRegion, gameId, apiKey, data, summonerName, gameMode, queue})}}>
                    <View style={styles.iconAndName}>
                        <Image
                            source={{uri: `http://ddragon.leagueoflegends.com/cdn/11.15.1/img/champion/${data[champion]}.png`}}
                            style= {styles.icon}
                        />
                        <Text style={styles.name}>{data[champion]}</Text>
                    </View>
                    <Text style={{position: 'absolute', right: 75, top: 35, color: 'grey', fontSize: 20, fontWeight: '200'}}>{gameMode[queue].replace(" games", "")}</Text>
                    {useEffect(() => {
                        getWin(gameId)
                    }, [])}
                    {/* <Text style={{position: 'absolute', right: 30, top: 35, color: 'grey', fontSize: 20, fontWeight: '200'}}>
                        {win}
                    </Text> */}
                    {winLoseColor(win)}
                    <View style={{position: 'absolute', right: 10 , top: 33}}>
                        <MaterialCommunityIcons name="chevron-right" size={26} style={{position: 'absolute', marginTop: 3, right: 5}}/>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    const renderItem = ({ item }) => {
        return (
            <View>
                <Item champion={item["champion"]} gameId={item["gameId"]} queue={item["queue"]}  win={item["win"]}/>
            </View>
        );
    }

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