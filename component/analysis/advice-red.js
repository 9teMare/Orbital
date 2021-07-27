import React, { useEffect, useState } from 'react'
import { View, Text, Button, FlatList, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import Unorderedlist from 'react-native-unordered-list';
import { Tooltip } from 'react-native-elements';

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

const CC_getTop2 = (arr) => {
    var temp = [] //inside are indexes, not points!
    for (var i = 0; i < arr.length; i++) {
        if (temp.length === 0 || temp.length === 1) { //temp is not full
            temp.push(i)
        } else {
            if (arr[i] >= arr[temp[0]] && arr[i] >= arr[temp[1]]) { //greater than both
                arr[temp[0]] >= arr[temp[1]]
                    ? temp[1] = i
                    : temp[0] = i
            } else if (arr[i] >= arr[temp[0]]) { //only greater than temp[0]
                temp[0] = i
            } else if (arr[i] >= arr[temp[1]]) { //only greater than temp[1]
                temp[1] = i
            }
        }
    }
    return temp
}



export default function adviceRed({ route }) {
    const TOP = 0, JUNGLE = 1, MID = 2, ADC = 3, SUPPORT = 4

    const { blue, red, ddragon, cdn, otherInfo } = route.params
    const [redRoleMissing, setRedRoleMissing] = useState([])

    const [redAllyTips, setRedAllyTips] = useState([])
    const [blueEnemyTips, setBlueEnemyTips] = useState([])
    const [isLoading, setLoader] = useState(true)

    const [selectedAlly, setSelectedAlly] = useState(null)
    const [selectedEnemy, setSelectedEmeny] = useState(null)
    const ROLES = ["Assassin", "Fighter", "Marksman", "Support", "Tank", "Mage"]

    const [CC_names_blue, setCC_names_blue] = useState([])
    const [CC_names_red, setCC_names_red] = useState([])
    const [CC_details_blue, setCC_details_blue] = useState([])
    const [CC_details_red, setCC_details_red] = useState([])

    const CCpriorityPoints = {
        "knockAside": 0.9, "knockBack": 1.1, "knockUp": 1, "pull": 1.2,
        "blind": 0.1, "charm": 0.8, "flee": 0.7, "taunt": 0.8, "ground": 0.3,
        "knockDown": 0.2, "root": 0.7, "silence": 0.6, "polymorph": 0.65,
        "sleep": 0.75, "stun": 0.8, "suppression": 1, "slow": 0.2, "stasis": 0.5,
        "landScapeControl_JarvanIV": 0.7, "landScapeControl_Camille": 0.8, "landScapeControl_Yorick": 0.6,
        "landScapeControl_Taliyah": 0.2, "landScapeControl_Anivia": 0.4, "landScapeControl_Trundle": 0.7,
        "landScapeControl_Mordekaiser": 0.7, "selectableCC_Sylas": 0.5, "selectableCC_Viego": 0.6
    }

    const fetching = async () => {
        var roles = []
        var allyTips = []
        var enemyTips = []
        var blueCC_all = [], redCC_all = []

        for (let i = 0; i < 5; i++) {
            const redName = new String
            redName = red[i]
            const blueName = new String
            blueName = blue[i]

            const response = await fetch("http://ddragon.leagueoflegends.com/cdn/11.15.1/data/en_US/champion/" + redName + ".json")
            const responded = await response.json()
            const data = responded.data

            const response_enemy = await fetch("http://ddragon.leagueoflegends.com/cdn/11.15.1/data/en_US/champion/" + blueName + ".json")
            const responded_enemy = await response_enemy.json()
            const data_enemy = responded_enemy.data

            //getting missing roles
            const tagArr = ddragon["red"][i]["tags"]
            for (let j = 0; j < tagArr.length; j++) {
                roles.push(tagArr[j])
            }

            //getting ally Tips
            const allyTips_individual = ddragon["red"][i]["allytips"]
            allyTips.push(allyTips_individual)

            //getting enemy tips
            const enemyTips_individual = ddragon["blue"][i]["enemytips"]
            enemyTips.push(enemyTips_individual)

            //get CC points
            const blueCC = otherInfo["blue"][i]["CC"]
            const redCC = otherInfo["red"][i]["CC"]
            const blueCCcount = blueCC["CCtypes"].length
            const redCCcount = redCC["CCtypes"].length

            var CCpoint_blue = 0 //individual CC points
            var CCpoint_red = 0

            for (var b = 0; b < blueCCcount; b++) {
                var CCpoint_blue = CCpoint_blue + (CCpriorityPoints[blueCC["CCtypes"][b]]
                    * blueCC["CCtimeFrame"][b]
                    * blueCC["CCrange"][b]
                    * blueCC["targetableNumber"][b])
            }
            blueCC_all.push(CCpoint_blue)

            for (var r = 0; r < redCCcount; r++) {
                CCpoint_red += (CCpriorityPoints[redCC["CCtypes"][r]]
                    * redCC["CCtimeFrame"][r]
                    * redCC["CCrange"][r]
                    * redCC["targetableNumber"][r])
            }
            redCC_all.push(CCpoint_red)

        }

        var blue_top2 = CC_getTop2(blueCC_all)
        var red_top2 = CC_getTop2(redCC_all)
        var blue_top2_details = []
        var red_top2_details = []
        var blue_top2_names = []
        var red_top2_names = []

        for (var j = 0; j < 2; j++) {
            var blue_skillsDetail = []
            for (var k = 0; k < otherInfo["blue"][blue_top2[j]]["CC"]["CCskillKeys"].length; k++) {
                blue_skillsDetail.push({
                    key: otherInfo["blue"][blue_top2[j]]["CC"]["CCskillKeys"][k],
                    skill: otherInfo["blue"][blue_top2[j]]["CC"]["CCskills"][k]
                })
            }

            blue_top2_details.push({
                skillDetail: blue_skillsDetail,
                types: otherInfo["blue"][blue_top2[j]]["CC"]["CCtypes"]
            })
            //console.log(blue_top2_details)

            var red_skillsDetail = []
            for (var l = 0; l < otherInfo["red"][red_top2[j]]["CC"]["CCskillKeys"].length; l++) {
                red_skillsDetail.push({
                    key: otherInfo["red"][red_top2[j]]["CC"]["CCskillKeys"][l],
                    skill: otherInfo["red"][red_top2[j]]["CC"]["CCskills"][l]
                })
            }
            red_top2_details.push({
                skillDetail: red_skillsDetail,
                types: otherInfo["red"][red_top2[j]]["CC"]["CCtypes"]
            })

            blue_top2_names.push(blue[blue_top2[j]])
            red_top2_names.push(red[red_top2[j]])
        }

        const s = new Set(roles)
        const missingRoles = []
        for (let n = 0; n < 6; n++) {
            if (!s.has(ROLES[n])) {
                missingRoles.push(ROLES[n])
            }
        }

        setCC_names_blue(blue_top2_names)
        setCC_names_red(red_top2_names)
        setCC_details_blue(blue_top2_details)
        setCC_details_red(red_top2_details)
        setRedRoleMissing(missingRoles)
        setRedAllyTips(allyTips)
        setBlueEnemyTips(enemyTips)

        setLoader(false)
    }

    useEffect(() => {
        fetching()
    }, []);

    const Item_roleMissing = ({ roleMissing_message }) => {
        return (
            <View style={{ marginBottom: 5, marginTop: 5 }}>
                <Unorderedlist><Text>{roleMissing_message}</Text></Unorderedlist>
            </View>
        )
    }

    const renderItem_roleMissing = (role) => {
        return (
            <Item_roleMissing roleMissing_message={roleLackingMessage(role.item)} />
        )
    }

    const displayTips = (arr) => {
        return arr.map(function (element, i) {
            return (
                <View key={i} style={{ marginTop: 3, marginBottom: 3 }}>
                    <Unorderedlist><Text>{element}</Text></Unorderedlist>
                </View>
            )
        })
    }

    const Item_CC = ({ skill, keyIndex }) => {
        return (
            <View style={{ alignItems: "center", marginLeft: 4, marginRight: 4 }}>
                <Image
                    source={{ uri: "http://ddragon.leagueoflegends.com/cdn/11.15.1/img/spell/" + skill + ".png" }}
                    style={{ height: 40, width: 40 }}
                />
                <Text>{keyIndex}</Text>
            </View>

        )
    }

    const renderItem_CC = (item) => {
        return (
            <Item_CC skill={item.item.skill}
                keyIndex={item.item.key}
            />
        )
    }


    if (isLoading) {
        return (
            <Text> Loading...</Text>
        )
    }

    return (
        <ScrollView>
            <View style={{ backgroundColor: "white" }}>
                <View style={{ marginLeft: 20, marginRight: 20, marginBottom: 5 }}>
                    <Text style={{ fontSize: 18, fontWeight: '500', marginLeft: 10, marginTop: 10 }}>Roles</Text>
                    <View style={{ flexDirection: 'row', justifyContent: "space-evenly", marginTop: 10 }}>
                        <Image
                            source={require('../../pictures/others/Assassin.png')}
                            style={redRoleMissing.includes("Assassin")
                                ? { height: 45, width: 45, tintColor: "grey" }
                                : { height: 45, width: 45 }}
                        />
                        <Image
                            source={require('../../pictures/others/Mage.png')}
                            style={redRoleMissing.includes("Mage")
                                ? { height: 45, width: 45, tintColor: "grey" }
                                : { height: 45, width: 45 }}
                        />
                        <Image
                            source={require('../../pictures/others/Marksman.png')}
                            style={redRoleMissing.includes("Marksman")
                                ? { height: 45, width: 45, tintColor: "grey" }
                                : { height: 45, width: 45 }}
                        />
                        <Image
                            source={require('../../pictures/others/Fighter.png')}
                            style={redRoleMissing.includes("Fighter")
                                ? { height: 45, width: 45, tintColor: "grey" }
                                : { height: 45, width: 45 }}
                        />
                        <Image
                            source={require('../../pictures/others/Tank.png')}
                            style={redRoleMissing.includes("Tank")
                                ? { height: 45, width: 45, tintColor: "grey" }
                                : { height: 45, width: 45 }}
                        />
                        <Image
                            source={require('../../pictures/others/Support.png')}
                            style={redRoleMissing.includes("Support")
                                ? { height: 45, width: 45, tintColor: "grey" }
                                : { height: 45, width: 45 }}
                        />
                    </View>
                    {redRoleMissing.length === 0
                        ? <Text>The team contains all main roles.</Text>
                        : <FlatList
                            data={redRoleMissing}
                            renderItem={renderItem_roleMissing}
                            keyExtractor={item => item}

                        />}

                </View>
            </View>

            {/* ally tips */}
            <View style={{ backgroundColor: "white", marginTop: 5 }}>
                <Text style={{ fontSize: 18, fontWeight: '500', marginLeft: 24, marginTop: 10 }}>Ally Tips</Text>
                <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginTop: 10, marginBottom: 5 }}>
                    <TouchableOpacity onPress={() => setSelectedAlly(TOP)}>
                        <Image
                            source={{ uri: 'http://ddragon.leagueoflegends.com/cdn/11.15.1/img/champion/' + red[TOP] + '.png' }}
                            style={TOP === selectedAlly ? { height: 45, width: 45, borderColor: "#DC5047", borderWidth: 2 }
                                : { height: 45, width: 45 }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setSelectedAlly(JUNGLE)}>
                        <Image
                            source={{ uri: 'http://ddragon.leagueoflegends.com/cdn/11.15.1/img/champion/' + red[JUNGLE] + '.png' }}
                            style={JUNGLE === selectedAlly ? { height: 45, width: 45, borderColor: "#DC5047", borderWidth: 2 }
                                : { height: 45, width: 45 }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setSelectedAlly(MID)}>
                        <Image
                            source={{ uri: 'http://ddragon.leagueoflegends.com/cdn/11.15.1/img/champion/' + red[MID] + '.png' }}
                            style={MID === selectedAlly ? { height: 45, width: 45, borderColor: "#DC5047", borderWidth: 2 }
                                : { height: 45, width: 45 }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setSelectedAlly(ADC)}>
                        <Image
                            source={{ uri: 'http://ddragon.leagueoflegends.com/cdn/11.15.1/img/champion/' + red[ADC] + '.png' }}
                            style={ADC === selectedAlly ? { height: 45, width: 45, borderColor: "#DC5047", borderWidth: 2 }
                                : { height: 45, width: 45 }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setSelectedAlly(SUPPORT)}>
                        <Image
                            source={{ uri: 'http://ddragon.leagueoflegends.com/cdn/11.15.1/img/champion/' + red[SUPPORT] + '.png' }}
                            style={SUPPORT === selectedAlly ? { height: 45, width: 45, borderColor: "#DC5047", borderWidth: 2 }
                                : { height: 45, width: 45 }}
                        />
                    </TouchableOpacity>


                </View>
                {selectedAlly === null
                    ? <View>
                        <Text style={{ alignSelf: "center", marginTop: 5, marginBottom: 5, fontWeight: "500" }}> Select a champion above to view ally tips.</Text>
                    </View>
                    : <View style={{ marginRight: 20, marginLeft: 20, marginTop: 5, marginBottom: 5 }}>
                        {displayTips(redAllyTips[selectedAlly])}
                    </View>
                }

            </View>

            {/* enemy tips */}
            <View style={{ backgroundColor: "white", marginTop: 5 }}>
                <Text style={{ fontSize: 18, fontWeight: '500', marginLeft: 24, marginTop: 10 }}>Enemy Tips</Text>
                <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginTop: 10, marginBottom: 5 }}>
                    <TouchableOpacity onPress={() => setSelectedEmeny(TOP)}>
                        <Image
                            source={{ uri: 'http://ddragon.leagueoflegends.com/cdn/11.15.1/img/champion/' + blue[TOP] + '.png' }}
                            style={TOP === selectedEnemy ? { height: 45, width: 45, borderColor: "#55B1CE", borderWidth: 2 }
                                : { height: 45, width: 45 }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setSelectedEmeny(JUNGLE)}>
                        <Image
                            source={{ uri: 'http://ddragon.leagueoflegends.com/cdn/11.15.1/img/champion/' + blue[JUNGLE] + '.png' }}
                            style={JUNGLE === selectedEnemy ? { height: 45, width: 45, borderColor: "#55B1CE", borderWidth: 2 }
                                : { height: 45, width: 45 }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setSelectedEmeny(MID)}>
                        <Image
                            source={{ uri: 'http://ddragon.leagueoflegends.com/cdn/11.15.1/img/champion/' + blue[MID] + '.png' }}
                            style={MID === selectedEnemy ? { height: 45, width: 45, borderColor: "#55B1CE", borderWidth: 2 }
                                : { height: 45, width: 45 }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setSelectedEmeny(ADC)}>
                        <Image
                            source={{ uri: 'http://ddragon.leagueoflegends.com/cdn/11.15.1/img/champion/' + blue[ADC] + '.png' }}
                            style={ADC === selectedEnemy ? { height: 45, width: 45, borderColor: "#55B1CE", borderWidth: 2 }
                                : { height: 45, width: 45 }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setSelectedEmeny(SUPPORT)}>
                        <Image
                            source={{ uri: 'http://ddragon.leagueoflegends.com/cdn/11.15.1/img/champion/' + blue[SUPPORT] + '.png' }}
                            style={SUPPORT === selectedEnemy ? { height: 45, width: 45, borderColor: "#55B1CE", borderWidth: 2 }
                                : { height: 45, width: 45 }}
                        />
                    </TouchableOpacity>


                </View>
                {selectedEnemy === null
                    ? <View>
                        <Text style={{ alignSelf: "center", marginTop: 5, marginBottom: 5, fontWeight: "500" }}> Select a champion above to view enemy tips.</Text>
                    </View>
                    : <View style={{ marginRight: 20, marginLeft: 20, marginTop: 5, marginBottom: 5 }}>
                        {displayTips(blueEnemyTips[selectedEnemy])}
                    </View>
                }

            </View>

            {/* team initiator (CC top 2)*/}
            <View style={{ backgroundColor: "white", marginTop: 5 }}>


                <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontSize: 18, fontWeight: '500', marginLeft: 24, marginTop: 10 }}>Team fight initiator / disengager</Text>
                    <View style={{ height: 20, width: 20, borderRadius: 20, borderColor: "gray", borderWidth: 1, alignSelf: "center", marginTop: 10, marginLeft: 10 }}>
                        <Tooltip popover={<Text style={{ color: "white" }}>These champions have the most amount of CCs in their respective teams. For allies, make use of the CCs to initiate a fight. It is recommended to initiate when the enemies' CC skills are on cooldown (to prevent them from disengaging).</Text>}
                            width={300} height={140}>
                            <Text style={{ alignSelf: "center", fontWeight: "bold" }}>!</Text>
                        </Tooltip>
                    </View>
                </View>

                <View style={{ marginLeft: 20, marginRight: 20, marginTop: 15 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Image
                            source={{ uri: 'http://ddragon.leagueoflegends.com/cdn/11.15.1/img/champion/' + CC_names_red[0] + '.png' }}
                            style={styles.redIcon}
                        />
                        <View style={{ alignSelf: "center" }}>
                            <FlatList
                                data={CC_details_red[0]["skillDetail"]}
                                renderItem={renderItem_CC}
                                keyExtractor={item => item.index}
                                horizontal={true}
                            />
                        </View>
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Image
                            source={{ uri: 'http://ddragon.leagueoflegends.com/cdn/11.15.1/img/champion/' + CC_names_red[1] + '.png' }}
                            style={styles.redIcon}
                        />
                        <View style={{ alignSelf: "center" }}>
                            <FlatList
                                data={CC_details_red[1]["skillDetail"]}
                                renderItem={renderItem_CC}
                                keyExtractor={item => item.index}
                                horizontal={true}
                            />
                        </View>
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Image
                            source={{ uri: 'http://ddragon.leagueoflegends.com/cdn/11.15.1/img/champion/' + CC_names_blue[0] + '.png' }}
                            style={styles.blueIcon}
                        />
                        <View style={{ alignSelf: "center" }}>
                            <FlatList
                                data={CC_details_blue[0]["skillDetail"]}
                                renderItem={renderItem_CC}
                                keyExtractor={item => item.index}
                                horizontal={true}
                            />
                        </View>
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Image
                            source={{ uri: 'http://ddragon.leagueoflegends.com/cdn/11.15.1/img/champion/' + CC_names_blue[1] + '.png' }}
                            style={styles.blueIcon}
                        />
                        <View style={{ alignSelf: "center", marginBottom: 10 }}>
                            <FlatList
                                data={CC_details_blue[1]["skillDetail"]}
                                renderItem={renderItem_CC}
                                keyExtractor={item => item.index}
                                horizontal={true}
                            />
                        </View>
                    </View>
                </View>

            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    blueIcon: {
        height: 50, width: 50, borderRadius: 50, borderColor: "#55B1CE", borderWidth: 2
    },
    redIcon: {
        height: 50, width: 50, borderRadius: 50, borderColor: "#DC5047", borderWidth: 2
    },

})
