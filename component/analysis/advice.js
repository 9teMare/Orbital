import React from 'react'
import { View, Text, Button, Dimensions } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

import adviceBlueScreen from './advice-blue'
import adviceRedScreen from './advice-red'

export default function advice({route}) {
    const {blue, red} = route.params
    return (
        <>          
            <Tab.Navigator 
                tabBarOptions={{indicatorStyle: {backgroundColor: '#55BA46'},
                tabStyle:{Height:70}, labelStyle: { fontSize: width/36, fontWeight: 'bold', color: 'black'}
            }}>
            <Tab.Screen name="Blue" component={adviceBlueScreen} initialParams={{blue: blue, red: red}}/>
            <Tab.Screen name="Red" component={adviceRedScreen} initialParams={{blue: blue, red: red}}/>
        </Tab.Navigator>
          </>
    )
}

const {width, height} = Dimensions.get("window")
