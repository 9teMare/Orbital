import React, { Component } from 'react'
import { TouchableOpacity, StyleSheet, View, Button, TextInput, Text, Dimensions, Keyboard, TouchableWithoutFeedback} from 'react-native'
import firebase from 'firebase'

export class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
        }

        this.onSignIn = this.onSignIn.bind(this)
    }

    onSignIn() {
        const { email, password } = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((result) => {
            console.log(result)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    buttonPress() {
        this.onSignIn()
        Keyboard.dismiss()
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={{backgroundColor: '#232323', height: height + 100, width: width}}>
                    <Text style ={{fontSize: 40, fontWeight: 'bold', marginLeft: 10, marginTop: 80, alignSelf: 'center', color: 'grey'}}>
                        Greetings,
                    </Text>
                    <Text style ={{fontSize: 40, fontWeight: 'bold', marginLeft: 10, marginTop: 10, alignSelf: 'center', color: 'grey'}}>
                        Summoner !
                    </Text>

                    <View style={{marginTop: height/20}}>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            placeholderTextColor='grey'
                            onChangeText={(email) => this.setState({ email })}
                        />
                        <TextInput
                            style = {styles.input}
                            placeholder="Password"
                            placeholderTextColor='grey'
                            secureTextEntry={true}
                            onChangeText={(password) => this.setState({ password })}
                        />

                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={ () => this.buttonPress()}
                            style = {styles.button}>
                                <Text style={{color: "#6BDB5A", marginTop: 15, fontWeight: 'bold'}}> SIGN IN </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

const {width, height} = Dimensions.get("window")

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderBottomWidth: 1,
        width: '80%', 
        alignSelf: 'center',
        borderColor: 'grey',
        color: "grey"
    },
    button: {
        width: width - 100, 
        height: 50, 
        backgroundColor: "#252525", 
        alignSelf:'center',
        alignItems: 'center',
        marginTop: 30,
        borderRadius: 10,
        elevation: 10
    }
})

export default Login
