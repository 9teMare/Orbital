import React, {useEffect, useState} from 'react'
import { View, Text, Button, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native'
import Unorderedlist from 'react-native-unordered-list';

function roleLackingMessage(str) { 
    if (str === "Assassin") {
        return ("No assassin in the current team. "
                + "This may reduce the current team's ability of catching the enemy's backline and assasinating the carry, which makes the current team more difficult to initiate and take a teamfight from the opponent.")
    } 
    if (str === "Mage") {
        return ("No mage in the current team. "
                + "This may result in the opponent team completely ignoring building magic resistance items and building armor items straight away, the current team's teamfight damage will be drastically reduced.")
    }
    if (str === "Fighter") {
        return ("No fighter in the current team. "
                + "A fighter is a role who is comprehensive of almost every aspects, lacking a fighter might reduce the team's split push, frontline tanking ability and consistant damage output depending on the composition.")
    }
    if (str === "Marksman") {
        return ("No marksman in the current team. "
                + "This may result in the opponent team completely ignoring building physical defensive items and building magis resistance items straight away. The current team's teamfight damage will be drastically reduced.")

    }
    if (str === "Support") {
        return ("No support in the current team. "
            + "This might indicate that there are no protection provided for the damage dealers, who are usually easily caught if there is an engager in the opposite team.")
    }
    if (str === "Tank") {
        return ("No tank in the current team. "
            + "This might result in reduced ability to kite with the opponent team in teamfights, making the team easier to get all in by the enemies. Lacking a tank might also force the other frontline champions, e.g. fighter or support to build more tank items.")
    }
}



export default function adviceRed({route}) {
    const TOP = 0, JUNGLE = 1, MID = 2, ADC = 3, SUPPORT = 4

    const {blue, red} = route.params
    const [redRoleMissing, setRedRoleMissing] = useState([])

    const [redAllyTips, setRedAllyTips] = useState([])
    const [blueEnemyTips, setBlueEnemyTips] = useState([])

    const [selectedAlly, setSelectedAlly] = useState(null)
    const [selectedEnemy, setSelectedEmeny] = useState(null)
    const ROLES = ["Assassin", "Fighter", "Marksman", "Support", "Tank", "Mage"]

    const fetching = async () => {
        var roles = []
        var allyTips = []
        var enemyTips = []

        for (let i=0; i<5; i++) {
            const redName = new String
            redName = red[i]
            const blueName = new String
            blueName = blue[i]

            const response = await fetch("http://ddragon.leagueoflegends.com/cdn/11.12.1/data/en_US/champion/" + redName +".json")
            const responded = await response.json()
            const data = responded.data

            const response_enemy = await fetch("http://ddragon.leagueoflegends.com/cdn/11.12.1/data/en_US/champion/" + blueName +".json")
            const responded_enemy = await response_enemy.json()
            const data_enemy = responded_enemy.data

            //getting missing roles
            const tagArr = data[redName]["tags"]
            for (let j = 0; j < tagArr.length; j++) {
                roles.push(tagArr[j])
            }

            //getting ally Tips
            const allyTips_individual = data[redName]["allytips"]
            allyTips.push(allyTips_individual)

            //getting enemy tips
            const enemyTips_individual = data_enemy[blueName]["enemytips"]
            enemyTips.push(enemyTips_individual)
 
        }
        
        const s = new Set(roles)
        const missingRoles = []
        for (let n=0; n<6; n++) {
            if (!s.has(ROLES[n])) {
                missingRoles.push(ROLES[n])
            }
        }
        setRedRoleMissing(missingRoles)
        setRedAllyTips(allyTips)
        setBlueEnemyTips(enemyTips)
    }

    useEffect(() => {
        fetching()
       }, []);

    const Item_roleMissing = ({roleMissing_message}) => {
        return(
        <View style={{marginBottom:5, marginTop:5}}>
            <Unorderedlist><Text>{roleMissing_message}</Text></Unorderedlist>
        </View>
        )
    }

    const renderItem_roleMissing = (role) => {
        return(
            <Item_roleMissing roleMissing_message={roleLackingMessage(role.item)}/>
        ) 
    }

    const displayTips = (arr) => {
        return arr.map(function(element, i) {
            return (
                <View key={i} style={{marginTop:3, marginBottom:3}}>
                    <Unorderedlist><Text>{element}</Text></Unorderedlist>
                </View>
            )
        })
    }


    return (
        <ScrollView>
        <View style={{backgroundColor:"white"}}>
        <View style ={{marginLeft:20, marginRight:20, marginBottom:5}}>
            <Text style={{fontSize: 18, fontWeight:'500', marginLeft:10, marginTop:10}}>Roles</Text>
                <View style={{flexDirection:'row', justifyContent:"space-evenly", marginTop:10}}>
                <Image
                    source = {require('../../pictures/others/Assassin.png')}
                    style = {redRoleMissing.includes("Assassin") 
                            ? {height:45, width:45, tintColor: "grey"}
                            : {height:45, width:45}}
                />
                <Image
                    source = {require('../../pictures/others/Mage.png')}
                    style = {redRoleMissing.includes("Mage") 
                            ? {height:45, width:45, tintColor: "grey"}
                            : {height:45, width:45}}
                />
                <Image
                    source = {require('../../pictures/others/Marksman.png')}
                    style = {redRoleMissing.includes("Marksman") 
                            ? {height:45, width:45, tintColor: "grey"}
                            : {height:45, width:45}}
                />
                <Image
                    source = {require('../../pictures/others/Fighter.png')}
                    style = {redRoleMissing.includes("Fighter") 
                            ? {height:45, width:45, tintColor: "grey"}
                            : {height:45, width:45}}
                />
                <Image
                    source = {require('../../pictures/others/Tank.png')}
                    style = {redRoleMissing.includes("Tank") 
                            ? {height:45, width:45, tintColor: "grey"}
                            : {height:45, width:45}}
                />
                <Image
                    source = {require('../../pictures/others/Support.png')}
                    style = {redRoleMissing.includes("Support") 
                            ? {height:45, width:45, tintColor: "grey"}
                            : {height:45, width:45}}
                />
                </View>
                {redRoleMissing.length === 0 
                    ? <Text>The team contains all main roles.</Text>
                    : <FlatList
                    data = {redRoleMissing}
                    renderItem = {renderItem_roleMissing}
                    keyExtractor={item => item}

                />}
            
        </View>
        </View>

        {/* ally tips */}
        <View style={{backgroundColor: "white", marginTop:5}}>
            <Text style={{fontSize: 18, fontWeight:'500', marginLeft:24, marginTop:10}}>Ally Tips</Text>
            <View style={{flexDirection:"row", justifyContent:"space-evenly", marginTop:10, marginBottom:5}}> 
                <TouchableOpacity onPress={() => setSelectedAlly(TOP)}>
                <Image 
                    source={{uri: 'http://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/' + red[TOP] + '.png'}}
                    style = {TOP === selectedAlly ? {height:45, width:45, borderColor:"#DC5047", borderWidth:2} 
                                                        : {height:45, width:45}}  
                />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelectedAlly(JUNGLE)}>
                <Image 
                    source={{uri: 'http://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/' + red[JUNGLE] + '.png'}}
                    style = {JUNGLE === selectedAlly ? {height:45, width:45, borderColor:"#DC5047", borderWidth:2} 
                                                        : {height:45, width:45}}
                />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelectedAlly(MID)}>
                <Image 
                    source={{uri: 'http://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/' + red[MID] + '.png'}}
                    style = {MID === selectedAlly ? {height:45, width:45, borderColor:"#DC5047", borderWidth:2} 
                                                        : {height:45, width:45}}
                />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelectedAlly(ADC)}>
                <Image 
                    source={{uri: 'http://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/' + red[ADC] + '.png'}}
                    style = {ADC === selectedAlly ? {height:45, width:45, borderColor:"#DC5047", borderWidth:2} 
                                                        : {height:45, width:45}}
                />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelectedAlly(SUPPORT)}>
                <Image 
                    source={{uri: 'http://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/' + red[SUPPORT] + '.png'}}
                    style = {SUPPORT === selectedAlly ? {height:45, width:45, borderColor:"#DC5047", borderWidth:2} 
                                                        : {height:45, width:45}}
                />
                </TouchableOpacity>


            </View>
            { selectedAlly === null
                    ? <View>
                        <Text style={{alignSelf:"center", marginTop: 5, marginBottom:5, fontWeight:"500"}}> Select a champion above to view ally tips.</Text>
                    </View>
                    : <View style={{marginRight:20, marginLeft:20, marginTop:5, marginBottom:5}}> 
                        {displayTips(redAllyTips[selectedAlly])}
                    </View>
            }

        </View>

        {/* enemy tips */}
        <View style={{backgroundColor: "white", marginTop:5}}>
            <Text style={{fontSize: 18, fontWeight:'500', marginLeft:24, marginTop:10}}>Enemy Tips</Text>
            <View style={{flexDirection:"row", justifyContent:"space-evenly", marginTop:10, marginBottom:5}}> 
                <TouchableOpacity onPress={() => setSelectedEmeny(TOP)}>
                <Image 
                    source={{uri: 'http://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/' + blue[TOP] + '.png'}}
                    style = {TOP === selectedEnemy ? {height:45, width:45, borderColor:"#DC5047", borderWidth:2} 
                                                        : {height:45, width:45}}  
                />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelectedEmeny(JUNGLE)}>
                <Image 
                    source={{uri: 'http://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/' + blue[JUNGLE] + '.png'}}
                    style = {JUNGLE === selectedEnemy ? {height:45, width:45, borderColor:"#DC5047", borderWidth:2} 
                                                        : {height:45, width:45}}
                />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelectedEmeny(MID)}>
                <Image 
                    source={{uri: 'http://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/' + blue[MID] + '.png'}}
                    style = {MID === selectedEnemy ? {height:45, width:45, borderColor:"#DC5047", borderWidth:2} 
                                                        : {height:45, width:45}}
                />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelectedEmeny(ADC)}>
                <Image 
                    source={{uri: 'http://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/' + blue[ADC] + '.png'}}
                    style = {ADC === selectedEnemy ? {height:45, width:45, borderColor:"#DC5047", borderWidth:2} 
                                                        : {height:45, width:45}}
                />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelectedEmeny(SUPPORT)}>
                <Image 
                    source={{uri: 'http://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/' + blue[SUPPORT] + '.png'}}
                    style = {SUPPORT === selectedEnemy ? {height:45, width:45, borderColor:"#DC5047", borderWidth:2} 
                                                        : {height:45, width:45}}
                />
                </TouchableOpacity>


            </View>
            { selectedEnemy === null
                    ? <View>
                        <Text style={{alignSelf:"center", marginTop: 5, marginBottom:5, fontWeight:"500"}}> Select a champion above to view enemy tips.</Text>
                    </View>
                    : <View style={{marginRight:20, marginLeft:20, marginTop:5, marginBottom:5}}> 
                        {displayTips(blueEnemyTips[selectedEnemy])}
                    </View>
            }

        </View>
        </ScrollView>
    )
}
