import React, { useState, useEffect } from 'react'
import {StyleSheet, View, Text, Button, Image, TouchableOpacity, TextInput, Alert, StatusBar, Dimensions, TouchableWithoutFeedback, Keyboard, ActivityIndicator} from 'react-native'
import {Picker} from '@react-native-picker/picker'
import {connect} from 'react-redux'
import firebase from 'firebase'
import { Ionicons } from '@expo/vector-icons';
import { block } from 'react-native-reanimated'
import  MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


function MyPage(props) {
    const { currentUser } = props;
    const {navigate} = props.navigation

    const onLogout = () => {
        firebase.auth().signOut()
    }
    
    const [selectedRegion, setSelectedRegion] = useState('na1');
    const [Id, setId] = useState('');
    const [summonerName, setSummonerName] = useState('');
    const [summonerLvl, setSummonerLvl] = useState('');
    const [profileIcon, setProfileIcon] = useState({uri: '../../pictures/others/EmptyGrayRec.png'});
    const [apiKey, setApiKey] = useState('')
   
    const [accountId, setAccountId] = useState('');
    const [isLoading, setLoader] = useState()

    const [avatarUri, setAvatarUri] = useState(require('../../pictures/others/poro.png'))

    const getApiKey = async () => {
        const jsonServer = "https://orbital-riot-api.herokuapp.com/apiKey"
        await fetch(jsonServer, {
            "method": "GET"
        })
        .then(response => response.json())
        .then(response => {
            setApiKey(response.key)
        })
    }

    getApiKey();

    const url = `https://${selectedRegion}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${Id}?api_key=${apiKey}`

    const fetchApiCall = async() => {
        let isMounted = true
        setLoader(true)
        await fetch(url, {
          "method": "GET",
          "headers": {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36 Edg/91.0.864.41",
            "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6,ja;q=0.5,zh-TW;q=0.4",
            "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
            "Origin": "https://developer.riotgames.com"
          } 
        })
          .then(response => {
              if (!response.ok) { 
                return invalidUsernameAlert()
              }
              return response.json()    
          })
          .then(response => {
            if (isMounted) {
                setSummonerName(response.name)
                setSummonerLvl(response.summonerLevel)

                setAccountId(response.accountId)
                setAvatarUri({uri: `http://ddragon.leagueoflegends.com/cdn/11.15.1/img/profileicon/${response.profileIconId}.png`})
                setLoader(false)
            }
            return () => { isMounted = false }    
          })
          .catch(err => {
            console.log(err);
          });
      }

      const invalidUsernameAlert = () => {
        Alert.alert(
            "Username not found",
            "Please try again"
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
          );
          setLoader(false)
      }

      const fetchApiAndDismissKeyborad = async() => {
            await fetchApiCall()
            Keyboard.dismiss()
      }

    if (isLoading) {
        return (
            <View style={{height: width / 3, width: width / 2, backgroundColor: '#b8bab9c0', alignSelf: 'center', marginTop: height / 3, borderRadius: 10}}>
                <ActivityIndicator size="large" color="grey" style={{alignSelf: 'center', marginTop: 20}}/>
                <Text style={{fontSize: 20, fontWeight: 'bold', alignSelf: 'center', marginTop: 20, color: 'grey'}}> 
                    Loading...
                </Text>
            </View>
        )
    }   

    return (
        <View>
            <StatusBar/>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View>
                <View style = {{flexDirection: 'row', flexWrap:'wrap'}}>
                    <Image
                        //source = {require('../../pictures/others/EmptyGrayRec.png')}                        
                        source = {avatarUri}
                        style = {{width: 100, height:100, borderRadius: 100, marginVertical: 30, marginHorizontal: 20, borderColor: "black", borderWidth: 2}}
                    />
                    <View style ={{marginVertical: 55}}>
                        <Text style ={{ fontWeight: 'bold', fontSize: 28}}> 
                            {currentUser.name}
                        </Text>
                        <Text style ={{color:'gray'}}> 
                            {currentUser.email}
                        </Text>
                    </View>

                    <Ionicons 
                        style={{position: 'absolute', marginTop: width/30, right: width/30}}
                        name="md-settings" 
                        size={32} 
                        color="black" 
                        onPress = {() => navigate("Settings")}
                    />

                </View>

                <View style={styles.infoContainer}>
                    <View style={{borderWidth: 2, borderColor: 'black', borderRadius: 4, width: 100, marginLeft: 20, marginTop: 10, marginBottom: 5}}>
                        <Picker
                            selectedValue={selectedRegion}
                            style={{ height: 40, width: 100,  alignItems: 'center' }}
                            onValueChange={(itemValue, itemIndex) =>
                                setSelectedRegion(itemValue)
                            }>
                            <Picker.Item label="NA" value="na1"/>
                            <Picker.Item label="EUN" value="eun1" />
                            <Picker.Item label="EUW" value="euw1" />
                            <Picker.Item label="KR" value="kr" />
                            <Picker.Item label="JP" value="jp1" />
                            <Picker.Item label="BR" value="br1" />
                        </Picker>
                    </View>
                    <Text style={{fontWeight: 'bold', marginLeft: 20}}>
                        Link to your LOL ID
                    </Text>
                        <View>
                                <TextInput 
                                placeholder="Your LOL ID" 
                                onChangeText={(value) => {
                                    setId(value)
                                }}
                                style={{marginRight: 20, marginLeft: 20, marginTop: 10, borderRadius: 4, borderColor: 'black', borderWidth:2, padding: 5, width: 200}}
                            />
                        </View>
                    
                    <TouchableOpacity
                        onPress = {
                            () => fetchApiAndDismissKeyborad()
                        } 
                        style = {{width: 180, height: 30, alignItems:'center', backgroundColor: "black", alignSelf:'center', elevation: 3, marginTop: 10}}>
                        <Text style={{color: "white", marginTop: 5}}>Get user information</Text>
                    </TouchableOpacity>
                    <Text style={{ marginLeft: 20, marginTop: 10, marginBottom: 5}}>Summoner Name: {summonerName}</Text>
                    <Text style={{ marginLeft: 20, marginTop: 5, marginBottom: 20}}>Summoner Level: {summonerLvl}</Text>

                    <View >
                        <TouchableOpacity style={styles.expandMatchHistory} onPress={() => {navigate("Match History", {selectedRegion, summonerName, accountId, apiKey})}}>
                            <Text style={{position: 'absolute', marginTop: 10, left: 10}}>More Match History</Text>
                            <MaterialCommunityIcons name="arrow-right" size={26} style={{position: 'absolute', marginTop: 5, right: 10}}/>
                        </TouchableOpacity>
                    </View>
                </View>


                <View style={{marginTop:40}}>
                    <TouchableOpacity
                        style = {{width: 180, height: 30, alignItems:'center', backgroundColor: "black", alignSelf:'center', elevation: 2}}
                        onPress={() => onLogout()}>
                        <Text style={{color: "white", marginTop: 5}}>Log out</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </TouchableWithoutFeedback>
        </View>
    )
}

const {width, height} = Dimensions.get("window")

const styles = StyleSheet.create({
    infoContainer: {
        width: width - 20, backgroundColor: 'white', alignSelf:'center', 
        shadowRadius:10, shadowOffset:{width:-6, height:6}, shadowOpacity:0.2,
        marginLeft: 30 , marginRight:30, 
        elevation: 3
    },
    expandMatchHistory: {
        width: width - 20,
        height: 40,
        backgroundColor: 'white',
        elevation: 10
        // borderColor: 'black', 
        // borderWidth: 2, 
    }
})

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})

export default connect(mapStateToProps, null)(MyPage)