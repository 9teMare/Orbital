import React, {useEffect, useState} from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native'
import { PieChart } from 'react-minimal-pie-chart'

export default function lane({route}) {
    const {blue, red} = route.params
    const [isLoading, setLoader] = useState(true)


    const [list, setList] = useState([])
    const [teamFightPoints, setTeamFightPoints] = useState([])
    const [teamFightPer, setTeamFightPer] = useState(0)
    const [dragonFightPoints, setDragonFightPoints] = useState([])
    const [dragonFightPer, setDragonFightPer] = useState(0)

    const CCpriorityPoints = {"knockAside":0.9, "knockBack":1.1, "knockUp":1, "pull":1.2,
                              "blind":0.1, "charm":0.8, "flee":0.7, "taunt":0.8, "ground":0.3,
                                "knockDown":0.2, "root":0.7, "silence":0.6, "polymorph":0.65,
                                "sleep":0.75, "stun": 0.8, "suppression":1, "slow":0.2, "stasis":0.5,
                            "landScapeControl_JarvanIV":0.7, "landScapeControl_Camille":0.8, "landScapeControl_Yorick":0.6,
                            "landScapeControl_Taliyah":0.2, "landScapeControl_Anivia":0.4, "landScapeControl_Trundle":0.7,
                            "landScapeControl_Mordekaiser": 0.7, "selectableCC_Sylas": 0.5, "selectableCC_Viego":0.6}

    const fetching = async () => {

        const response = await fetch('http://ddragon.leagueoflegends.com/cdn/11.12.1/data/en_US/champion.json')
        const responded = await response.json()
        const data = responded.data

        const champOtherInfo = "https://orbital-riot-api.herokuapp.com/champOtherInfo"
        const fetchChampOtherInfo = await fetch (champOtherInfo, {
            "method" : "GET"
        })
        const champOtherInfo_responded = await fetchChampOtherInfo.json()
        

        var blue_ADAP = 0, red_ADAP = 0, blue_HP = 0, red_HP = 0, blue_speed = 0, red_speed = 0;
        var blue_durability_total = 0, red_durability_total = 0; 
        var blueCC_total = 0, redCC_total = 0
        var blue_mobility_total = 0, red_mobility_total = 0, blue_dragonRush = 0, red_dragonRush = 0; 
        var blue_waveclear = 0, red_waveclear = 0, blue_trueDamage = 0, red_trueDamage = 0; 

        for (var i=0; i<5; i++) {
            const blueName = new String
            blueName = blue[i]
            const redName = new String
            redName = red[i]

            //get CC points,dragon rush & wave clear
            const blueCC = champOtherInfo_responded[blueName]["CC"]
            const redCC = champOtherInfo_responded[redName]["CC"]
            const blueCCcount = blueCC["CCtypes"].length
            const redCCcount = redCC["CCtypes"].length

            blue_trueDamage += champOtherInfo_responded[blueName]["trueDamage"]["highestTotal"]
            red_trueDamage += champOtherInfo_responded[redName]["trueDamage"]["highestTotal"]
            blue_waveclear += champOtherInfo_responded[blueName]["waveClearRating"]
            red_waveclear += champOtherInfo_responded[redName]["waveClearRating"]
            blue_dragonRush += champOtherInfo_responded[blueName]["dragonRushRating"]
            red_dragonRush += champOtherInfo_responded[redName]["dragonRushRating"]

            for (var b=0; b<blueCCcount; b++) {
                blueCC_total += (CCpriorityPoints[blueCC["CCtypes"][b]]
                    * blueCC["CCtimeFrame"][b] 
                    * blueCC["CCrange"][b]
                    * blueCC["targetableNumber"][b])
            }

            for (var r=0; r<redCCcount; r++) {
                redCC_total += (CCpriorityPoints[redCC["CCtypes"][r]]
                    * redCC["CCtimeFrame"][r] 
                    * redCC["CCrange"][r]
                    * redCC["targetableNumber"][r])
            }

            //get durability & mobility from Communitiy Dragon
            const cdnResponse_blue = await fetch('https://cdn.communitydragon.org/11.12.1/champion/' + blueName + '/data')
            const cdnResponded_blue = await cdnResponse_blue.json()
            const cdnData_blue = cdnResponded_blue.playstyleInfo

            blue_durability_total += cdnData_blue["durability"]
            blue_mobility_total += cdnData_blue["mobility"]

            const cdnResponse_red = await fetch('https://cdn.communitydragon.org/11.12.1/champion/' + redName + '/data')
            const cdnResponded_red = await cdnResponse_red.json()
            const cdnData_red = cdnResponded_red.playstyleInfo

            red_durability_total += cdnData_red["durability"]
            red_mobility_total += cdnData_red["mobility"]

            //INFERNAL - AD, AP
            var blue_ADAP_18 = data[blueName]["stats"]["attackdamage"] + data[blueName]["stats"]["attackdamageperlevel"] * 17
                                + data[blueName]["stats"]["mp"] + data[blueName]["stats"]["mpperlevel"] * 17
            var red_ADAP_18 = data[redName]["stats"]["attackdamage"] + data[redName]["stats"]["attackdamageperlevel"] * 17
                                + data[redName]["stats"]["mp"] + data[redName]["stats"]["mpperlevel"] * 17

            blue_ADAP += blue_ADAP_18
            red_ADAP += red_ADAP_18

            //OCEAN - TANKS
            var blue_HP_18 = data[blueName]["stats"]["hp"] + data[blueName]["stats"]["hpperlevel"] * 17
                                + data[blueName]["stats"]["armor"] + data[blueName]["stats"]["armorperlevel"] * 17
            var red_HP_18 = data[redName]["stats"]["hp"] + data[redName]["stats"]["hpperlevel"] * 17
                                + data[redName]["stats"]["armor"] + data[redName]["stats"]["armorperlevel"] * 17

            blue_HP += blue_HP_18
            red_HP += red_HP_18

            //CLOUD - movement speed
            var blue_speed_18 = data[blueName]["stats"]["movespeed"]
            var red_speed_18 = data[redName]["stats"]["movespeed"]

            blue_speed += blue_speed_18
            red_speed += red_speed_18

        }
        
        const ADAP_ratio = ((blue_ADAP / (blue_ADAP + red_ADAP))*220).toFixed(1)
        const ADAP_percentage = ((blue_ADAP / (blue_ADAP + red_ADAP))*100).toFixed(1)

        const HP_ratio = ((blue_HP / (blue_HP + red_HP))*220).toFixed(1)
        const HP_percentage = ((blue_HP / (blue_HP + red_HP))*100).toFixed(1)

        const Tank_ratio = 220 - HP_ratio
        const Tank_percentage = 100 - HP_percentage

        const speed_ratio = ((blue_speed / (blue_speed + red_speed))*220).toFixed(1)
        const speed_percentage = ((blue_speed / (blue_speed + red_speed))*100).toFixed(1)

        const blue_teamFightPoints = 0.2 * blueCC_total + 0.4 * blue_ADAP + 0.4 * blue_durability_total
        const red_teamFightPoints = 0.2 * redCC_total + 0.4 * red_ADAP + 0.4 * red_durability_total
        const teamFightRatio = ((blue_teamFightPoints / (blue_teamFightPoints + red_teamFightPoints))*100).toFixed(2)

        const blue_dragonFightPoints = blue_mobility_total + blue_trueDamage + blue_dragonRush + blue_waveclear
        const red_dragonFightPoints = red_mobility_total + red_trueDamage + red_dragonRush + red_waveclear
        const dragonFightRatio = ((blue_dragonFightPoints / (blue_dragonFightPoints + red_dragonFightPoints))*100).toFixed(2)

        //setTeamFightPoints([parseFloat(blue_teamFightPoints), parseFloat(red_teamFightPoints)])
        setTeamFightPoints([{title: 'blue', value: parseFloat(blue_teamFightPoints), color:"#55B1CE"},
                            {title:'red', value: parseFloat(red_teamFightPoints), color:"#DC5047"}])
        setTeamFightPer(parseFloat(teamFightRatio))

        setDragonFightPoints([{title:'blue', value: parseFloat(blue_dragonFightPoints), color:"#55B1CE"},
                              {title:'red', value: parseFloat(red_dragonFightPoints), color:"#DC5047"}])
        setDragonFightPer(parseFloat(dragonFightRatio))

        setList([{key: 'ADAP', ratio: parseFloat(ADAP_ratio), per: ADAP_percentage}, 
                    {key: 'HP', ratio: parseFloat(HP_ratio), per: HP_percentage},
                    {key:'Tank', ratio: parseFloat(Tank_ratio), per: Tank_percentage},
                    {key:'Speed', ratio:parseFloat(speed_ratio), per: speed_percentage}])

        setLoader(false)

    }


    const Item = ({ratio, per}) => {
        return(
            <View>
        <View style={{flexDirection:'row', marginLeft:10, marginRight:10}}>
            <View>
                <View
                    style ={{width:30, backgroundColor:"#55B1CE", height: ratio}}
                >
                </View>
            </View>
            <View>
            <View
                style={{width:30, backgroundColor:"#DC5047", height: 220-ratio}}
            >
            </View>
            </View>
        </View>
            <Text style={{fontSize:11, alignSelf:'center', marginTop:8, fontWeight:'bold'}}>{per}/{100-per}</Text>
        </View>
        )
    }

    const renderItem = ({item}) => {
        return(
        <Item ratio={item.ratio} per={item.per}/>
        )
    }

    useEffect(() => {
        fetching()
       }, []);   

    if (isLoading) {
        return (
            <View style={{height: width / 3, width: width / 2, backgroundColor: '#b8bab9', alignSelf: 'center', marginTop: height / 3, borderRadius: 10}}>
                <Text style={{fontSize: 20, fontWeight: 'bold', alignSelf: 'center', marginTop: 40, color: 'grey'}}> 
                    Loading...
                </Text>
            </View>
        )
    }

    return (
        <View style={{flexDirection:'column'}}>
            <View style={{backgroundColor:"white"}}> 
                <Text style={styles.category}> These dragons might favor... </Text>
                <View style={{marginTop: 15, flexDirection:"row", justifyContent:'space-evenly'}}>
                    <Image 
                        source={require('../../pictures/others/infernal.png')}
                        style={{height:36, width:31}}
                        />
                    <Image 
                        source={require('../../pictures/others/ocean.png')}
                        style={{height:36, width:37}}
                        /> 
                    <Image 
                        source={require('../../pictures/others/mountain.png')}
                        style={{height:37, width:37}}
                        />   
                    <Image 
                        source={require('../../pictures/others/cloud.png')}
                        style={{height:42, width:40}}
                        />  
                </View>

                <View style={{ marginLeft:20, marginRight:20, borderBottomColor: "black",borderTopWidth:1, marginBottom: 40, marginTop:10,
                                alignContent:'center'}}>

                    <FlatList 
                        data = {list}
                        renderItem = {renderItem}
                        keyExtractor = {item => item.key}
                        style={{flexDirection:'row', alignSelf:'center'}}
                        horizontal = {true}
                        />
                    
                </View>



            </View>

            <View style={{backgroundColor:"white", marginTop: 5}}>
                <Text style={styles.category}>Teamfights</Text> 

                <View style ={{flexDirection:'row', marginTop:10, justifyContent:'space-evenly'}}>
                    {/* <PieChart 
                        data = {teamFightPoints}
                        //style = {{height: "100px"}}
                        //lineWidth = {30}
                    /> */}
                    <View>
                        <Text style={{color:"blue"}}>{teamFightPer}%</Text>
                        <Text style={{color:"red"}}>{100-teamFightPer}%</Text>
                    </View>
                </View>

            </View>

            {/* <View style={{backgroundColor:"white", marginTop: 5}}>
                <Text style={styles.category}> Dragon Fights</Text> 
                <PieChart 
                    data = {dragonFightPoints}
                    style = {{height:"100px"}}
                    lineWidth={30}
                />

            </View> */}

        </View>
    )

}

const styles = StyleSheet.create({
    category: {
        fontSize: 18, fontWeight:'500', marginLeft:24, marginTop:10
    }, 
    blueBar: {
        height:180, width:30, borderWidth:5, backgroundColor:"blue"
    }
})