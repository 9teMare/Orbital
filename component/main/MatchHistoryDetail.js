import React, { useState, useEffect }  from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Dimensions, FlatList, Image} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

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

    const killsArr = []
    const [kills, setKills] = useState([])

    const deathsArr = []
    const [deaths, setDeaths] = useState([])

    const assistsArr = []
    const [assists, setAssists] = useState([])


    const getData = async () => {
        let isMounted = true
        const response = await fetch(gameUrl, {"method": "GET"})
        const responded = await response.json()
        
        const participant = responded.participants
        const identitiy = responded.participantIdentities
        
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

            setLoader(false)
        }
        return () => { isMounted = false }
    }
    
    const renderBlueHeader = () => {
        return (
            <View style={{backgroundColor: '#55B1CE', height: height/20}}>
                <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white', marginLeft: height / 40, marginTop: 5}}>Blue Team</Text>
            </View>
        )
    }

    const renderRedHeader = () => {
        return (
            <View style={{backgroundColor: '#DC5047', height: height/20, marginTop: 10}}>
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
                    <Text style={{backgroundColor: '#55BA46', color: 'white', borderRadius: 15, fontSize: 15}}> (Me) </Text>
                </Text> 
            </View>
        )
    }

    const renderBlueTeam = () => tempIndex.map(index => (     
        <View style={styles.championBox} key={index}>
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
        </View>
    ))

    const renderRedTeam = () => tempIndex.map(index => (
        <View style={styles.championBox} key={index}>
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
                <Text>{summonerName}</Text>
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
                <View style={{padding: 20}}></View>
            </ScrollView>
        </View>
    )
}

const {width, height} = Dimensions.get("window")

const styles = StyleSheet.create({
    championBox: {
        height: height / 8,
        marginBottom: 3,
        // borderColor: 'black',
        // borderWidth: 1,
        backgroundColor: 'white',
        elevation: 3
    },
    iconAndName: {
        height: height / 8,
        width: height / 8,
        backgroundColor: '#f0f0f0',
    },
    blueIcon: {
        height: 60,
        width: 60,
        borderRadius: 60,
        marginTop: 10,
        alignSelf: 'center',
        borderColor: '#55B1CE',
        borderWidth: 2
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
        left: height / 8 + 10,
        fontWeight: 'bold',
        fontSize: 17,
        marginTop: 5
    },
    kda: {
        position: 'absolute',
        left: height / 8 + 10,
        fontSize: 17,
        marginTop: 30
    },
    kdaValue: {
        position: 'absolute',
        left: height / 8 + 10,
        fontSize: 17,
        marginTop: 55
    }
})