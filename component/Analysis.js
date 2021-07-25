import React, { useEffect, useState } from 'react'
import { View, useWindowDimensions, Image, Text } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'

import laneScreen from './analysis/lane'
import statsScreen from './analysis/stats'
import dragonScreen from './analysis/dragon'
import overallScreen from './analysis/overall'
import adviceScreen from './analysis/advice'

const Tab = createMaterialBottomTabNavigator();


export default function Analysis({ route }) {
  const { blue, red } = route.params

  // const [ddragon, setDDragon] = useState({})
  // const [cdn, setCDN] = useState({})
  // const [OtherInfo, setOtherInfo] = useState({})

  // const [isLoading, setLoader] = useState(true)

  // const fetching = async () => {

  //   var blue_otherInfo = [], blue_CDN = [], blue_ddragon = []
  //   var red_otherInfo = [], red_CDN = [], red_ddragon = []


  //   const champOtherInfo = "https://orbital-riot-api.herokuapp.com/champOtherInfo"
  //   const fetchChampOtherInfo = await fetch(champOtherInfo, {
  //     "method": "GET"
  //   })
  //   const champOtherInfo_responded = await fetchChampOtherInfo.text()

  //   for (var i=0; i<5; i++) {
  //     console.log(i)
  //     const blueName = new String
  //     blueName = blue[i]
  //     const redName = new String
  //     redName = red[i]

  //     //from Other Info
  //     blue_otherInfo.push(champOtherInfo_responded[blueName])
  //     red_otherInfo.push(champOtherInfo_responded[redName])

  //     //from CDN
  //     const response_CDN_blue = await fetch('https://cdn.communitydragon.org/11.12.1/champion/' + blueName + '/data')
  //     const responded_CDN_blue = await response_CDN_blue.text()
  //     const data_CDN_blue = responded_CDN_blue.playstyleInfo

  //     const response_CDN_red = await fetch('https://cdn.communitydragon.org/11.12.1/champion/' + redName + '/data')
  //     const responded_CDN_red = await response_CDN_red.text()
  //     const data_CDN_red = responded_CDN_red.playstyleInfo

  //     blue_CDN.push(data_CDN_blue)
  //     red_CDN.push(data_CDN_red)

  //     //from ddragon
  //     const response_dd_blue = await fetch("http://ddragon.leagueoflegends.com/cdn/11.12.1/data/en_US/champion/" + blueName + ".json")
  //     const responded_dd_blue = await response_dd_blue.json()
  //     const data_dd_blue = responded_dd_blue.data

  //     const response_dd_red = await fetch("http://ddragon.leagueoflegends.com/cdn/11.12.1/data/en_US/champion/" + redName + ".json")
  //     const responded_dd_red = await response_dd_red.json()
  //     const data_dd_red = responded_dd_red.data

  //     blue_ddragon.push(data_dd_blue[blueName])
  //     red_ddragon.push(data_dd_red[redName])

  //   }

  //   setOtherInfo({ blue: blue_otherInfo, red: red_otherInfo })
  //   setCDN({ blue: blue_CDN, red: red_CDN })
  //   setDDragon({blue: blue_ddragon, red: red_ddragon})

  //   setLoader(false)
  // }

  // useEffect(() => {
  //   fetching()
  // }, []);

  // if (isLoading) {
  //   return (
  //       <Text>Loading...</Text>
  //   )
  // }
  
  return (

    <Tab.Navigator
      activeColor="#6BDB5A" inactiveColor="#2d5c27" barStyle={{ backgroundColor: '#232323' }}
      labeled={false}>
      <Tab.Screen name='Lane' component={laneScreen} initialParams={{ blue: blue, red: red}}
        options={{
          tabBarIcon: ({ color }) => (
            <Image source={require('../pictures/others/meta-laneIcon.png')}
              style={{ tintColor: color, height: 25, width: 25 }} />
          )
        }} />
      <Tab.Screen name='stats' component={statsScreen} initialParams={{ blue: blue, red: red }}
        options={{
          tabBarIcon: ({ color }) => (
            <Image source={require('../pictures/others/meta-statsIcon.png')}
              style={{ tintColor: color, height: 25, width: 25 }} />
          )
        }} />
      <Tab.Screen name='dragon' component={dragonScreen} initialParams={{ blue: blue, red: red }}
        options={{
          tabBarIcon: ({ color }) => (
            <Image source={require('../pictures/others/meta-dragonIcon.png')}
              style={{ tintColor: color, height: 25, width: 25 }} />
          )
        }} />
      <Tab.Screen name='overall' component={overallScreen} initialParams={{ blue: blue, red: red }}
        options={{
          tabBarIcon: ({ color }) => (
            <Image source={require('../pictures/others/meta-overallIcon.png')}
              style={{ tintColor: color, height: 25, width: 25 }} />
          )
        }} />
      <Tab.Screen name='advice' component={adviceScreen} initialParams={{ blue: blue, red: red }}
        options={{
          tabBarIcon: ({ color }) => (
            <Image source={require('../pictures/others/meta-adviceIcon.png')}
              style={{ tintColor: color, height: 25, width: 25 }} />
          )
        }} />
    </Tab.Navigator>
  );
}
