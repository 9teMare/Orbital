import React, { useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image, Alert, StatusBar} from 'react-native'
import { useFonts } from 'expo-font';

export default function Composition({navigation, route}) {

    const [loaded] = useFonts({
        Manticore: require('../../assets/font/Manticore.otf')
    });

    if (!loaded) {
        return null;
    }

    const TOP = 0, JUNGLE = 1, MID = 2, ADC = 3, SUPPORT = 4
    const blueTeam = route.params?.blueTeam
    const redTeam = route.params?.redTeam

    function analysisNavigate() {
        var i;
        for (i=0; i<5; i++) {
            if (blueTeam[i] === null || redTeam[i] === null) {
                return Alert.alert(
                    'Incomplete team',
                    'Please complete both teams before you proceed',
                    [{
                        text: "OK", 
                        style:'cancel'
                    }])
            }
        }
        var allChamps = new Array
        allChamps = blueTeam.concat(redTeam)
        const s = new Set(allChamps)
        if (allChamps.length !== s.size) {
            return Alert.alert(
                'Repeated champions',
                'Please make sure there are no repeated champions before you proceed',
                [{
                    text: "OK",
                    style:'cancel'
                }]
            )
        }
        return navigation.navigate("Analysis", {blue: blueTeam, red: redTeam})
    }

    return (
        <View >
            <StatusBar/>
            <Text style={styles.titleText}> Team Composition Analysis </Text>

            <View style={{alignSelf: 'center'}}>
                <View style={{flexDirection:'row', marginTop: 30}}>
                    <Text style={styles.blueText}> Blue Team </Text>
                    <TouchableOpacity style={styles.tapHereBlue} onPress={() => navigation.navigate("ChampSelect", {blue: blueTeam, red: redTeam, isBlue: true})}>
                        <Text style ={styles.tapHereBlueText}> 
                            Tap to select 
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={{flexDirection:'row', width:310, justifyContent: 'space-evenly', alignSelf: 'center', marginTop: 15, height: 80}}>
                    <Image
                        source = {blueTeam[TOP] === null 
                            ? require('../../pictures/others/blue_top.png')
                            : {uri: 'http://ddragon.leagueoflegends.com/cdn/11.15.1/img/champion/' + blueTeam[TOP] + '.png'}}
                        style ={{width: 50, height: 50, borderRadius:50, borderColor: '#55B1CE', borderWidth:3}}/>

                    <Image 
                        source = {blueTeam[JUNGLE] === null 
                            ? require('../../pictures/others/blue_jungle.png')
                            : {uri: 'http://ddragon.leagueoflegends.com/cdn/11.15.1/img/champion/' + blueTeam[JUNGLE] + '.png'}}
                        style ={{width: 50, height: 50, borderRadius:50, borderColor: '#55B1CE', borderWidth:3}}/>   
                        
                    <Image 
                        source = {blueTeam[MID] === null 
                            ? require('../../pictures/others/blue_mid.png')
                            : {uri: 'http://ddragon.leagueoflegends.com/cdn/11.15.1/img/champion/' + blueTeam[MID] + '.png'}}
                        style ={{width: 50, height: 50, borderRadius:50, borderColor: '#55B1CE', borderWidth:3}}/>   

                    <Image 
                        source = {blueTeam[ADC] === null 
                            ? require('../../pictures/others/blue_ADC.png')
                            : {uri: 'http://ddragon.leagueoflegends.com/cdn/11.15.1/img/champion/' + blueTeam[ADC] + '.png'}}
                        style ={{width: 50, height: 50, borderRadius:50, borderColor: '#55B1CE', borderWidth:3}}/>    

                    <Image 
                        source = {blueTeam[SUPPORT] === null 
                            ? require('../../pictures/others/blue_support.png')
                            : {uri: 'http://ddragon.leagueoflegends.com/cdn/11.15.1/img/champion/' + blueTeam[SUPPORT] + '.png'}}
                        style ={{width: 50, height: 50, borderRadius:50, borderColor: '#55B1CE', borderWidth:3}}/>    

                </View>

                <View>

                    <Text style={{fontFamily:'Manticore', color: '#55BA46', fontSize: 70, alignSelf: 'center'}}>
                        VS
                    </Text>

                </View>

                <View style={{flexDirection:'row'}}>
                    <Text style={styles.redText}> Red Team </Text>

                    <TouchableOpacity style={styles.tapHereRed} onPress={() => navigation.navigate("ChampSelect", {blue: blueTeam, red: redTeam, isBlue: false})}>
                        <Text style ={styles.tapHereRedText}> 
                            Tap to select 
                        </Text>
                    </TouchableOpacity>
                </View>
                    
                <View style={{flexDirection:'row', width:310, justifyContent: 'space-evenly', alignSelf: 'center', marginTop: 15, height: 80}}>
                    <Image
                        source = {redTeam[TOP] === null 
                            ? require('../../pictures/others/red_top.png')
                            : {uri: 'http://ddragon.leagueoflegends.com/cdn/11.15.1/img/champion/' + redTeam[TOP] + '.png'}}
                        style ={{width: 50, height: 50, marginBottom: 5, borderRadius:50, borderColor: '#DC5047', borderWidth:3}}/>

                    <Image 
                        source = {redTeam[JUNGLE] === null 
                            ? require('../../pictures/others/red_jungle.png')
                            : {uri: 'http://ddragon.leagueoflegends.com/cdn/11.15.1/img/champion/' + redTeam[JUNGLE] + '.png'}}
                        style ={{width: 50, height: 50, borderRadius:50, borderColor: '#DC5047', borderWidth:3}}/>   
                        
                    <Image 
                        source = {redTeam[MID] === null 
                            ? require('../../pictures/others/red_mid.png')
                            : {uri: 'http://ddragon.leagueoflegends.com/cdn/11.15.1/img/champion/' + redTeam[MID] + '.png'}}
                        style ={{width: 50, height: 50, borderRadius:50, borderColor: '#DC5047', borderWidth:3}}/>   

                    <Image 
                        source = {redTeam[ADC] === null 
                            ? require('../../pictures/others/red_ADC.png')
                            : {uri: 'http://ddragon.leagueoflegends.com/cdn/11.15.1/img/champion/' + redTeam[ADC] + '.png'}}
                        style ={{width: 50, height: 50, borderRadius:50, borderColor: '#DC5047', borderWidth:3}}/>    

                    <Image 
                        source = {redTeam[SUPPORT] === null 
                            ? require('../../pictures/others/red_support.png')
                            : {uri: 'http://ddragon.leagueoflegends.com/cdn/11.15.1/img/champion/' + redTeam[SUPPORT] + '.png'}}
                        style ={{width: 50, height: 50, borderRadius:50, borderColor: '#DC5047', borderWidth:3}}/>    

                </View>
            </View>
            <View style={{position: 'absolute', flexDirection: 'row', alignSelf: 'center', bottom: -90}}>
                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => analysisNavigate()}>
                    <Text style={{fontWeight:'500', fontSize:18, color:'#55BA46', marginTop: 14}}>START ANALYSIS</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    titleText: {
        fontSize: 20,
        marginTop: 50,
        marginLeft: 30, 
        fontWeight: 'bold',
        color: '#55BA46',
    },
    blueText: {
        fontSize: 30, 
        color: '#55B1CE',
        marginTop: 36, 
        marginLeft: 5,
        fontWeight: 'bold',  
    },
    redText: {
        fontSize: 30, 
        color: '#DC5047',
        marginLeft: 5,
        marginTop: 30,
        fontWeight: 'bold'
    }, 
    button:{
        width:237, 
        height:50, 
        backgroundColor: 'white', 
        alignItems: 'center', 
        alignSelf: 'center',
        borderRadius: 5,
        elevation: 2
    },
    circle: {
        width: 50,
        height:50,
        borderRadius: 50, 
        borderColor: '#06B1E7',
        borderWidth: 2,
        backgroundColor: '#C4C4C4',
        alignItems: 'center'
    },
    position: {
        width: 30, 
        height: 30,
        marginTop: 10
    },
    tapHereRed: {
        backgroundColor: 'white',
        width: 120, 
        alignItems: 'center',
        height: 35,
        marginTop: 33,
        marginLeft: 20,
        borderRadius: 5,
        elevation:3
    },
    tapHereRedText: {
        fontSize: 17,
        marginTop: 5,
        color: '#DC5047'
    },
    tapHereBlue: {
        backgroundColor: 'white',
        width: 120, 
        alignItems: 'center',
        height: 35,
        marginTop: 40,
        marginLeft: 20,
        borderRadius: 5,
        elevation:3
    },
    tapHereBlueText: {
        fontSize: 17,
        marginTop: 5,
        color: '#55B1CE'
    }
})