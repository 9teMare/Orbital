import React from 'react'
import {View, Text} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Analysis from './Analysis'

const screens = {
    Analysis: {
        screen: Analysis
    }
}

const stack = createStackNavigator(screens);

export default NavigationContainer(stack)
