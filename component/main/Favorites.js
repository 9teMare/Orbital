import React, { useState, useEffect } from 'react'
import { View, Text, StatusBar, StyleSheet, Dimensions, ActivityIndicator, Image } from 'react-native'
import firebase from 'firebase'

export default function Favorites() {
    const favoriteCompositionsArr = []
    const [favoriteCompositions, setFavoriteCompositions] = useState([])
    const [isLoading, setLoader] = useState(true)

    const getFavoriteCompositions = async() => {
      let isMounted = true
      if (isMounted) {
        const collection =  firebase.firestore().collection("favoriteCompositions").doc(firebase.auth().currentUser.uid)
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

  const iconUri = (compo, index) => {
    return {uri: 'http://ddragon.leagueoflegends.com/cdn/11.15.1/img/champion/' + compo[index] + '.png'}
  }

  const renderComposition = (compo) => {
    return (
      <View style={{height: 128, width: width, backgroundColor: 'white', elevation: 3, marginTop: 5, marginBottom: 5}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly', position: 'absolute', width: width - 100, left: 20, top: 10}}>
          <Image
            source={iconUri(compo, 0)}
            style={styles.iconBlue}
          />
          <Image
            source={iconUri(compo, 1)}
            style={styles.iconBlue}
          />
          <Image
            source={iconUri(compo, 2)}
            style={styles.iconBlue}
          />
          <Image
            source={iconUri(compo, 3)}
            style={styles.iconBlue}
          />
          <Image
            source={iconUri(compo, 4)}
            style={styles.iconBlue}
          />
        </View>
        
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly', position: 'absolute', width: width - 100, top: 70, left: 20}}>
          <Image
            source={iconUri(compo, 5)}
            style={styles.iconRed}
          />
          <Image
            source={iconUri(compo, 6)}
            style={styles.iconRed}
          />
          <Image
            source={iconUri(compo, 7)}
            style={styles.iconRed}
          />
          <Image
            source={iconUri(compo, 8)}
            style={styles.iconRed}
          />
          <Image
            source={iconUri(compo, 9)}
            style={styles.iconRed}
          />
        </View>   
      </View>
    )
  }

  const renderFavorites = favoriteLengthArr.map(index => (
    <View styles={{marginTop: 40}} key={index}>
        {renderComposition(favoriteCompositions[index])}
    </View>
  ))

  return (
    <View>
      {renderFavorites}
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
    }
})