
import React, {useEffect, useState} from 'react'
import { View, Text, Image, StyleSheet, FlatList, ScrollView} from 'react-native'

const TOP = 0, JUNGLE = 1, MID = 2, ADC = 3, SUPPORT = 4
const ASSASSIN = 0, FIGHTER = 1, MAGE = 2, MARKSMAN = 3, TANK = 5 //SUPPORT = 4
const BLUE = 0, RED = 1


export default function stats({route}) {
    const {blue, red} = route.params
    const [isLoading, setLoader] = useState(true)
    const [tag, setTag] = useState([])

    const [CC_names_blue, setCC_names_blue] = useState([])
    const [CC_details_blue, setCC_details_blue] = useState([])

    const [CC_names_red, setCC_names_red] = useState([])
    const [CC_details_red, setCC_details_red] = useState([])


    const CCpriorityPoints = {"knockAside":0.9, "knockBack":1.1, "knockUp":1, "pull":1.2,
    "blind":0.1, "charm":0.8, "flee":0.7, "taunt":0.8, "ground":0.3,
      "knockDown":0.2, "root":0.7, "silence":0.6, "polymorph":0.65,
      "sleep":0.75, "stun": 0.8, "suppression":1, "slow":0.2, "stasis":0.5,
  "landScapeControl_JarvanIV":0.7, "landScapeControl_Camille":0.8, "landScapeControl_Yorick":0.6,
  "landScapeControl_Taliyah":0.2, "landScapeControl_Anivia":0.4, "landScapeControl_Trundle":0.7,
  "landScapeControl_Mordekaiser": 0.7, "selectableCC_Sylas": 0.5, "selectableCC_Viego":0.6}  

    const pickHighest = (arr) => {
        var temp = [];
        var tempHighest = 0;
        for (var i=0; i<arr.length; i++) {
            if (i===0) {
                temp[0] = i;
                tempHighest = arr[0]
            } else {
                if (arr[i] === tempHighest) {
                    temp.push(i)
                }
                if (arr[i] > tempHighest) {
                    temp = [i]
                    tempHighest = arr[i]
                } 
            }
        }
        return temp
    }

    const CC_getTop2 = (arr) => {
        var temp = [] //inside are indexes, not points!
        for (var i=0; i<arr.length; i++) {
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

    const fetching = async () => {
        var blueTag = []
        var redTag = []
        var damage_AD = [[], []], damage_AP = [[], []], assassin = [[], []], fighter = [[], []], heal_protect = [[], []], tank = [[], []] 
        var scaling_AD =[[], []], scaling_AP =[[], []], attackRange = [[],[]]
        var blueCC_all = [], redCC_all = []

        const response = await fetch('http://ddragon.leagueoflegends.com/cdn/11.12.1/data/en_US/champion.json')
        const responded = await response.json()
        const data = responded.data

        const champOtherInfo = "https://orbital-riot-api.herokuapp.com/champOtherInfo"
        const fetchChampOtherInfo = await fetch (champOtherInfo, {
            "method" : "GET"
        })
        const champOtherInfo_responded = await fetchChampOtherInfo.json()
    
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

        var blue_adScaling = [], blue_apScaling = [], blue_range = []
        var red_adScaling = [], red_apScaling = [], red_range = []

        for (let i=0; i<5; i++) {
            const blueName = new String
            blueName = blue[i]
            const redName = new String
            redName = red[i]

            blueTag.push(data[blueName]["tags"])
            redTag.push(data[redName]["tags"])

            blue_adScaling.push(data[blueName]["stats"]["attackdamageperlevel"] * data[blueName]["stats"]["attackspeedperlevel"])
            red_adScaling.push(data[redName]["stats"]["attackdamageperlevel"] * data[redName]["stats"]["attackspeedperlevel"])

            blue_apScaling.push(data[blueName]["stats"]["mpperlevel"])
            red_apScaling.push(data[redName]["stats"]["mpperlevel"])

            blue_range.push(data[blueName]["stats"]["attackrange"])
            red_range.push(data[blueName]["stats"]["attackrange"])

            //get CC points
            const blueCC = champOtherInfo_responded[blueName]["CC"]
            const redCC = champOtherInfo_responded[redName]["CC"]
            const blueCCcount = blueCC["CCtypes"].length
            const redCCcount = redCC["CCtypes"].length

            var CCpoint_blue = 0 //individual CC points
            var CCpoint_red = 0
        
            for (var b=0; b<blueCCcount; b++) {
                var CCpoint_blue = CCpoint_blue +(CCpriorityPoints[blueCC["CCtypes"][b]]
                        * blueCC["CCtimeFrame"][b] 
                    * blueCC["CCrange"][b]
                    * blueCC["targetableNumber"][b])
            }
            blueCC_all.push(CCpoint_blue)

            for (var r=0; r<redCCcount; r++) {
                CCpoint_red += (CCpriorityPoints[redCC["CCtypes"][r]]
                    * redCC["CCtimeFrame"][r] 
                    * redCC["CCrange"][r]
                    * redCC["targetableNumber"][r])
            }
            redCC_all.push(CCpoint_red) 
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

        var blue_top2 = CC_getTop2(blueCC_all)
        var red_top2 = CC_getTop2(redCC_all)
        var blue_top2_details = []
        var red_top2_details = []
        var blue_top2_names = []
        var red_top2_names = []

        for (var j=0; j<2; j++) {
            var blue_skillsDetail = []
            for (var k=0; k<champOtherInfo_responded[blue[blue_top2[j]]]["CC"]["CCskillKeys"].length; k++) {
                blue_skillsDetail.push({key: champOtherInfo_responded[blue[blue_top2[j]]]["CC"]["CCskillKeys"][k],
                                        skill: champOtherInfo_responded[blue[blue_top2[j]]]["CC"]["CCskills"][k]})
            }

            blue_top2_details.push({skillDetail: blue_skillsDetail,
                                    types: champOtherInfo_responded[blue[blue_top2[j]]]["CC"]["CCtypes"]})
            
            var red_skillsDetail = []
            for (var l=0; l<champOtherInfo_responded[red[red_top2[j]]]["CC"]["CCskillKeys"].length; l++) {
                red_skillsDetail.push({key: champOtherInfo_responded[red[red_top2[j]]]["CC"]["CCskillKeys"][l],
                                        skill: champOtherInfo_responded[red[red_top2[j]]]["CC"]["CCskills"][l]})
            }
            red_top2_details.push({skillDetail: red_skillsDetail,
                                    types: champOtherInfo_responded[red[red_top2[j]]]["CC"]["CCtypes"]})

            blue_top2_names.push(blue[blue_top2[j]])
            red_top2_names.push(red[red_top2[j]])
        }

        const blue_ADhighest = pickHighest(blue_adScaling).map((index) => blue[index])
        const red_ADhighest = pickHighest(red_adScaling).map((index) => red[index])
        const blue_APhighest = pickHighest(blue_apScaling).map((index) => blue[index])
        const red_APhighest = pickHighest(red_apScaling).map((index) => red[index])
        const blue_RANGE = pickHighest(blue_range).map((index) => blue[index])
        const red_RANGE = pickHighest(red_range).map((index) => red[index])
            
        scaling_AD = [blue_ADhighest, red_ADhighest]
        scaling_AP = [blue_APhighest, red_APhighest]
        attackRange = [blue_RANGE, red_RANGE]

        setCC_names_blue(blue_top2_names)
        setCC_names_red(red_top2_names)
        setCC_details_blue(blue_top2_details)
        setCC_details_red(red_top2_details)

        setTag([{title: "ASSASSINATION", arr: assassin},
            {title: "FIGHTER", arr: fighter},
            {title: "AP DAMAGE", arr: damage_AP},
            {title: "AD DAMAGE", arr: damage_AD},
            {title: "HEAL/PROTECTION", arr: heal_protect},
            {title: "TANKING", arr: tank},
            {title: "AD SCALING", arr: scaling_AD},
            {title: "AP SCALING", arr: scaling_AP},
            {title: "ATTACK RANGE", arr: attackRange}])

        setLoader(false)

    }   

    
    useEffect(() => {
        fetching()
       }, []);


    const champPic = (arr) => {
        if (arr.length === 0) {
            return (
                <Image 
                    source = {require('../../pictures/others/warning_sign.png')}
                    style = {{height: 55, width: 54, alignSelf:"center", marginTop:15}}
                    />
            )
        }
        if (arr.length === 1) {
            return (
                <View style={{marginTop:15}}>
                <Image 
                    source = {{uri: 'http://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/' + arr[0] + '.png'}}
                    style = {styles.IconBig}
                />
                </View>
            )
        }
        if (arr.length === 2) {
            return (
                <View style={{flexDirection:"row", justifyContent:'space-evenly', marginTop:23}}>
                    <Image 
                        source = {{uri: 'http://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/' + arr[0] + '.png'}}
                        style = {{height: 40, width: 40, borderRadius: 40}}
                    />
                    <Image 
                        source = {{uri: 'http://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/' + arr[1] + '.png'}}
                        style = {{height: 40, width: 40, borderRadius: 40}}
                    />
                </View>
            )
        }
        if (arr.length === 3) {
            return (
                <View style={{marginTop:10}}>
                    <View style={{alignItems:"center"}}>
                    <Image 
                        source = {{uri: 'http://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/' + arr[0] + '.png'}}
                        style = {styles.IconMid}
                    />
                    </View>

                    <View style={{justifyContent:"space-evenly", flexDirection: "row"}}>
                        <Image 
                            source = {{uri: 'http://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/' + arr[1] + '.png'}}
                            style = {styles.IconMid}
                        />
                        <Image 
                            source = {{uri: 'http://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/' + arr[2] + '.png'}}
                            style = {styles.IconMid}
                        />
                    </View>
                </View>
            )
        } 
        if (arr.length === 4) {
            return (
                <View>
                    <View style={{justifyContent:"space-evenly", flexDirection:"row"}}>
                        <Image 
                            source = {{uri: 'http://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/' + arr[0] + '.png'}}
                            style = {styles.IconMid}
                        />
                        <Image 
                            source = {{uri: 'http://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/' + arr[1] + '.png'}}
                            style = {styles.IconMid}
                        />
                    </View>
                    <View style={{justifyContent:"space-evenly", flexDirection:"row"}}>
                        <Image 
                            source = {{uri: 'http://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/' + arr[2] + '.png'}}
                            style = {styles.IconMid}
                        />
                        <Image 
                            source = {{uri: 'http://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/' + arr[3] + '.png'}}
                            style = {styles.IconMid}
                        />
                    </View>
                </View>
            )
        }
        if (arr.length === 5) {
            return (
                <View> 
                    <View style={{justifyContent:"space-evenly", flexDirection:"row"}}>
                        <Image 
                            source = {{uri: 'http://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/' + arr[0] + '.png'}}
                            style = {styles.IconSmall}
                        />
                        <Image 
                            source = {{uri: 'http://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/' + arr[1] + '.png'}}
                            style = {styles.IconSmall}
                        />
                    </View>
                    <View style={{justifyContent:"space-evenly", flexDirection:"row"}}>
                        <Image 
                            source = {{uri: 'http://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/' + arr[2] + '.png'}}
                            style = {styles.IconSmall}
                        />
                        <Image 
                            source = {{uri: 'http://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/' + arr[3] + '.png'}}
                            style = {styles.IconSmall}
                        />
                        <Image 
                            source = {{uri: 'http://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/' + arr[4] + '.png'}}
                            style = {styles.IconSmall}
                        />
                    </View>
                </View>
            )
        }
        return null;
    }
    
    
    
    const Item = ({title, arr}) => {
        return(
        <View style={styles.categoryContainer}>
            <View style={styles.champPicContainer}>
                {champPic(arr[BLUE])}
            </View>

            <Text style={styles.tags}>{title}</Text>

            <View style={styles.champPicContainer}>
                {champPic(arr[RED])}
            </View>
        </View>
        )
    }

    const renderItem = (item) => {
        return(
            <Item title={item.item.title}
                arr={item.item.arr}/>
        ) 
    }

    const arrToStr = (arr) => {
        var str = ""
        for (var i=0; i<arr.length; i++) {
            if (i === arr.length - 1) {
                str = str + arr[i]
            } else {
                str = str + arr[i] + ", "
            }
        }
        return str
    }

    const Item_CC = ({skill, keyIndex}) => {
        return (
            <View style={{alignItems:"center", marginLeft:4, marginRight:4}}> 
               <Image 
                    source = {{uri: "http://ddragon.leagueoflegends.com/cdn/11.14.1/img/spell/" + skill +".png"}}
                    style ={{height:40, width:40}}
               /> 
               <Text>{keyIndex}</Text>
            </View>

        )
    }

    const renderItem_CC = (item) => {
        return(
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
            <View style={{backgroundColor:"white", marginTop: 5}}>
                <Text style={{fontSize: 18, fontWeight:'500', marginLeft:10, marginTop:10}}> Win rate by categories </Text>

                <View
                style={{flexDirection:"row", justifyContent:"space-between", marginLeft:15, marginRight:15, marginTop: 10, marginBottom:15}}>
                    <Text style={styles.blueText}> Key Champion(s)</Text>
                    <Text style={styles.redText}> Key Champion(s)</Text>
                </View>
                <View> 
                { isLoading
                    ? <Text> Loading... </Text>
                    : <FlatList
                    data={tag}
                    renderItem={renderItem}
                    keyExtractor={item => item.title}
                    />
                }
                </View>
            </View>
        
            <View style={{backgroundColor:"white", marginTop: 5}}>
                <Text style={{fontSize: 18, fontWeight:'500', marginLeft:10, marginTop:10}}>Crowd Controls</Text>
                <View style={{marginLeft:20, marginRight:20, marginTop:10}}>
                <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                    <Image
                        source = {{uri: 'http://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/' + CC_names_blue[0] + '.png'}}
                        style = {styles.blueIcon}
                    />
                        {/* <Text>CCs: {arrToStr(CC_details_blue[0].types)}</Text> */}
                        <View style={{alignSelf:"center"}}>
                        <FlatList
                            data={CC_details_blue[0]["skillDetail"]}
                            renderItem={renderItem_CC}
                            keyExtractor={item => item.index}
                            horizontal={true}
                        />
                        </View>
                </View>

                <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                    <Image
                        source = {{uri: 'http://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/' + CC_names_blue[1] + '.png'}}
                        style = {styles.blueIcon}
                    />
                    <View style={{alignSelf:"center"}}>
                        <FlatList
                            data={CC_details_blue[1]["skillDetail"]}
                            renderItem={renderItem_CC}
                            keyExtractor={item => item.index}
                            horizontal={true}
                        />
                    </View>
                </View>

                <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                    <Image
                        source = {{uri: 'http://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/' + CC_names_red[0] + '.png'}}
                        style = {styles.redIcon}
                    />
                    <View style={{alignSelf:"center"}}>
                        <FlatList
                            data={CC_details_red[0]["skillDetail"]}
                            renderItem={renderItem_CC}
                            keyExtractor={item => item.index}
                            horizontal={true}
                        />
                    </View>
                </View>

                <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                    <Image
                        source = {{uri: 'http://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/' + CC_names_red[1] + '.png'}}
                        style = {styles.redIcon}
                    />
                    <View style={{alignSelf:"center"}}>
                        <FlatList
                            data={CC_details_red[1]["skillDetail"]}
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
    IconBig: {
        height: 50, width: 50, borderRadius: 50
    },
    IconMid: {
        height: 36, width: 36, borderRadius: 36 
    },
    IconSmall: {
        height: 32, width:32, borderRadius:32
    },
    category: {
        fontSize: 18, fontWeight:'500', marginLeft:24, marginTop:10
    },
    categoryContainer: {
        height: 90, justifyContent: "space-between", marginLeft:10, marginRight:10, borderBottomColor:'#585858', borderBottomWidth:1, flexDirection: "row",
        alignContent:"center"
    }, 
    blueText: {
        fontWeight:"500", color: "#55B1CE", fontSize:18
    },
    redText: {
        fontWeight:"500", color: "#DC5047", fontSize:18
    },
    tags: {
        alignSelf:"center", fontSize: 14, fontWeight:"500"
    },
    champPicContainer: {
        maxWidth:110,  maxHeight:72, alignContent: "center"
    },
    blueIcon: {
        height: 50, width: 50, borderRadius: 50, borderColor: "#55B1CE", borderWidth: 2
    },
    redIcon: {
        height: 50, width: 50, borderRadius: 50, borderColor: "#DC5047", borderWidth: 2
    },

})