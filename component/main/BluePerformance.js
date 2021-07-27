import React, { useState, useEffect} from 'react'
import {Text, View, StyleSheet, Image, Dimensions, ScrollView, TouchableOpacity} from 'react-native'
import { Tooltip } from 'react-native-elements/dist/tooltip/Tooltip'
import CollapsibleView from "@eliav2/react-native-collapsible-view"

export default function BluePerformance({ route, navigation}) {
    const {gameId, apiKey, data, blueTeam, index, participants, participantIdentities} = route.params

    const renderItem = (itemId) => {
        if (itemId !== 0) {
            return (
                <Image source={{uri: `http://ddragon.leagueoflegends.com/cdn/11.15.1/img/item/${itemId}.png`}} style={styles.itemIcon}/>
            )
        }
        return (
            <View style={{height: 45, width: 45, backgroundColor: '#474747', marginLeft: 1, borderColor: 'black', borderWidth: 1, marginRight: 1, borderRadius: 5}}></View>
        )
    }

    const items = () => {
        return (
            <View style={{flexDirection: 'row', marginLeft: 3, marginRight: 3}}>
                {renderItem(blueTeam[index]["stats"]["item0"])}
                {renderItem(blueTeam[index]["stats"]["item1"])}
                {renderItem(blueTeam[index]["stats"]["item2"])}
                {renderItem(blueTeam[index]["stats"]["item3"])}
                {renderItem(blueTeam[index]["stats"]["item4"])}
                {renderItem(blueTeam[index]["stats"]["item5"])}
                {renderItem(blueTeam[index]["stats"]["item6"])}
            </View>
        )
    }

    const displayKills = (killType , killNumber) => {
        if (killNumber === 0) {
            return
        }
        return (
            <View style={{backgroundColor: '#00203FFF', elevation: 3, flexDirection: 'row', borderRadius: 3, alignItems: 'center', alignSelf: 'center', justifyContent: 'space-evenly', marginTop: 25}}>
                <Text style={{fontSize: 17, marginTop: 1, marginLeft: 5, marginRight: 3, marginBottom: 1, fontWeight: 'bold', color: '#ADEFD1FF'}}>
                    {killType}:
                </Text> 
                <Text style={{fontSize: 17, marginTop: 1, marginLeft: 2, marginRight: 5, marginBottom: 1, color: '#ADEFD1FF'}}>{killNumber}</Text>
            </View>
        )
    }

    const double = blueTeam[index]["stats"]["doubleKills"]
    const triple = blueTeam[index]["stats"]["tripleKills"]
    const quadra = blueTeam[index]["stats"]["quadraKills"]
    const penta = blueTeam[index]["stats"]["quadraKills"]
    const killingSpree = blueTeam[index]["stats"]["killingSprees"]


    const kills = () => {
        if (double + triple + quadra + penta + killingSpree === 0) {
            return
        }
        return (
            <View style={{flexDirection: 'row', alignSelf: 'center', alignItems: 'center', backgroundColor: 'white', width: width, justifyContent: 'space-evenly', marginTop: 5, elevation: 1, flexWrap: 'wrap'}}>
                {displayKills("Killing Sprees", killingSpree)}
                {displayKills("Double Kills", double)}
                {displayKills("Triple Kills", triple)}
                {displayKills("Quadra Kills", quadra)}
                {displayKills("Penta Kills", penta)}
            </View>
        )
    }

    const kda = () => {
        return (
            <View style={{alignItems: 'center', marginBottom: 10}}>
                <Text style={{fontSize: 18}}>
                    KDA: {blueTeam[index]["stats"]["kills"]}/{blueTeam[index]["stats"]["deaths"]}/{blueTeam[index]["stats"]["assists"]}
                </Text>
            </View>
        )
    }

    const damageDealt = () => {
        return (
            <View>
                <CollapsibleView title={<Text style={{color: 'black', fontSize: 18, marginTop: 8, marginBottom: 8}}>Damage</Text>} style={{backgroundColor: 'white', width: width, marginLeft: 0, borderColor: 'white', elevation: 1}}>
                    <View>
                        <View style={styles.lineView}>
                            <Text style={styles.lineTextLeft}>
                                Total Damage 
                            </Text>
                            <Text style={styles.lineTextRight}>
                                {blueTeam[index]["stats"]["totalDamageDealt"]}
                            </Text>
                        </View>

                        <View style={styles.lineView}>
                            <Text style={styles.lineTextLeft}>
                                Magical Damage
                            </Text>
                            <Text style={styles.lineTextRight}>
                                {blueTeam[index]["stats"]["magicDamageDealt"]}
                            </Text>
                        </View>

                        <View style={styles.lineView}>
                            <Text style={styles.lineTextLeft}>
                                Physical Damage
                            </Text>
                            <Text style={styles.lineTextRight}>
                                {blueTeam[index]["stats"]["physicalDamageDealt"]}
                            </Text>
                        </View>

                        <View style={styles.lineView}>
                            <Text style={styles.lineTextLeft}>
                                True Damage
                            </Text>
                            <Text style={styles.lineTextRight}>
                                {blueTeam[index]["stats"]["trueDamageDealt"]}
                            </Text>
                        </View>
                    </View>
                
                    <View>
                        <View style={styles.lineView}>
                            <Text style={styles.lineTextLeft}>
                                Total Damage To Champions
                            </Text>
                            <Text style={styles.lineTextRight}>
                                {blueTeam[index]["stats"]["totalDamageDealtToChampions"]}
                            </Text>
                        </View>

                        <View style={styles.lineView}>
                            <Text style={styles.lineTextLeft}>
                                Magic Damage To Champions
                            </Text>
                            <Text style={styles.lineTextRight}>
                                {blueTeam[index]["stats"]["magicDamageDealtToChampions"]}
                            </Text>
                        </View>

                        <View style={styles.lineView}>
                            <Text style={styles.lineTextLeft}>
                                Physical Damage To Champions
                            </Text>
                            <Text style={styles.lineTextRight}>
                                {blueTeam[index]["stats"]["physicalDamageDealtToChampions"]}
                            </Text>
                        </View>

                        <View style={styles.lineView}>
                            <Text style={styles.lineTextLeft}>
                                True Damage To Champions
                            </Text>
                            <Text style={styles.lineTextRight}>
                                {blueTeam[index]["stats"]["trueDamageDealtToChampions"]}
                            </Text>
                        </View>
                    </View>
                </CollapsibleView>        
            </View>
        )
    }

    const damageTaken = () => {
        return (
            <View>
                <CollapsibleView title={<Text style={{color: 'black', fontSize: 18, marginTop: 8, marginBottom: 8}}>Damage Taken</Text>} style={{backgroundColor: 'white', width: width, marginLeft: 0, marginTop: 0, borderColor: 'white', elevation: 1}}>
                    <View>
                        <View style={styles.lineView}>
                            <Text style={styles.lineTextLeft}>
                                Total Damage Taken
                            </Text>
                            <Text style={styles.lineTextRight}>
                                {blueTeam[index]["stats"]["totalDamageTaken"]}
                            </Text>
                        </View>

                        <View style={styles.lineView}>
                            <Text style={styles.lineTextLeft}>
                                Magical Damage Taken
                            </Text>
                            <Text style={styles.lineTextRight}>
                                {blueTeam[index]["stats"]["magicalDamageTaken"]}
                            </Text>
                        </View>

                        <View style={styles.lineView}>
                            <Text style={styles.lineTextLeft}>
                                Physical Damage Taken
                            </Text>
                            <Text style={styles.lineTextRight}>
                                {blueTeam[index]["stats"]["physicalDamageTaken"]}
                            </Text>
                        </View>

                        <View style={styles.lineView}>
                            <Text style={styles.lineTextLeft}>
                                True Damage Taken
                            </Text>
                            <Text style={styles.lineTextRight}>
                                {blueTeam[index]["stats"]["trueDamageTaken"]}
                            </Text>
                        </View>
                    </View>
                </CollapsibleView>        
            </View>
        )
    }

    return (
        <ScrollView>
            <View style={styles.iconAndName}>
                <Image
                    source={{uri: `http://ddragon.leagueoflegends.com/cdn/11.15.1/img/champion/${data[blueTeam[index]["championId"]]}.png`}}
                    style={styles.championIcon}
                /> 
                <Text style={styles.summonerName}>
                    {participantIdentities[index]["player"]["summonerName"]}
                </Text>
                <View style={{marginBottom: 10, justifyContent: 'space-evenly', flexDirection: 'row'}}>
                    <Text style={{fontSize: 18, marginRight: 10}}>
                        Level: {blueTeam[index]["stats"]["champLevel"]}
                    </Text>
                    <Text style={{fontSize: 18, marginRight: 10}}>
                        CS: {blueTeam[index]["stats"]["totalMinionsKilled"]}
                    </Text>
                    <Text style={{fontSize: 18}}>
                        Gold Earned: {blueTeam[index]["stats"]["goldEarned"]}
                    </Text>
                </View>
                {kda()}
            </View>
            <View>
                {/* <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: 'grey', marginTop: 10}}>
                    More details will be available in the next version 🙂
                </Text> */}
                <View style={{backgroundColor: 'white', elevation: 1}}>
                    <View style={{flexDirection: 'row', height: 52, alignItems: 'center', alignSelf: 'center', backgroundColor: '#969696c0', borderRadius: 5, marginTop: 10, marginBottom: 10}}>
                        {items()}
                    </View>
                </View>
                
            </View>
            {kills()}
            {damageDealt()}
            {damageTaken()}
        </ScrollView>
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
        borderColor: '#55B1CE',
        borderWidth: 3,
    },
    summonerName: {
        alignSelf: 'center',
        fontSize: 25,
        marginTop: 10,
        marginBottom: 10,
        fontWeight: 'bold'
    },
    itemIcon: {
        height: 45,
        width: 45,
        borderColor: 'black',
        borderWidth: 1,
        marginLeft: 1,
        marginRight: 1,
        borderRadius: 5
    },
    lineView: {
        height: 52, 
        flexDirection: 'row', 
        marginBottom: 3
    },
    lineTextLeft: {
        position: 'absolute', 
        fontSize: 16, 
        marginTop: 16, 
        left: 15
    },
    lineTextRight: {
        position: 'absolute', 
        fontSize: 16, 
        marginTop: 16, 
        right: 15
    }
})