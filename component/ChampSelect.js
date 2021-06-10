import React, { useState } from 'react'
import { StyleSheet, View, Text, Image, FlatList, TouchableOpacity, TouchableHighlight, TextInput } from 'react-native'
import filter from 'lodash.filter';





const Item = ({ item, onPress, weight, color}) => (
    <TouchableOpacity onPress={onPress}>
        <Image 
            source={require('../pictures/champions/' + item + '.png')}
            style= {[styles.image, color]}
        />
        <Text style={[styles.title, weight]}>
            {item}
        </Text>
    </TouchableOpacity>    
)


function ChampSelect() {

    const ChampInfo = require('../champion.json')
    const champName = Object.keys(ChampInfo.data)
    const [selectedChamp, setSelectedChamp] = useState(null);

    const emptySlot = {url: require('../pictures/others/EmptyGrayRec.png')}

    const [top, setTop] = useState(emptySlot)
    const [jungle, setJungle] = useState(emptySlot)
    const [mid, setMid] = useState(emptySlot)
    const [ADC, setADC] = useState(emptySlot)
    const [support, setSupport] = useState(emptySlot)

    const [query, setQuery] = useState('');
    const [fullData, setFullData] = useState(champName);
    const [data, setData] = useState(champName) 
    


    const renderItem = ({ item }) => {
        const fontWeight = item === selectedChamp ? 'bold' :'normal';
        const borderColor = item === selectedChamp ? '#6BDB5A' :'black'
        
        return (
            <Item 
                item={item}
                onPress={() => setSelectedChamp(item)}
                weight={{ fontWeight }}
                color = {{borderColor}}

            />
        )
    }

    const changeTop = () => {
        if (selectedChamp !== null) {
            setTop({url: require('../pictures/champions/' + selectedChamp + '.png')})
        }
    }
    
    const changeJG = () => {
        if (selectedChamp !== null) {
            setJungle({url: require('../pictures/champions/' + selectedChamp + '.png')})
        }
    }
    
    const changeMid = () => {
        if (selectedChamp !== null) {
            setMid({url: require('../pictures/champions/' + selectedChamp + '.png')})
        }
    }
    
    const changeADC = () => {
        if (selectedChamp !== null) {
            setADC({url: require('../pictures/champions/' + selectedChamp + '.png')})
        }
    }
    
    const changeSupport = () => {
        if (selectedChamp !== null) {
            setSupport({url: require('../pictures/champions/' + selectedChamp + '.png')})
        }
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
        const formattedQuery = text.toLowerCase();
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

            <View style={{justifyContent:'space-evenly', width: 60, marginLeft: 32, height: 500, marginTop: 40}} >

                <View>
                    <Text style={styles.position}> Top </Text>

                    <TouchableHighlight
                        style={{height:60, width:60}}
                        onPress={changeTop}
                    >
                        <Image source={top.url} style={{width:50, height:50}}/>
                    </TouchableHighlight>
                </View>

                <View>
                    <Text style={styles.position}> Jungle </Text>
                    <TouchableHighlight
                        style={{height:60, width:60}}
                        onPress={changeJG}
                    >
                        <Image source={jungle.url} style={{width:50, height:50}}/>
                    </TouchableHighlight>
                </View>

                <View>
                    <Text style={styles.position}> Mid </Text>
                    <TouchableHighlight
                        style={{height:60, width:60}}
                        onPress={changeMid}
                    >
                        <Image source={mid.url} style={{width:50, height:50}}/>
                    </TouchableHighlight>
                </View>

                <View>
                    <Text style={styles.position}> ADC </Text>
                    <TouchableHighlight
                        style={{height:60, width:60}}
                        onPress={changeADC}
                    >
                        <Image source={ADC.url} style={{width:50, height:50}}/>
                    </TouchableHighlight>
                </View>

                <View>
                    <Text style={styles.position}> Support </Text>
                    <TouchableHighlight
                        style={{height:60, width:60}}
                        onPress={changeSupport}
                    >
                        <Image source={support.url} style={{width:50, height:50}}/>
                    </TouchableHighlight>
                </View>

                <TouchableOpacity style={styles.doneButton}>
                    <Text style={{fontWeight: 500, marginTop: 8}}>Done</Text>
                </TouchableOpacity>

            </View>

        
            <View style={{marginLeft: 48, marginTop: 40}}>
                <FlatList
                ListHeaderComponent={renderHeader}
                numColumns={3}
                horizontal={false}
                data={data}
                extraData={selectedChamp}
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

export default ChampSelect

