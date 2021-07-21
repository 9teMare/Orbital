import React from 'react'
import {Text, View, StyleSheet, Image, Dimensions} from 'react-native'

export default function Mechanism() {
    return (
        <View>
            <Text style={styles.text}>
                There isn't any mechanism updates for this patch
            </Text>
        </View>
    )
}

const {width, height} = Dimensions.get("window")

const styles = StyleSheet.create({
    text: {
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: height / 3,
        marginLeft: 10,
        marginRight: 10,
        color: 'grey',
        alignSelf: 'center'
    }
})