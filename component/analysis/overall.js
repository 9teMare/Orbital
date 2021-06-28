import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'

export default function lane() {
    return (
        <View style={{flexDirection:'column'}}>
            <View style={{backgroundColor:"white"}}>
                <Text style={styles.category}> Win rate by game stage</Text>

            </View>


            <View style={{backgroundColor:"white"}}>
                <Text style={styles.category}> OVERALL </Text>

            </View>

        </View>
    )
}


const styles = StyleSheet.create({
    category: {
        fontSize: 18, fontWeight:'500', marginLeft:24, marginTop:10
    }
})