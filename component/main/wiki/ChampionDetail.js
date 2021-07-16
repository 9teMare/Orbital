import React, { useState, useEffect } from 'react'
import { TouchableOpacity } from 'react-native';
import {View, Text, Image, StyleSheet, ImageBackground, Dimensions } from 'react-native'
import { Tabs } from 'react-native-collapsible-tab-view'

export default function ChampionDetail({ route, navigation}) {

    const champName = route.params;
    const champSplashUrl = `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champName}_0.jpg`

    const skillIconUrl = (id) => {
        return {uri: `http://ddragon.leagueoflegends.com/cdn/11.14.1/img/spell/${id}`}
    }

    const passiveIcon = (id) => {
        return {uri: `http://ddragon.leagueoflegends.com/cdn/11.14.1/img/passive/${id}`}
    }

    const [lore, setLore] = useState('')
    const [title, setTitle] = useState('')
    const [passiveId, setPassiveId] = useState('')
    const [qId, setQId] = useState('')
    const [wId, setWId] = useState('')
    const [eId, setEId] = useState('')
    const [rId, setRId] = useState('')

    const [resourceType, setResourceType] = useState('q')
    const [skill, setSkill] = useState('')

    const skillIndex = (skill) => {
        if (skill === 'q') {
            return 0
        } else if (skill === 'w') {
            return 1
        } else if (skill === 'e') {
            return 2
        } else if (skill === 'r') {
            return 3
        } else {
            return "passive"
        }
    }

    useEffect(() => {
        fetch(`http://ddragon.leagueoflegends.com/cdn/11.14.1/data/en_US/champion/${champName}.json`)
        .then((response) => response.json())
        .then((response) => {
            //setQ(response["data"][champName]["spells"][0]["name"])
            if (resourceType === "p") {
                setSkill(response["data"][champName][skillIndex(resourceType)]["name"])

            } else {
                setSkill(response["data"][champName]["spells"][skillIndex(resourceType)]["name"])

            }
        })
        .catch((error) => console.error(error))
    }), [resourceType]

    useEffect(() => {
        fetch('http://ddragon.leagueoflegends.com/cdn/11.14.1/data/en_US/champion/'+ champName + '.json')
        .then((response) => response.json())
        .then((response) => {
            setTitle(response["data"][champName]["title"])
            setLore(response["data"][champName]["lore"])
            setPassiveId(response["data"][champName]["passive"]["image"]["full"])
            setQId(response["data"][champName]["spells"][0]["image"]["full"])
            setWId(response["data"][champName]["spells"][1]["image"]["full"])
            setEId(response["data"][champName]["spells"][2]["image"]["full"])
            setRId(response["data"][champName]["spells"][3]["image"]["full"])
        })
        .catch((error) => console.error(error))
      }, [])

    const Header = () => {
      return <View style={styles.container}>
                <ImageBackground source={{uri: champSplashUrl}} style={styles.splash}>
                    <Text style={styles.splashText}>{champName}</Text>
                    <Text style={styles.splashTitleText}>{title}</Text>
                </ImageBackground>
            </View>
    }

    return (
    //     <View>      
    //         <View style={styles.container}>
    //             <ImageBackground source={{uri: champSplashUrl}} style={styles.splash}>
    //                 <Text style={styles.splashText}>{champName}</Text>
    //             </ImageBackground>
    //         </View>
    //    </View>
        <Tabs.Container 
            renderHeader={Header}
            headerHeight={250}
        >
            <Tabs.Tab name="Lore">
                <Tabs.ScrollView>
                    <View>
                        <Text style={styles.lore}>{lore}</Text>
                    </View>
                </Tabs.ScrollView>
            </Tabs.Tab>

            <Tabs.Tab name="Skills">
                <Tabs.ScrollView>
                    <View style={styles.icon}>
                        <TouchableOpacity onPress={() => {setResourceType('p')}}>
                            <Image source={passiveIcon(passiveId)} style={styles.skillIcon}/>
                            <Text>P</Text>
                         </TouchableOpacity>

                         <TouchableOpacity onPress={() => {setResourceType('q')}}>
                            <Image source={skillIconUrl(qId)} style={styles.skillIcon}/>
                            <Text>Q</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {setResourceType('w')}}>
                             <Image source={skillIconUrl(wId)} style={styles.skillIcon}/>
                            <Text>W</Text>
                        </TouchableOpacity>

                         <TouchableOpacity onPress={() => {setResourceType('e')}}>
                            <Image source={skillIconUrl(eId)} style={styles.skillIcon}/>
                            <Text>E</Text>
                        </TouchableOpacity>
                            
                        <TouchableOpacity onPress={() => {setResourceType('r')}}>
                             <Image source={skillIconUrl(rId)} style={styles.skillIcon}/>
                            <Text>R</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.skill}>{skill}</Text>
                    <View style={[styles.box, styles.boxA]} />
                    <View style={[styles.box, styles.boxB]} />
                </Tabs.ScrollView>
            </Tabs.Tab>

            <Tabs.Tab name="Skins">
                <Tabs.ScrollView>
                    <View style={[styles.box, styles.boxA]} />
                    <View style={[styles.box, styles.boxB]} />
                </Tabs.ScrollView>
            </Tabs.Tab>

        </Tabs.Container>
    )
}

const {width, height} = Dimensions.get("window")

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    splash: {
        height: height/3,
        maxWidth: width,
        //justifyContent: "center",
        flexDirection: 'row',
    },
    splashText: {
        color: "white",
        fontSize: 42,
        lineHeight: 50,
        fontWeight: "bold",
        textAlign: "left",
        left: 20,
        top: 20,
        backgroundColor: "#000000c0",
        maxHeight: 50,
        maxWidth: 500  ,
    },
    splashTitleText: {
        color: "white",
        fontSize: 21,
        width: width/3,
        top: 80,
    },
    lore: {
        fontSize: 18,
        lineHeight: 30,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10
    },
    box: {
        height: 250,
        width: '100%',
      },
      boxA: {
        backgroundColor: 'white',
      },
      boxB: {
        backgroundColor: '#D8D8D8',
      },
      skill: {
        fontSize: 25
      },
      skillIcon: {
        width:64, 
        height:64,
      },
      icon: {
        //  width:53, 
        //  height:53, 
         justifyContent:'space-between',
         flexDirection: 'row'
      }
})