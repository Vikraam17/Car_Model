import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importing images for the home screen
const thiranLogo = require('./../../src/assets/thiran.png'); // Make sure the path is correct
const eeGif = require('./../../src/assets/ee.gif'); // Make sure the path is correct

// Define the Login and Home screens
const LoginScreen = ({ navigation }: { navigation: any }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false); // State to toggle password visibility

  const handleLogin = () => {
    if (username === 'admin' && password === 'password') {
      navigation.navigate('Home'); // Navigate to Home screen after login
    } else {
      Alert.alert('Invalid Credentials', 'Please enter valid admin credentials.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle the password visibility state
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#A3B0C1"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#A3B0C1"
        secureTextEntry={!showPassword} // Toggle between hidden and visible password
        value={password}
        onChangeText={setPassword}
      />
      {/* Toggle button to show/hide password */}
      <TouchableOpacity onPress={togglePasswordVisibility}>
        <Text style={styles.toggleText}>
          {showPassword ? 'Hide Password' : 'Show Password'}
        </Text>
      </TouchableOpacity>
      <Button title="Login" onPress={handleLogin} color="#f5b7b1" />
    </View>
  );
};

const HomeScreen = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.container}>
      {/* Thiran Logo */}
      <Image source={thiranLogo} style={styles.logo} />

      {/* Text Message */}
      <Text style={styles.contentText}>
        A Global Software powerhouse where innovation meets excellence
      </Text>

      {/* GIF */}
      <Image source={eeGif} style={styles.gif} />

      {/* Logout Button */}
      <Button title="Logout" onPress={() => navigation.navigate('Login')} color="#f5b7b1" />
    </View>
  );
};

// Set up Stack Navigator
const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8F6F3',
    padding: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    color: '#2E4053',
    marginBottom: 30,
  },
  input: {
    height: 45,
    width: '100%',
    borderColor: '#D5DBDB',
    borderWidth: 1,
    borderRadius: 25,
    paddingLeft: 15,
    marginBottom: 20,
    backgroundColor: '#ffffff',
    color: '#000000', // Text color for password field
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: '500',
    color: '#2E4053',
    marginBottom: 20,
  },
  toggleText: {
    color: '#2E4053',
    marginBottom: 20,
    textDecorationLine: 'underline',
  },
  // Home screen styles
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  contentText: {
    fontSize: 22,
    fontWeight: '500',
    color: '#2E4053',
    marginBottom: 20,
    textAlign: 'center',
  },
  gif: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

export default App;