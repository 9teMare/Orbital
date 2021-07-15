import React from 'react'
import {View, Text, Image, StyleSheet, ImageBackground, ListRenderItem } from 'react-native'
import { Tabs } from 'react-native-collapsible-tab-view'

export default function ChampionDetail({ route, navigation}) {
    const champName = route.params;
    const champSplashUrl = 'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/' + champName + '_0.jpg'

    const Header = () => {
      return <View style={styles.container}>
                <ImageBackground source={{uri: champSplashUrl}} style={styles.splash}>
                    <Text style={styles.splashText}>{champName}</Text>
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
                    <View style={[styles.box, styles.boxA]} />
                    <View style={[styles.box, styles.boxB]} />
                </Tabs.ScrollView>
            </Tabs.Tab>

            <Tabs.Tab name="Skills">
                <Tabs.ScrollView>
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

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    splash: {
        height: 300,
        width: 500,
        //justifyContent: "center",
        flex:1
    },
    splashText: {
        color: "white",
        fontSize: 42,
        lineHeight: 50,
        fontWeight: "bold",
        textAlign: "left",
        left: 20,
        top: 20
        //backgroundColor: "#000000c0"
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
      }
})