import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const QRCodeScreen = () => {
  const QRLink = "https://www.thiran360ai.com/";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PAY NOW</Text>
      <View style={styles.qrContainer}>
        <QRCode
          value={QRLink}
          size={250}
          logoSize={30}
          logoBackgroundColor="transparent"
        />
      </View>
      <Text style={styles.qrText}>Scan the QR code to make your payment</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6a11cb', // Soft gradient background from purple to blue
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 30,
    letterSpacing: 1.5,
    textAlign: 'center',
    fontFamily: 'Helvetica Neue', // Clean, modern font
    textShadowColor: '#000000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  qrContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    elevation: 5, // Soft shadow for Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrCode: {
    shadowColor: '#00ff00',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  qrText: {
    color: '#ffffff',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 15,
    opacity: 0.9,
    fontFamily: 'Helvetica Neue', // Same modern font as the title
  }
});

export default QRCodeScreen;
