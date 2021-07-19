import React from 'react'
import { StatusBar, Safe, Dimensions } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

import esportScreen from './wiki/Esports'
import championScreen from './wiki/ChampionWiki'
import itemScreen from './wiki/ItemWiki'
import metaMainScreen from './meta/MetaOverall'

const {width, height} = Dimensions.get("window")

export default function Meta() {  
      return (
        <>          
            <StatusBar/>
            <Tab.Navigator 
                tabBarOptions={{indicatorStyle: {backgroundColor: '#55BA46'},
                tabStyle:{height: height/16, width: width/4}, labelStyle: { fontSize: width/36, fontWeight: 'bold', color: 'black'}
            }}>
            <Tab.Screen name="Meta" component={metaMainScreen} />
            <Tab.Screen name="Esports" component={esportScreen} />
            <Tab.Screen name="Champions" component={championScreen} />
            <Tab.Screen name="Items" component={itemScreen} />
            </Tab.Navigator>
        </>
        
    );
}
