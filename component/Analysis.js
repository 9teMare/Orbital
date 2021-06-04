import React from 'react'
import { View, useWindowDimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import  MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import laneScreen from './analysis/lane'
import statsScreen from './analysis/stats'
import dragonScreen from './analysis/dragon'
import overallScreen from './analysis/overall'
import adviceScreen from './analysis/advice'

const Tab = createBottomTabNavigator();

const renderScene = SceneMap ({
    lane: laneScreen,
    stats: statsScreen,
    dragon: dragonScreen,
    overall: overallScreen,
    advice: adviceScreen
});

const getTabBarIcon = (props) => {
    const {route} = props
      if (route.key === 'lane') {
       return <MaterialCommunityIcons name="align-vertical-center" color="#2d5c27" size={26}/>
      } else if (route.key === 'stats') {
       return <MaterialCommunityIcons name="box-shadow" color="#2d5c27" size={26}/>
      } else if (route.key === 'dragon') {
          return <MaterialCommunityIcons name="align-vertical-center" color="#2d5c27" size={26}/>
      } else if (route.key === 'overall') {
          return <MaterialCommunityIcons name="box-shadow" color="#2d5c27" size={26}/>
      } else {
          return <MaterialCommunityIcons name="align-vertical-center" color="#2d5c27" size={26}/>
      }
}

export default function Analysis() {
    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'lane', title: 'Lane' },
        { key: 'stats', title: 'Stats'},
        { key: 'dragon', title: 'Dragon'},
        { key: 'overall', title: 'Overall'},
        { key: 'advice', title: 'Advice'}
      ]);

    const renderTabBar = props => (
        <TabBar
          {...props}
          indicatorStyle={{ backgroundColor: '#232323' }}
          style={{ backgroundColor: '#232323' }}
          renderIcon={
            props => getTabBarIcon(props)
          }
        />
      );  

    return (
        <TabView
          tabBarPosition = 'bottom'
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          renderTabBar={renderTabBar}
        />
    );
}
