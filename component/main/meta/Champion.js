import React, { useState } from 'react'
import {Text, View, StyleSheet, Image} from 'react-native'

export default function Champion() {
    const parsehubAPI_key = 'tyTAsTjarTE_'
    const championPatchNotes = 'https://parsehub.com/api/v2/projects/tkH-qST8aGc6/last_ready_run/data?api_key=' + parsehubAPI_key

    const [name, setName] = useState('')
    const [skills, setSkills] = useState('')
    const [stats1, setStats1] = useState('')
    const [stats2, setStats2] = useState('')
    const [stats3, setStats3] = useState('')
    const [stats4, setStats4] = useState('')

    const fetchChampionPatchNote = () => {
        fetch(championPatchNotes, {
            'method': 'GET'
        })
        .then(res => res.json())
        .then(res => {
            for (var i in res.data) {
                console.log(i)
            }
            
            setName(res.patch_note.name)
            setSkills(res.skills)
            setStats1(res.stats1)
            setStats2(res.stats2)
            setStats3(res.stats3)
            setStats4(res.stats4)
        })
    }


    // const Item = ({ item, weight, color}) => {
    //     <View>
    //         <Image style={styles.avatar}/>
    //         <Text style={styles.name}>
    //             Name
    //         </Text>
    //         <Text>
    //             Skill
    //         </Text>
    //         <Text>
    //             Stats
    //         </Text>
    //     </View>
    // }

    return (
        <Text>
            champion
            {fetchChampionPatchNote()}
            {name}
        </Text>
    )
}

// const styles = StyleSheet.create({
//     avatar: {

//     },
//     name: {

//     }
// })