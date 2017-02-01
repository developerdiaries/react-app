/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

export default class cameratest extends Component {

  uploadData=()=>{
    let form_data= new FormData();
    let video = {
      uri:  `file:///storage/emulated/0/DCIM/VID_20170201_162817.mp4`,
      type: 'video/mp4',
      name: 'myvideo.mp4'
    }
    form_data.append('video',video);
    console.log('video');
    let url = `http://transitapi.sia.co.in/case/panic/`;
    fetch(url,{
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer '+'rashmimaulekhi'
      },
      body: form_data
    }).then((res)=>{
      console.log('still video');
      if(res.status==201){
        console.log('response status of upload: ',res.status);
      }
      else{
          console.log('response status of upload: ',res.status);
      }
    }).done();
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <TouchableOpacity onPress={this.uploadData()}>
          <Text>
            Click me
          </Text>
        </TouchableOpacity>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('cameratest', () => cameratest);
