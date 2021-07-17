import React from 'react'
import { View, Text, Button } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

import adviceBlueScreen from './advice-blue'
import adviceRedScreen from './advice-red'

export default function advice({route, navigation}) {
    const {blue, red, roleMissing_blue, roleMissing_red} = route.params
    console.log(blue, red, roleMissing_blue)
    return (
        <>          
            <Tab.Navigator 
                tabBarOptions={{indicatorStyle: {backgroundColor: '#55BA46'},
                tabStyle:{Height:70}
            }}>
            <Tab.Screen name="Blue" component={adviceBlueScreen} />
            <Tab.Screen name="Red" component={adviceRedScreen} />
        </Tab.Navigator>
          </>
    )
}
