import React, {useState} from 'react'
import {Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native'

export default function MetaOverall({navigation}) {
    const latestMetaNAUrl = 'https://ddragon.leagueoflegends.com/realms/na.json';
    const [meta, setMeta] = useState('');

    const getMeta = () => {
        fetch(latestMetaNAUrl)
        .then(response => response.json())
        .then(response => {
            setMeta(response.dd)
        })
        .catch(err => {
            console.log(err)
        })
    }
    
    return (
        <View>
            <Text style={{fontSize:18, fontWeight:'500', color:'#55BA46', marginLeft: 15, marginTop:10}}> 
                {getMeta()}
                Current Meta: Patch {meta} 
            </Text>

            {/* 1st Row */}
            <View style={{flexDirection: 'row', justifyContent:'space-evenly', marginTop: 20}}>
                <View>
                    <TouchableOpacity
                        style ={styles.button}
                        onPress ={() => navigation.navigate("Champion")}>
                            <Image
                                source={require('../../../pictures/others/meta-Champion-light.png')}
                                style={{height:50, width:45.53, alignSelf:'center'}}
                            /> 
                    </TouchableOpacity>
                    <Text style= {styles.buttonTitle}> Champion </Text>
                </View>

                <View>
                    <TouchableOpacity
                        style ={styles.button}
                        onPress ={() => navigation.navigate("Skin")}>
                            <Image
                                source={require('../../../pictures/others/meta-Skin-light.png')}
                                style={{height:50, width:48.01, alignSelf:'center'}}
                            /> 
                    </TouchableOpacity>
                    <Text style= {styles.buttonTitle}> Skins </Text>
                </View>

                <View>
                    <TouchableOpacity
                        style ={styles.button}
                        onPress ={() => navigation.navigate("Item")}>
                            <Image
                                source={require('../../../pictures/others/meta-Vector-light.png')}
                                style={{height:40.17, width:41.37, alignSelf:'center'}}
                            /> 
                    </TouchableOpacity>
                    <Text style= {styles.buttonTitle}> Items </Text>
                </View>
            </View>

            {/* 2nd Row */}
            <View style={{flexDirection: 'row', justifyContent:'space-evenly', marginTop: 20}}>
                <View>
                    <TouchableOpacity
                        style ={styles.button}
                        onPress ={() => navigation.navigate("Rune")}>
                            <Image
                                source={require('../../../pictures/others/meta-Rune-light.png')}
                                style={{height:50, width:55.24, alignSelf:'center'}}
                            /> 
                    </TouchableOpacity>
                    <Text style= {styles.buttonTitle}> Runes </Text>
                </View>

                <View>
                    <TouchableOpacity
                        style ={styles.button}
                        onPress ={() => navigation.navigate("Mechanism")}>
                            <Image
                                source={require('../../../pictures/others/meta-mechanism-light.png')}
                                style={{height:50, width:50, alignSelf:'center'}}
                            /> 
                    </TouchableOpacity>
                    <Text style= {styles.buttonTitle}> Mechanism </Text>
                </View>

                <View>
                    <TouchableOpacity
                        style ={styles.button}
                        onPress ={() => navigation.navigate("System")}>
                            <Image
                                source={require('../../../pictures/others/meta-system-light.png')}
                                style={{height:50, width:50, alignSelf:'center'}}
                            /> 
                    </TouchableOpacity>
                    <Text style= {styles.buttonTitle}> System </Text>
                </View>
            </View>



        </View>
    )
    // return (
    //     <View>
    //         <Text>test</Text>
    //     </View>
    // )
}

const styles = StyleSheet.create({
    button: {
        height: 105, width: 105, backgroundColor: 'white', justifyContent:'center', 
        shadowRadius:5, shadowOffset:{width:-6, height:6}, shadowOpacity:0.2, shadowColor: '#000000',
        elevation: 5
    },
    buttonTitle: {
        fontSize: 18, fontWeight:'500', color: '#55BA46', alignSelf:'center', marginTop:5, elevation: 5
    }
})
