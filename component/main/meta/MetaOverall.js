import React from 'react'
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native'

export default function MetaOverall({navigation}) {
    return (
        <View>
            <Text> Current Meta: Patch 11.10 </Text>

            {/* 1st Row */}
            <View style={{flexDirection: 'row', justifyContent:'space-evenly', marginTop: 20}}>
                <View>
                    <TouchableOpacity
                        style ={styles.button}
                        onPress ={() => navigation.navigate("Champion")}>
                    </TouchableOpacity>
                    <Text style= {{alignSelf:'center'}}> Champion </Text>
                </View>

                <View>
                    <TouchableOpacity
                        style ={styles.button}
                        onPress ={() => navigation.navigate("Skin")}>

                    </TouchableOpacity>
                    <Text style= {{alignSelf:'center'}}> Skins </Text>
                </View>

                <View>
                    <TouchableOpacity
                        style ={styles.button}
                        onPress ={() => navigation.navigate("Item")}>

                    </TouchableOpacity>
                    <Text style= {{alignSelf:'center'}}> Items </Text>
                </View>
            </View>

            {/* 2nd Row */}
            <View style={{flexDirection: 'row', justifyContent:'space-evenly', marginTop: 20}}>
                <View>
                    <TouchableOpacity
                        style ={styles.button}
                        onPress ={() => navigation.navigate("Rune")}>
                    </TouchableOpacity>
                    <Text style= {{alignSelf:'center'}}> Runes </Text>
                </View>

                <View>
                    <TouchableOpacity
                        style ={styles.button}
                        onPress ={() => navigation.navigate("Mechanism")}>

                    </TouchableOpacity>
                    <Text style= {{alignSelf:'center'}}> Mechanism </Text>
                </View>

                <View>
                    <TouchableOpacity
                        style ={styles.button}
                        onPress ={() => navigation.navigate("System")}>

                    </TouchableOpacity>
                    <Text style= {{alignSelf:'center'}}> System </Text>
                </View>
            </View>



        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        height: 105, width: 105, backgroundColor: 'white'
    }
})
