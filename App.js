import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Firebase from './config/Firebase'
import firebase from 'firebase'

class App extends React.Component {
  signIn = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    Firebase.auth().signInWithPopup(provider);
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.signIn}>
        <Text>Sign In!</Text>
        </TouchableOpacity>
      </View>
    );
  } 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default App;