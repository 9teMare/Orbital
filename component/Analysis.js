import React from 'react'
import { View, useWindowDimensions, Image } from 'react-native';
import { createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs'

import laneScreen from './analysis/lane'
import statsScreen from './analysis/stats'
import dragonScreen from './analysis/dragon'
import overallScreen from './analysis/overall'
import adviceScreen from './analysis/advice'

const Tab = createMaterialBottomTabNavigator();


export default function Analysis({route}) {
    const {blue, red} = route.params


    return (

        <Tab.Navigator 
          activeColor="#6BDB5A" inactiveColor="#2d5c27" barStyle={{ backgroundColor: '#232323' }}
          labeled={false}>
          <Tab.Screen name='Lane' component={laneScreen} initialParams={{blue: blue, red: red}}
            options={{
              tabBarIcon: ({color}) => (
                <Image source={require('../pictures/others/meta-laneIcon.png')}
                  style={{tintColor:color, height:40, width:33.33}}/>
              )
            }}/>
          <Tab.Screen name='stats' component={statsScreen} initialParams={{blue: blue, red: red}}
            options={{
              tabBarIcon: ({color}) => (
                <Image source={require('../pictures/others/meta-statsIcon.png')}
                  style={{tintColor:color, height:40, width:33.33}}/>
              )
            }}/>
          <Tab.Screen name='dragon' component={dragonScreen} initialParams={{blue: blue, red: red}}
            options={{
              tabBarIcon: ({color}) => (
                <Image source={require('../pictures/others/meta-dragonIcon.png')}
                  style={{tintColor:color, height:40, width:33.33}}/>
              )
            }}/>
          <Tab.Screen name='overall' component={overallScreen} initialParams={{blue: blue, red: red}}
            options={{
              tabBarIcon: ({color}) => (
                <Image source={require('../pictures/others/meta-overallIcon.png')}
                  style={{tintColor:color, height:40, width:33.33}}/>
              )
            }}/>
          <Tab.Screen name='advice' component={adviceScreen} initialParams={{blue: blue, red: red}}
            options={{
              tabBarIcon: ({color}) => (
                <Image source={require('../pictures/others/meta-adviceIcon.png')}
                  style={{tintColor:color, height:40, width:33.33}}/>
              )
            }}/>
        </Tab.Navigator>
    );
}
