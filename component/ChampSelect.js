import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Image, FlatList, TouchableOpacity, TouchableHighlight, TextInput, Dimensions } from 'react-native'
import filter from 'lodash.filter';



function ChampSelect({navigation, route}) {

    const [query, setQuery] = useState('');
    const [fullData, setFullData] = useState([]);
    const [data, setData] = useState([])

    const TOP = 0, JUNGLE = 1, MID = 2, ADC = 3, SUPPORT = 4

    useEffect(() => {
        let isMounted = true
        fetch('http://ddragon.leagueoflegends.com/cdn/11.12.1/data/en_US/champion.json')
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

    const [selectedChamp, setSelectedChamp] = useState(null);
    const emptySlot = require('../pictures/others/EmptyGrayRec.png')

    const {blue, red, isBlue} = route.params
    const arrUsed = isBlue ?blue :red
    const [team, setTeam] = useState(arrUsed)
        
    const [top, setTop] = arrUsed[TOP] === null
        ?useState(emptySlot) :useState({uri: 'http://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/'+arrUsed[TOP]+'.png'})
    const [jungle, setJungle] = arrUsed[JUNGLE] === null
        ?useState(emptySlot) :useState({uri: 'http://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/'+arrUsed[JUNGLE]+'.png'})
    const [mid, setMid] = arrUsed[MID] === null
        ?useState(emptySlot) :useState({uri: 'http://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/'+arrUsed[MID]+'.png'})
    const [adc, setAdc] = arrUsed[ADC] === null
        ?useState(emptySlot) :useState({uri: 'http://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/'+arrUsed[ADC]+'.png'})
    const [support, setSupport] = arrUsed[SUPPORT] === null
        ?useState(emptySlot) :useState({uri: 'http://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/'+arrUsed[SUPPORT]+'.png'})


    

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
            setTop({uri: 'http://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/'+selectedChamp+'.png'})
        }
    }
    
    const changeJG = () => {
        if (selectedChamp !== null) {
            let temp = team
            team[JUNGLE] = selectedChamp
            setTeam(temp)
            setJungle({uri: 'http://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/'+selectedChamp+'.png'})
        }
    }
    
    const changeMid = () => {
        if (selectedChamp !== null) {
            let temp = team
            team[MID] = selectedChamp
            setTeam(temp)
            setMid({uri: 'http://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/'+selectedChamp+'.png'})
        }
    }
    
    const changeADC = () => {
        if (selectedChamp !== null) {
            let temp = team
            team[ADC] = selectedChamp
            setTeam(temp)
            setAdc({uri: 'http://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/'+selectedChamp+'.png'})
        }
    }
    
    const changeSupport = () => {
        if (selectedChamp !== null) {
            let temp = team
            team[SUPPORT] = selectedChamp
            setTeam(temp)
            setSupport({uri: 'http://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/'+selectedChamp+'.png'})
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

    const getItemLayout = (data, index) => (
        {length: width/6, offset: width/6 * index, index}
    )
    
    return ( 
        <View style={{flexDirection: 'row', justifyContent:"space-evenly", alignSelf: 'center'}}>

            <View style={{justifyContent:'space-evenly', width: 60, height: 500, marginTop: height/10, marginRight: width/40}} >

                <View>
                    <Text style={styles.position}> Top </Text>

                    <TouchableHighlight
                        style={{height: width/6, width: width/6, alignSelf: 'center'}}
                        onPress={changeTop}
                    >
                        <Image source={top} style={{width: width/6, height: width/6}}/>
                    </TouchableHighlight>
                </View>

                <View>
                    <Text style={styles.position}> Jungle </Text>
                    <TouchableHighlight
                        style={{height: width/6, width: width/6, alignSelf: 'center'}}
                        onPress={changeJG}
                    >
                        <Image source={jungle} style={{width: width/6, height: width/6}}/>
                    </TouchableHighlight>
                </View>

                <View>
                    <Text style={styles.position}> Mid </Text>
                    <TouchableHighlight
                        style={{height: width/6, width: width/6, alignSelf: 'center'}}
                        onPress={changeMid}
                    >
                        <Image source={mid} style={{width: width/6, height: width/6}}/>
                    </TouchableHighlight>
                </View>

                <View>
                    <Text style={styles.position}> ADC </Text>
                    <TouchableHighlight
                        style={{height: width/6, width: width/6, alignSelf: 'center'}}
                        onPress={changeADC}
                    >
                        <Image source={adc} style={{width: width/6, height: width/6}}/>
                    </TouchableHighlight>
                </View>

                <View>
                    <Text style={styles.position}> Support </Text>
                    <TouchableHighlight
                        style={{height: width/6, width: width/6, alignSelf: 'center'}}
                        onPress={changeSupport}
                    >
                        <Image source={support} style={{width: width/6, height: width/6}}/>
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
                    <Text style={{fontWeight: "500", marginTop: 5}}>Done</Text>
                </TouchableOpacity>
            </View>

        
            <View style={{marginTop: 10}}>
                <FlatList
                    ListHeaderComponent={renderHeader} //search function
                    numColumns={3}
                    horizontal={false}
                    data={data}
                    extraData={selectedChamp}
                    renderItem={renderItem}
                    initialNumToRender={10}
                    keyExtractor={item => item}
                    maxToRenderPerBatch={10}
                    getItemLayout={getItemLayout}
                />
            </View>

        </View>
    )
    
}

const {width, height} = Dimensions.get("window")

const styles = StyleSheet.create({
    image: {
        width: width/6, height: width/6, marginTop:20, marginLeft:20,borderWidth:2
    },
    title: {
        fontSize:12, alignSelf: 'center', marginLeft: 20
    },
    imageSelected: {
        width: width/6, height: width/6, marginTop:20, marginLeft:20, borderRadius:3, borderColor:'green'
    },
    position: {
        fontSize:15, fontWeight:'500', alignSelf: 'center', marginTop: 50, marginBottom: 3
    },
    doneButton: {
        height: width/12, width: width/6, backgroundColor: 'white', borderRadius: 5, alignItems: 'center', marginTop: 80, elevation: 2
    }

})

export default ChampSelect