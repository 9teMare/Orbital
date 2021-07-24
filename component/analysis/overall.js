import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'


export default function overall({ route }) {

    const TOP = 0, JUNGLE = 1, MID = 2, ADC = 3, SUPPORT = 4
    const { blue, red } = route.params
    const [isLoading, setLoader] = useState(true)

    const CCpriorityPoints = {
        "knockAside": 0.9, "knockBack": 1.1, "knockUp": 1, "pull": 1.2,
        "blind": 0.1, "charm": 0.8, "flee": 0.7, "taunt": 0.8, "ground": 0.3,
        "knockDown": 0.2, "root": 0.7, "silence": 0.6, "polymorph": 0.65,
        "sleep": 0.75, "stun": 0.8, "suppression": 1, "slow": 0.2, "stasis": 0.5,
        "landScapeControl_JarvanIV": 0.7, "landScapeControl_Camille": 0.8, "landScapeControl_Yorick": 0.6,
        "landScapeControl_Taliyah": 0.2, "landScapeControl_Anivia": 0.4, "landScapeControl_Trundle": 0.7,
        "landScapeControl_Mordekaiser": 0.7, "selectableCC_Sylas": 0.5, "selectableCC_Viego": 0.6
    }

    const [earlyWinRate, setEarlyWinRate] = useState([]) //[blue, red]
    const [lateWinRate, setLateWinRate] = useState([]) //[blue, red]
    const [dragonFightPoints, setDragonFightPoints] = useState([])
    const [taemFightPoints, setTeamFightPoints] = useState([])

    const [overall, setOverall] = useState([])

    const fetching = async () => {

        var blue_earlyGameTotal = 0
        var red_earlyGameTotal = 0
        var blue_lateGameTotal = 0, red_lateGameTotal = 0

        //from CDN
        var blue_playStyleInfo = [], red_playStyleInfo = []

        //from ddragon
        var blue_range = [], red_range = []
        var adSpeed = [] //[blueAD, redAD]

        //from other info 
        var blue_CCpoints = [], red_CCpoints = []
        var blue_waveclear = [], red_waveclear = []
        var dragonRush = [] //[blueJG, redJG]

        var blue_durability_total = 0, red_durability_total = 0;
        var blueCC_total = 0, redCC_total = 0
        var blue_mobility_total = 0, red_mobility_total = 0, blue_dragonRush = 0, red_dragonRush = 0;
        var blue_waveclear_total = 0, red_waveclear_total = 0, blue_trueDamage = 0, red_trueDamage = 0;

        const champOtherInfo = "https://orbital-riot-api.herokuapp.com/champOtherInfo"
        const fetchChampOtherInfo = await fetch(champOtherInfo, {
            "method": "GET"
        })
        const champOtherInfo_responded = await fetchChampOtherInfo.json()

        const response = await fetch('http://ddragon.leagueoflegends.com/cdn/11.15.1/data/en_US/champion.json')
        const responded = await response.json()
        const data = responded.data

        //other info - dragon rush
        dragonRush.push(champOtherInfo_responded[blue[JUNGLE]]["dragonRushRating"])
        dragonRush.push(champOtherInfo_responded[red[JUNGLE]]["dragonRushRating"])

        //ddragon - AD attack speed
        adSpeed.push(data[blue[ADC]]["stats"]["attackspeed"])
        adSpeed.push(data[red[ADC]]["stats"]["attackspeed"])

        for (var i = 0; i < 5; i++) {
            console.log(i)
            const blueName = new String
            blueName = blue[i]
            const redName = new String
            redName = red[i]

            //from ddragon
            blue_range.push(data[blueName]["stats"]["attackrange"])
            red_range.push(data[redName]["stats"]["attackrange"])

            //from CDN
            const response_CDN_blue = await fetch('https://cdn.communitydragon.org/11.15.1/champion/' + blueName + '/data')
            const responded_CDN_blue = await response_CDN_blue.json()
            const data_CDN_blue = responded_CDN_blue.playstyleInfo

            blue_playStyleInfo.push(data_CDN_blue)
            blue_durability_total += data_CDN_blue["durability"]
            blue_mobility_total += data_CDN_blue["mobility"]

            const response_CDN_red = await fetch('https://cdn.communitydragon.org/11.15.1/champion/' + redName + '/data')
            const responded_CDN_red = await response_CDN_red.json()
            const data_CDN_red = responded_CDN_red.playstyleInfo

            red_playStyleInfo.push(data_CDN_red)
            red_durability_total += data_CDN_red["durability"]
            red_mobility_total += data_CDN_red["mobility"]

            //Other info - CC points
            const blueCC = champOtherInfo_responded[blueName]["CC"]
            const redCC = champOtherInfo_responded[redName]["CC"]
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
            blueCC_total += CCpoint_blue
            blue_CCpoints.push(CCpoint_blue)

            for (var r = 0; r < redCCcount; r++) {
                CCpoint_red += (CCpriorityPoints[redCC["CCtypes"][r]]
                    * redCC["CCtimeFrame"][r]
                    * redCC["CCrange"][r]
                    * redCC["targetableNumber"][r])
            }
            redCC_total += CCpoint_red
            red_CCpoints.push(CCpoint_red)

            //Other info - wave clear
            blue_waveclear.push(champOtherInfo_responded[blueName]["waveClearRating"])
            red_waveclear.push(champOtherInfo_responded[redName]["waveClearRating"])

            blue_trueDamage += champOtherInfo_responded[blueName]["trueDamage"]["highestTotal"]
            red_trueDamage += champOtherInfo_responded[redName]["trueDamage"]["highestTotal"]
            blue_waveclear_total += champOtherInfo_responded[blueName]["waveClearRating"]
            red_waveclear_total += champOtherInfo_responded[redName]["waveClearRating"]
            blue_dragonRush += champOtherInfo_responded[blueName]["dragonRushRating"]
            red_dragonRush += champOtherInfo_responded[redName]["dragonRushRating"]
        }


        //calculate TOP
        blue_earlyGameTotal += (0.3 * blue_playStyleInfo[TOP]["damage"] + 0.2 * blue_playStyleInfo[TOP]["durability"]
            + 0.3 * blue_waveclear[TOP] + 0.2 * blue_range[TOP])
        red_earlyGameTotal += 0.3 * red_playStyleInfo[TOP]["damage"] + 0.2 * red_playStyleInfo[TOP]["durability"]
            + 0.3 * red_waveclear[TOP] + 0.2 * red_range[TOP]

        //calculate JG
        blue_earlyGameTotal += 0.2 * blue_playStyleInfo[JUNGLE]["mobility"] + 0.3 * blue_waveclear[JUNGLE]
            + 0.2 * dragonRush[0] + 0.3 * blue_CCpoints[JUNGLE]
        red_earlyGameTotal += 0.2 * red_playStyleInfo[JUNGLE]["mobility"] + 0.3 * red_waveclear[JUNGLE]
            + 0.2 * dragonRush[1] + 0.3 * red_CCpoints[JUNGLE]

        //calculate MID
        blue_earlyGameTotal += 0.4 * blue_waveclear[MID] + 0.3 * blue_playStyleInfo[MID]["damage"]
            + 0.2 * blue_range[MID] + 0.1 * blue_playStyleInfo[MID]["durability"]
        red_earlyGameTotal += 0.4 * red_waveclear[MID] + 0.3 * red_playStyleInfo[MID]["damage"]
            + 0.2 * red_range[MID] + 0.1 * red_playStyleInfo[MID]["durability"]

        //calculate BOT
        blue_earlyGameTotal += 0.2 * blue_range[ADC] + 0.15 * adSpeed[0] + 0.15 * blue_playStyleInfo[ADC]["damage"]
            + 0.15 * blue_playStyleInfo[SUPPORT]["utility"] + 0.15 * blue_playStyleInfo[SUPPORT]["durability"] + 0.2 * blue_CCpoints[SUPPORT]
        red_earlyGameTotal += 0.2 * red_range[ADC] + 0.15 * adSpeed[1] + 0.15 * red_playStyleInfo[ADC]["damage"]
            + 0.15 * red_playStyleInfo[SUPPORT]["utility"] + 0.15 * red_playStyleInfo[SUPPORT]["durability"] + 0.2 * red_CCpoints[SUPPORT]

        //JG-TOP
        blue_earlyGameTotal += 0.3 * blue_waveclear[TOP] + 0.1 * blue_CCpoints[TOP] + 0.1 * blue_playStyleInfo[JUNGLE]["mobility"]
            + 0.2 * blue_CCpoints[JUNGLE] + 0.3 * (blue_playStyleInfo[TOP]["damage"] + blue_playStyleInfo[JUNGLE]["damage"])
        red_earlyGameTotal += 0.3 * red_waveclear[TOP] + 0.1 * red_CCpoints[TOP] + 0.1 * red_playStyleInfo[JUNGLE]["mobility"]
            + 0.2 * red_CCpoints[JUNGLE] + 0.3 * (red_playStyleInfo[TOP]["damage"] + red_playStyleInfo[JUNGLE]["damage"])

        //JG_MID
        blue_earlyGameTotal += 0.3 * blue_waveclear[MID] + 0.1 * blue_CCpoints[MID] + 0.1 * blue_playStyleInfo[JUNGLE]["mobility"]
            + 0.2 * blue_CCpoints[JUNGLE] + 0.3 * (blue_playStyleInfo[MID]["damage"] + blue_playStyleInfo[JUNGLE]["damage"])
        red_earlyGameTotal += 0.3 * red_waveclear[MID] + 0.1 * red_CCpoints[MID] + 0.1 * red_playStyleInfo[JUNGLE]["mobility"]
            + 0.2 * red_CCpoints[JUNGLE] + 0.3 * (red_playStyleInfo[MID]["damage"] + red_playStyleInfo[JUNGLE]["damage"])

        //JG-BOT
        blue_earlyGameTotal += 0.3 * (blue_waveclear[ADC] + blue_waveclear[SUPPORT]) + 0.1 * (blue_CCpoints[ADC] + blue_CCpoints[SUPPORT]) + 0.1 * blue_playStyleInfo[JUNGLE]["mobility"]
            + 0.2 * blue_CCpoints[JUNGLE] + 0.3 * (blue_playStyleInfo[ADC]["damage"] + blue_playStyleInfo[SUPPORT]["damage"] + blue_playStyleInfo[JUNGLE]["damage"])
        red_earlyGameTotal += 0.3 * (red_waveclear[ADC] + red_waveclear[SUPPORT]) + 0.1 * (red_CCpoints[ADC] + red_CCpoints[SUPPORT]) + 0.1 * red_playStyleInfo[JUNGLE]["mobility"]
            + 0.2 * red_CCpoints[JUNGLE] + 0.3 * (red_playStyleInfo[ADC]["damage"] + red_playStyleInfo[SUPPORT]["damage"] + red_playStyleInfo[JUNGLE]["damage"])

        blue_lateGameTotal = blue_durability_total + blueCC_total + blue_mobility_total + blue_waveclear_total + blue_dragonRush + blue_trueDamage
        red_lateGameTotal = red_durability_total + redCC_total + red_mobility_total + red_waveclear_total + red_dragonRush + red_trueDamage

        var blue_dragonFightPoints = blue_mobility_total + blue_waveclear_total + blue_dragonRush + blue_trueDamage
        var red_dragonFightPoints = red_mobility_total + red_waveclear_total + red_dragonRush + red_trueDamage
        var blue_teamFightPoints = blue_durability_total + blue_CCpoints.reduce((a, b) => a + b, 0)
        var red_teamFightPoints = red_durability_total + red_CCpoints.reduce((a, b) => a + b, 0)

        var blue_overall = blue_earlyGameTotal * 0.3 + blue_dragonFightPoints * 0.3 + blue_teamFightPoints * 0.4
        var red_overall = red_earlyGameTotal * 0.3 + red_dragonFightPoints * 0.3 + red_teamFightPoints * 0.4

        setEarlyWinRate([parseFloat(blue_earlyGameTotal), parseFloat(red_earlyGameTotal)])
        setLateWinRate([parseFloat(blue_lateGameTotal), parseFloat(red_lateGameTotal)])
        setDragonFightPoints([parseFloat(blue_dragonFightPoints), parseFloat(red_dragonFightPoints)])
        setTeamFightPoints([parseFloat(blue_teamFightPoints), parseFloat(red_teamFightPoints)])

        setOverall([parseFloat(blue_overall.toFixed(2)), parseFloat(red_overall.toFixed(2))])

        setLoader(false)
    }

    useEffect(() => {
        fetching()
    }, []);

    if (isLoading) {
        return (
            <Text>Loading...</Text>
        )
    }


    return (
        <View style={{ flexDirection: 'column'}}>
            <View style={{ backgroundColor: "white" }}>
                <Text style={styles.category}> Win rate by game stage</Text>
                <View style={{ marginTop: 10 }}>
                    <Text style={{ alignSelf: "center", fontWeight: "400", marginBottom: 5 }}> Early Game </Text>
                    <View style={{ height: 30, marginLeft: 20, marginRight: 20, backgroundColor: "#DC5047", flexDirection: 'row' }}>
                        <View style={{ width: parseFloat(((earlyWinRate[0] / (earlyWinRate[0] + earlyWinRate[1])) * 100).toFixed(2)) + "%", backgroundColor: "#55B1CE" }} />
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginLeft: 20, marginRight: 20, marginTop: 5 }}>
                        <Text> {parseFloat(((earlyWinRate[0] / (earlyWinRate[0] + earlyWinRate[1])) * 100).toFixed(2))}%</Text>
                        <Text> {parseFloat(((earlyWinRate[1] / (earlyWinRate[1] + earlyWinRate[0])) * 100).toFixed(2))}% </Text>
                    </View>
                </View>

                <View style={{ marginTop: 10, marginBottom: 10 }}>
                    <Text style={{ alignSelf: "center", fontWeight: "400", marginBottom: 5 }}> Late Game </Text>
                    <View style={{ height: 30, marginLeft: 20, marginRight: 20, backgroundColor: "#DC5047", flexDirection: 'row' }}>
                        <View style={{ width: parseFloat(((lateWinRate[0] / (lateWinRate[0] + lateWinRate[1])) * 100).toFixed(2)) + "%", backgroundColor: "#55B1CE" }} />
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginLeft: 20, marginRight: 20, marginTop: 5 }}>
                        <Text> {parseFloat(((lateWinRate[0] / (lateWinRate[0] + lateWinRate[1])) * 100).toFixed(2))}%</Text>
                        <Text> {parseFloat(((lateWinRate[1] / (lateWinRate[1] + lateWinRate[0])) * 100).toFixed(2))}% </Text>
                    </View>
                </View>
            </View>


            <View style={{ backgroundColor: "white", marginTop: 5 }}>
                <Text style={styles.category}> OVERALL </Text>
                <View style={{alignItems:"center", marginTop:15}}>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ color: "#55B1CE", fontSize: 30 }}>{overall[0]}</Text>
                        <Text style={{ fontSize: 30 }}> / </Text>
                        <Text style={{ color: "#DC5047", fontSize: 30 }}>{overall[1]}</Text>
                    </View>
                </View>

                <View style={{alignItems:"center", marginTop:10}}>
                <View style={{ flexDirection: "row", justifyContent:"space-between"}}>
                    <Text style={{ color: "#55B1CE", fontSize: 18 }}>{(overall[0] / (overall[0] + overall[1])).toFixed(2) * 100}%       </Text>
                    <Text style={{ color: "#DC5047", fontSize: 18 }}>       {(overall[1] / (overall[1] + overall[0])).toFixed(2) * 100}%</Text>
                </View>
                </View>
            </View>

        </View>
    )
}


const styles = StyleSheet.create({
    category: {
        fontSize: 18, fontWeight: '500', marginLeft: 24, marginTop: 10
    }
})