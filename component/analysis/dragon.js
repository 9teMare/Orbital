import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList, ScrollView, Dimensions, ActivityIndicator } from 'react-native'
import { Tooltip } from 'react-native-elements';

export default function lane({ route }) {
    const { blue, red, ddragon, cdn, otherInfo } = route.params
    const [isLoading, setLoader] = useState(true)


    const [list, setList] = useState([])
    const [teamFightPoints, setTeamFightPoints] = useState([])
    const [teamFightPer, setTeamFightPer] = useState(0)
    const [dragonFightPoints, setDragonFightPoints] = useState([])
    const [dragonFightPer, setDragonFightPer] = useState(0)

    const [teamfightDetail, setTeamFightDetail] = useState(true)
    const [dragonfightDetail, setDragonFightDetail] = useState(true)

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


        var blue_ADAP = 0, red_ADAP = 0, blue_HP = 0, red_HP = 0, blue_speed = 0, red_speed = 0;
        var blue_durability_total = 0, red_durability_total = 0;
        var blueCC_total = 0, redCC_total = 0
        var blue_mobility_total = 0, red_mobility_total = 0, blue_dragonRush = 0, red_dragonRush = 0;
        var blue_waveclear = 0, red_waveclear = 0, blue_trueDamage = 0, red_trueDamage = 0;

        for (var i = 0; i < 5; i++) {

            //get CC points,dragon rush & wave clear
            const blueCC = otherInfo["blue"][i]["CC"]
            const redCC = otherInfo["red"][i]["CC"]
            const blueCCcount = blueCC["CCtypes"].length
            const redCCcount = redCC["CCtypes"].length

            blue_trueDamage += otherInfo["blue"][i]["trueDamage"]["highestTotal"]
            red_trueDamage += otherInfo["red"][i]["trueDamage"]["highestTotal"]
            blue_waveclear += otherInfo["blue"][i]["waveClearRating"]
            red_waveclear += otherInfo["red"][i]["waveClearRating"]
            blue_dragonRush += otherInfo["blue"][i]["dragonRushRating"]
            red_dragonRush += otherInfo["red"][i]["dragonRushRating"]

            //console.log(blueName)
            for (var b = 0; b < blueCCcount; b++) {
                blueCC_total += (CCpriorityPoints[blueCC["CCtypes"][b]]
                    * blueCC["CCtimeFrame"][b]
                    * blueCC["CCrange"][b]
                    * blueCC["targetableNumber"][b])
                
            }

            for (var r = 0; r < redCCcount; r++) {
                redCC_total += (CCpriorityPoints[redCC["CCtypes"][r]]
                    * redCC["CCtimeFrame"][r]
                    * redCC["CCrange"][r]
                    * redCC["targetableNumber"][r])
                    
            }
            


            blue_durability_total += cdn["blue"][i]["durability"]    
            blue_mobility_total += cdn["blue"][i]["mobility"]

            red_durability_total += cdn["red"][i]["durability"] 
            red_mobility_total += cdn["red"][i]["mobility"] 

            //INFERNAL - AD, AP
            var blue_ADAP_18 = ddragon["blue"][i]["stats"]["attackdamage"] + ddragon["blue"][i]["stats"]["attackdamageperlevel"] * 17
                + ddragon["blue"][i]["stats"]["mp"] + ddragon["blue"][i]["stats"]["mpperlevel"] * 17
            var red_ADAP_18 = ddragon["red"][i]["stats"]["attackdamage"] + ddragon["red"][i]["stats"]["attackdamageperlevel"] * 17
                + ddragon["red"][i]["stats"]["mp"] + ddragon["red"][i]["stats"]["mpperlevel"] * 17

            blue_ADAP += blue_ADAP_18
            red_ADAP += red_ADAP_18

            //OCEAN - TANKS
            var blue_HP_18 = ddragon["blue"][i]["stats"]["hp"] + ddragon["blue"][i]["stats"]["hpperlevel"] * 17
                + ddragon["blue"][i]["stats"]["armor"] + ddragon["blue"][i]["stats"]["armorperlevel"] * 17
            var red_HP_18 = ddragon["red"][i]["stats"]["hp"] + ddragon["red"][i]["stats"]["hpperlevel"] * 17
                + ddragon["red"][i]["stats"]["armor"] + ddragon["red"][i]["stats"]["armorperlevel"] * 17

            blue_HP += blue_HP_18
            red_HP += red_HP_18

            //CLOUD - movement speed
            var blue_speed_18 = ddragon["blue"][i]["stats"]["movespeed"]
            var red_speed_18 = ddragon["red"][i]["stats"]["movespeed"]

            blue_speed += blue_speed_18
            red_speed += red_speed_18

        }

        const ADAP_ratio = ((blue_ADAP / (blue_ADAP + red_ADAP)) * 220).toFixed(1)
        const ADAP_percentage = ((blue_ADAP / (blue_ADAP + red_ADAP)) * 100).toFixed(1)

        const HP_ratio = ((blue_HP / (blue_HP + red_HP)) * 220).toFixed(1)
        const HP_percentage = ((blue_HP / (blue_HP + red_HP)) * 100).toFixed(1)

        const Tank_ratio = 220 - HP_ratio
        const Tank_percentage = 100 - HP_percentage

        const speed_ratio = ((blue_speed / (blue_speed + red_speed)) * 220).toFixed(1)
        const speed_percentage = ((blue_speed / (blue_speed + red_speed)) * 100).toFixed(1)

        const blue_teamFightPoints = 0.2 * blueCC_total + 0.4 * blue_ADAP + 0.4 * blue_durability_total
        const red_teamFightPoints = 0.2 * redCC_total + 0.4 * red_ADAP + 0.4 * red_durability_total
        const teamFightRatio = ((blue_teamFightPoints / (blue_teamFightPoints + red_teamFightPoints)) * 100).toFixed(2)

        const blue_dragonFightPoints = blue_mobility_total + blue_trueDamage + blue_dragonRush + blue_waveclear
        const red_dragonFightPoints = red_mobility_total + red_trueDamage + red_dragonRush + red_waveclear
        const dragonFightRatio = ((blue_dragonFightPoints / (blue_dragonFightPoints + red_dragonFightPoints)) * 100).toFixed(2)


        setTeamFightPoints([{ CC: blueCC_total.toFixed(2), ADAP: blue_ADAP.toFixed(2), durability: blue_durability_total },
        { CC: redCC_total.toFixed(2), ADAP: red_ADAP.toFixed(2), durability: red_durability_total }])
        setTeamFightPer(parseFloat(teamFightRatio))


        setDragonFightPoints([{ mobility: blue_mobility_total, trueDamage: blue_trueDamage, dragonRush: blue_dragonRush, waveClear: blue_waveclear },
        { mobility: red_mobility_total, trueDamage: red_trueDamage, dragonRush: red_dragonRush, waveClear: red_waveclear }])
        setDragonFightPer(parseFloat(dragonFightRatio))

        setList([{ key: 'ADAP', ratio: parseFloat(ADAP_ratio), per: ADAP_percentage },
        { key: 'HP', ratio: parseFloat(HP_ratio), per: HP_percentage },
        { key: 'Tank', ratio: parseFloat(Tank_ratio), per: Tank_percentage },
        { key: 'Speed', ratio: parseFloat(speed_ratio), per: speed_percentage }])

        setLoader(false)
    }

    const Item = ({ ratio, per }) => {
        return (
            <View>
                <View style={{ flexDirection: 'row', marginLeft: 10, marginRight: 10 }}>
                    <View>
                        <View
                            style={{ width: 30, backgroundColor: "#55B1CE", height: ratio }}
                        >
                        </View>
                    </View>
                    <View>
                        <View
                            style={{ width: 30, backgroundColor: "#DC5047", height: 220 - ratio }}
                        >
                        </View>
                    </View>
                </View>
                <Text style={{ fontSize: 11, alignSelf: 'center', marginTop: 8, fontWeight: 'bold' }}>{Math.round(per * 100) / 100}/{Math.round((100 - per) * 100) / 100}</Text>
            </View>
        )
    }

    const renderItem = ({ item }) => {
        return (
            <Item ratio={item.ratio} per={item.per} />
        )
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
            <View style={{ flexDirection: 'column' }}>
                <View style={{ backgroundColor: "white" }}>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.category}> These dragons might favor... </Text>
                        <View style={{ height: 20, width: 20, borderRadius: 20, borderColor: "gray", borderWidth: 1, alignSelf: "center", marginTop: 10, marginLeft: 10 }}>
                            <Text style={{position: 'absolute', marginLeft: 5.5}}>?</Text>
                            <Tooltip 
                                popover={<Text style={{ color: "white", lineHeight: 20 }}>This section compares the amount of favor different types of dragon will bring to each team. The estimation is based on the type of buffs each dragon has and the properties of champions in the teams. </Text>}
                                width={280} 
                                height={135}
                                backgroundColor={"#232323"}
                                containerStyle={{marginTop: 35, marginLeft: 30}}
                                withPointer={false}
                            >
                                <Text style={{ alignSelf: "center", fontWeight: "bold" }}></Text>
                            </Tooltip>
                        </View>
                    </View>
                    <View style={{ marginTop: 15, flexDirection: "row", justifyContent: 'space-evenly' }}>
                        <Image
                            source={require('../../pictures/others/infernal.png')}
                            style={{ height: 36, width: 31 }}
                        />
                        <Image
                            source={require('../../pictures/others/ocean.png')}
                            style={{ height: 36, width: 37 }}
                        />
                        <Image
                            source={require('../../pictures/others/mountain.png')}
                            style={{ height: 37, width: 37 }}
                        />
                        <Image
                            source={require('../../pictures/others/cloud.png')}
                            style={{ height: 42, width: 40 }}
                        />
                    </View>

                    <View style={{
                        marginLeft: 20, marginRight: 20, borderBottomColor: "black", borderTopWidth: 1, marginBottom: 40, marginTop: 10,
                        alignContent: 'center'
                    }}>

                        <FlatList
                            data={list}
                            renderItem={renderItem}
                            keyExtractor={item => item.key}
                            style={{ flexDirection: 'row', alignSelf: 'center' }}
                            horizontal={true}
                        />

                    </View>
                </View>

                <View style={{ backgroundColor: "white", marginTop: 5 }}>

                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.category}>Teamfights</Text>
                        {/* <View style={{ height: 20, width: 20, borderRadius: 20, borderColor: "gray", borderWidth: 1, alignSelf: "center", marginTop: 10, marginLeft: 10 }}>
                            <Tooltip popover={<Text style={{ color: "white" }}>This section estimates the outcome when 2 teams start a teamfight. Dragon fights are not considered as team fights due to the terrain of the dragon pit (which affects the factors taken into consideration for the team fight) </Text>}
                                width={280} height={125}>
                                <Text style={{ alignSelf: "center", fontWeight: "bold" }}>?</Text>
                            </Tooltip>
                        </View> */}
                        <View style={{ height: 20, width: 20, borderRadius: 20, borderColor: "gray", borderWidth: 1, alignSelf: "center", marginTop: 10, marginLeft: 10 }}>
                            <Text style={{position: 'absolute', marginLeft: 5.5}}>?</Text>
                            <Tooltip 
                                popover={<Text style={{ color: "white", lineHeight: 20 }}>This section estimates the outcome when 2 teams start a teamfight. Dragon fights are not considered as team fights due to the terrain of the dragon pit (which affects the factors taken into consideration for the team fight) </Text>}
                                width={280} 
                                height={135}
                                backgroundColor={"#232323"}
                                containerStyle={{marginTop: 35}}
                                withPointer={false}
                            >
                                <Text style={{ alignSelf: "center", fontWeight: "bold" }}></Text>
                            </Tooltip>
                        </View>
                    </View>

                    <View style={{ marginTop: 10 }}>
                        <View style={{ height: 30, marginLeft: 20, marginRight: 20, backgroundColor: "#DC5047", flexDirection: 'row' }}>
                            <View style={{ width: parseFloat(teamFightPer) + "%", backgroundColor: "#55B1CE" }} />
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginLeft: 20, marginRight: 20, marginTop: 5 }}>
                            <Text> {(parseFloat(teamFightPer)).toFixed(2)}%</Text>
                            <Text> {(100 - parseFloat(teamFightPer)).toFixed(2)}% </Text>
                        </View>
                        <Text
                            style={{ alignSelf: "center", textDecorationLine: "underline", color: "green", marginTop: 5 }}
                            onPress={() => setTeamFightDetail(!teamfightDetail)} >
                            Details</Text>
                        {teamfightDetail
                            ? <View></View>
                            : <View style={{ alignItems: "center", marginTop: 5, marginBottom: 5 }}>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={{ fontSize: 14, fontWeight: "500" }}>AD/AP damage (40%):</Text>
                                    <Text style={{ fontSize: 14, fontWeight: "500", color: "blue" }}>{teamFightPoints[0]["ADAP"]}</Text>
                                    <Text style={{ fontSize: 10, fontWeight: "500" }}> / </Text>
                                    <Text style={{ fontSize: 14, fontWeight: "500", color: "red" }}>{teamFightPoints[1]["ADAP"]}</Text>
                                </View>
                                <View style={{ flexDirection: "row", marginTop: 5, marginBottom: 5 }}>
                                    <Text style={{ fontSize: 14, fontWeight: "500" }}>Durability (40%):</Text>
                                    <Text style={{ fontSize: 14, fontWeight: "500", color: "blue" }}>{teamFightPoints[0]["durability"]}</Text>
                                    <Text style={{ fontSize: 10, fontWeight: "500" }}> / </Text>
                                    <Text style={{ fontSize: 14, fontWeight: "500", color: "red" }}>{teamFightPoints[1]["durability"]}</Text>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={{ fontSize: 14, fontWeight: "500" }}>CC (20%):</Text>
                                    <Text style={{ fontSize: 14, fontWeight: "500", color: "blue" }}>{teamFightPoints[0]["CC"]}</Text>
                                    <Text style={{ fontSize: 10, fontWeight: "500" }}> / </Text>
                                    <Text style={{ fontSize: 14, fontWeight: "500", color: "red" }}>{teamFightPoints[1]["CC"]}</Text>
                                </View>
                            </View>
                        }
                    </View>
                </View>

                <View style={{ backgroundColor: "white", marginTop: 5 }}>
                    <View>
                        <Text style={styles.category}>Dragon Fights</Text>
                        {/* <View style={{ height: 20, width: 20, borderRadius: 20, borderColor: "gray", borderWidth: 1, alignSelf: "center", marginTop: 10, marginLeft: 10 }}>
                            <Tooltip popover={<Text style={{ color: "white" }}>This section estimates the outcome of dragon fights. This is separated from other team fights due to the terrain of the dragon pit (which affects the factors taken into consideration) </Text>}
                                width={280} height={125}>
                                <Text style={{ alignSelf: "center", fontWeight: "bold" }}>?</Text>
                            </Tooltip>
                        </View> */}
                        <View style={{ height: 20, width: 20, borderRadius: 20, borderColor: "gray", borderWidth: 1, alignSelf: "center", marginTop: -20, marginLeft: -50 }}>
                            <Text style={{position: 'absolute', marginLeft: 5.5}}>?</Text>
                            <Tooltip 
                                popover={<Text style={{ color: "white", lineHeight: 20 }}>This section estimates the outcome of dragon fights. This is separated from other team fights due to the terrain of the dragon pit (which affects the factors taken into consideration) </Text>}
                                width={280} 
                                height={115}
                                backgroundColor={"#232323"}
                                containerStyle={{marginTop: 30}}
                                withPointer={false}
                            >
                                <Text style={{ alignSelf: "center", fontWeight: "bold" }}></Text>
                            </Tooltip>
                        </View>
                    </View>
                    <View style={{ marginTop: 10 }}>

                        <View style={{ height: 30, marginLeft: 20, marginRight: 20, backgroundColor: "#DC5047", flexDirection: 'row' }}>
                            <View style={{ width: parseFloat(dragonFightPer) + "%", backgroundColor: "#55B1CE" }} />
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginLeft: 20, marginRight: 20, marginTop: 5 }}>
                            <Text> {(parseFloat(dragonFightPer)).toFixed(2)}%</Text>
                            <Text> {(100 - parseFloat(dragonFightPer)).toFixed(2)}% </Text>
                        </View>

                        <Text
                            style={{ alignSelf: "center", textDecorationLine: "underline", color: "green", marginTop: 5 }}
                            onPress={() => setDragonFightDetail(!dragonfightDetail)} >
                            Details</Text>
                        {dragonfightDetail
                            ? <View></View>
                            : <View style={{ alignItems: "center", marginTop: 5, marginBottom: 5 }}>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={{ fontSize: 14, fontWeight: "500" }}>True Damage (25%):</Text>
                                    <Text style={{ fontSize: 14, fontWeight: "500", color: "blue" }}>{dragonFightPoints[0]["trueDamage"]}</Text>
                                    <Text style={{ fontSize: 10, fontWeight: "500" }}> / </Text>
                                    <Text style={{ fontSize: 14, fontWeight: "500", color: "red" }}>{dragonFightPoints[1]["trueDamage"]}</Text>
                                </View>
                                <View style={{ flexDirection: "row", marginTop: 5, marginBottom: 5 }}>
                                    <Text style={{ fontSize: 14, fontWeight: "500" }}>Mobility (25%):</Text>
                                    <Text style={{ fontSize: 14, fontWeight: "500", color: "blue" }}>{dragonFightPoints[0]["mobility"]}</Text>
                                    <Text style={{ fontSize: 10, fontWeight: "500" }}> / </Text>
                                    <Text style={{ fontSize: 14, fontWeight: "500", color: "red" }}>{dragonFightPoints[1]["mobility"]}</Text>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={{ fontSize: 14, fontWeight: "500" }}>Wave Clear (25%):</Text>
                                    <Text style={{ fontSize: 14, fontWeight: "500", color: "blue" }}>{dragonFightPoints[0]["waveClear"]}</Text>
                                    <Text style={{ fontSize: 10, fontWeight: "500" }}> / </Text>
                                    <Text style={{ fontSize: 14, fontWeight: "500", color: "red" }}>{dragonFightPoints[1]["waveClear"]}</Text>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={{ fontSize: 14, fontWeight: "500" }}>Dragon Rush (25%):</Text>
                                    <Text style={{ fontSize: 14, fontWeight: "500", color: "blue" }}>{dragonFightPoints[0]["dragonRush"]}</Text>
                                    <Text style={{ fontSize: 10, fontWeight: "500" }}> / </Text>
                                    <Text style={{ fontSize: 14, fontWeight: "500", color: "red" }}>{dragonFightPoints[1]["dragonRush"]}</Text>
                                </View>
                            </View>
                        }
                    </View>
                </View>
            </View>
        </ScrollView>
    )

}

const {width, height} = Dimensions.get("window")

const styles = StyleSheet.create({
    category: {
        fontSize: 18, fontWeight: '500', marginLeft: 24, marginTop: 10
    },
    blueBar: {
        height: 180, width: 30, borderWidth: 5, backgroundColor: "blue"
    },
    detailTexts: {
        fontSize: 10, fontWeight: "500"
    }
})