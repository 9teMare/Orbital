import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'
import firebase from 'firebase'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchUser } from '../redux/actions/index'
import { createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs'
import  MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MetaScreen from './main/Meta'
import MyPageScreen from './main/MyPage'
import FavoritesScreen from './main/Favorites'
import CompositionScreen from './main/Composition'

 
const Tab = createMaterialBottomTabNavigator();

export class Main extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }
    render() {
        return (
            <Tab.Navigator initialRouteName="Meta" labeled={true}
            activeColor="#6BDB5A" inactiveColor="#2d5c27" barStyle={{ backgroundColor: '#232323' }}>
                <Tab.Screen name="Meta" component={MetaScreen} 
                    options={{
                        tabBarLabel: 'Meta',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="box-shadow" color={color} size={26}/>
                        )
                    }}  />

                <Tab.Screen name="Composition" component={CompositionScreen} 
                    options={{
                        tabBarLabel: 'Composition',
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="align-vertical-center" color={color} size={26}/>
                        )
                    }}
                    initialParams={{blueTeam: [null, null, null, null, null], redTeam: [null, null, null, null, null]}}  />
                <Tab.Screen name="Favorites" component={FavoritesScreen} 
                    options={{
                        tabBarLabel: 'Favorites',
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="star" color={color} size={26}/>
                        )
                    }}  />    
                <Tab.Screen name="My Page" component={MyPageScreen} 
                    options={{
                        tabBarLabel: 'Me',
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="account-circle" color={color} size={26}/>
                        )
                    }}  />
            </Tab.Navigator>
        )
    }
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})
const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUser }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Main);