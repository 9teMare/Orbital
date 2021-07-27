import { StatusBar } from 'expo-status-bar'
import React, { Component } from 'react'

import { View, Text, ActivityIndicator, Dimensions, TouchableOpacity } from 'react-native'
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

import FeedbackScreen from './component/main/Feedback'
import MatchHistoryScreen from './component/main/MatchHistory';
import MatchHistoryDetailScreen from './component/main/MatchHistoryDetail';
import BluePerformanceScreen from './component/main/BluePerformance';
import RedPerformanceScreen from './component/main/RedPerformance';

import Favorites from './component/main/Favorites';

import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Setting a timer for a long period of time'])

const Stack = createStackNavigator();

const {width, height} = Dimensions.get("window")

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      liked: false,   
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

  toggle = () => {
    let localLiked = this.state.liked;
    localLiked = !localLiked;
    this.setState({ liked: localLiked });
  };

  render() {
    const { loggedIn, loaded } = this.state;

    if (!loaded) {
      return (
        <View style={{height: width / 3, width: width / 2, backgroundColor: '#b8bab9c0', alignSelf: 'center', marginTop: height / 3, borderRadius: 10}}>
            <ActivityIndicator size="large" color="grey" style={{alignSelf: 'center', marginTop: 20}}/>
            <Text style={{fontSize: 20, fontWeight: 'bold', alignSelf: 'center', marginTop: 20, color: 'grey'}}> 
                Loading...
            </Text>
        </View>
      )
    }

    if (!loggedIn) {
      return (
          <NavigationContainer>
            <View style={{ flex: 1, backgroundColor: '#232323'}}>
              <Stack.Navigator initialRouteName="Landing">
                <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false}}/>
                <Stack.Screen name="Register" component={RegisterScreen} options={{
                    headerStyle: {
                      backgroundColor: '#232323',
                    },
                    headerTintColor: '#6BDB5A'
                }}/>
                <Stack.Screen name="Login" component={LoginScreen} options={{
                    headerStyle: {
                      backgroundColor: '#232323',
                    },
                    headerTintColor: '#6BDB5A'
                }} /> 
              </Stack.Navigator>
            </View>
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
            <Stack.Screen name="Feedback" component={FeedbackScreen}/>
            <Stack.Screen name="Match History" component={MatchHistoryScreen}/>
            <Stack.Screen name="Match Detail" component={MatchHistoryDetailScreen}/>
            <Stack.Screen name="Blue Team Performance" component={BluePerformanceScreen}/>
            <Stack.Screen name="Red Team Performance" component={RedPerformanceScreen}/>
            <Stack.Screen name="Favorites" component={Favorites}/>
            
          </Stack.Navigator>
        </NavigationContainer>

      </Provider>
    )
  }
}

export default App