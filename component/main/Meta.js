import React from 'react'
import { StatusBar, Safe } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

import esportScreen from './wiki/Esports'
import championScreen from './wiki/ChampionWiki'
import itemScreen from './wiki/ItemWiki'
import metaMainScreen from './meta/MetaOverall'


export default function Meta() {  
      return (
        <>          
            <StatusBar/>
            <Tab.Navigator 
                tabBarOptions={{indicatorStyle: {backgroundColor: '#55BA46'},
                tabStyle:{height: 50, width: 105}, labelStyle: { fontSize: 12.9 }
            }}>
            <Tab.Screen name="Meta" component={metaMainScreen} />
            <Tab.Screen name="Esports" component={esportScreen} />
            <Tab.Screen name="Champions" component={championScreen} />
            <Tab.Screen name="Items" component={itemScreen} />
            </Tab.Navigator>
        </>
        
    );
}
