import React from 'react'
import {StyleSheet, View, Text, Button, Image, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import firebase from 'firebase'

function MyPage(props) {
    const { currentUser } = props;
    console.log({currentUser})
    const {navigate} = props.navigation

    const onLogout = () => {
        firebase.auth().signOut()
    }

    return (
        <View>

            <View style = {{flexDirection: 'row', flexWrap:'wrap'}}>

                <Image
                    source = {require('../../pictures/others/EmptyGrayRec.png')}
                    style = {{width: 100, height:100, borderRadius: 100, marginVertical: 30, marginHorizontal: 20}}
                />
                <View style ={{marginVertical: 55}}>
                    <Text style ={{ fontWeight: 'bold', fontSize: 28}}> 
                        {currentUser.name}
                    </Text>
                    <Text style ={{color:'gray'}}> 
                        {currentUser.email}
                    </Text>
                </View>

            </View>

            <TouchableOpacity
                onPress = {() => navigate("Settings")}
                style ={{height: 50}}
            >
                <Text style ={{marginLeft: 20, marginTop: 15, fontWeight: 'bold'}}> Settings </Text>

            </TouchableOpacity>




        <View style={styles.container}>
            <Button
                title="Logout"
                onPress={() => onLogout()}
            />
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 300
    },
    containerInfo: {
        margin: 20 
    }
})

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})

export default connect(mapStateToProps, null)(MyPage)