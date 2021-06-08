import React, { Component } from 'react'
import { View, TouchableOpacity, TextInput, Text, StyleSheet} from 'react-native'

import firebase from 'firebase'

export class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            name: ''
        }

        this.onSignUp = this.onSignUp.bind(this)
    }

    onSignUp() {
        const { email, password, name } = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((result) => {
            firebase.firestore().collection("users")
            .doc(firebase.auth().currentUser.uid)
            .set({
                name,
                email
            })
            console.log(result)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    render() {
        return (
            <View style ={{marginTop: 120}}>


                <TextInput
                    style={styles.input}
                    placeholder="name"
                    onChangeText={(name) => this.setState({ name })}
                />


                <TextInput
                    style={styles.input}
                    placeholder="email"
                    onChangeText={(email) => this.setState({ email })}
                />

                <TextInput
                    style={styles.input}
                    placeholder="password"
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({ password })}
                />

                <TouchableOpacity
                    onPress={ () => this.onSignUp()}
                    style = {{width: 340, height: 50, alignItems:'center', backgroundColor: "black", alignSelf:'center',
                    marginTop: 20}}>
                        <Text style={{color: "white", marginTop: 15}}>SIGN UP</Text>

                </TouchableOpacity>
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

export default Register
