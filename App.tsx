/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';

import SignUp from './src/components/Models/SignUp'
import ModalProductForm from './src/components/Models/ModalProductForm';
import Model from './src/components/Models/Model';
import QRCodeScreen from './src/components/Models/qrlink';
import Home from './src/components/webthiran/Home';

const App=()=> {

  return (
    <SafeAreaView style={styles.root}>
      <Model/>
      {/* <QRCodeScreen/> */}
      {/* <Home/> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
   root:{
    flex:1,
    backgroundColor:'#F9FBFC',
   }
});


export default App;