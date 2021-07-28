import React, { useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet, ScrollView, Dimensions, ActivityIndicator } from 'react-native'
import { Tooltip } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Unorderedlist from 'react-native-unordered-list';

export default function lane({ route }) {
    const TOP = 0, JUNGLE = 1, MID = 2, ADC = 3, SUPPORT = 4
    const { blue, red, ddragon, cdn, otherInfo } = route.params
    const [isLoading, setLoader] = useState(true)
    const [topOpened, setTopOpened] = useState(false)
    const [jgOpened, setjgOpened] = useState(false)
    const [midOpened, setMidOpened] = useState(false)
    const [botOpened, setBotOpened] = useState(false)

    const CCpriorityPoints = {
        "knockAside": 0.9, "knockBack": 1.1, "knockUp": 1, "pull": 1.2,
        "blind": 0.1, "charm": 0.8, "flee": 0.7, "taunt": 0.8, "ground": 0.3,
        "knockDown": 0.2, "root": 0.7, "silence": 0.6, "polymorph": 0.65,
        "sleep": 0.75, "stun": 0.8, "suppression": 1, "slow": 0.2, "stasis": 0.5,
        "landScapeControl_JarvanIV": 0.7, "landScapeControl_Camille": 0.8, "landScapeControl_Yorick": 0.6,
        "landScapeControl_Taliyah": 0.2, "landScapeControl_Anivia": 0.4, "landScapeControl_Trundle": 0.7,
        "landScapeControl_Mordekaiser": 0.7, "selectableCC_Sylas": 0.5, "selectableCC_Viego": 0.6
    }

    const [positionWinRate, setPositionWinRate] = useState([])
    const [JGrotation, setJGrotation] = useState([])


    const fetching = async () => {

        //from CDN
        var blue_playStyleInfo = cdn.blue 
        var red_playStyleInfo = cdn.red

        //from ddragon
        var blue_range = [], red_range = []
        var adSpeed = [] //[blueAD, redAD]

    //from other info 
    var blue_CCpoints = [], red_CCpoints = []
    var blue_waveclear = [], red_waveclear = []
    var dragonRush = [] //[blueJG, redJG]


        for (var i = 0; i < 5; i++) {

            //from ddragon

            blue_range.push(ddragon["blue"][i]["stats"]["attackrange"])
            red_range.push(ddragon["red"][i]["stats"]["attackrange"])


            //Other info - CC points
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
            blue_CCpoints.push(CCpoint_blue)

            for (var r = 0; r < redCCcount; r++) {
                CCpoint_red += (CCpriorityPoints[redCC["CCtypes"][r]]
                    * redCC["CCtimeFrame"][r]
                    * redCC["CCrange"][r]
                    * redCC["targetableNumber"][r])
            }
            red_CCpoints.push(CCpoint_red)

            //Other info - wave clear
            blue_waveclear.push(otherInfo["blue"][i]["waveClearRating"])
            red_waveclear.push(otherInfo["red"][i]["waveClearRating"])

        }


        //other info - dragon rush
        dragonRush.push(otherInfo["blue"][JUNGLE]["dragonRushRating"])
        dragonRush.push(otherInfo["red"][JUNGLE]["dragonRushRating"])

        //ddragon - AD attack speed
        adSpeed.push(ddragon["blue"][ADC]["stats"]["attackspeed"])
        adSpeed.push(ddragon["red"][ADC]["stats"]["attackspeed"])


        //calculate TOP
        const blue_top = 0.3 * blue_playStyleInfo[TOP]["damage"] + 0.2 * blue_playStyleInfo[TOP]["durability"]
            + 0.3 * blue_waveclear[TOP] + 0.2 * blue_range[TOP]
        const red_top = 0.3 * red_playStyleInfo[TOP]["damage"] + 0.2 * red_playStyleInfo[TOP]["durability"]
            + 0.3 * red_waveclear[TOP] + 0.2 * red_range[TOP]

        //calculate JG
        const blue_jungle = 0.2 * blue_playStyleInfo[JUNGLE]["mobility"] + 0.3 * blue_waveclear[JUNGLE]
            + 0.2 * dragonRush[0] + 0.3 * blue_CCpoints[JUNGLE]
        const red_jungle = 0.2 * red_playStyleInfo[JUNGLE]["mobility"] + 0.3 * red_waveclear[JUNGLE]
            + 0.2 * dragonRush[1] + 0.3 * red_CCpoints[JUNGLE]

        //calculate MID
        const blue_mid = 0.4 * blue_waveclear[MID] + 0.3 * blue_playStyleInfo[MID]["damage"]
            + 0.2 * blue_range[MID] + 0.1 * blue_playStyleInfo[MID]["durability"]
        const red_mid = 0.4 * red_waveclear[MID] + 0.3 * red_playStyleInfo[MID]["damage"]
            + 0.2 * red_range[MID] + 0.1 * red_playStyleInfo[MID]["durability"]

        //calculate BOT
        const blue_bot = 0.2 * blue_range[ADC] + 0.15 * adSpeed[0] + 0.15 * blue_playStyleInfo[ADC]["damage"]
            + 0.15 * blue_playStyleInfo[SUPPORT]["utility"] + 0.15 * blue_playStyleInfo[SUPPORT]["durability"] + 0.2 * blue_CCpoints[SUPPORT]
        const red_bot = 0.2 * red_range[ADC] + 0.15 * adSpeed[1] + 0.15 * red_playStyleInfo[ADC]["damage"]
            + 0.15 * red_playStyleInfo[SUPPORT]["utility"] + 0.15 * red_playStyleInfo[SUPPORT]["durability"] + 0.2 * red_CCpoints[SUPPORT]

        //JG-TOP
        const blue_JGTOP = 0.3 * blue_waveclear[TOP] + 0.1 * blue_CCpoints[TOP] + 0.1 * blue_playStyleInfo[JUNGLE]["mobility"]
            + 0.2 * blue_CCpoints[JUNGLE] + 0.3 * (blue_playStyleInfo[TOP]["damage"] + blue_playStyleInfo[JUNGLE]["damage"])
        const red_JGTOP = 0.3 * red_waveclear[TOP] + 0.1 * red_CCpoints[TOP] + 0.1 * red_playStyleInfo[JUNGLE]["mobility"]
            + 0.2 * red_CCpoints[JUNGLE] + 0.3 * (red_playStyleInfo[TOP]["damage"] + red_playStyleInfo[JUNGLE]["damage"])

        //JG_MID
        const blue_JGMID = 0.3 * blue_waveclear[MID] + 0.1 * blue_CCpoints[MID] + 0.1 * blue_playStyleInfo[JUNGLE]["mobility"]
            + 0.2 * blue_CCpoints[JUNGLE] + 0.3 * (blue_playStyleInfo[MID]["damage"] + blue_playStyleInfo[JUNGLE]["damage"])
        const red_JGMID = 0.3 * red_waveclear[MID] + 0.1 * red_CCpoints[MID] + 0.1 * red_playStyleInfo[JUNGLE]["mobility"]
            + 0.2 * red_CCpoints[JUNGLE] + 0.3 * (red_playStyleInfo[MID]["damage"] + red_playStyleInfo[JUNGLE]["damage"])

        //JG-BOT
        const blue_JGBOT = 0.3 * (blue_waveclear[ADC] + blue_waveclear[SUPPORT]) + 0.1 * (blue_CCpoints[ADC] + blue_CCpoints[SUPPORT]) + 0.1 * blue_playStyleInfo[JUNGLE]["mobility"]
            + 0.2 * blue_CCpoints[JUNGLE] + 0.3 * (blue_playStyleInfo[ADC]["damage"] + blue_playStyleInfo[SUPPORT]["damage"] + blue_playStyleInfo[JUNGLE]["damage"])
        const red_JGBOT = 0.3 * (red_waveclear[ADC] + red_waveclear[SUPPORT]) + 0.1 * (red_CCpoints[ADC] + red_CCpoints[SUPPORT]) + 0.1 * red_playStyleInfo[JUNGLE]["mobility"]
            + 0.2 * red_CCpoints[JUNGLE] + 0.3 * (red_playStyleInfo[ADC]["damage"] + red_playStyleInfo[SUPPORT]["damage"] + red_playStyleInfo[JUNGLE]["damage"])

        setPositionWinRate([{ top: blue_top, jg: blue_jungle, mid: blue_mid, bot: blue_bot },
        { top: red_top, jg: red_jungle, mid: red_mid, bot: red_bot }])
        setJGrotation([{ jgtop: blue_JGTOP, jgmid: blue_JGMID, jgbot: blue_JGBOT },
        { jgtop: red_JGTOP, jgmid: red_JGMID, jgbot: red_JGBOT }])

        setLoader(false)
    }

    useEffect(() => {
        fetching()
    }, []);

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

    return (
        <ScrollView>
            <View style={{ flexDirection: 'column', minHeight: 404}}>
                <View style={{ backgroundColor: "white", elevation: 3}}>
                    <View style={{backgroundColor: '#ebebeb', width: width, flexDirection:"row", height: 55}}>
                        <Text style={styles.category}>
                            Win rate by position
                        </Text>
                        <View style={{ height: 20, width: 20, borderRadius: 20, borderColor: "grey", borderWidth: 1, alignSelf: "center", marginLeft: 10 }}>
                            <Text style={{position: 'absolute', marginLeft: 5.5, fontWeight: 'bold', color: 'grey'}}>?</Text>
                            <Tooltip 
                                popover={<Text style={{ color: "white", lineHeight: 20 }}>This section shows the estimated win rate of each lane in the laning phase (especially in the early game). Tap on the individual sections below to see what factors are taken into consideration.</Text>}
                                width={280} 
                                height={125}
                                backgroundColor={"#232323"}
                                containerStyle={{marginTop: 35}}
                                withPointer={false}
                            >
                                <Text style={{ alignSelf: "center", fontWeight: "bold" }}></Text>
                            </Tooltip>
                        </View>
                    </View>

                    <TouchableOpacity onPress={() => setTopOpened(!topOpened)}>
                        <View style={styles.positionRowContainer}>
                            <Image
                                source={{ uri: 'http://ddragon.leagueoflegends.com/cdn/11.15.1/img/champion/' + blue[TOP] + '.png' }}
                                style={styles.blueIcon} />
                            <Text style={styles.positionRatio}>{parseFloat(((positionWinRate[0]["top"] / (positionWinRate[0]["top"] + positionWinRate[1]["top"])) * 100).toFixed(1))}%</Text>
                            <Text style={styles.positionText}> TOP </Text>
                            <Text style={styles.positionRatio}>{parseFloat(((positionWinRate[1]["top"] / (positionWinRate[1]["top"] + positionWinRate[0]["top"])) * 100).toFixed(1))}%</Text>

                            <Image
                                source={{ uri: 'http://ddragon.leagueoflegends.com/cdn/11.15.1/img/champion/' + red[TOP] + '.png' }}
                                style={styles.redIcon} />
                        </View>
                    </TouchableOpacity>


                    <View style={{ flexDirection: "row" }}>
                        <View
                            style={{ backgroundColor: "#DC5047", height: 2, top: -2, bottom: 10, left: 47, right: 47, position: "absolute", flexDirection: "row" }}>
                            <View style={{
                                width: parseFloat(((positionWinRate[0]["top"] / (positionWinRate[0]["top"] + positionWinRate[1]["top"])) * 100).toFixed(2)) + "%",
                                backgroundColor: "#55B1CE"
                            }} />
                        </View>
                    </View>

                    {topOpened
                        ? <View style={{ marginLeft: 30, marginRight: 30, marginTop: 10, marginBottom: 5 }}>
                            <Text style={{ fontSize: 16, fontWeight: "bold"}}> Factors: </Text>
                            <Unorderedlist><Text style={{ fontSize: 15}}>Wave clear (split push option) - 30%</Text></Unorderedlist>
                            <Unorderedlist><Text style={{ fontSize: 15}}>Attack range - 20%</Text></Unorderedlist>
                            <Unorderedlist><Text style={{ fontSize: 15}}>Damage - 30%</Text></Unorderedlist>
                            <Unorderedlist><Text style={{ fontSize: 15}}>Sustain - 20%</Text></Unorderedlist>
                        </View>
                        : <View></View>
                    }

                    <TouchableOpacity onPress={() => setjgOpened(!jgOpened)}>
                        <View style={styles.positionRowContainer}>
                            <Image
                                source={{ uri: 'http://ddragon.leagueoflegends.com/cdn/11.15.1/img/champion/' + blue[JUNGLE] + '.png' }}
                                style={styles.blueIcon} />

                            <Text style={styles.positionRatio}>{parseFloat(((positionWinRate[0]["jg"] / (positionWinRate[0]["jg"] + positionWinRate[1]["jg"])) * 100).toFixed(1))}%</Text>
                            <Text style={styles.positionText}> JUNGLE </Text>
                            <Text style={styles.positionRatio}>{parseFloat(((positionWinRate[1]["jg"] / (positionWinRate[1]["jg"] + positionWinRate[0]["jg"])) * 100).toFixed(1))}%</Text>

                            <Image
                                source={{ uri: 'http://ddragon.leagueoflegends.com/cdn/11.15.1/img/champion/' + red[JUNGLE] + '.png' }}
                                style={styles.redIcon} />
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <View
                                style={{ backgroundColor: "#DC5047", height: 2, top: -2, bottom: 10, left: 47, right: 47, position: "absolute", flexDirection: "row" }}>
                                <View style={{
                                    width: parseFloat(((positionWinRate[0]["jg"] / (positionWinRate[0]["jg"] + positionWinRate[1]["jg"])) * 100).toFixed(2)) + "%",
                                    backgroundColor: "#55B1CE"
                                }} />
                            </View>
                        </View>
                    </TouchableOpacity>

                    {jgOpened
                        ? <View style={{ marginLeft: 30, marginRight: 30, marginTop: 10, marginBottom: 5 }}>
                            <Text style={{fontSize: 16, fontWeight: "bold"}}> Factors: </Text>
                            <Unorderedlist><Text style={{ fontSize: 15}}>Mobility - 20%</Text></Unorderedlist>
                            <Unorderedlist><Text style={{ fontSize: 15}}>AOE (for clearing jungle camps) - 30%</Text></Unorderedlist>
                            <Unorderedlist><Text style={{ fontSize: 15}}>Dragon rush - 20%</Text></Unorderedlist>
                            <Unorderedlist><Text style={{ fontSize: 15}}>Crowd control (for ganking) - 30%</Text></Unorderedlist>
                        </View>
                        : <View></View>
                    }

                    <TouchableOpacity onPress={() => setMidOpened(!midOpened)}>
                        <View style={styles.positionRowContainer}>
                            <Image
                                source={{ uri: 'http://ddragon.leagueoflegends.com/cdn/11.15.1/img/champion/' + blue[MID] + '.png' }}
                                style={styles.blueIcon} />

                            <Text style={styles.positionRatio}>{parseFloat(((positionWinRate[0]["mid"] / (positionWinRate[0]["mid"] + positionWinRate[1]["mid"])) * 100).toFixed(1))}%</Text>
                            <Text style={styles.positionText}> MID </Text>
                            <Text style={styles.positionRatio}>{parseFloat(((positionWinRate[1]["mid"] / (positionWinRate[1]["mid"] + positionWinRate[0]["mid"])) * 100).toFixed(1))}%</Text>

                            <Image
                                source={{ uri: 'http://ddragon.leagueoflegends.com/cdn/11.15.1/img/champion/' + red[MID] + '.png' }}
                                style={styles.redIcon} />
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <View
                                style={{ backgroundColor: "#DC5047", height: 2, top: -2, bottom: 10, left: 47, right: 47, position: "absolute", flexDirection: "row" }}>
                                <View style={{
                                    width: parseFloat(((positionWinRate[0]["mid"] / (positionWinRate[0]["mid"] + positionWinRate[1]["mid"])) * 100).toFixed(2)) + "%",
                                    backgroundColor: "#55B1CE"
                                }} />
                            </View>
                        </View>
                    </TouchableOpacity>

                    {midOpened
                        ? <View style={{ marginLeft: 30, marginRight: 30, marginTop: 10, marginBottom: 5 }}>
                            <Text style={{ fontSize: 16, fontWeight: "bold"}}> Factors: </Text>
                            <Unorderedlist><Text style={{ fontSize: 15}}>Wave clear (split push option) - 40%</Text></Unorderedlist>
                            <Unorderedlist><Text style={{ fontSize: 15}}>Damage - 30%</Text></Unorderedlist>
                            <Unorderedlist><Text style={{ fontSize: 15}}>Attack range - 20%</Text></Unorderedlist>
                            <Unorderedlist><Text style={{ fontSize: 15}}>Sustain - 10%</Text></Unorderedlist>
                        </View>
                        : <View></View>
                    }

                    <TouchableOpacity onPress={() => setBotOpened(!botOpened)}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginStart: 24, marginEnd: 24, marginTop: 26, marginBottom: 20 }}>
                            <View>
                                <Image
                                    source={{ uri: 'http://ddragon.leagueoflegends.com/cdn/11.15.1/img/champion/' + blue[ADC] + '.png' }}
                                    style={styles.blueIcon} />
                                <Image
                                    source={{ uri: 'http://ddragon.leagueoflegends.com/cdn/11.15.1/img/champion/' + blue[SUPPORT] + '.png' }}
                                    style={styles.blueIcon} />
                            </View>


                            <Text style={styles.positionRatio}>{parseFloat(((positionWinRate[0]["bot"] / (positionWinRate[0]["bot"] + positionWinRate[1]["bot"])) * 100).toFixed(1))}%</Text>
                            <Text style={styles.positionText}> BOT </Text>
                            <Text style={styles.positionRatio}>{parseFloat(((positionWinRate[1]["bot"] / (positionWinRate[1]["bot"] + positionWinRate[0]["bot"])) * 100).toFixed(1))}%</Text>

                            <View>
                                <Image
                                    source={{ uri: 'http://ddragon.leagueoflegends.com/cdn/11.15.1/img/champion/' + red[ADC] + '.png' }}
                                    style={styles.redIcon} />
                                <Image
                                    source={{ uri: 'http://ddragon.leagueoflegends.com/cdn/11.15.1/img/champion/' + red[SUPPORT] + '.png' }}
                                    style={styles.redIcon} />
                            </View>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <View
                                style={{ backgroundColor: "#DC5047", height: 2, top: -22, bottom: 10, left: 47, right: 47, position: "absolute", flexDirection: "row" }}>
                                <View style={{
                                    width: parseFloat(((positionWinRate[0]["bot"] / (positionWinRate[0]["bot"] + positionWinRate[1]["bot"])) * 100).toFixed(2)) + "%",
                                    backgroundColor: "#55B1CE"
                                }} />
                            </View>
                        </View>
                    </TouchableOpacity>

                    {botOpened
                        ? <View style={{ marginLeft: 30, marginRight: 30, marginTop: 5, marginBottom: 10 }}>
                            <Text style={{ fontSize: 16, fontWeight: "bold"}}> Factors : </Text>
                            <Unorderedlist><Text style={{ fontSize: 15}}>ADC: attack range - 20%</Text></Unorderedlist>
                            <Unorderedlist><Text style={{ fontSize: 15}}>ADC: attack speed - 15%</Text></Unorderedlist>
                            <Unorderedlist><Text style={{ fontSize: 15}}>ADC: damage - 15%</Text></Unorderedlist>
                            <Unorderedlist><Text style={{ fontSize: 15}}>Support: ultility - 15%</Text></Unorderedlist>
                            <Unorderedlist><Text style={{ fontSize: 15}}>Support: durability - 15%</Text></Unorderedlist>
                            <Unorderedlist><Text style={{ fontSize: 15}}>Support: crowd control - 20%</Text></Unorderedlist>
                        </View>
                        : <View></View>
                    }

                </View>

                <View style={{ backgroundColor: "white"}}>
                        <View style={{backgroundColor: '#ebebeb', width: width, flexDirection:"row", height: 55}}>
                            <Text style={styles.category}>
                                Win rate by jungle rotation
                            </Text>
                            <View style={{ height: 20, width: 20, borderRadius: 20, borderColor: "gray", borderWidth: 1, alignSelf: "center", marginLeft: 10}}>
                                <Text style={{position: 'absolute', marginLeft: 5.5, color: 'grey', fontWeight: 'bold'}}>?</Text>
                                <Tooltip 
                                    popover={<Text style={{ color: "white", lineHeight: 20 }}>This section tells the estimated win rate when junglers rotate to each lane of the map. The factors taken into consideration are: Damage(30%), crowd control(30%), jungler's mobility(10%), laner's wave clear ability(30%)</Text>}
                                    width={280} 
                                    height={140}
                                    backgroundColor={"#232323"}
                                    containerStyle={{marginTop: 30}}
                                    withPointer={false}
                                >
                                    <Text style={{ alignSelf: "center", fontWeight: "bold" }}></Text>
                                </Tooltip>
                            </View>
                        </View>
                
                    <View style={{backgroundColor: "white", elevation: 3}}>
                        <View style={styles.jgRowContainer}>
                            <Image
                                source={{ uri: 'http://ddragon.leagueoflegends.com/cdn/11.15.1/img/champion/' + blue[JUNGLE] + '.png' }}
                                style={styles.blueIcon} />

                            <Text style={{ fontWeight: '500', fontSize: 35 }}> vs </Text>


                            <Image
                                source={{ uri: 'http://ddragon.leagueoflegends.com/cdn/11.15.1/img/champion/' + red[JUNGLE] + '.png' }}
                                style={styles.redIcon} />
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginStart: 26, marginEnd: 26, marginTop: 15, marginBottom: 10 }}>
                            <View style={{ flexDirection: "column", alignItems: 'center' }}>
                                <Text style={styles.jgPositionFont}>JG - TOP</Text>
                                <Text style={{ color: '#55B1CE', fontWeight: "400", fontSize: 18 }}>{((JGrotation[0]["jgtop"] / (JGrotation[0]["jgtop"] + JGrotation[1]["jgtop"]) * 100)).toFixed(1)}%</Text>
                                <Text style={{ fontWeight: "300", fontSize: 20 }}> X </Text>
                                <Text style={{ color: '#DC5047', fontWeight: "400", fontSize: 18 }}>{((JGrotation[1]["jgtop"] / (JGrotation[1]["jgtop"] + JGrotation[0]["jgtop"]) * 100)).toFixed(1)}%</Text>
                            </View>

                            <View style={{ flexDirection: "column", alignItems: 'center' }}>
                                <Text style={styles.jgPositionFont}>JG - MID</Text>
                                <Text style={{ color: '#55B1CE', fontWeight: "400", fontSize: 18 }}>{((JGrotation[0]["jgmid"] / (JGrotation[0]["jgmid"] + JGrotation[1]["jgmid"]) * 100)).toFixed(1)}%</Text>
                                <Text style={{ fontWeight: "300", fontSize: 20 }}> X </Text>
                                <Text style={{ color: '#DC5047', fontWeight: "400", fontSize: 18 }}>{((JGrotation[1]["jgmid"] / (JGrotation[1]["jgmid"] + JGrotation[0]["jgmid"]) * 100)).toFixed(1)}%</Text>
                            </View>

                            <View style={{ flexDirection: "column", alignItems: 'center' }}>
                                <Text style={styles.jgPositionFont}>JG - BOT</Text>
                                <Text style={{ color: '#55B1CE', fontWeight: "400", fontSize: 18 }}>{((JGrotation[0]["jgbot"] / (JGrotation[0]["jgbot"] + JGrotation[1]["jgbot"]) * 100)).toFixed(1)}%</Text>
                                <Text style={{ fontWeight: "300", fontSize: 20 }}> X </Text>
                                <Text style={{ color: '#DC5047', fontWeight: "400", fontSize: 18 }}>{((JGrotation[1]["jgbot"] / (JGrotation[1]["jgbot"] + JGrotation[0]["jgbot"]) * 100)).toFixed(1)}%</Text>
                            </View>
                        </View>
                    </View>
                    

                </View>

            </View>
        </ScrollView>
    )
}

const {width, height} = Dimensions.get("window")

const styles = StyleSheet.create({
    blueIcon: {
        height: 50, width: 50, borderRadius: 50, borderColor: "#55B1CE", borderWidth: 2
    },
    redIcon: {
        height: 50, width: 50, borderRadius: 50, borderColor: "#DC5047", borderWidth: 2
    },
    positionText: {
        fontWeight: '500', flexDirection: 'column', alignSelf: 'center', fontSize: 15, textDecorationLine: 'underline'
    },
    positionRowContainer: {
        flexDirection: 'row', justifyContent: 'space-between', marginStart: 24, marginEnd: 24, marginTop: 26
    },
    category: {
        fontSize: 18, fontWeight: 'bold', marginLeft: 20, marginTop: 15
    },
    jgRowContainer: {
        flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 20
    },
    jgPositionFont: {
        fontSize: 20, fontWeight: '500'
    },
    positionRatio: {
        alignSelf: 'center', flexDirection: 'column', fontWeight: "400"
    }
})