import React, { useState, useEffect } from 'react';
import { View, Text, Button, PermissionsAndroid, Platform, Alert, FlatList, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import Contacts from 'react-native-contacts';
import DeviceInfo from 'react-native-device-info';
import NetInfo from '@react-native-community/netinfo';

const App = () => {
  const [location, setLocation] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [showContacts, setShowContacts] = useState(false);
  const [batteryLevel, setBatteryLevel] = useState(null);
  const [networkInfo, setNetworkInfo] = useState(null);
  const [deviceModel, setDeviceModel] = useState('');
  const [mobileDataStatus, setMobileDataStatus] = useState(false);
  const [wifiStatus, setWifiStatus] = useState(false);
  const [flightModeStatus, setFlightModeStatus] = useState(false);
  const permanentLocation = { latitude: 11.447674, longitude: 77.454854 };
  const proximityThreshold = 100; // Proximity threshold in meters

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      const locationGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      const contactsGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS
      );

      if (locationGranted === PermissionsAndroid.RESULTS.GRANTED) {
        getLocation();
      }
      if (contactsGranted === PermissionsAndroid.RESULTS.GRANTED) {
        getContacts();
      }
    } else {
      getLocation();
      getContacts();
    }
  };

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
      },
      (error) => {
        console.log(error.code, error.message);
        setLocation(permanentLocation); // Set to permanent location in case of an error
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const getContacts = () => {
    Contacts.getAll()
      .then((contacts) => {
        setContacts(contacts);
      })
      .catch((error) => {
        console.log('Failed to fetch contacts:', error);
      });
  };

  const markAttendance = () => {
    Alert.alert('Attendance', 'You have marked your attendance!');
  };

  const shareLocation = (phoneNumber) => {
    if (!location) {
      Alert.alert('Error', 'Location not available');
      return;
    }
    const message = `My location: https://www.google.com/maps?q=${location.latitude},${location.longitude}`;
    const url = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;
    Linking.openURL(url).catch((err) => {
      Alert.alert('Error', 'Failed to open SMS app');
      console.error("Couldn't open SMS app", err);
    });
  };

  const fetchDeviceAndNetworkInfo = async () => {
    // Battery level
    const battery = await DeviceInfo.getBatteryLevel();
    setBatteryLevel(Math.floor(battery * 100)); // Convert to percentage
    
    // Device model
    const model = DeviceInfo.getModel();
    setDeviceModel(model);

    // Flight mode status
    const isFlightMode = await DeviceInfo.isAirplaneMode();
    setFlightModeStatus(isFlightMode);

    // Network info (Wi-Fi, Mobile Data)
    NetInfo.fetch().then((state) => {
      setNetworkInfo(state);
      setMobileDataStatus(state.type === 'cellular');
      setWifiStatus(state.type === 'wifi');
    });
  };

  useEffect(() => {
    requestPermissions();
    fetchDeviceAndNetworkInfo();
  }, []);

  const isNearPermanentLocation =
    location &&
    calculateDistance(
      location.latitude,
      location.longitude,
      permanentLocation.latitude,
      permanentLocation.longitude
    ) <= proximityThreshold;

  return (
    <View style={styles.container}>
      {isNearPermanentLocation ? (
        <Button title="Mark Attendance" onPress={markAttendance} />
      ) : (
        <Text style={styles.text}>You are not at the location.</Text>
      )}

      <View style={styles.buttonSpacing} />

      <Button
        title="Share"
        onPress={() => setShowContacts((prev) => !prev)}
        disabled={!isNearPermanentLocation}
      />

      {showContacts && isNearPermanentLocation && (
        <>
          <FlatList
            data={contacts}
            keyExtractor={(item) => item.recordID}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.contactItem}
                onPress={() => shareLocation(item.phoneNumbers[0]?.number)}
              >
                <Text style={styles.text}>Name: {item.givenName} {item.familyName}</Text>
                {item.phoneNumbers.length > 0 && (
                  <Text style={styles.text}>Phone: {item.phoneNumbers[0].number}</Text>
                )}
              </TouchableOpacity>
            )}
          />
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>OS Version: {Platform.OS} {Platform.Version}</Text>
            <Text style={styles.infoText}>Device Model: {deviceModel}</Text>
            <Text style={styles.infoText}>Battery Level: {batteryLevel}%</Text>
            <Text style={styles.infoText}>Network: {networkInfo?.type} {networkInfo?.isConnected ? '(Connected)' : '(Not Connected)'}</Text>
            <Text style={styles.infoText}>Wi-Fi Status: {wifiStatus ? 'Connected' : 'Not Connected'}</Text>
            <Text style={styles.infoText}>Mobile Data Status: {mobileDataStatus ? 'Active' : 'Inactive'}</Text>
            <Text style={styles.infoText}>Flight Mode: {flightModeStatus ? 'Enabled' : 'Disabled'}</Text>
          </View>
        </>
      )}
    </View>
  );
};

// Function to calculate distance between two latitude/longitude points in meters
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371e3; // Radius of Earth in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in meters
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  text: {
    color: 'black',
    fontSize: 16,
    marginBottom: 4,
  },
  buttonSpacing: {
    marginTop: 10,
  },
  contactItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    width: '100%',
  },
  infoContainer: {
    marginTop: 20,
    padding: 10,
  },
  infoText: {
    fontSize: 14,
    color: 'grey',
    marginVertical: 2,
  },
});

export default App;
 