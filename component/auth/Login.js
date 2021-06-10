import React, { Component } from 'react'
import { TouchableOpacity, StyleSheet, View, Button, TextInput, Text} from 'react-native'

import firebase from 'firebase'

export class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
        }

        this.onSignUp = this.onSignUp.bind(this)
    }

    onSignUp() {
        const { email, password } = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((result) => {
            console.log(result)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    render() {
        return (
            <View>
<<<<<<< Updated upstream

                <Text 
                    style ={{fontSize: 30, fontWeight: 'bold', marginLeft: 10, marginTop: 80, alignSelf: 'center'}}>
                GREETING, SUMMONERS!
                </Text>

            <View style={{marginTop: '20%'}}>
=======
<<<<<<< Updated upstream
>>>>>>> Stashed changes
                <TextInput
                    style={styles.input}
                    placeholder="email"
                    onChangeText={(email) => this.setState({ email })}
                />
                <TextInput
                    style = {styles.input}
                    placeholder="password"
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({ password })}
                />

                <TouchableOpacity
                    onPress={ () => this.onSignUp()}
<<<<<<< Updated upstream
                    style = {{width: 340, height: 50, alignItems:'center', backgroundColor: "black", alignSelf:'center',
                    marginTop: 20}}>
                        <Text style={{color: "white", marginTop: 15}}> SIGN IN </Text>

                </TouchableOpacity>
            </View>
=======
                    title="Sign In"
                />
=======

                <Text 
                    style ={{fontSize: 30, fontWeight: 'bold', marginLeft: 10, marginTop: 80, alignSelf: 'center'}}>
                    GREETING, SUMMONERS!
                </Text>

                <View style={{marginTop: '20%'}}>
                    <TextInput
                        style={styles.input}
                        placeholder="email"
                        onChangeText={(email) => this.setState({ email })}
                    />
                    <TextInput
                        style = {styles.input}
                        placeholder="password"
                        secureTextEntry={true}
                        onChangeText={(password) => this.setState({ password })}
                    />

                    <TouchableOpacity
                        onPress={ () => this.onSignUp()}
                        style = {{width: 340, height: 50, alignItems:'center', backgroundColor: "black", alignSelf:'center',
                        marginTop: 20}}>
                            <Text style={{color: "white", marginTop: 15}}> SIGN IN </Text>

                    </TouchableOpacity>
                </View>
>>>>>>> Stashed changes
>>>>>>> Stashed changes
            </View>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderBottomWidth: 1,
        width: '80%', 
        alignSelf: 'center'
    }
})

export default Login
