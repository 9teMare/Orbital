import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'

export default function lane({route}) {
    const TOP = 0, JUNGLE = 1, MID = 2, ADC = 3, SUPPORT = 4
    const {blue, red} = route.params

    return (
        <View style={{flexDirection:'column', minHeight:404}}>
            <View style={{backgroundColor:"white"}}>
                <Text style={styles.category}>
                    Win rate by position
                </Text>

                <View style={styles.positionRowContainer}>
                    <Image 
                        source={{uri: 'http://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/' + blue[TOP] + '.png'}}
                        style={styles.blueIcon} />

                    <Text style={styles.positionText}> TOP </Text>

                    <Image 
                        source={{uri: 'http://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/' + red[TOP] + '.png'}}
                        style={styles.redIcon} />
                </View>

                <View style={styles.positionRowContainer}>
                    <Image 
                        source={{uri: 'http://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/' + blue[JUNGLE] + '.png'}}
                        style={styles.blueIcon} />

                    <Text style={styles.positionText}> JUNGLE </Text>

                    <Image 
                        source={{uri: 'http://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/' + red[JUNGLE] + '.png'}}
                        style={styles.redIcon} />
                </View>

                <View style={styles.positionRowContainer}>
                    <Image 
                        source={{uri: 'http://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/' + blue[MID] + '.png'}}
                        style={styles.blueIcon} />

                    <Text style={styles.positionText}> MID </Text>

                    <Image 
                        source={{uri: 'http://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/' + red[MID] + '.png'}}
                        style={styles.redIcon} />
                </View>

                <View style={{flexDirection:'row', justifyContent:'space-between', marginStart:24, marginEnd:24, marginTop: 26, marginBottom:20}}>
                    <View>
                        <Image 
                            source={{uri: 'http://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/' + blue[ADC] + '.png'}}
                            style={styles.blueIcon} />
                        <Image 
                            source={{uri: 'http://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/' + blue[SUPPORT] + '.png'}}
                            style={styles.blueIcon} /> 
                    </View>
                    

                    <Text style={styles.positionText}> BOT </Text>

                    <View>
                        <Image 
                            source={{uri: 'http://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/' + red[ADC] + '.png'}}
                            style={styles.redIcon} />
                        <Image 
                            source={{uri: 'http://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/' + red[SUPPORT] + '.png'}}
                            style={styles.redIcon} />    
                    </View>
                </View>

            </View>

            <View style={{backgroundColor:"white", marginTop: 5}}>
                <Text style={styles.category}>
                    Win rate by jungle rotation
                </Text>


                <View style={styles.jgRowContainer}>
                    <Image 
                        source={{uri: 'http://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/' + blue[JUNGLE] + '.png'}}
                        style={styles.blueIcon}/>

                    <Text style={{fontWeight:'500'}}> vs </Text>


                    <Image 
                        source={{uri: 'http://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/' + red[JUNGLE] + '.png'}}
                        style={styles.redIcon}/>
                </View>

                <View style={{flexDirection:'row', justifyContent:'space-between', marginStart:26, marginEnd:26, marginTop:10}}>
                    <Text style={styles.jgPositionFont}>JG - TOP</Text>
                    <Text style={styles.jgPositionFont}>JG - MID</Text>
                    <Text style={styles.jgPositionFont}>JG - BOT</Text>
                </View>

                <View style={{flexDirection:'row', justifyContent:'space-between', marginStart:26, marginEnd:26, marginTop:10}}>
                    <Text> ??</Text> 
                    <Text> ??</Text> 
                    <Text> ??</Text> 
                </View>

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    blueIcon: {
        height: 50, width: 50, borderRadius: 50, borderColor: "#55B1CE", borderWidth: 2
    },
    redIcon: {
        height: 50, width: 50, borderRadius: 50, borderColor: "#DC5047", borderWidth: 2
    },
    positionText: {
        fontWeight: '500', flexDirection:'column', alignSelf:'center'
    },
    positionRowContainer: {
        flexDirection:'row', justifyContent:'space-between', marginStart:24, marginEnd:24, marginTop: 26
    },
    category: {
        fontSize: 18, fontWeight:'500', marginLeft:24, marginTop:10
    },
    jgRowContainer: {
        flexDirection:'row', justifyContent:'space-between', marginStart:109, marginEnd:109, marginTop:10
    },
    jgPositionFont: {
        fontSize: 24, fontWeight: '500'
    }
})