import React, { useState, useEffect} from 'react'
import {Text, View, StyleSheet, Image, Dimensions, ScrollView, ActivityIndicator} from 'react-native'

export default function IdentifyRoles({ route, navigation}) {
    const {blueTeam, redTeam, gameId, apiKey, data, spell} = route.params
    const blueRoleArr = []
    const [blueRole, setBlueRole] = useState([])
    const blueLaneArr = []
    const [blueLane, setBlueLane] = useState([])

    const redRoleArr = []
    const [redRole, setRedRole] = useState([])
    const redLaneArr = []
    const [redLane, setRedLane] = useState([])
    
    const blueSpell1Arr = []
    const [blueSpell1, setBlueSpell1] = useState([])
    const blueSpell2Arr = []
    const [blueSpell2, setBlueSpell2] = useState([])

    const redSpell1Arr = []
    const [redSpell1, setRedSpell1] = useState([])
    const redSpell2Arr = []
    const [redSpell2, setRedSpell2] = useState([])

    const [isLoading, setLoader] = useState(true)

    const gameUrl = `https://na1.api.riotgames.com/lol/match/v4/matches/${gameId}?api_key=${apiKey}`

    const getRoleAndLane = async() => {
        let isMounted = true
        const response = await fetch(gameUrl, {"method": "GET"})
        const responded = await response.json()
        if (isMounted) {
            for (var i in responded["participants"]) {
                if (i < responded["participants"].length / 2) {
                    blueRoleArr.push(responded["participants"][i]["timeline"]["role"])
                    blueLaneArr.push(responded["participants"][i]["timeline"]["lane"])
                    blueSpell1Arr.push(spell[responded["participants"][i]["spell1Id"]])
                    blueSpell2Arr.push(spell[responded["participants"][i]["spell2Id"]])
                } else {
                    redRoleArr.push(responded["participants"][i]["timeline"]["role"])
                    redLaneArr.push(responded["participants"][i]["timeline"]["lane"])
                    redSpell1Arr.push(spell[responded["participants"][i]["spell1Id"]])
                    redSpell2Arr.push(spell[responded["participants"][i]["spell2Id"]])
                }
            }
            setBlueRole(blueRoleArr)
            setBlueLane(blueLaneArr)
            setRedRole(redRoleArr)
            setRedLane(redLaneArr)
            setBlueSpell1(blueSpell1Arr)
            setBlueSpell2(blueSpell2Arr)
            setRedSpell1(redSpell1Arr)
            setRedSpell2(redSpell2Arr)
            setLoader(false)
        }
        return () => { isMounted = false }    
    }

    useEffect(() => {
        getRoleAndLane()
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


    // const getPosition = (team) => {
    //     for (var i in team) {
    //         determinePosition(i)
    //     }
    // }

    return (
        <View>
           <Text>BLUE role: {blueRole.map(i => (i + " "))}</Text>
           <Text></Text>
           <Text>BLUE lane: {blueLane.map(i => (i + " "))}</Text>
           <Text></Text>
           <Text></Text>
           <Text></Text>
           <Text>RED role: {redRole.map(i => (i + " "))}</Text>
           <Text></Text>
           <Text>RED lane: {redLane.map(i => (i + " "))}</Text>
        </View>
    )
}

const {width, height} = Dimensions.get("window")