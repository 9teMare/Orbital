import React, { Component } from 'react'
import { StyleSheet, View, Text, Button} from 'react-native'

const styles = StyleSheet.create({
    titleText: {
        fontSize: 20,
        marginTop: 40,
        fontWeight: "bold"
    },
    blueText: {
        fontSize: 16, 
        color: 'blue'
    },
    redText: {
        fontSize: 16, 
        color: 'red'
    }
})

export default function Composition({navigation}) {
    return (
        <View >
            <Text style={styles.titleText}> Team Composition Analysis </Text>
            <Text style={styles.blueText}> Blue Team </Text>
            <Text> Tap to select </Text>
            <Text style={styles.redText}> Red Team </Text>
            <Text> Tap to select </Text>

            <Button
                title="Start analysis"
                onPress={() => navigation.navigate("Analysis")}/>
        </View>
    )
}