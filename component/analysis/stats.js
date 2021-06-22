import React, {useCallback, useState} from 'react'
import { View, Text, Button, } from 'react-native'

const TOP = 0, JUNGLE = 1, MID = 2, ADC = 3, SUPPORT = 4
const ASSASSIN = 0, FIGHTER = 1, MAGE = 2, MARKSMAN = 3, TANK = 5 //SUPPORT = 4
const BLUE = 0, RED = 1


export default function lane({route}) {
    const {blue, red} = route.params
    

    const fetching = async () => {
        var blueTag = []
        var redTag = []
        var damage_AD = [[], []], damage_AP = [[], []], assassin = [[], []], fighter = [[], []], heal_protect = [[], []], tank = [[], []] 
        const response = await fetch('http://ddragon.leagueoflegends.com/cdn/11.12.1/data/en_US/champion.json')
        const responded = response.json()
        const data = responded.data

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

        for (let i=0; i<5; i++) {
            const blueName = new String
            blueName = blue[i]
            const redName = new String
            redName = red[i]

            blueTag.push(data[blueName]["tags"])
            redTag.push(data[redName]["tags"])
        }

        var j; 
            for (j=0; j<5; j++) {
                var k; 
                for (k=0; k<blueTag[j].length; k++) {
                    catagorize(blue[j], blueTag[j][k], BLUE)
                }
            var l;
                for (l=0; l<redTag[j].length; l++) {
                    catagorize(red[j], redTag[j][l], RED)
                }
            }
        return [assassin, fighter, damage_AP, damage_AD,heal_protect, tank]
    }    

    const allTagsSorted = fetching()
    console.log(allTagsSorted)
    
    return (
       <Text> hi</Text>
    )
}
