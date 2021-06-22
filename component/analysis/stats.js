import React, {useCallback, useState} from 'react'
import { View, Text, Button, } from 'react-native'

const TOP = 0, JUNGLE = 1, MID = 2, ADC = 3, SUPPORT = 4
const ASSASSIN = 0, FIGHTER = 1, MAGE = 2, MARKSMAN = 3, TANK = 5 //SUPPORT = 4
const BLUE = 0, RED = 1






export default function lane({route}) {
    const {blue, red} = route.params
    var blueTag = []
    var redTag = []

    // const fetching = async () => {
    //     const response = await fetch('http://ddragon.leagueoflegends.com/cdn/11.12.1/data/en_US/champion.json')
    //     const responded = await response.json()
    //     const data = await responded.data
    //     console.log(data)
    //     for (let i=0; i<5; i++) {
    //         const blueName = new String
    //         blueName = blue[i]
    //         const redName = new String
    //         redName = red[i]
            
    //         blueTag.push(data[blueName]["tags"])
    //         redTag.push(data[redName]["tags"])
    //     }
    // }

    // fetching();

        
    for (let i=0; i<5; i++) {
        const blueName = new String
        blueName = blue[i]
        const redName = new String
        redName = red[i]

        fetch('http://ddragon.leagueoflegends.com/cdn/11.12.1/data/en_US/champion.json')
        .then((response) => response.json())
        .then((response) => response.data)
        .then((response) => {
            blueTag.push(response[blueName]["tags"])
            redTag.push(response[redName]["tags"])
        })
        .catch((error) => console.error(error))
    }
    console.log(blueTag)

    const damage_AD = [[], []], damage_AP= [[], []], heal_protect= [[], []], assassin= [[], []], tank= [[], []], fighter = [[], []]

    const catagorize = (champ, s, sideInt) => { //0 = blue, 1 = red
        if (s === "Support") {
            heal_protect[sideInt].push(champ)
        }
        if (s === "Marksman") {
            damage_AD[sideInt].push(champ)
        }
        if (s === "Fighter") {
            fighter[sideInt].push(champ)
        }
        if (s === "Assassin") {
            assassin[sideInt].push(champ)
        }
        if (s === "Mage") {
            damage_AP[sideInt].push(champ)
        }
        if (s === "Tank") {
            tank[sideInt].push(champ)
        }
    }


    // var j; 
    // for (j=0; j<5; j++) {
    //     var k; 
    //     for (k=0; k<blueTag[j].length(); k++) {
    //         catagorize(blue[j], blueTag[j][k], BLUE)
    //     }
    //     var l;
    //     for (l=0; l<redTag[j].length(); l++) {
    //         catagorize(red[j], redTag[j][l], RED)
    //     }
    // }

    console.log(damage_AD)
    console.log(damage_AP)


    // var b;
    // for(b=0; b<5; b++) {
    //     if (blueTag[b].length() === 0) {
    //         catagorize(blue[b], blueTag[b][0], BLUE);
    //     } else {
    //         if (blueTag[b][0] === "Fighter") {
    //             catagorize(blue[b], blueTag[b][1], BLUE)
    //         }
    //         if (blueTag[b][0] === "Support") {
    //             catagorize(blue[b], blueTag[b][0], BLUE)
    //         } if (blueTag[b][0] === "Mage") {
    //             catagorize(blue[b], blueTag[b][0], BLUE)

    //         }
    //     }
    // }




/*

    If only has 1 tag, put into their own places

    If first tag is fighter AND only has fighter tag, put into fighter.
    If first tag is fighter but has other tags, put into other tags.
    Others, put in corresponding cats --> 
        marksman -> ad damange
        mage -> ap damage
        support -> healing/protection
        assassin -> assassination
        tank -> tanking


    possible combinations: 
        assassin with anything
        tank & support

        mage 0 && sp 1 works

    if first is support, nth else should be put in
    if first is marksman and 2nd is sp, do not put in


    NOW, i can get things like 
        blueTags: [[tank, sp], [mage, assassin], [fighter], [fighter, assassin], [marksman]]
    


*/
    


    


    return (
        <Text>
            stats
        </Text>
    )
}
