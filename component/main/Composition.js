import React, { useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image, FlatList} from 'react-native'


export default function Composition({navigation}) {

    const blueTeam = [null, null, null, null, null]
    const redTeam = [null, null, null, null, null]

    return (
        <View >
            <Text style={styles.titleText}> Team Composition Analysis </Text>
            <Text style={styles.blueText}> Blue Team </Text>

            <Text 
                style ={{marginLeft: 24, marginTop: 8, fontSize: 10, fontWeight: 500}}
                onPress={() => navigation.navigate("ChampSelect")}> 
                Tap here to select 
            </Text>

            {/* <View style={{flexDirection:'row', width:310, justifyContent: 'space-evenly', marginLeft: 25, marginTop: 10, height: 80}}>
                <Image
                    source ={require('../../pictures/others/blue_top.png')}
                    style ={{width: 70, height: 70, marginBottom: 5}}/>

                <Image 
                    source = {require('../../pictures/others/blue_jungle.png')}
                    style ={{width: 70, height: 70}}/>   
                    
                <Image 
                    source = {require('../../pictures/others/blue_mid.png')}
                    style ={{width: 70, height: 70}}/>   

                <Image 
                    source = {require('../../pictures/others/blue_ADC.png')}
                    style ={{width: 70, height: 70}}/>    

                <Image 
                    source = {require('../../pictures/others/blue_support.png')}
                    style ={{width: 70, height: 70}}/>    

            </View> */}

            <View>
                <Text style={{fontFamily:'manticore', color: '#55BA46', fontSize: 50, alignSelf: 'center'}}>
                    VS
                </Text>
            </View>


                <Text style={styles.redText}> Red Team </Text>

            <Text 
                style ={{marginLeft: 24, marginTop: 8, fontSize: 10, fontWeight: 500}}
                onPress={() => navigation.navigate("ChampSelect")}> 
                Tap here to select 
            </Text>
            


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
        marginTop: 271,
        fontWeight: '500'
    }, 
    button:{
        width:237, 
        height:50, 
        marginLeft: 89, 
        marginTop:141, 
        backgroundColor: 'white', 
        alignItems: 'center', 
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