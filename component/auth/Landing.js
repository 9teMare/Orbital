import React from 'react'
import { Image, Text, View, StyleSheet, Button, Dimensions, TouchableOpacity} from 'react-native'
import { useFonts } from 'expo-font';

export default function Landing({navigation}) {
    const [loaded] = useFonts({
        Manticore: require('../../assets/font/Manticore.otf')
    });

    if (!loaded) {
        return null;
    }

    return (
        <View style={{backgroundColor: '#232323', height: height + 100, width: width}}>
                <View style={styles.landingView}>
                    <Text style={{fontFamily:'Manticore', fontSize: 50, alignSelf:'center', color: '#6BDB5A'}}>
                        LEGENDARILY
                    </Text>
                    
                    <View style={{marginTop: height/10}}>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={() => navigation.navigate("Register")}
                            style = {styles.button}>
                            <Text style={styles.buttonText}>REGISTER</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={0.5}
                            style = {styles.button}
                            onPress={() => navigation.navigate("Login")}
                        >
                            <Text style={styles.buttonText}>LOGIN</Text>
                        </TouchableOpacity>
                    </View>
                </View>
        </View>
        
    )
}

const {width, height} = Dimensions.get("window")

const styles = StyleSheet.create({
    landingView: {
        marginVertical: height/4,
        backgroundColor: '#232323'
    },
    buttonText: {
        color: "#6BDB5A", 
        marginTop: 15,
        fontWeight: 'bold'
    },
    button: {
        width: width/2, 
        height: 50, 
        backgroundColor: "#252525", 
        alignSelf:'center',
        alignItems: 'center',
        marginTop: 15,
        borderRadius: 10,
        elevation: 10
    }
})