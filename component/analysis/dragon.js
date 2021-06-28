import React, {useEffect, useState} from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'

export default function lane({route}) {
    const {blue, red} = route.params
    const [isLoading, setLoader] = useState(true)
    //bar height
    const [ADAP, setADAP] = useState(0)
    const [HP, setHP] = useState([])
    const [speed, setSpeed] = useState([])

    //percentage 
    const [ADAP_per, setADAP_per] = useState([])
    const [HP_per, setHP_per] = useState([])
    const [speed_per, setSpeed_per] = useState([])


    const fetching = async () => {

        const response = await fetch('http://ddragon.leagueoflegends.com/cdn/11.12.1/data/en_US/champion.json')
        const responded = await response.json()
        const data = responded.data

        var blue_ADAP = 0, red_ADAP = 0, blue_HP = 0, red_HP = 0, blue_speed = 0, red_speed = 0;

        for (var i=0; i<5; i++) {
            const blueName = new String
            blueName = blue[i]
            const redName = new String
            redName = red[i]

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

        const ADAP_ratio = ((blue_ADAP / (blue_ADAP + red_ADAP))*220).toFixed(2)
        const ADAP_percentage = ((blue_ADAP / (blue_ADAP + red_ADAP))*100).toFixed(2)
        const HP_ratio = blue_HP / (blue_HP + red_HP)
        const speed_ratio = blue_speed / (blue_speed + red_speed)

        setADAP(ADAP_ratio)
        console.log(ADAP_ratio)
        setHP([HP_ratio.toFixed(2), 1-HP_ratio.toFixed(2)])
        setSpeed([speed_ratio.toFixed(2), 1-speed_ratio.toFixed(2)])

        setADAP_per(ADAP_percentage)
        setLoader(false)

    }

    useEffect(() => {
        fetching()
       }, []);

    if (isLoading) {
        return (
            <Text> Loading...</Text>
        )
    }

    const styles = StyleSheet.create({
        category: {
            fontSize: 18, fontWeight:'500', marginLeft:24, marginTop:10
        }, 
        blueBar: {
            height:ADAP, width:30, borderWidth:5, backgroundColor:"blue"
        }
    })



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

                <View style={{height:220, marginLeft:20, marginRight:20, borderBottomColor: "black",borderTopWidth:1, marginBottom: 40, marginTop:10, flexDirection:"column"}}>
                    <View style={{flexDirection:"row", justifyContent:"space-evenly"}}>

                        {/* infernal */}
                        <View style={{flexDirection:"row"}}>
                        <View style={{height:ADAP}}>
                            <TouchableOpacity
                                style={styles.blueBar}>
                            </TouchableOpacity>
                                
                            <Text> {ADAP_per}% </Text>
                        </View>
                        <View>
                            <TouchableOpacity
                                style={{height:1-ADAP, backgroundColor:"blue", width:30}}>
                            </TouchableOpacity>
                            <Text> {ADAP_per}% </Text>
                        </View>
                        </View>

                        {/* ocean */}
                        <View style={{flexDirection:"row"}}>
                        <View>
                            <TouchableOpacity
                                style={{height:220, backgroundColor:"red", width:30}}>
                            </TouchableOpacity>
                            <Text> 80% </Text>
                        </View>
                        <View>
                            <TouchableOpacity
                                style={{height:180, backgroundColor:"blue", width:30}}>
                            </TouchableOpacity>
                            <Text> 90 %</Text>
                        </View>
                        </View>

                        {/* mountain */}
                        <View style={{flexDirection:"row"}}>
                        <View>
                            <TouchableOpacity
                                style={{height:220, backgroundColor:"red", width:30}}>
                            </TouchableOpacity>
                            <Text> 80% </Text>
                        </View>
                        <View>
                            <TouchableOpacity
                                style={{height:180, backgroundColor:"blue", width:30}}>
                            </TouchableOpacity>
                            <Text> 90 %</Text>
                        </View>
                        </View>

                        {/* cloud */}
                        <View style={{flexDirection:"row"}}>
                        <View>
                            <TouchableOpacity
                                style={{height:220, backgroundColor:"red", width:30}}>
                            </TouchableOpacity>
                            <Text> 80% </Text>
                        </View>
                        <View>
                            <TouchableOpacity
                                style={{height:180, backgroundColor:"blue", width:30}}>
                            </TouchableOpacity>
                            <Text> 90 %</Text>
                        </View>
                        </View>
                        
                    </View>

                    
                    
                </View>



            </View>

            <View style={{backgroundColor:"white", marginTop: 5}}>
                <Text style={styles.category}> The Elder Dragon Fight</Text> 



            </View>

            <View style={{backgroundColor:"white", marginTop: 5}}>
                <Text style={styles.category}> The Baron Fight</Text> 



            </View>

        </View>
    )

}

