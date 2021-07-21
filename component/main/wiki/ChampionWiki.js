import React, { useState, useEffect } from 'react'
import {Text, View, FlatList, TouchableOpacity, Image, Button, TextInput, StyleSheet, Dimensions} from 'react-native'
import {Header, ListItem, List} from 'react-native-elements'
import filter from 'lodash.filter';
import { ScrollView } from 'react-native';

export default function ChampionWiki({navigation}) {
  const [query, setQuery] = useState('');
  const [selectedChamp, setSelectedChamp] = useState(null);
  const [fullData, setFullData] = useState([]);
  const [data, setData] = useState([])

  useEffect(() => {
    let isMounted = true
    fetch('http://ddragon.leagueoflegends.com/cdn/11.14.1/data/en_US/champion.json')
    .then((response) => response.json())
    .then((response) => {
        if (isMounted) {
          for (var k in response.data) {
            champName.push(k)
          }
          setFullData(champName)
          setData(champName)
        }
        return () => { isMounted = false }
    })
    .catch((error) => console.error(error))
  }, [selectedChamp])

  const champName = []

  const Item = ({ item, onPress, weight, color}) => (
    <TouchableOpacity onPress={() => navigation.navigate("Champion Detail", item)}>
        <Image 
            source={{uri: 'http://ddragon.leagueoflegends.com/cdn/11.14.1/img/champion/' + item + '.png'}}
            style= {[styles.image, color]}
        />
        <Text style={[styles.title, weight]}>
            {item}
        </Text>
    </TouchableOpacity>    
)
  
  const renderItem = ({ item }) => {
    return (
      <Item 
        item={item}
        onPress={() => setSelectedChamp(item)}
      />
    )
  }

  function renderHeader() {
    return (
      <View
        style={{
          backgroundColor: '#fff',
          padding: 10,
          marginVertical: 10,
          width: width * 0.75,
          borderRadius: 10,
          flexDirection: 'row',
          alignSelf:'center'
        }}
      >
        <TextInput
          keyboardShouldPersistTaps={'always'}
          autoCapitalize='words'
          autoCorrect={false}
          clearButtonMode="always"
          value={query}
          onChangeText={queryText => handleSearch(queryText)}
          placeholder="Search"
          style={{ backgroundColor: '#fff', paddingHorizontal: 10, maxWidth: width }}
        />
      </View>    
    );
  }

  const handleSearch = text => {
    const filteredData = filter(fullData, champ => {
      return contains(champ, text);
    });
    setData(filteredData);
    setQuery(text);
};

  const contains = (champs, query) => {
    if (champs.includes(query)) {
      return true;
    }
    return false;
  };

  return (
      <View style={{flexDirection: 'row'}}>
        <View style={{justifyContent: 'space-between', alignItems: 'center', width: width}}>
          <FlatList
            ListHeaderComponent={renderHeader}
            numColumns={4}
            horizontal={false}
            data={data}
            extraData={selectedChamp}
            renderItem={renderItem}
            keyExtractor={item => item}
            style={styles.flatlist}
          />
        </View>
      </View>
  )
}

const {width, height} = Dimensions.get("window")

const styles = StyleSheet.create({
  image: {
      width:60, height:60, marginTop:15, marginBottom:5, marginLeft:10, marginRight:10, borderWidth:2, justifyContent:'space-between'
  },
  title: {
      fontSize:10, alignSelf: 'center', marginBottom: 5, marginLeft: 10, marginRight:10, fontWeight: 'bold'
  },
  imageSelected: {
      width:60, height:60, marginTop:20, marginLeft:20, borderRadius:3, borderColor:'green'
  },
  position: {
      fontSize:15, fontWeight:'500'
  },
  doneButton: {
      height: 31, width: 63, backgroundColor: 'white', borderRadius: 5, alignItems: 'center', marginTop:35
  }
})