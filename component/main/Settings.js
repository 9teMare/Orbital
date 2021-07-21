import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Dimensions} from 'react-native'

export default function Settings(props) {
    const { currentUser } = props;
    const {navigate} = props.navigation
   
    return (
        <View>
            <View style={{backgroundColor:'white'}}> 
                <Text> MY RIOT ACCOUNT </Text>
            </View>
            <TouchableOpacity style={styles.feedback} onPress={() => {navigate("Feedback")}}>
                <Text style={styles.buttonText}>Feedback</Text>
            </TouchableOpacity>
        </View>
        
    )
}

const {width, height} = Dimensions.get("window")

const styles = StyleSheet.create({
    feedback:{
        width:237, 
        height:50, 
        marginTop:40, 
        backgroundColor: 'white', 
        alignItems: 'center', 
        alignSelf: 'center',
        borderRadius: 5,
        elevation: 2,
        flexDirection: 'column'
    },
    buttonText: {
        fontSize: 15,
        fontWeight: '500',
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 15,
        flexDirection: 'column'
    }
})