import React from 'react'
import { Image, Text, View, Button } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function Landing({navigation}) {
    return (
        <View style={{marginVertical: 200}}>
            
            <Image 
            source = {require('../../pictures/others/legendarily.png')}
            style = {{width: 400, height: 100, alignSelf: 'center'}}
            />

                <TouchableOpacity
                    onPress={() => navigation.navigate("Register")}
                    style = {{width: 380, height: 50, alignItems:'center', backgroundColor: "black", alignSelf:'center'}}>
                    <Text style={{color: "white", marginTop: 15}}>REGISTER</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate("Login")}
                    style = {{width: 380, height: 50, alignItems:'center', backgroundColor: "black", alignSelf:'center',
                        marginTop: 20}}>
                    <Text style={{color: "white", marginTop: 15}}>LOGIN</Text>
                </TouchableOpacity>

        </View>
    )
}
