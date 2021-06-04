import React, { useState } from 'react'
import {StyleSheet, View, Text, Button} from 'react-native'
import {connect} from 'react-redux'
import firebase from 'firebase'

function MyPage(props) {
    const { currentUser } = props;
    console.log({currentUser})

    const onLogout = () => {
        firebase.auth().signOut()
    }

    return (
        <View style={styles.container}>
            <View style={styles.containerInfo}>
                <Text> {currentUser.name} </Text>
                <Text> {currentUser.email} </Text>
            </View>
            <Button
                title="Logout"
                onPress={() => onLogout()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 40
    },
    containerInfo: {
        margin: 20 
    }
})

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})

export default connect(mapStateToProps, null)(MyPage)