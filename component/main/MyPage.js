import React, { useState } from 'react'
import {StyleSheet, View, Text, Button, Switch} from 'react-native'
import {connect} from 'react-redux'
import firebase from 'firebase'

function MyPage(props) {
    const { currentUser } = props;
    console.log({currentUser})

    const onLogout = () => {
        firebase.auth().signOut()
    }

    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const toggleSwitch = () => setIsDarkTheme(previousState => !previousState);

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
            <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isDarkTheme ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isDarkTheme}
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