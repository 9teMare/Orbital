import React, { useState, useEffect }  from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Dimensions, FlatList, Image} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import  MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Icon } from 'react-native-elements'
import { MessageOutlined  } from '@ant-design/icons';

export default function MatchHistory({ route, navigation}) {
    const {gameId, apiKey, data, summonerName} = route.params
    const gameUrl = `https://na1.api.riotgames.com/lol/match/v4/matches/${gameId}?api_key=${apiKey}`
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

    const getData = async () => {
        let isMounted = true
        const response = await fetch(gameUrl, {"method": "GET"})
        const responded = await response.json()
        
        const participant = responded.participants
        const identitiy = responded.participantIdentities
        const team = responded.teams
        
        for (var i = 0; i < participant.length/2 ; i++) {
            tempIndexArr[i] = i
        }
        
        setTempIndex(tempIndexArr)

        if (isMounted) {
            setParticipants(participant)
            setParticipantIdentities(identitiy)

            for (var i = 0; i < participant.length; i ++) {
                if (i < participant.length / 2) {
                    blueTeamArr.push(participant[i])
                    blueTeamIdentitiesArr.push(identitiy[i])
                } else {
                    redTeamArr.push(participant[i])
                    redTeamIdentitiesArr.push(identitiy[i])
                }
            }
            setBlueTeam(blueTeamArr)
            setBlueTeamIdentities(blueTeamIdentitiesArr)
            setRedTeam(redTeamArr)
            setRedTeamIdentities(redTeamIdentitiesArr)

            setBlueTeamWin(team[0])
            setRedTeamWin(team[1])

            setLoader(false)
        }
        return () => { isMounted = false }
    }
    
    const winLoseIcon = (win) => {
        if (win === "Win") {
            return <MaterialCommunityIcons name="emoticon-cool-outline" size={26} style={{position: 'absolute', top: 5, left: 5}}/>
        }
        return <MaterialCommunityIcons name="emoticon-dead-outline" size={26} style={{position: 'absolute', top: 5, left: 5}}/>
    }

    const renderBlueHeader = () => {
        return (
            <View style={{backgroundColor: '#55B1CE', height: height/20}}>
                <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white', marginLeft: height / 40, marginTop: 5}}>Blue Team</Text>
                <View style={styles.winView}>
                    {winLoseIcon(blueTeamWin["win"])}
                    <Text style={styles.win}>{blueTeamWin["win"]}</Text>
                </View>
            </View>
        )
    }

    const renderRedHeader = () => {
        return (
            <View style={{backgroundColor: '#DC5047', height: height/20, marginTop: 10}}>
                <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white', marginLeft: height / 40, marginTop: 5}}>Red Team</Text>
                <View style={styles.winView}>
                    {winLoseIcon(redTeamWin["win"])}
                    <Text style={styles.win}>{redTeamWin["win"]}</Text>
                </View>
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
                    <Text style={{backgroundColor: '#55BA46', color: 'white', borderRadius: 15, fontSize: 15}}> (Me) </Text>
                </Text> 
            </View>
        )
    }

    const renderItem = (itemId) => {
        if (itemId !== 0) {
            return (
                <Image source={{uri: `http://ddragon.leagueoflegends.com/cdn/11.15.1/img/item/${itemId}.png`}} style={styles.itemIcon}/>
            )
        }
        return (
            <View style={{height: 29, width: 29, backgroundColor: '#474747', marginLeft: 1, borderColor: 'black', borderWidth: 1,  borderRadius: 5}}></View>
        )
    }

    const renderBlueTeam = () => tempIndex.map(index => (     
        <View style={styles.championBox} key={index}>
            <TouchableOpacity activeOpacity={0.7}>
                <View style={styles.iconAndName}>
                    <Image
                        source={{uri: `http://ddragon.leagueoflegends.com/cdn/11.15.1/img/champion/${data[blueTeam[index]["championId"]]}.png`}}
                        style= {styles.blueIcon}
                    />
                    <Text style= {styles.name}>
                        {data[blueTeam[index]["championId"]]}
                    </Text>
                </View>
                <Text style={styles.summonerName}>
                    {currentSummoner(blueTeamIdentities[index]["player"]["summonerName"])}
                    {/* {blueTeamIdentities[index]["player"]["summonerName"]} */}
                </Text>
                <Text style={styles.kda}>
                    {blueTeam[index]["stats"]["kills"]}/{blueTeam[index]["stats"]["deaths"]}/{blueTeam[index]["stats"]["assists"]}
                </Text>
                <Text style={styles.kdaValue}>
                    KDA: {((parseInt(blueTeam[index]["stats"]["kills"]) + parseInt(blueTeam[index]["stats"]["assists"]))/parseInt(blueTeam[index]["stats"]["deaths"])).toFixed(2)}
                </Text>
                <View style={{position: 'absolute', height: 65 ,width: 125, left: width - 190, top: 30, backgroundColor: '#969696c0', borderRadius: 5}}>
                    <View style={{flexDirection: 'row', alignSelf: 'center', marginTop: 3}}>
                        {renderItem(blueTeam[index]["stats"]["item0"])}
                        {renderItem(blueTeam[index]["stats"]["item1"])}
                        {renderItem(blueTeam[index]["stats"]["item2"])}
                        {renderItem(blueTeam[index]["stats"]["item3"])}
                    </View>
                    <View style={{flexDirection: 'row', marginTop: 1, alignSelf: 'center'}}>
                        {renderItem(blueTeam[index]["stats"]["item4"])}
                        {renderItem(blueTeam[index]["stats"]["item5"])}
                        {renderItem(blueTeam[index]["stats"]["item6"])}
                    </View>
                </View>
                <View style={{position: 'absolute', right: 10, top: 30}}>
                    <Icon name="arrow-right" size={40} color={'grey'}/>
                </View>
            </TouchableOpacity>
                  
        </View>
    ))

    const renderRedTeam = () => tempIndex.map(index => (
        <View style={styles.championBox} key={index}>
            <TouchableOpacity activeOpacity={0.7}>
                <View style={styles.iconAndName}>
                    <Image
                        source={{uri: `http://ddragon.leagueoflegends.com/cdn/11.15.1/img/champion/${data[redTeam[index]["championId"]]}.png`}}
                        style= {styles.redIcon}
                    />
                    <Text style= {styles.name}>
                        {data[redTeam[index]["championId"]]}
                    </Text>
                </View>
                <Text style={styles.summonerName}>
                    {currentSummoner(redTeamIdentities[index]["player"]["summonerName"])}
                    {/* {redTeamIdentities[index]["player"]["summonerName"]} */}
                </Text>
                <Text style={styles.kda}>
                    {redTeam[index]["stats"]["kills"]}/{redTeam[index]["stats"]["deaths"]}/{redTeam[index]["stats"]["assists"]}
                </Text>
                <Text style={styles.kdaValue}>
                    KDA: {((parseInt(redTeam[index]["stats"]["kills"]) + parseInt(redTeam[index]["stats"]["assists"]))/parseInt(redTeam[index]["stats"]["deaths"])).toFixed(2)}
                </Text>
                <View style={{position: 'absolute', height: 65 ,width: 125, left: width - 190, top: 30, backgroundColor: '#969696c0', borderRadius: 5}}>
                    <View style={{flexDirection: 'row', alignSelf: 'center', marginTop: 3}}>
                        {renderItem(redTeam[index]["stats"]["item0"])}
                        {renderItem(redTeam[index]["stats"]["item1"])}
                        {renderItem(redTeam[index]["stats"]["item2"])}
                        {renderItem(redTeam[index]["stats"]["item3"])}
                    </View>
                    <View style={{flexDirection: 'row', marginTop: 1, alignSelf: 'center'}}>
                        {renderItem(redTeam[index]["stats"]["item4"])}
                        {renderItem(redTeam[index]["stats"]["item5"])}
                        {renderItem(redTeam[index]["stats"]["item6"])}
                    </View>
                </View>
                <View style={{position: 'absolute', right: 10, top: 30}}>
                    <Icon name="arrow-right" size={40} color={'grey'}/>
                </View>
            </TouchableOpacity>
        </View>
    ))  

    useEffect(() => {
        getData()
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
            <ScrollView>
                <TouchableOpacity style={{backgroundColor: '#d4d6d5', height: 50, 
                                        elevation: 2, 
                                        borderColor: '#b8bab9', borderWidth: 1
                                        }}>
                    <Text style={{alignSelf: 'center', marginTop: 10, fontSize: 15, fontWeight: 'bold', color: 'white'}}>Analyse This Team Composition</Text>
                </TouchableOpacity>
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
        height: height / 7.5,
        marginBottom: 3,
        // borderColor: 'black',
        // borderWidth: 1,
        backgroundColor: 'white',
        elevation: 3
    },
    iconAndName: {
        height: height / 7.5,
        width: height / 10,
        backgroundColor: '#f0f0f0',
    },
    blueIcon: {
        height: 60,
        width: 60,
        borderRadius: 60,
        marginTop: 10,
        alignSelf: 'center',
        borderColor: '#55B1CE',
        borderWidth: 2,
    },
    redIcon: {
        height: 60,
        width: 60,
        borderRadius: 60,
        marginTop: 10,
        alignSelf: 'center',
        borderColor: '#DC5047',
        borderWidth: 2
    },
    name: {
        alignSelf: 'center',
        fontSize: 15,
        fontWeight: 'bold'
    },
    summonerName: {
        position: 'absolute',
        left: height / 10 + 10,
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 5
    },
    kda: {
        position: 'absolute',
        left: height / 10 + 10,
        fontSize: 14,
        marginTop: 42,
        fontWeight: '300'
    },
    kdaValue: {
        position: 'absolute',
        left: height / 10 + 10,
        fontSize: 14,
        marginTop: 78,
        fontWeight: '300'
    },
    winView: {
        position: 'absolute',
        height: height/20,
        width: height/10,
        right: 0,
        backgroundColor: '#f5f24e'
    },
    win: {
        fontSize: 20,
        alignSelf: "center",
        position:'absolute',
        right: 11,
        top: 5,
        fontWeight: 'bold'
    },
    itemIcon: {
        height: 29,
        width: 29,
        borderColor: 'black',
        borderWidth: 1,
        marginLeft: 1,
        borderRadius: 5
    }
})