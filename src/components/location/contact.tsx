import React, { useEffect } from 'react';
import { View, Button, Alert } from 'react-native';
import { PermissionsAndroid, Platform } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const App = () => {
  useEffect(() => {
    requestContactPermission();
  }, []);

  const requestContactPermission = async () => {
    try {
      const result = Platform.OS === 'ios' 
        ? await request(PERMISSIONS.IOS.CONTACTS) 
        : await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS);

      if (result === RESULTS.GRANTED) {
        Alert.alert('Permission granted', 'You can now access contacts.');
      } else {
        Alert.alert('Permission denied', 'You cannot access contacts.');
      }
    } catch (error) {
      console.error('Permission error: ', error);
    }
  };

  return (
    <View>
      <Button title="Request Contacts Permission" onPress={requestContactPermission} />
    </View>
  );
};


export default App;
