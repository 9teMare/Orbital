import React, { useState } from 'react'
import {StyleSheet, View, Text, Button, Image, TouchableOpacity, TextInput} from 'react-native'
import {Picker} from '@react-native-picker/picker'
import {connect} from 'react-redux'
import firebase from 'firebase'

function MyPage(props) {
    const { currentUser } = props;
    console.log({currentUser})
    const {navigate} = props.navigation

    const onLogout = () => {
        firebase.auth().signOut()
    }
    
    const [selectedRegion, setSelectedRegion] = useState('na1');
    const [Id, setId] = useState('');

    const fetchApiCall = (Id) => {
        fetch("https://" + selectedRegion + ".api.riotgames.com/lol/summoner/v4/summoners/by-name/" + Id + "?api_key=RGAPI-d1869eab-4f8e-42ad-a4fc-46d00a7202de", {
          "method": "GET",
          "headers": {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36 Edg/91.0.864.41",
            "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6,ja;q=0.5,zh-TW;q=0.4",
            "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
            "Origin": "https://developer.riotgames.com"
          } 
        })
          .then(response => response.json())
          .then(response => {
            console.log(response.name)
            console.log(response.summonerLevel)
            console.log(response.profileIconId)
          })
          .catch(err => {
            console.log(err);
          });
      }

    //   const axiosApiCall = () => {
    //     axios({
    //       "method": "POST",
    //       "url": "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/9teMare",
    //       "headers": {
    //         "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6,ja;q=0.5,zh-TW;q=0.4",
    //         "X-Riot-Token": "RGAPI-a47cf3c8-1834-402c-a790-dd9e065b2eae"
    //       }
    //     })
    //       .then((response) => {
    //         console.log(response.data.content);
    //         console.log(response.data.originator.name)
    //       })
    //       .catch((error) => {
    //         console.log(error)
    //       })
    //   }

    return (
        <View>

            <View style = {{flexDirection: 'row', flexWrap:'wrap'}}>

                <Image
                    source = {require('../../pictures/others/EmptyGrayRec.png')}
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

            </View>

            <TouchableOpacity
                onPress = {() => navigate("Settings")}
                style ={{height: 50}}
            >
                <Text style ={{marginLeft: 20, marginTop: 15, fontWeight: 'bold'}}> Settings </Text>

            </TouchableOpacity>

            <View>
                <Picker
                    selectedValue={selectedRegion}
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

                <Text style={{fontWeight: 'bold'}}>
                    Link to your LOL ID
                </Text>
                <TextInput placeholder="Your LOL ID" onChangeText={(value) => {
                    setId(value)
                }}/>

                <TouchableOpacity 
                    onClick={fetchApiCall(Id)} 
                    style = {{width: 180, height: 30, alignItems:'center', backgroundColor: "black", alignSelf:'center',}}>
                    <Text style={{color: "white", marginTop: 5}}>Get user information</Text>
                </TouchableOpacity>
            </View>


            <View style={styles.container}>
                <View style={styles.containerInfo}>
                    <Text> {currentUser.name} </Text>
                    <Text> {currentUser.email} </Text>
                </View>
            </View>

            <View style={{marginTop:40}}>
                <Button
                    title="Logout"
                    onPress={() => onLogout()}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 300
    },
    containerInfo: {
        margin: 20 
    }
})

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})

export default connect(mapStateToProps, null)(MyPage)