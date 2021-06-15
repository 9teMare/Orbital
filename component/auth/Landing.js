import React from 'react'
import { Image, Text, View, Button } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function Landing({navigation}) {
    return (
        <View style={{marginVertical: 200}}>

            <Text style={{fontFamily:'manticore', fontSize: 50, alignSelf:'center'}}>
                LEGENDARILY
            </Text>

            <View style ={{marginTop:30}}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Register")}
                    style = {{width: 380, height: 50, alignItems:'center', backgroundColor: "black", alignSelf:'center',}}>
                    <Text style={{color: "white", marginTop: 15}}>REGISTER</Text>
                </TouchableOpacity>

            </View>

            <View style={{marginTop: 40}}>
                <TouchableOpacity
                    style = {{width: 380, height: 50, alignItems:'center', backgroundColor: "black", alignSelf:'center',}}
                    onPress={() => navigation.navigate("Login")}
                >
                    <Text style={{color: "white", marginTop: 15}}>LOGIN</Text>
                </TouchableOpacity>

            </View>

                

                

        </View>
    )
}
