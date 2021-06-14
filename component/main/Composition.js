import React, { useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image, FlatList} from 'react-native'


export default function Composition({navigation, route}) {

    const TOP = 0, JUNGLE = 1, MID = 2, ADC = 3, SUPPORT = 4
    const blueTeam = route.params?.blueTeam
    const redTeam = route.params?.redTeam

    return (
        <View >
            <Text style={styles.titleText}> Team Composition Analysis </Text>
            <Text style={styles.blueText}> Blue Team </Text>

            <Text 
                style ={{marginLeft: 24, marginTop: 8, fontSize: 10, fontWeight: 500}}
                onPress={() => navigation.navigate("ChampSelect", {blue: blueTeam, red: redTeam, isBlue: true})}> 
                Tap here to select 
            </Text>

            <View style={{flexDirection:'row', width:310, justifyContent: 'space-evenly', marginLeft: 20, marginTop: 15, height: 80}}>
                <Image
                    source = {blueTeam[TOP] === null 
                        ? require('../../pictures/others/blue_top.png')
                        : {uri: 'http://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/' + blueTeam[TOP] + '.png'}}
                    style ={{width: 50, height: 50, marginBottom: 5, borderRadius:50}}/>

                <Image 
                    source = {blueTeam[JUNGLE] === null 
                        ? require('../../pictures/others/blue_jungle.png')
                        : {uri: 'http://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/' + blueTeam[JUNGLE] + '.png'}}
                    style ={{width: 50, height: 50, borderRadius:50}}/>   
                    
                <Image 
                    source = {blueTeam[MID] === null 
                        ? require('../../pictures/others/blue_mid.png')
                        : {uri: 'http://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/' + blueTeam[MID] + '.png'}}
                    style ={{width: 50, height: 50, borderRadius:50}}/>   

                <Image 
                    source = {blueTeam[ADC] === null 
                        ? require('../../pictures/others/blue_ADC.png')
                        : {uri: 'http://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/' + blueTeam[ADC] + '.png'}}
                    style ={{width: 50, height: 50, borderRadius:50}}/>    

                <Image 
                    source = {blueTeam[SUPPORT] === null 
                        ? require('../../pictures/others/blue_support.png')
                        : {uri: 'http://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/' + blueTeam[SUPPORT] + '.png'}}
                    style ={{width: 50, height: 50, borderRadius:50}}/>    

            </View>

            <View>
                <Text style={{fontFamily:'manticore', color: '#55BA46', fontSize: 70, alignSelf: 'center'}}>
                    VS
                </Text>
            </View>


                <Text style={styles.redText}> Red Team </Text>

            <Text 
                style ={{marginLeft: 24, marginTop: 8, fontSize: 10, fontWeight: 500}}
                onPress={() => navigation.navigate("ChampSelect", {blue: blueTeam, red: redTeam, isBlue: false})}> 
                Tap here to select 
            </Text>
            

            <View style={{flexDirection:'row', width:310, justifyContent: 'space-evenly', marginLeft: 20, marginTop: 15, height: 80}}>
                <Image
                    source = {redTeam[TOP] === null 
                        ? require('../../pictures/others/red_top.png')
                        : {uri: 'http://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/' + redTeam[TOP] + '.png'}}
                    style ={{width: 50, height: 50, marginBottom: 5, borderRadius:50}}/>

                <Image 
                    source = {redTeam[JUNGLE] === null 
                        ? require('../../pictures/others/red_jungle.png')
                        : {uri: 'http://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/' + redTeam[JUNGLE] + '.png'}}
                    style ={{width: 50, height: 50, borderRadius:50}}/>   
                    
                <Image 
                    source = {redTeam[MID] === null 
                        ? require('../../pictures/others/red_mid.png')
                        : {uri: 'http://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/' + redTeam[MID] + '.png'}}
                    style ={{width: 50, height: 50, borderRadius:50}}/>   

                <Image 
                    source = {redTeam[ADC] === null 
                        ? require('../../pictures/others/red_ADC.png')
                        : {uri: 'http://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/' + redTeam[ADC] + '.png'}}
                    style ={{width: 50, height: 50, borderRadius:50}}/>    

                <Image 
                    source = {redTeam[SUPPORT] === null 
                        ? require('../../pictures/others/red_support.png')
                        : {uri: 'http://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/' + redTeam[SUPPORT] + '.png'}}
                    style ={{width: 50, height: 50, borderRadius:50}}/>    

            </View>

            <TouchableOpacity 
                style={styles.button}
                onPress={() => navigation.navigate("Analysis")}>
                <Text style={{fontWeight:'500', fontSize:18, color:'#55BA46', marginTop: 14}}>START ANALYSIS</Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    titleText: {
        fontSize: 20,
        marginTop: 50,
        marginLeft: 22, 
        fontWeight: "bold",
        color: '#55BA46',
    },
    blueText: {
        fontSize: 30, 
        color: '#55B1CE',
        marginTop: 36, 
        marginLeft: 15,
        fontWeight: '500',  
    },
    redText: {
        fontSize: 30, 
        color: '#DC5047',
        marginLeft: 15,
        marginTop: 30,
        fontWeight: '500'
    }, 
    button:{
        width:237, 
        height:50, 
        marginTop:141, 
        backgroundColor: 'white', 
        alignItems: 'center', 
        alignSelf: 'center',
        borderRadius: 5
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
    }
})