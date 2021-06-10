import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Image, FlatList, Button, TouchableOpacity } from 'react-native'



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
    const [position, setPosition] = useState(null);

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

    const emptySlot = require('../pictures/others/EmptyGrayRec.png')
    const bothSelected = position !== null && selectedChamp !== null;

    const imgSrc = bothSelected 
        ? require('../pictures/champions/' + selectedChamp + '.png')
        : emptySlot;

    return (
        <View>

            <View>
                <Text> Top </Text>
                <Image 
                    onPress={() => setPosition("Top")}
                    source= {imgSrc}
                    style={styles.image}
                />
            </View>
        
            <View style={{left:150, top:70}}>
                <FlatList
                numColumns={3}
                horizontal={false}
                data={champName}
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
    }

})

export default ChampSelect

