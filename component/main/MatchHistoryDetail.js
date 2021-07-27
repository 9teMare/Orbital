import React, { useState, useEffect }  from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Dimensions, ActivityIndicator, Image} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import  MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Icon } from 'react-native-elements'
import firebase from 'firebase'

export default function MatchHistory({ route, navigation}) {
    const {selectedRegion, gameId, apiKey, data, summonerName , gameMode, queue} = route.params
    const gameUrl = `https://${selectedRegion}.api.riotgames.com/lol/match/v4/matches/${gameId}?api_key=${apiKey}`
    const [participants, setParticipants] = useState({})
    const [participantIdentities, setParticipantIdentities] = useState({})

    const blueTeamArr = []
    const [blueTeam, setBlueTeam] = useState([])

    const redTeamArr = []
    const [redTeam, setRedTeam] = useState([])

    const blueTeamIdentitiesArr = []
    const [blueTeamIdentities, setBlueTeamIdentities] = useState([])

    const redTeamIdentitiesArr = []
    const [redTeamIdentities, setRedTeamIdentities] = useState([])

    const tempIndexArr = []
    const [tempIndex, setTempIndex] = useState([])
    const [isLoading, setLoader] = useState(true)

    const blueTeamWinArr = []
    const [blueTeamWin, setBlueTeamWin] = useState([])
    const redTeamWinArr = []
    const [redTeamWin, setRedTeamWin] = useState([])

    const [spell, setSpell] = useState({})
    const [gameDuration, setGameDuration] = useState({})

    const blueChampsArr = []
    const redChampsArr = []
    const [blueChamps, setBlueChamps] = useState([])
    const [redChamps, setRedChamps] = useState([])

    const getData = async () => {
        let isMounted = true
        const response = await fetch(gameUrl, {"method": "GET"})
        const responded = await response.json()
        
        const participant = responded.participants
        const identitiy = responded.participantIdentities
        const team = responded.teams
        setGameDuration(responded["gameDuration"])
        
        for (var i = 0; i < participant.length/2 ; i++) {
            tempIndexArr[i] = i
        }
        
        setTempIndex(tempIndexArr)

        const spellUrl = `http://ddragon.leagueoflegends.com/cdn/11.15.1/data/en_US/summoner.json`

        const spellResponse = await fetch(spellUrl, {"method": "GET"})
        const spellResponded = await spellResponse.json()
        const idToSpell = new Object()
        for (var j in spellResponded["data"]) {
            idToSpell[spellResponded["data"][j]["key"]] = spellResponded["data"][j]["id"]
        }
        setSpell(idToSpell)

        if (isMounted) {
            setParticipants(participant)
            setParticipantIdentities(identitiy)

            for (var i = 0; i < participant.length; i ++) {
                if (i < participant.length / 2) {
                    blueTeamArr.push(participant[i])
                    blueTeamIdentitiesArr.push(identitiy[i])
                    blueChampsArr.push(data[participant[i]["championId"]])
                } else {
                    redTeamArr.push(participant[i])
                    redTeamIdentitiesArr.push(identitiy[i])
                    redChampsArr.push(data[participant[i]["championId"]])
                }
            }
            setBlueTeam(blueTeamArr)
            setBlueTeamIdentities(blueTeamIdentitiesArr)
            setRedTeam(redTeamArr)
            setRedTeamIdentities(redTeamIdentitiesArr)

            setBlueChamps(blueChampsArr)
            setRedChamps(redChampsArr)

            setBlueTeamWin(team[0])
            setRedTeamWin(team[1])

            setLoader(false)
        }
        return () => { isMounted = false }
    }
    

    const winLoseRename = (win) => {
        if (win === "Win") {
            return "Victory"
        }
        return "Defeat"
    }

    const renderBlueHeader = () => {
        return (
            <View style={{backgroundColor: '#55B1CE', height: height/20, width: width, elevation: 5}}>
                <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white', marginLeft: height / 40, marginTop: 5}}>Blue Team</Text>
            </View>
        )
    }

    const renderRedHeader = () => {
        return (
            <View style={{backgroundColor: '#DC5047', height: height/20, width: width, marginTop: 10, elevation: 5}}>
                <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white', marginLeft: height / 40, marginTop: 5}}>Red Team</Text>
            </View>
        )
    }

    const currentSummoner = (name) => {
        if (name !== summonerName) {
            return (
                <View>
                    <Text style={{color: 'black', fontSize: 17, fontWeight: 'bold'}}>{name}</Text>
                </View>
            )
        }
        return (
            <View>
                <Text style={{color: 'black', fontSize: 17, fontWeight: 'bold'}}>
                    {name} 
                    <Text> </Text>
                    <View style={{borderRadius: 3, backgroundColor: '#55BA46'}}>
                        <Text style={{color: 'white',  fontSize: 11}}> (Me) </Text>
                    </View>
                </Text> 
            </View>
        )
    }

    const infinityToOne = (num) => {
        if (num === 0) {
            return 1
        }
        return num
    }

    const renderItem = (itemId) => {
        if (itemId !== 0) {
            return (
                <Image source={{uri: `http://ddragon.leagueoflegends.com/cdn/11.15.1/img/item/${itemId}.png`}} style={styles.itemIcon}/>
            )
        }
        return (
            <View style={{height: 25, width: 25, backgroundColor: '#474747', marginLeft: 1, borderColor: 'black', borderWidth: 1,  borderRadius: 5}}></View>
        )
    }

    const renderBlueTeam = () => tempIndex.map(index => (     
        <View style={styles.championBox} key={index}>
            <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate("Blue Team Performance", {gameId, apiKey, data, blueTeam, index, participants, participantIdentities})}>
                <View style={styles.iconAndName}>
                    <Image
                        source={{uri: `http://ddragon.leagueoflegends.com/cdn/11.15.1/img/champion/${data[blueTeam[index]["championId"]]}.png`}}
                        style= {styles.blueIcon}
                    />
                    <View style={{position: 'absolute', top: 54, flexDirection: 'row', width: height / 10, justifyContent: 'center'}}>
                        <Image
                            source={{uri: `http://ddragon.leagueoflegends.com/cdn/11.15.1/img/spell/${spell[blueTeam[index]["spell1Id"]]}.png`}}
                            style= {{width: 20, height: 20, marginRight: 2, borderWidth: 1, borderColor: 'black', borderRadius: 20}}
                        />
                        <Image
                            source={{uri: `http://ddragon.leagueoflegends.com/cdn/11.15.1/img/spell/${spell[blueTeam[index]["spell2Id"]]}.png`}}
                            style= {{width: 20, height: 20,  marginLeft: 2, borderWidth: 1, borderColor: 'black', borderRadius: 20}}
                        />
                    </View>
                </View>
                <Text style={styles.summonerName}>
                    {currentSummoner(blueTeamIdentities[index]["player"]["summonerName"])}
                </Text>
                <Text style={styles.kda}>
                    {blueTeam[index]["stats"]["kills"]}/{blueTeam[index]["stats"]["deaths"]}/{blueTeam[index]["stats"]["assists"]}
                </Text>
                <Text style={styles.kdaValue}>
                    KDA: {((parseInt(blueTeam[index]["stats"]["kills"]) + parseInt(blueTeam[index]["stats"]["assists"]))/infinityToOne(parseInt(blueTeam[index]["stats"]["deaths"]))).toFixed(2)}
                </Text>
                <View style={{position: 'absolute', height: 27, width: 183, left: width - 220, top: 28, backgroundColor: '#969696c0', borderRadius: 5}}>
                    <View style={{flexDirection: 'row', alignSelf: 'center', marginTop: 1, marginBottom: 1, marginRight: 1}}>
                        {renderItem(blueTeam[index]["stats"]["item0"])}
                        {renderItem(blueTeam[index]["stats"]["item1"])}
                        {renderItem(blueTeam[index]["stats"]["item2"])}
                        {renderItem(blueTeam[index]["stats"]["item3"])}
                        {renderItem(blueTeam[index]["stats"]["item4"])}
                        {renderItem(blueTeam[index]["stats"]["item5"])}
                        {renderItem(blueTeam[index]["stats"]["item6"])}
                    </View>
                </View>
                <View style={{position: 'absolute', right: 2, top: 20}}>
                    <Icon name="arrow-right" size={30} color={'grey'}/>
                </View>
            </TouchableOpacity>
                  
        </View>
    ))

    const renderRedTeam = () => tempIndex.map(index => (
        <View style={styles.championBox} key={index}>
            <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate("Red Team Performance", {gameId, apiKey, data, redTeam, index, participants, participantIdentities})}>
                <View style={styles.iconAndName}>
                    <Image
                        source={{uri: `http://ddragon.leagueoflegends.com/cdn/11.15.1/img/champion/${data[redTeam[index]["championId"]]}.png`}}
                        style= {styles.redIcon}
                    />
                    <View style={{position: 'absolute', top: 54, flexDirection: 'row', width: height / 10, justifyContent: 'center'}}>
                        <Image
                            source={{uri: `http://ddragon.leagueoflegends.com/cdn/11.15.1/img/spell/${spell[redTeam[index]["spell1Id"]]}.png`}}
                            style= {{width: 20, height: 20, marginRight: 2, borderWidth: 1, borderColor: 'black', borderRadius: 20}}
                        />
                        <Image
                            source={{uri: `http://ddragon.leagueoflegends.com/cdn/11.15.1/img/spell/${spell[redTeam[index]["spell2Id"]]}.png`}}
                            style= {{width: 20, height: 20, marginRight: 2, borderWidth: 1, borderColor: 'black', borderRadius: 20}}
                        />
                    </View>
                </View>
                <Text style={styles.summonerName}>
                    {currentSummoner(redTeamIdentities[index]["player"]["summonerName"])}
                </Text>
                <Text style={styles.kda}>
                    {redTeam[index]["stats"]["kills"]}/{redTeam[index]["stats"]["deaths"]}/{redTeam[index]["stats"]["assists"]}
                </Text>
                <Text style={styles.kdaValue}>
                    KDA: {((parseInt(redTeam[index]["stats"]["kills"]) + parseInt(redTeam[index]["stats"]["assists"]))/infinityToOne(parseInt(redTeam[index]["stats"]["deaths"]))).toFixed(2)}
                </Text>
                <View style={{position: 'absolute', height: 27, width: 183, left: width - 220, top: 28, backgroundColor: '#969696c0', borderRadius: 5}}>
                    <View style={{flexDirection: 'row', alignSelf: 'center', marginTop: 1, marginBottom: 1, marginRight: 1}}>
                        {renderItem(redTeam[index]["stats"]["item0"])}
                        {renderItem(redTeam[index]["stats"]["item1"])}
                        {renderItem(redTeam[index]["stats"]["item2"])}
                        {renderItem(redTeam[index]["stats"]["item3"])}
                        {renderItem(redTeam[index]["stats"]["item4"])}
                        {renderItem(redTeam[index]["stats"]["item5"])}
                        {renderItem(redTeam[index]["stats"]["item6"])}
                    </View>
                </View>
                <View style={{position: 'absolute', right: 2, top: 20}}>
                    <Icon name="arrow-right" size={30} color={'grey'}/>
                </View>
            </TouchableOpacity>
        </View>
    ))  

    useEffect(() => {
        getData()
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

    const overallKDA = (team) => {
        var kill = 0
        var death = 0
        var assists = 0
        for (var i in team) {
            kill += team[i]["stats"]["kills"]
            death += team[i]["stats"]["deaths"]
            assists += team[i]["stats"]["assists"]
        }
        return kill + "/" + death + "/" + assists
    }

    function fancyTimeFormat(duration) {   
        // Hours, minutes and seconds
        var hrs = ~~(duration / 3600);
        var mins = ~~((duration % 3600) / 60);
        var secs = ~~duration % 60;
    
        // Output like "1:01" or "4:03:59" or "123:03:59"
        var ret = "";
    
        if (hrs > 0) {
            ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
        }
    
        ret += "" + mins + "m" + " " + (secs < 10 ? "0" : "");
        ret += "" + secs + "s";
        return ret;
    }
    
    const rankToAnalysis = (queue) => {
        if (queue === 420) {
            return (
                <TouchableOpacity style={{backgroundColor: '#d4d6d5', height: 40, elevation: 2, width: width - 10, alignSelf: 'center', marginTop: 5, marginBottom: 5}} 
                                onPress={() => navigation.navigate({
                                    name: 'Composition',
                                    params: {blueTeam: blueChamps, redTeam: redChamps},
                                    merge: true,
                                }
                                    //"Composition", {blueTeam, redTeam, gameId, apiKey, data, spell}
                                )}>
                    <Text style={{alignSelf: 'center', marginTop: 8, fontSize: 15, fontWeight: 'bold', color: 'white'}}>Tap Here To Analyse</Text>
                </TouchableOpacity>
            )
        }
    }

    return (
        <View>
            <ScrollView>
                {rankToAnalysis(queue)}
                <View style={{height: 125, backgroundColor: 'white'}}>
                    <View style={{height: 50, width: 50, borderRadius: 40, backgroundColor: '#55B1CE', position: 'absolute', left: 10, top: 10, elevation: 3}}>
                        <Text style={{textAlign: 'center', marginTop: 6, color: 'white'}}>Blue Team</Text>
                        <View style={{position: "absolute", width: 45, height: 18, backgroundColor: "#ebc034", left: 3, top: 42}}>
                            <Text style={{fontSize: 12, alignSelf: "center", position:'absolute', fontWeight: 'bold'}}>
                                {winLoseRename(blueTeamWin["win"])}
                            </Text>
                        </View>
                    </View>
                    <Text style={{textAlign: 'center', color: 'black', alignSelf: 'center', fontSize: 18, position: 'absolute', top: 20, fontWeight: 'bold'}}>VS</Text>
                    <Text style={{position: 'absolute', left: 75, top: 20, color: '#55B1CE', fontSize: 18}}>{overallKDA(blueTeam)}</Text>
                    <Text style={{position: 'absolute', right: 75, top: 20, color: '#DC5047', fontSize: 18}}>{overallKDA(redTeam)}</Text>
                    <View style={{height: 50, width: 50, borderRadius: 40, backgroundColor: '#DC5047', position: 'absolute', right: 10, top: 10, elevation: 3}}>
                        <Text style={{textAlign: 'center', marginTop: 6, color: 'white'}}>Red Team</Text>
                        <View style={{position: "absolute", width: 45, height: 18, backgroundColor: "#ebc034", right: 3, top: 42}}>
                            <Text style={{fontSize: 12, alignSelf: "center", position:'absolute', fontWeight: 'bold'}}>
                                {winLoseRename(redTeamWin["win"])}
                            </Text>
                        </View>
                    </View>
                    <Text style={{position: 'absolute', alignSelf: 'center', top: 70, fontSize: 16}}>Game Type: {gameMode[queue].replace(" games", "")}</Text>
                    <Text style={{position: 'absolute', alignSelf: 'center', top: 90, fontSize: 16, marginTop: 3}}>Duration: {fancyTimeFormat(gameDuration)}</Text>
                </View>
                {renderBlueHeader()}
                {renderBlueTeam()}
                {renderRedHeader()}
                {renderRedTeam()}
            </ScrollView>
        </View>
    )
}

const {width, height} = Dimensions.get("window")

const styles = StyleSheet.create({
    championBox: {
        height: height / 10,
        marginBottom: 3,
        // borderColor: 'black',
        // borderWidth: 1,
        backgroundColor: 'white',
        elevation: 3
    },
    iconAndName: {
        height: height / 10,
        width: height / 10,
        backgroundColor: '#f0f0f0',
    },
    blueIcon: {
        height: 50,
        width: 50,
        borderRadius: 60,
        marginTop: 3,
        alignSelf: 'center',
        borderColor: '#55B1CE',
        borderWidth: 2,
    },
    redIcon: {
        height: 50,
        width: 50,
        borderRadius: 60,
        marginTop: 3,
        alignSelf: 'center',
        borderColor: '#DC5047',
        borderWidth: 2
    },
    summonerName: {
        position: 'absolute',
        left: height / 10 + 10,
        fontWeight: '100',
        fontSize: 16,
        marginTop: 3
    },
    kda: {
        position: 'absolute',
        left: height / 10 + 10,
        fontSize: 14,
        marginTop: 30,
        fontWeight: '300'
    },
    kdaValue: {
        position: 'absolute',
        left: height / 10 + 10,
        fontSize: 14,
        marginTop: 55,
        fontWeight: '300'
    },
    winView: {
        position: 'absolute',
        height: height/20,
        width: height/7.5,
        right: 0,
        backgroundColor: '#f5f24e'
    },
    win: {
        fontSize: 12,
        alignSelf: "center",
        position:'absolute',
        fontWeight: 'bold'
    },
    itemIcon: {
        height: 25,
        width: 25,
        borderColor: 'black',
        borderWidth: 1,
        marginLeft: 1,
        borderRadius: 5
    }
})