// ModalProductForm.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; // You need to install this library

const ModalProductForm = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');

  const handleSubmit = () => {
    // Submit product data
    console.log({ brand, model, productName, price, stock });
    setModalVisible(false); // Close modal after submission
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.button}>
          <Text style={styles.buttonText}>Add New Product</Text>
        </LinearGradient>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.title}>Enter Product Details</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Brand"
              placeholderTextColor="#888"
              value={brand}
              onChangeText={setBrand}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Model"
              placeholderTextColor="#888"
              value={model}
              onChangeText={setModel}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Product Name"
              placeholderTextColor="#888"
              value={productName}
              onChangeText={setProductName}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Price"
              placeholderTextColor="#888"
              value={price}
              onChangeText={setPrice}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Stock"
              placeholderTextColor="#888"
              value={stock}
              onChangeText={setStock}
              keyboardType="numeric"
            />

            <TouchableOpacity onPress={handleSubmit}>
              <LinearGradient colors={['#ff7e5f', '#feb47b']} style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Submit</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#eafaf1', // Light greenish background for a fresh look
  },
  button: {
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    elevation: 5,
    backgroundColor: '#28a745', // Green button for a vibrant accent
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    textTransform: 'uppercase',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Dark background to contrast with the green
  },
  modalContainer: {
    width: '90%',
    padding: 30,
    borderRadius: 25,
    backgroundColor: '#fff',
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 10 },
    borderColor: '#28a745', // Border matching the green theme
    borderWidth: 1,
    position: 'relative',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
    color: '#2d6a4f', // Darker green for text color
    letterSpacing: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    fontSize: 16,
    color: '#2d6a4f', // Dark green for input text
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 5 },
  },
  submitButton: {
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#218838', // A darker green for submit button
    elevation: 5,
    shadowColor: '#218838',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  closeButtonText: {
    textAlign: 'center',
    color: '#c82333', // A contrasting color for the close button
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10,
    textDecorationLine: 'underline',
  },
});



export default ModalProductForm;
