import { StatusBar } from 'expo-status-bar'
import React, { Component } from 'react'

import { View, Text } from 'react-native'
//import * as firebase from 'firebase'
import firebase from 'firebase/app';
import 'firebase/functions';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk'
const store = createStore(rootReducer, applyMiddleware(thunk))

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCXCBGgb8TXlf3k-9uOsOBn7uSiVmAQ2tw",
  authDomain: "legendarily-bdeb8.firebaseapp.com",
  projectId: "legendarily-bdeb8",
  storageBucket: "legendarily-bdeb8.appspot.com",
  messagingSenderId: "259541331122",
  appId: "1:259541331122:web:14758d8c0571cffa78edab",
  measurementId: "G-MDM4WB22J5"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LandingScreen from './component/auth/Landing'
import RegisterScreen from './component/auth/Register'
import MainScreen from './component/Main'
import LoginScreen from './component/auth/Login'
import SettingScreen from './component/main/Settings'

import AnalysisScreen from './component/Analysis'
import ChampSelectScreen from './component/ChampSelect'

import championScreen from './component/main/meta/Champion'
import itemScreen from './component/main/meta/Item'
import mechanismScreen from './component/main/meta/Mechanism'
import runeScreen from './component/main/meta/Runes'
import skinScreen from './component/main/meta/Skin'
import systemScreen from './component/main/meta/System'

import championDetailScreen from './component/main/wiki/ChampionDetail'
import itemDetailScreen from './component/main/wiki/ItemDetail'

const Stack = createStackNavigator();

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        })
      }
    })
  }

  render() {
    const { loggedIn, loaded } = this.state;

    if (!loaded) {
      return (
        <View style={{ flex: 1, justifyContent: 'center'}}>
          <Text>Loading</Text>
        </View>
      )
    }

    if (!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false}}/>
            <Stack.Screen name="Register" component={RegisterScreen}/>
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      )
    }
    
    return (
      <Provider store = {store}>
        <NavigationContainer> 
          <Stack.Navigator initialRouteName="Main">
            <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false}} 
              //initialParams={{REDTEAM: [null, null, null, null, null], BLUETEAM: [null, null, null, null, null]}}
              />
            <Stack.Screen name="Analysis" component={AnalysisScreen}/>
            <Stack.Screen name="ChampSelect" component={ChampSelectScreen}/>
            <Stack.Screen name="Settings" component={SettingScreen}/>
            <Stack.Screen name="Champion" component={championScreen}/>
            <Stack.Screen name="Skin" component={skinScreen}/>
            <Stack.Screen name="Item" component={itemScreen}/>
            <Stack.Screen name="Rune" component={runeScreen}/>
            <Stack.Screen name="Mechanism" component={mechanismScreen}/>
            <Stack.Screen name="System" component={systemScreen}/>
            <Stack.Screen name="Champion Detail" component={championDetailScreen}/>
            <Stack.Screen name="Item Detail" component={itemDetailScreen}/>
          </Stack.Navigator>
        </NavigationContainer>

      </Provider>
    )
  }
}

export default App