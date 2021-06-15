import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Image, FlatList, TouchableOpacity, TouchableHighlight, TextInput } from 'react-native'
import filter from 'lodash.filter';



function ChampSelect({navigation, route}) {

    const [query, setQuery] = useState('');
    const [fullData, setFullData] = useState([]);
    const [data, setData] = useState([])

    const TOP = 0, JUNGLE = 1, MID = 2, ADC = 3, SUPPORT = 4

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

    const [selectedChamp, setSelectedChamp] = useState(null);
    const emptySlot = {url: require('../pictures/others/EmptyGrayRec.png')}

    const {blue, red, isBlue} = route.params
    const arrUsed = isBlue ?blue :red
    const [team, setTeam] = useState(arrUsed)
        
    const [top, setTop] = arrUsed[TOP] === null
        ?useState(emptySlot) :useState({url: 'http://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/'+arrUsed[TOP]+'.png'})
    const [jungle, setJungle] = arrUsed[JUNGLE] === null
        ?useState(emptySlot) :useState({url: 'http://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/'+arrUsed[JUNGLE]+'.png'})
    const [mid, setMid] = arrUsed[MID] === null
        ?useState(emptySlot) :useState({url: 'http://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/'+arrUsed[MID]+'.png'})
    const [adc, setAdc] = arrUsed[ADC] === null
        ?useState(emptySlot) :useState({url: 'http://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/'+arrUsed[ADC]+'.png'})
    const [support, setSupport] = arrUsed[SUPPORT] === null
        ?useState(emptySlot) :useState({url: 'http://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/'+arrUsed[SUPPORT]+'.png'})


    

    const Item = ({ item, onPress, weight, color}) => (
        <TouchableOpacity onPress={onPress}>
            <Image 
                source={{uri: 'http://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/' + item + '.png'}}
                style= {[styles.image, color]}
            />
            <Text style={[styles.title, weight]}>
                {item}
            </Text>
        </TouchableOpacity>    
    )


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
            let temp = team
            team[TOP] = selectedChamp
            setTeam(temp)
            setTop({url: 'http://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/'+selectedChamp+'.png'})
        }
    }
    
    const changeJG = () => {
        if (selectedChamp !== null) {
            let temp = team
            team[JUNGLE] = selectedChamp
            setTeam(temp)
            setJungle({url: 'http://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/'+selectedChamp+'.png'})
        }
    }
    
    const changeMid = () => {
        if (selectedChamp !== null) {
            let temp = team
            team[MID] = selectedChamp
            setTeam(temp)
            setMid({url: 'http://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/'+selectedChamp+'.png'})
        }
    }
    
    const changeADC = () => {
        if (selectedChamp !== null) {
            let temp = team
            team[ADC] = selectedChamp
            setTeam(temp)
            setAdc({url: 'http://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/'+selectedChamp+'.png'})
        }
    }
    
    const changeSupport = () => {
        if (selectedChamp !== null) {
            let temp = team
            team[SUPPORT] = selectedChamp
            setTeam(temp)
            setSupport({url: 'http://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/'+selectedChamp+'.png'})
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
                        style={{height:50, width:50}}
                        onPress={changeTop}
                    >
                        <Image source={{uri: top.url}} style={{width:50, height:50}}/>
                    </TouchableHighlight>
                </View>

                <View>
                    <Text style={styles.position}> Jungle </Text>
                    <TouchableHighlight
                        style={{height:50, width:50}}
                        onPress={changeJG}
                    >
                        <Image source={{uri: jungle.url}} style={{width:50, height:50}}/>
                    </TouchableHighlight>
                </View>

                <View>
                    <Text style={styles.position}> Mid </Text>
                    <TouchableHighlight
                        style={{height:50, width:50}}
                        onPress={changeMid}
                    >
                        <Image source={{uri: mid.url}} style={{width:50, height:50}}/>
                    </TouchableHighlight>
                </View>

                <View>
                    <Text style={styles.position}> ADC </Text>
                    <TouchableHighlight
                        style={{height:50, width:50}}
                        onPress={changeADC}
                    >
                        <Image source={{uri: adc.url}} style={{width:50, height:50}}/>
                    </TouchableHighlight>
                </View>

                <View>
                    <Text style={styles.position}> Support </Text>
                    <TouchableHighlight
                        style={{height:50, width:50}}
                        onPress={changeSupport}
                    >
                        <Image source={{uri:support.url}} style={{width:50, height:50}}/>
                    </TouchableHighlight>
                </View>

                <TouchableOpacity 
                    style={styles.doneButton}
                    onPress={() => {
                        navigation.navigate({
                            name: 'Composition',
                            params: isBlue ?{blueTeam: team, redTeam: red} :{blueTeam: blue, redTeam: team},
                            merge: true,
                        });
                    }}>
                    <Text style={{fontWeight: 500, marginTop: 8}}>Done</Text>
                </TouchableOpacity>

            </View>

        
            <View style={{marginLeft: 48, marginTop: 40}}>
                <FlatList
                ListHeaderComponent={renderHeader} //search function
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