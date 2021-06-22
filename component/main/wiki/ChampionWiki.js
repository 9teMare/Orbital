import React, { useState, useEffect } from 'react'
import {Text, View, FlatList, TouchableOpacity, Button, TextInput} from 'react-native'
import {Header} from 'react-native-elements'
import filter from 'lodash.filter';

function renderHeader() {
    const [query, setQuery] = useState('');

    const handleSearch = text => {
        const filteredData = filter(fullData, champ => {
          return contains(champ, text);
        });
        setData(filteredData);
        setQuery(text);
    };

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

export default function ChampionWiki() {
 
    const [selectedChamp, setSelectedChamp] = useState(null);
    const [fullData, setFullData] = useState([]);
    const [data, setData] = useState([])

    // const Item = ({ item, onPress, weight, color}) => (
    //     <TouchableOpacity onPress={onPress}>
    //         <Image 
    //             source={{uri: 'http://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/' + item + '.png'}}
    //            // style= {[styles.image, color]}
    //         />
    //         <Text style={[styles.title, weight]}>
    //             {item}
    //         </Text>
    //     </TouchableOpacity>    
    // )

    useEffect(() => {
        fetch('http://ddragon.leagueoflegends.com/cdn/11.12.1/data/en_US/champion.json')
        .then((response) => response.json())
        .then((response) => {
            for (var k in response.data) {
                champName.push(k)
            }
            setFullData(champName)
            setData(champName)
        })
        .catch((error) => console.error(error))
    }, [selectedChamp])

    const champName = []

    // const renderItem = ({ item }) => {
    //     const fontWeight = item === selectedChamp ? 'bold' :'normal';
    //     const borderColor = item === selectedChamp ? '#6BDB5A' :'black'

    //     return (
    //         <Item 
    //             item={item}
    //             onPress={() => setSelectedChamp(item)}
    //             weight={{ fontWeight }}
    //             color = {{borderColor}}
    //         />
    //     )
    // }

    return (
        <View>
            <FlatList
                //numColumns={5}
                ListHeaderComponent={renderHeader}
                data={data}
                renderItem={({ item }) => (
                    <Text>{item}</Text>
                )}
                keyExtractor={item => item}
            />
            <Text>
                ChampionWiki
            </Text>
        </View>
    )
}

