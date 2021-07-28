import React, { useState, useEffect } from 'react'
import { View, Text, StatusBar, StyleSheet, Dimensions, ActivityIndicator, Image, Alert } from 'react-native'
import firebase from 'firebase'
import CollapsibleView from "@eliav2/react-native-collapsible-view"
import  MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useFonts } from 'expo-font';
import { TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

export default function Favorites({navigation}) {

    const [loaded] = useFonts({
      Manticore: require('../../assets/font/Manticore.otf')
    });

    const favoriteCompositionsArr = []
    const [favoriteCompositions, setFavoriteCompositions] = useState([])
    const [isLoading, setLoader] = useState(true)

    const getFavoriteCompositions = async() => {
      let isMounted = true
      if (isMounted) {
        const collection =  firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid)
        const response = await collection.get()
        if (!response.exists) {
          console.log('No such document!');
        }
        for (var i in response.data()["compositions"]) {
          favoriteCompositionsArr.push(response.data()["compositions"][i]["entireCompo"])
        }
        setFavoriteCompositions(favoriteCompositionsArr)
        setLoader(false)
      }
      return () => { isMounted = false }    
    }

    const removeComposition = (compo) => {
      const collection = firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid)
      console.log(compo)
      collection.update({
        compositions: firebase.firestore.FieldValue.arrayRemove({"entireCompo": compo})
      })
  }

    useEffect(() => {
      getFavoriteCompositions()
    }, [favoriteCompositions])

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

  const favoriteLengthArr = []
  for (var i = 0; i < favoriteCompositions.length; i ++) {
    favoriteLengthArr[i] = i
  }

  const renderComposition = (compo) => {
    return (
      <View style={{height: 135, marginTop: 5, marginBottom: 5, alignSelf: 'center', alignItems: 'center'}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly', width: width - 50, top: 10, alignSelf: 'center', alignItems: 'center'}}>
          <Image
            source={{uri: 'http://ddragon.leagueoflegends.com/cdn/11.15.1/img/champion/' + compo[0] + '.png'}}
            style={styles.iconBlue}
          />
          <Image
            source={{uri: 'http://ddragon.leagueoflegends.com/cdn/11.15.1/img/champion/' + compo[1] + '.png'}}
            style={styles.iconBlue}
          />
          <Image
            source={{uri: 'http://ddragon.leagueoflegends.com/cdn/11.15.1/img/champion/' + compo[2] + '.png'}}
            style={styles.iconBlue}
          />
          <Image
            source={{uri: 'http://ddragon.leagueoflegends.com/cdn/11.15.1/img/champion/' + compo[3] + '.png'}}
            style={styles.iconBlue}
          />
          <Image
            source={{uri: 'http://ddragon.leagueoflegends.com/cdn/11.15.1/img/champion/' + compo[4] + '.png'}}
            style={styles.iconBlue}
          />
        </View>
        
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly', position: 'absolute', width: width - 50, top: 70, alignSelf: 'center', alignItems: 'center'}}>
          <Image
            source={{uri: 'http://ddragon.leagueoflegends.com/cdn/11.15.1/img/champion/' + compo[5] + '.png'}}
            style={styles.iconRed}
          />
          <Image
            source={{uri: 'http://ddragon.leagueoflegends.com/cdn/11.15.1/img/champion/' + compo[6] + '.png'}}
            style={styles.iconRed}
          />
          <Image
            source={{uri: 'http://ddragon.leagueoflegends.com/cdn/11.15.1/img/champion/' + compo[7] + '.png'}}
            style={styles.iconRed}
          />
          <Image
            source={{uri: 'http://ddragon.leagueoflegends.com/cdn/11.15.1/img/champion/' + compo[8] + '.png'}}
            style={styles.iconRed}
          />
          <Image
            source={{uri: 'http://ddragon.leagueoflegends.com/cdn/11.15.1/img/champion/' + compo[9] + '.png'}}
            style={styles.iconRed}
          />
        </View>   
        <MaterialCommunityIcons name="chevron-down" size={30} style={{marginTop: 72}}/>
      </View>
    )
  }

  const renderFavorites = () => favoriteLengthArr.map(index => (
    <View styles={{marginTop: 10}} key={index}>
      <View style={{backgroundColor: 'white', height: 40, top: 4}}>
        <Text style={{color: '#55BA46', textAlign: 'center', marginTop: 3,fontSize: 20}}>Composition {index + 1}</Text>
      </View>
      <CollapsibleView 
        title={renderComposition(favoriteCompositions[index])} 
        style={{backgroundColor: 'white', width: width, marginLeft: 0, borderColor: 'white', elevation: 1}}
        noArrow={true}
      >
        <View style={{flexDirection: 'row', marginLeft: 70}}>
          <Text style={{fontSize: 18, fontWeight: 'bold', marginTop: 5}}>TOP: </Text>
          <Text style={styles.championNameBlue}>{favoriteCompositions[index][0]}</Text>
          <Text style={styles.VS}>VS</Text>
          <Text style={styles.championNameRed}>{favoriteCompositions[index][5]}</Text>
        </View>

        <View style={{flexDirection: 'row', marginLeft: 70}}>
          <Text style={{fontSize: 18, fontWeight: 'bold', marginTop: 5}}>JUG: </Text>
          <Text style={styles.championNameBlue}>{favoriteCompositions[index][1]}</Text>
          <Text style={styles.VS}>VS</Text>
          <Text style={styles.championNameRed}>{favoriteCompositions[index][6]}</Text>
        </View>

        <View style={{flexDirection: 'row', marginLeft: 70}}>
          <Text style={{fontSize: 18, fontWeight: 'bold', marginTop: 5}}>MID: </Text>
          <Text style={styles.championNameBlue}>{favoriteCompositions[index][2]}</Text>
          <Text style={styles.VS}>VS</Text>
          <Text style={styles.championNameRed}>{favoriteCompositions[index][7]}</Text>
        </View>

        <View style={{flexDirection: 'row', marginLeft: 70}}>
          <Text style={{fontSize: 18, fontWeight: 'bold', marginTop: 5}}>ADC: </Text>
          <Text style={styles.championNameBlue}>{favoriteCompositions[index][3]}</Text>
          <Text style={styles.VS}>VS</Text>
          <Text style={styles.championNameRed}>{favoriteCompositions[index][8]}</Text>
        </View>

        <View style={{flexDirection: 'row', marginLeft: 70}}>
          <Text style={{fontSize: 18, fontWeight: 'bold', marginTop: 5}}>SUP: </Text>
          <Text style={styles.championNameBlue}>{favoriteCompositions[index][4]}</Text>
          <Text style={styles.VS}>VS</Text>
          <Text style={styles.championNameRed}>{favoriteCompositions[index][9]}</Text>
        </View>

        <TouchableOpacity
          style={{backgroundColor: 'white', borderColor: '#55BA46', borderWidth: 1, borderRadius: 5, height: 50, marginTop: 20, width: width - 100, alignSelf: 'center'}}
          onPress={() => {navigation.navigate("Composition", {
            blueTeam: [favoriteCompositions[index][0], favoriteCompositions[index][1], favoriteCompositions[index][2], favoriteCompositions[index][3], favoriteCompositions[index][4]],
            redTeam: [favoriteCompositions[index][5], favoriteCompositions[index][6], favoriteCompositions[index][7], favoriteCompositions[index][8], favoriteCompositions[index][9]]
          })}}
        >
          <Text style={{fontWeight:'500', fontSize:18, color:'#55BA46', marginTop: 10, textAlign: 'center'}}>Analyse</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{backgroundColor: 'white', borderColor: '#55BA46', borderWidth: 1, borderRadius: 5, height: 50, marginTop: 10, marginBottom: 10, width: width - 100, alignSelf: 'center'}}
          onPress={() => {
                  Alert.alert(
                  'Are you sure you want to unfavorite this composition?',
                  '',
                  [
                    {
                      text: "Cancel",
                      style:'cancel'
                    },
                    {text: "OK", onPress: () => removeComposition(favoriteCompositions[index])}
                  ]
                )
            }}
        >
          <Text style={{fontWeight:'500', fontSize:18, color:'#55BA46', marginTop: 10, textAlign: 'center'}}>Unfavorite</Text>
        </TouchableOpacity>
      </CollapsibleView>  
    </View>
  ))

  const renderUi = () => {
    return renderFavorites()
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
  
  if (favoriteCompositions.length === 0) {
    return (
      <View>
        <View style={{backgroundColor: 'white', width: width, height: height/16, elevation: 5, position: 'absolute'}}>
          <Text style={styles.titleText}> Favorite Compositions </Text>
        </View>
        <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: 'grey', marginTop: 280, lineHeight: 40}}>
          You do not have any favorite compositions yet
        </Text>
      </View>
    )
  }

  return (
    <View>
      <View style={{backgroundColor: 'white', width: width, height: height/16, elevation: 5, position: 'absolute'}}>
          <Text style={styles.titleText}> Favorite Compositions </Text>
      </View>
        <ScrollView style={{marginTop: height/16}}>
          {renderUi()}
        </ScrollView>
    </View>
    
  )
}

const {width, height} = Dimensions.get("window")

const styles = StyleSheet.create({
    iconBlue: {
        width: 45, 
        height: 45, 
        borderRadius: 45, 
        marginLeft: 25,
        marginRight: 25,
        borderColor: '#55B1CE', 
        borderWidth:3
    },
    iconRed: {
        width: 45, 
        height: 45, 
        borderRadius: 45, 
        marginLeft: 25,
        marginRight: 25,
        borderColor: '#DC5047', 
        borderWidth:3
    },
    titleText: {
      fontSize: 20,
      marginTop: 10,
      fontWeight: 'bold',
      color: '#55BA46',
      alignSelf: 'center'
  },
  championNameBlue: {
    fontSize: 18,
    marginLeft: 10,
    marginRight: 10,
    color: '#55B1CE',
    marginTop: 5
  },
  championNameRed: {
    fontSize: 18,
    marginLeft: 10,
    marginRight: 10,
    color: '#DC5047',
    marginTop: 5
  },
  VS: {
    fontFamily:'Manticore',
    fontSize: 18,
    marginTop: 1,
    marginTop: 5
  }
})