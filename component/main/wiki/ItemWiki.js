import React, { useState, useEffect } from 'react'
import {Text, View, FlatList, TouchableOpacity, Image, Button, TextInput, StyleSheet} from 'react-native'
import {Header, ListItem, List} from 'react-native-elements'
import filter from 'lodash.filter';

export default function ItemWiki({navigation}) {
  const [query, setQuery] = useState('');
  const [selecteditem, setSelecteditem] = useState(null);
  const [fullData, setFullData] = useState([]);
  const [data, setData] = useState([])

  useEffect(() => {
    fetch('http://ddragon.leagueoflegends.com/cdn/11.12.1/data/en_US/item.json')
    .then((response) => response.json())
    .then((response) => {
        for (var k in response.data) {
            itemName.push(k)
        }
        setFullData(itemName)
        setData(itemName)
    })
    .catch((error) => console.error(error))
  }, [selecteditem])

  const itemName = []

  const Item = ({ item, onPress, weight, color}) => (
    <TouchableOpacity onPress={() => navigation.navigate("ItemDetail")}>
        <Image 
            source={{uri: 'http://ddragon.leagueoflegends.com/cdn/11.12.1/img/item/' + item + '.png'}}
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
        onPress={() => setSelecteditem(item)}
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
          borderRadius: 20
        }}
      >
        <TextInput
          autoCapitalize="words"
          autoCorrect={false}
          clearButtonMode="always"
          value={query}
          onChangeText={queryText => handleSearch(queryText)}
          placeholder="Search"
          style={{ backgroundColor: '#fff', paddingHorizontal: 20 }}
        />
      </View>
    );
  }

  const handleSearch = text => {
  const filteredData = filter(fullData, item => {
    return contains(item, text);
  });
  setData(filteredData);
  setQuery(text);
};

  const contains = (items, query) => {
    if (items.includes(query)) {
      return true;
    }
    return false;
  };

  return (
      <View style={{flexDirection: 'row'}}>
        <View style={{justifyContent:'center', alignItems: 'center'}}>
          <FlatList
          //why height????
            //style={{height: screen.height - 110}}
            ListHeaderComponent={renderHeader}
            numColumns={4}
            horizontal={false}
            data={data}
            extraData={selecteditem}
            renderItem={renderItem}
            keyExtractor={item => item}
          />
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
  image: {
      width:60, height:60, marginTop:20, marginLeft:20,borderWidth:2
  },
  title: {
      fontSize:12, alignItems: 'center', marginLeft: 20
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