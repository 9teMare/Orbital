import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Dimensions} from 'react-native'
import firebase from 'firebase'

export default function Settings(props) {
    const { currentUser } = props;
    const {navigate} = props.navigation

    const onLogout = () => {
        firebase.auth().signOut()
    }
   
    return (
        <View>
            <View style={{backgroundColor:'white'}}> 
                <Text> MY RIOT ACCOUNT </Text>
            </View>
            <TouchableOpacity style={styles.feedback} onPress={() => {navigate("Feedback")}}>
                <Text style={styles.buttonText}>Feedback</Text>
            </TouchableOpacity>

            <View style={{marginTop:40}}>
                <TouchableOpacity
                    style = {styles.logout}
                    onPress={() => onLogout()}>
                    <Text style={{color: "black", marginTop: 15, fontWeight: 'bold', fontSize: 15}}>Log out</Text>
                </TouchableOpacity>
            </View>
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
        fontWeight: 'bold',
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 15,
        flexDirection: 'column'
    },
    logout:{
        width:237, 
        height:50, 
        marginTop: height / 1.8, 
        backgroundColor: 'white', 
        alignItems: 'center', 
        alignSelf: 'center',
        borderRadius: 5,
        elevation: 2,
        flexDirection: 'column'
    }
})