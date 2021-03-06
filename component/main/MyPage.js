import React, { useState, useEffect } from 'react'
import {StyleSheet, View, Text, Button, Image, TouchableOpacity, TextInput, Alert, StatusBar, Dimensions, TouchableWithoutFeedback, Keyboard, ActivityIndicator} from 'react-native'
import {Picker} from '@react-native-picker/picker'
import {connect} from 'react-redux'
import firebase from 'firebase'
import { Ionicons } from '@expo/vector-icons';
import { block } from 'react-native-reanimated'
import  MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useFonts } from 'expo-font';

function MyPage(props) {
    const [loaded] = useFonts({
        Manticore: require('../../assets/font/Manticore.otf')
    });
    const { currentUser } = props;
    const {navigate} = props.navigation
    
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
              if (response.ok) {
                return response.json()
              } else if (response.status === 404) {
                return invalidUsernameAlert()
              } else {
                return otherError()
              }
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
            "Please try again",
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

      const otherError = () => {
        Alert.alert(
            "Network error",
            "Please try again",
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

      const welcomeSummoner = () => {
          if (summonerName === "") {
              return (
                  <View style={{marginTop: 10}}>

                  </View>
              )
          } else {
              return (
                  <View>
                        <Text style={{ fontSize: 20, marginLeft: 20, marginTop: 30, marginBottom: 5}}>Welcome, {summonerName} !</Text>
                        <Text style={{ fontSize: 15, marginLeft: 20, marginTop: 5, marginBottom: 20}}>Summoner Level: {summonerLvl}</Text>
                  </View>
              )
          }
      }

    if (!loaded) {
    return null;
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
        <View style={{backgroundColor: 'white', height: 1000}}>
            <StatusBar/>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View>
                <View style = {{flexDirection: 'row', flexWrap:'wrap'}}>
                    <Image
                        //source = {require('../../pictures/others/EmptyGrayRec.png')}                        
                        source = {avatarUri}
                        style = {{width: 100, height:100, borderRadius: 100, marginTop: 50, marginHorizontal: 20, borderColor: "black", borderWidth: 2}}
                    />
                    <View style ={{marginTop: 70}}>
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
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{fontWeight: 'bold', marginLeft: 22, position: 'absolute', fontSize: 15, top: 15}}>
                            Select server
                        </Text>
                        <View style={{borderWidth: 2, borderColor: 'black', borderRadius: 4, width: 100, marginLeft: 20, marginTop: 45, marginBottom: 5, flexDirection: 'row'}}>
                            <Picker
                                selectedValue={selectedRegion}
                                style={{ height: 40, width: 100,  alignItems: 'center' }}
                                onValueChange={(itemValue) =>
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
                        <Text style={{fontWeight: 'bold', left: 142, position: 'absolute', fontSize: 15, top: 15}}>
                            Link to your LOL account
                        </Text>
                        <View>
                            <TextInput 
                                placeholder="Your Summoner Name" 
                                onChangeText={(value) => {
                                    setId(value)
                                }}
                                style={{marginRight: 20, marginLeft: 20, marginTop: 45,  padding: 5, width: 180, borderRadius: 4, borderColor: 'black', borderWidth:2, height: 44}}
                            />
                        </View>
                    </View>
                   
                    <TouchableOpacity
                        onPress = {
                            () => fetchApiAndDismissKeyborad()
                        } 
                        style = {{width: 200, height: 40, alignItems:'center', backgroundColor: "#222222", alignSelf:'center', elevation: 3, marginTop: 20, borderRadius: 4}}>
                        <Text style={{color: "white", marginTop: 9, fontSize: 15}}>Get user information</Text>
                    </TouchableOpacity>
                    {welcomeSummoner()}
                    <View >
                        <TouchableOpacity style={styles.expandMatchHistory} onPress={() => {navigate("Match History", {selectedRegion, summonerName, accountId, apiKey, currentUser})}}>
                            <Text style={{position: 'absolute', marginTop: 15, left: 15, fontSize: 15}}>See Match History</Text>
                            <MaterialCommunityIcons name="chevron-right" size={26} style={{position: 'absolute', marginTop: 12, right: 10}}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={{fontFamily: 'Manticore', fontSize: 60, textAlign: 'center', color: '#ebebeb', marginTop: 40, lineHeight: 80, marginBottom: 40}}>
                    Legendarily
                </Text>

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
        elevation: 5, marginTop: 20
    },
    expandMatchHistory: {
        width: width - 20,
        height: 50,
        backgroundColor: 'white',
        elevation: 10,
        marginTop: 15
        // borderColor: 'black', 
        // borderWidth: 2, 
    },
    favorite: {
        width: width - 20, backgroundColor: 'white', alignSelf:'center', 
        shadowRadius:10, shadowOffset:{width:-6, height:6}, shadowOpacity:0.2,
        marginLeft: 30 , marginRight:30, 
        elevation: 10, height: 80, marginTop: 70, marginBottom: 50, alignItems: 'center',
        flexDirection: 'row'
    }
})

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})

export default connect(mapStateToProps, null)(MyPage)
