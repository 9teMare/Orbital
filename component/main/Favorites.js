import React, { useState } from 'react'
import { View, Text, StatusBar, StyleSheet } from 'react-native'
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';

export default function Favorites() {

    return (
        // <View>
        //     <StatusBar/>
        //     <Text> Favourite </Text>
        // </View>
        <View style={{flex:1}}>
            <WebView
                originWhitelist={['*']}
                source={{ html: "<mainText><stats><ornnBonus>75</ornnBonus> Attack Damage<br><ornnBonus>26</ornnBonus> Lethality<br><ornnBonus>10%</ornnBonus> Omnivamp</stats><br><br><li><passive>Ever Rising Moon:</passive> Hitting a champion with 2 separate Attacks or Abilities within 1.5 seconds deals an additional <physicalDamage>6% max Health physical damage</physicalDamage>, grants you <speed>15% Move Speed</speed> and a <shield>(150 + 40% bonus Attack Damage) Shield (100 + 30% bonus Attack Damage for ranged champions)</shield> for 0.1 seconds (8s cooldown, 16s cooldown for ranged champions).<br><br><rarityMythic>Mythic Passive:</rarityMythic> Grants all other <rarityLegendary>Legendary</rarityLegendary> items <attention>4%</attention> Armor Penetration</mainText><br>" }}
                style={{flex: 1}}
            />
        </View>
    )
}