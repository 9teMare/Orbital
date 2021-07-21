import React, { useState } from 'react'
import {StyleSheet, View, Text, Button, Image, TouchableOpacity, TextInput, Alert, StatusBar, Dimensions } from 'react-native'
import {Picker} from '@react-native-picker/picker'
import {connect} from 'react-redux'
import firebase from 'firebase'
import { Ionicons } from '@expo/vector-icons';
import { block } from 'react-native-reanimated'

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

    const fetchApiCall = () => {
        fetch(url, {
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
            setSummonerName(response.name)
            setSummonerLvl(response.summonerLevel)
            setProfileIcon(response.profileIconId)
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
      }

    // const avatarAddress = 'http://ddragon.leagueoflegends.com/cdn/11.12.1/img/profileicon/' + profileIcon + '.png'

    return (
        <View>
            <StatusBar/>
            <View style = {{flexDirection: 'row', flexWrap:'wrap'}}>
                <Image
                    //source = {require('../../pictures/others/EmptyGrayRec.png')}
                    source = {{uri: 'http://ddragon.leagueoflegends.com/cdn/11.14.1/img/profileicon/' + profileIcon + '.png'}}
                    style = {{width: 100, height:100, borderRadius: 100, marginVertical: 30, marginHorizontal: 20}}
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
                <Picker
                    selectedValue={selectedRegion}
                    style={{ height: 40, width: 90, marginLeft: 10 }}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedRegion(itemValue)
                    }>
                    <Picker.Item label="NA" value="na1" />
                    <Picker.Item label="EU North" value="eun1" />
                    <Picker.Item label="EU West" value="euw1" />
                    <Picker.Item label="KR" value="kr" />
                    <Picker.Item label="JP" value="jp1" />
                    <Picker.Item label="BR" value="br1" />
                </Picker>

                <Text style={{fontWeight: 'bold', marginLeft: 20}}>
                    Link to your LOL ID
                </Text>
                <TextInput 
                    placeholder="Your LOL ID" 
                    onChangeText={(value) => {
                        setId(value)
                    }}
                    style={{marginRight: 20, marginLeft: 20, marginTop: 10, borderColor: 'black', borderWidth:2, padding: 5}}
                />
                <TouchableOpacity
                    onPress = {
                         () => fetchApiCall()
                    } 
                    style = {{width: 180, height: 30, alignItems:'center', backgroundColor: "black", alignSelf:'center', elevation: 3, marginTop: 10}}>
                    <Text style={{color: "white", marginTop: 5}}>Get user information</Text>
                </TouchableOpacity>
                <Text style={{ marginLeft: 20, marginTop: 10, marginBottom: 5}}>Summoner Name: {summonerName}</Text>
                <Text style={{ marginLeft: 20, marginTop: 5, marginBottom: 20}}>Summoner Level: {summonerLvl}</Text>
            </View>

            <View style={{marginTop:40}}>
                <TouchableOpacity
                    style = {{width: 180, height: 30, alignItems:'center', backgroundColor: "black", alignSelf:'center', elevation: 2}}
                    onPress={() => onLogout()}>
                    <Text style={{color: "white", marginTop: 5}}>Log out</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const {width, height} = Dimensions.get("window")

const styles = StyleSheet.create({
    infoContainer: {
        maxHeight: height/3, width: width - 100, maxWidth: width - 50, backgroundColor: 'white', alignSelf:'center', 
        shadowRadius:10, shadowOffset:{width:-6, height:6}, shadowOpacity:0.2,
        marginLeft: 30 , marginRight:30, elevation: 3
    }
})

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})

export default connect(mapStateToProps, null)(MyPage)