import React, { useState, useEffect} from 'react'
import {Text, View, StyleSheet, Image, Dimensions} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

export default function RedPerformance({ route, navigation}) {
    const {gameId, apiKey, data, redTeam, index, participants, participantIdentities} = route.params
    var redIndex = index + 5

    return (
        <View>
            <View style={styles.iconAndName}>
                <Image
                    source={{uri: `http://ddragon.leagueoflegends.com/cdn/11.15.1/img/champion/${data[redTeam[index]["championId"]]}.png`}}
                    style={styles.championIcon}
                />
                <Text style={styles.summonerName}>
                    {participantIdentities[redIndex]["player"]["summonerName"]}
                </Text>
            </View>
        </View>
    )
}

const {width, height} = Dimensions.get("window")

const styles = StyleSheet.create({
    iconAndName: {
        alignItems: 'center',
        width: width,
        backgroundColor: 'white',
        elevation: 3
    },
    championIcon: {
        height: 100,
        width: 100,
        borderRadius: 50,
        alignSelf: 'center',
        marginTop: 20,
        borderColor: '#DC5047',
        borderWidth: 3,
    },
    summonerName: {
        alignSelf: 'center',
        fontSize: 20,
        marginTop: 10,
        marginBottom: 20
    }
})