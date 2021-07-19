import React, {useEffect, useState} from 'react'
import { View, Text, Button, FlatList, Image } from 'react-native'
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
    const {blue, red} = route.params
    const [redRoleMissing, setRedRoleMissing] = useState([])
    const ROLES = ["Assassin", "Fighter", "Marksman", "Support", "Tank", "Mage"]

    const fetching = async () => {
        var roles = []

        const response = await fetch('http://ddragon.leagueoflegends.com/cdn/11.12.1/data/en_US/champion.json')
        const responded = await response.json()
        const data = responded.data

        for (let i=0; i<5; i++) {
            const redName = new String
            redName = red[i]
            const tagArr = data[redName]["tags"]
            for (let j = 0; j < tagArr.length; j++) {
                roles.push(tagArr[j])
            }
        }
        
        const s = new Set(roles)
        const missingRoles = []
        for (let n=0; n<6; n++) {
            if (!s.has(ROLES[n])) {
                missingRoles.push(ROLES[n])
            }
        }
        setRedRoleMissing(missingRoles)
    }

    useEffect(() => {
        fetching()
       }, []);

    const Item_roleMissing = ({roleMissing_message}) => {
        return(
        <View style={{marginBottom:5}}>
            <Unorderedlist><Text>{roleMissing_message}</Text></Unorderedlist>
        </View>
        )
    }

    const renderItem_roleMissing = (role) => {
        return(
            <Item_roleMissing roleMissing_message={roleLackingMessage(role.item)}/>
        ) 
    }


    return (
        <View style ={{marginLeft:20, marginRight:20}}>
            <Text style={{fontSize: 18, fontWeight:'500', marginLeft:10, marginTop:10}}>Roles</Text>
                <View style={{flexDirection:'row', justifyContent:"space-evenly", marginTop:10}}>
                <Image
                    source = {require('../../pictures/others/Assassin.png')}
                    style = {redRoleMissing.includes("Assassin") 
                            ? {height:43, width:57, tintColor: "grey"}
                            : {height:43, width:57}}
                />
                <Image
                    source = {require('../../pictures/others/Mage.png')}
                    style = {redRoleMissing.includes("Mage") 
                            ? {height:54, width:53, tintColor: "grey"}
                            : {height:54, width:53}}
                />
                <Image
                    source = {require('../../pictures/others/Marksman.png')}
                    style = {redRoleMissing.includes("Marksman") 
                            ? {height:47, width:51, tintColor: "grey"}
                            : {height:47, width:51}}
                />
                <Image
                    source = {require('../../pictures/others/Fighter.png')}
                    style = {redRoleMissing.includes("Fighter") 
                            ? {height:39, width:47, tintColor: "grey"}
                            : {height:39, width:47}}
                />
                <Image
                    source = {require('../../pictures/others/Tank.png')}
                    style = {redRoleMissing.includes("Tank") 
                            ? {height:47, width:42, tintColor: "grey"}
                            : {height:47, width:42}}
                />
                <Image
                    source = {require('../../pictures/others/Support.png')}
                    style = {redRoleMissing.includes("Support") 
                            ? {height:49, width:60, tintColor: "grey"}
                            : {height:49, width:60}}
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
    )
}
