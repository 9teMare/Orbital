import React, { useState, useEffect } from 'react'
import {View, Text, Image, StyleSheet, ImageBackground, Dimensions, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import { Tabs } from 'react-native-collapsible-tab-view'
import { useFonts } from 'expo-font';
import { WebView } from 'react-native-webview';
import { Tooltip } from 'react-native-elements/dist/tooltip/Tooltip';

export default function ChampionDetail({ route, navigation}) {

    const [loaded] = useFonts({
        Manticore: require('../../../assets/font/Manticore.otf')
    });

    const latestMetaNAUrl = 'https://ddragon.leagueoflegends.com/api/versions.json';
    const [meta, setMeta] = useState('');

    useEffect(() => {
        let isMounted = true
        fetch(latestMetaNAUrl,{
            "method": "GET"
          })
        .then(response => response.json())
        .then(response => {
            if (isMounted) {
                setMeta(response[0])
            }
            return () => { isMounted = false }    
        })
        .catch(err => {
            console.log(err)
        })
    }), []

    const champName = route.params;
    const champSplashUrl = (index) => {
        return {uri: `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champName}_${index}.jpg`}
    }

    const skillIconUrl = (id) => {
        return {uri: `http://ddragon.leagueoflegends.com/cdn/11.15.1/img/spell/${id}`}
    }

    const passiveIcon = (id) => {
        return {uri: `http://ddragon.leagueoflegends.com/cdn/11.15.1/img/passive/${id}`}
    }

    const [lore, setLore] = useState('')
    const [title, setTitle] = useState('')
    const [passiveId, setPassiveId] = useState('')
    const [qId, setQId] = useState('')
    const [wId, setWId] = useState('')
    const [eId, setEId] = useState('')
    const [rId, setRId] = useState('')

    const [skillTooltip, setSkillTooltip] = useState('')

    const [resourceType, setResourceType] = useState('q')
    const [skill, setSkill] = useState('')

    const skinIdArray = []
    const skinNumArray = []
    const skinNameArray = []
    const [skinId, setSkinId] = useState([])
    const [skinNum, setSkinNum] = useState([])
    const [skinName, setSkinName] = useState([])

    const [isLoading, setLoader] = useState(true)

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
        let isMounted = true
        fetch(`http://ddragon.leagueoflegends.com/cdn/11.15.1/data/en_US/champion/${champName}.json`, {
            "method": "GET"
          })
        .then((response) => response.json())
        .then((response) => {
            if (isMounted) {
                if (resourceType === "p") {
                    setSkill(response["data"][champName][skillIndex(resourceType)]["name"])
                    setSkillTooltip(response["data"][champName][skillIndex(resourceType)]["description"])
                } else {
                    setSkill(response["data"][champName]["spells"][skillIndex(resourceType)]["name"])
                    setSkillTooltip(response["data"][champName]["spells"][skillIndex(resourceType)]["tooltip"])
                }
            }
            return () => { isMounted = false }    
        })
        .catch((error) => console.error(error))
    }), [resourceType]

    useEffect(() => {
        let isMounted = true
        fetch(`http://ddragon.leagueoflegends.com/cdn/11.15.1/data/en_US/champion/${champName}.json`, {
            "method": "GET"
          })
        .then((response) => response.json())
        .then((response) => {
            if (isMounted) {
                setTitle(response["data"][champName]["title"])
                setLore(response["data"][champName]["lore"])
                setPassiveId(response["data"][champName]["passive"]["image"]["full"])
                setQId(response["data"][champName]["spells"][0]["image"]["full"])
                setWId(response["data"][champName]["spells"][1]["image"]["full"])
                setEId(response["data"][champName]["spells"][2]["image"]["full"])
                setRId(response["data"][champName]["spells"][3]["image"]["full"])
    
                for (var i = 1; i < response["data"][champName]["skins"].length; i ++) {
                    skinIdArray.push(i - 1)
                    skinNumArray.push(response["data"][champName]["skins"][i]["num"])
                    skinNameArray.push(response["data"][champName]["skins"][i]["name"])
                }
                setSkinId(skinIdArray)
                setSkinNum(skinNumArray)
                setSkinName(skinNameArray)
                setLoader(false)
            }
            return () => { isMounted = false }    
        })
        .catch((error) => console.error(error))
      }, [])

    const Header = () => {
      return <View style={styles.container}>
                <ImageBackground source={champSplashUrl(0)} style={styles.splash}>
                    <Text style={styles.splashText}>{champName}</Text>
                    <Text style={styles.splashTitleText}> - {title}</Text>
                </ImageBackground>
            </View>
    }

    const displaySkins = () => skinId.map(index => (
        <View key={index} style={styles.skinWrap}>
            <Image source={champSplashUrl(skinNum[index])} style={styles.skins}/>
            <Text style={styles.skinName}>{skinName[index]}</Text>
        </View>
    ))

    const loreLoad = () => {
        if (isLoading) {
            return (
                <View style={{height: width / 3, width: width / 2, backgroundColor: '#b8bab9c0', alignSelf: 'center', marginTop: height / 8, borderRadius: 10}}>
                    <ActivityIndicator size="large" color="grey" style={{alignSelf: 'center', marginTop: 20}}/>
                    <Text style={{fontSize: 20, fontWeight: 'bold', alignSelf: 'center', marginTop: 20, color: 'grey'}}> 
                        Loading...
                    </Text>
                </View>
            )
        }
        return (
            <View style={styles.loreWrap}>
                <Text style={styles.lore}>{lore}</Text>
            </View>
        )
    }

    const styledTooptil = '<meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0"><div style="font-size: 110%; margin-left: 10px; margin-right: 10px; margin-top: 10px; line-height: 1.8">' + skillTooltip + '</div>'
    const INJECTEDJAVASCRIPT = "document.body.style.userSelect = 'none'";

    if (!loaded) {
        return null
    }

    return (
        <Tabs.Container 
            renderHeader={Header}
            headerHeight={250}
        >
            <Tabs.Tab name="Lore">
                <Tabs.ScrollView>
                        {/* <View style={styles.loreWrap}>
                            <Text style={styles.lore}>{lore}</Text>
                        </View> */}
                        {loreLoad()}
                </Tabs.ScrollView>
            </Tabs.Tab>

            <Tabs.Tab name="Skills">
                <Tabs.ScrollView>
                    <View style={styles.iconBackground}>
                        <View style={styles.icon}>
                            <TouchableOpacity onPress={() => {setResourceType('p')}}>
                                <Image source={passiveIcon(passiveId)} style={resourceType === "p" ? styles.skillIconFram : styles.skillIcon}/>
                                <Text style={styles.skillLetter}>Passive</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => {setResourceType('q')}}>
                                <Image source={skillIconUrl(qId)} style={resourceType === "q" ? styles.skillIconFram : styles.skillIcon}/>
                                <Text style={styles.skillLetter}>Q</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => {setResourceType('w')}}>
                                <Image source={skillIconUrl(wId)} style={resourceType === "w" ? styles.skillIconFram : styles.skillIcon}/>
                                <Text style={styles.skillLetter}>W</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => {setResourceType('e')}}>
                                <Image source={skillIconUrl(eId)} style={resourceType === "e" ? styles.skillIconFram : styles.skillIcon}/>
                                <Text style={styles.skillLetter}>E</Text>
                            </TouchableOpacity>
                                
                            <TouchableOpacity onPress={() => {setResourceType('r')}}>
                                <Image source={skillIconUrl(rId)} style={resourceType === "r" ? styles.skillIconFram : styles.skillIcon}/>
                                <Text style={styles.skillLetter}>R</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.skillWrap}>
                        <Text style={styles.skill}>{skill}</Text>
                        {/* <Text style={styles.skillTooltip}>{skillTooltip}</Text> */}
                        <WebView
                            originWhitelist={['*']}
                            source={{ html: styledTooptil }}
                            style={{flex: 1}}
                            scrollEnabled={true}
                            injectedJavaScript={INJECTEDJAVASCRIPT}
                        />
                    </View>
                </Tabs.ScrollView>
            </Tabs.Tab>

            <Tabs.Tab name="Skins">
                <Tabs.ScrollView>
                    <ScrollView>
                        {displaySkins()}
                    </ScrollView>
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
        fontFamily: 'Manticore',
        fontSize: 42,
        lineHeight: 50,
        fontWeight: "bold",
        textAlign: "left",
        left: width/20,
        top: 170,
        //backgroundColor: "#000000c0",
        //maxHeight: 50,
        maxWidth: 500,
    },
    splashTitleText: {
        color: "white",
        fontFamily: 'Manticore',
        fontSize: 21,
        top: height/30 + 195,
        position: 'absolute',
        left: 20,
        lineHeight: 29,
        maxHeight: 29,
        //backgroundColor: "#000000c0",
    },
    lore: {
        fontSize: 18,
        lineHeight: 30,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        marginBottom: 10,
    },
    loreWrap: {
        backgroundColor: 'white',
        height: height
        //elevation: 3
    },
      skill: {
        fontSize: 25,
        marginLeft: 17,
        marginRight: 10,
        marginTop: 10,
        fontWeight: 'bold'
      },
      skillTooltip: {
        fontSize: 19,
        lineHeight: 30,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        marginBottom: 20
      },
      skillIcon: {
        width:64, 
        height:64,
        borderColor: '#000000c0', 
        borderWidth: 2
      },
      skillIconFram: {
        width:64, 
        height:64,
        borderColor: '#55BA46', 
        borderWidth: 3
      },
      skillLetter: {
        alignSelf: 'center',
        fontSize: 15,
        fontWeight: 'bold'
      },
      skillWrap: {
        backgroundColor: 'white',
        minHeight: height/3,
        flex: 1
      },
      icon: {
        //  width:53, 
        //  height:53, 
         marginLeft: 10,
         marginRight: 10,
         marginTop: 10,
         justifyContent:'space-between',
         flexDirection: 'row',
         
      },
      iconBackground: {
        backgroundColor: 'white',
        elevation: 4,
        height: 100
      },
      skins: {
        marginTop: 20,
        alignSelf: 'center',
        height: height/3,
        width: width - 30,
        borderWidth: 3, 
        borderColor: '#000000c0',
      },
      skinName: {
        alignSelf: 'center',
        fontSize: 21,
        marginTop: 5,
        marginBottom: 10
      },
      skinWrap: {
        backgroundColor:"white", 
        marginTop: 10,
        elevation: 3
      }
})