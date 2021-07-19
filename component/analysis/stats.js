
import React, {useEffect, useState} from 'react'
import { View, Text, Image, StyleSheet, FlatList, Alert} from 'react-native'

const TOP = 0, JUNGLE = 1, MID = 2, ADC = 3, SUPPORT = 4
const ASSASSIN = 0, FIGHTER = 1, MAGE = 2, MARKSMAN = 3, TANK = 5 //SUPPORT = 4
const BLUE = 0, RED = 1


export default function stats({route}) {
    const {blue, red} = route.params
    const [isLoading, setLoader] = useState(true)
    const [tag, setTag] = useState([])  

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

    const fetching = async () => {
        var blueTag = []
        var redTag = []
        var damage_AD = [[], []], damage_AP = [[], []], assassin = [[], []], fighter = [[], []], heal_protect = [[], []], tank = [[], []] 
        var scaling_AD =[[], []], scaling_AP =[[], []], attackRange = [[],[]]

        const response = await fetch('http://ddragon.leagueoflegends.com/cdn/11.12.1/data/en_US/champion.json')
        const responded = await response.json()
        const data = responded.data

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

            const blue_ADhighest = pickHighest(blue_adScaling).map((index) => blue[index])
            const red_ADhighest = pickHighest(red_adScaling).map((index) => red[index])
            const blue_APhighest = pickHighest(blue_apScaling).map((index) => blue[index])
            const red_APhighest = pickHighest(red_apScaling).map((index) => red[index])
            const blue_RANGE = pickHighest(blue_range).map((index) => blue[index])
            const red_RANGE = pickHighest(red_range).map((index) => red[index])
            
            scaling_AD = [blue_ADhighest, red_ADhighest]
            scaling_AP = [blue_APhighest, red_APhighest]
            attackRange = [blue_RANGE, red_RANGE]

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
   
    return (
        <View>
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
                    keyExtractor={item => item.title}/>
                }
            </View>
       </View>
        
       <View style={{backgroundColor:"white", marginTop: 5}}>
           <Text style={{fontSize: 18, fontWeight:'500', marginLeft:10, marginTop:10}}>Crowd Controls</Text>
           
       </View>


       </View>
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
    }

})