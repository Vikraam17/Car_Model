import React, { useState } from 'react';
import { View, Text,TextInput, TouchableOpacity, FlatList, StyleSheet, Alert, Modal } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import QRCode from 'react-native-qrcode-svg';

const carBrands = [
  { id: '1', name: 'Toyota', models: [
    { name: 'Camry', products: [{ name: 'Camry Tire', price: 25000, stock: 5 }, { name: 'Camry Engine', price: 50000, stock: 5 }, { name: 'Camry Seat', price: 30000, stock: 5 }] },
    { name: 'Corolla', products: [{ name: 'Corolla Tire', price: 22000, stock: 5 }, { name: 'Corolla Engine', price: 48000, stock: 5 }] },
    { name: 'RAV4', products: [{ name: 'RAV4 Tire', price: 27000, stock: 5 }, { name: 'RAV4 Engine', price: 52000, stock: 5 }] },
  ]},
  { id: '2', name: 'Honda', models: [
    { name: 'Civic', products: [{ name: 'Civic Tire', price: 24000, stock: 5 }, { name: 'Civic Engine', price: 49000, stock: 5 }] },
    { name: 'Accord', products: [{ name: 'Accord Tire', price: 26000, stock: 5 }, { name: 'Accord Engine', price: 53000, stock: 5 }] },
  ]},
  { id: '3', name: 'Ford', models: [
    { name: 'Mustang', products: [{ name: 'Mustang Tire', price: 30000, stock: 5 }, { name: 'Mustang Engine', price: 55000, stock: 5 }] },
    { name: 'F-150', products: [{ name: 'F-150 Tire', price: 32000, stock: 5 }, { name: 'F-150 Engine', price: 60000, stock: 5 }] },
  ]},
  { id: '4', name: 'Chevrolet', models: [
    { name: 'Camaro', products: [{ name: 'Camaro Tire', price: 31000, stock: 5 }, { name: 'Camaro Engine', price: 54000, stock: 5 }] },
    { name: 'Silverado', products: [{ name: 'Silverado Tire', price: 33000, stock: 5 }, { name: 'Silverado Engine', price: 61000, stock: 5 }] },
  ]},
  { id: '5', name: 'BMW', models: [
    { name: 'X5', products: [{ name: 'X5 Tire', price: 34000, stock: 5 }, { name: 'X5 Engine', price: 65000, stock: 5 }] },
    { name: '3 Series', products: [{ name: '3 Series Tire', price: 58000, stock: 5 }, { name: '3 Series Engine', price: 57000, stock: 5 }] },
  ]},
  { id: '6', name: 'Mercedes-Benz', models: [
    { name: 'C-Class', products: [{ name: 'C-Class Tire', price: 53000, stock: 5 }, { name: 'C-Class Engine', price: 59000, stock: 5 }] },
    { name: 'E-Class', products: [{ name: 'E-Class Tire', price: 53100, stock: 5 }, { name: 'E-Class Engine', price: 62000, stock: 5 }] },
  ]},
  { id: '7', name: 'Audi', models: [
    { name: 'A4', products: [{ name: 'A4 Tire', price: 52950, stock: 5 }, { name: 'A4 Engine', price: 58000, stock: 5 }] },
    { name: 'Q5', products: [{ name: 'Q5 Tire', price: 53200, stock: 5 }, { name: 'Q5 Engine', price: 64000, stock: 5 }] },
  ]},
  { id: '8', name: 'Hyundai', models: [
    { name: 'Elantra', products: [{ name: 'Elantra Tire', price: 52000, stock: 5 }, { name: 'Elantra Engine', price: 45000, stock: 5 }] },
    { name: 'Santa Fe', products: [{ name: 'Santa Fe Tire', price: 52700, stock: 5 }, { name: 'Santa Fe Engine', price: 50000, stock: 5 }] },
  ]},
  { id: '9', name: 'Nissan', models: [
    { name: 'Altima', products: [{ name: 'Altima Tire', price: 52500, stock: 5 }, { name: 'Altima Engine', price: 47000, stock: 5 }] },
    { name: 'Rogue', products: [{ name: 'Rogue Tire', price: 52750, stock: 5 }, { name: 'Rogue Engine', price: 51000, stock: 5 }] },
  ]},
  { id: '10', name: 'Volkswagen', models: [
    { name: 'Jetta', products: [{ name: 'Jetta Tire', price: 52400, stock: 5 }, { name: 'Jetta Engine', price: 49000, stock: 5 }] },
    { name: 'Golf', products: [{ name: 'Golf Tire', price: 52300, stock: 5 }, { name: 'Golf Engine', price: 47000, stock: 5 }] },
  ]},
];


export default function CarBrandSelectionPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [productFormVisible, setProductFormVisible] = useState(false);
  const [stockUpdateModalVisible, setStockUpdateModalVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [purchaseModalVisible, setPurchaseModalVisible] = useState(false); // Control hover page visibility
  const [purchasedItems, setPurchasedItems] = useState([]); // Store purchased items

  const handleLogin = () => {
    if (username === 'admin' && password === '12345678') {
      setIsLoggedIn(true);
      setLoginModalVisible(false);
      setSelectedBrand(null);
      setSelectedModel(null);
      setShowCart(false);
      Alert.alert('Welcome', `Hello, ${username}!`);
    } else {
      Alert.alert('Invalid Credentials', 'Please try again.');
      setUsername(''); // Clear the username field
      setPassword(''); // Clear the password field
    }
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    setSelectedBrand(null);
    setSelectedModel(null);
    setShowCart(false);
    setCart([]); // Clear the cart if needed
    Alert.alert('Logged Out', 'You have been successfully logged out.');
    setLoginModalVisible(false); // Close the modal
  };
  const renderLogin = () => (
    <View style={styles.logcontainer}>
      <Text style={styles.logtitle}>Login</Text>
      <TextInput
        placeholder="Username"
        placeholderTextColor="#666" // Darker placeholder color
        value={username}
        onChangeText={setUsername}
        style={styles.loginput}
      />
      <TextInput
          placeholder="Password"
          placeholderTextColor="#444"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword} // Toggle secureTextEntry based on showPassword
          style={styles.loginput}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Text style={styles.showPasswordText}>{showPassword ? 'Hide Password' : 'Show Password'}</Text>
        </TouchableOpacity>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.logbuttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );

  const calculateTotalPrice = () => cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleBackPress = () => {
    if (showCart) setShowCart(false);
    else if (selectedModel) setSelectedModel(null);
    else if (selectedBrand) setSelectedBrand(null);
  };
  const handleClose = () => {
    console.log("Closing Scan to Pay page");
    setPurchaseModalVisible(false);
  };

  const ModalStockUpdate = ({ visible, onClose, onUpdateStock }) => {
    const [productName, setProductName] = useState('');
    const [stockToAdd, setStockToAdd] = useState('');
  
    const handleSubmit = () => {
      if (!productName || !stockToAdd) {
        Alert.alert('Error', 'Please fill out all fields.');
        return;
      }
      
      const stockValue = parseInt(stockToAdd, 10);
      if (isNaN(stockValue) || stockValue <= 0) {
        Alert.alert('Invalid Stock', 'Please enter a valid stock quantity.');
        return;
      }
  
      onUpdateStock(productName, stockValue);
      onClose(); // Close modal after submission
    };
  
    return (
      <Modal visible={visible} animationType="slide" transparent={true}>
        <View style={styles.modalBackground1}>
          <View style={styles.modalContainer1}>
            <Text style={styles.title}>Update Product Stock</Text>
  
            <TextInput 
              style={styles.input1} 
              placeholder="Enter Product Name"
              placeholderTextColor="#888" 
              value={productName} 
              onChangeText={setProductName} 
            />
  
            <TextInput 
              style={styles.input1} 
              placeholder="Enter Stock Quantity"
              placeholderTextColor="#888" 
              value={stockToAdd} 
              onChangeText={setStockToAdd} 
              keyboardType="numeric" 
            />
  
            <TouchableOpacity onPress={handleSubmit}>
              <LinearGradient colors={['#28a745', '#218838']} style={styles.submitButton1}>
                <Text style={styles.submitButtonText1}>Submit</Text>
              </LinearGradient>
            </TouchableOpacity>
  
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButtonText1}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  const handleUpdateStock = (productName, stockToAdd) => {
  let productFound = false;

  carBrands.forEach((brand) => {
    brand.models.forEach((model) => {
      const product = model.products.find((item) => item.name === productName);
      if (product) {
        product.stock += stockToAdd;
        productFound = true;
        Alert.alert('Stock Updated', `${stockToAdd} units added to ${productName}.`);
      }
    });
  });

  if (!productFound) {
    Alert.alert('Product Not Found', `The product ${productName} does not exist.`);
  }
};


  const ModalProductForm = ({ visible, onClose }) => {
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
  
    const handleSubmit = () => {
      console.log({ brand, model, productName, price, stock });
      onClose(); // Close modal after submission
    };
  
    return (
      <Modal visible={visible} animationType="slide" transparent={true}>
        <View style={styles.modalBackground1}>
          <View style={styles.modalContainer1}>
            <Text style={styles.title}>Enter Product Details</Text>
            <TextInput style={styles.input1} placeholder="Enter Brand"
            placeholderTextColor="#888" value={brand} onChangeText={setBrand} />
            <TextInput style={styles.input1} placeholder="Enter Model"
            placeholderTextColor="#888" value={model} onChangeText={setModel} />
            <TextInput style={styles.input1} placeholder="Enter Product Name"
            placeholderTextColor="#888" value={productName} onChangeText={setProductName} />
            <TextInput style={styles.input1} placeholder="Enter Price"
            placeholderTextColor="#888" value={price} onChangeText={setPrice} keyboardType="numeric" />
            <TextInput style={styles.input1} placeholder="Enter Stock"
            placeholderTextColor="#888" value={stock} onChangeText={setStock} keyboardType="numeric" />
  
            <TouchableOpacity onPress={handleSubmit}>
            <LinearGradient colors={['#28a745', '#218838']} style={styles.submitButton1}>

                <Text style={styles.submitButtonText1}>Submit</Text>
              </LinearGradient>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButtonText1}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  const handleBrandPress = (brand) => setSelectedBrand(brand);
  const handleModelPress = (model) => setSelectedModel(model);

  const handleProductPress = (product) => {
    if (product.stock > 0) {
      setCart((prevCart) => {
        if (prevCart.some((item) => item.name === product.name)) {
          Alert.alert('Item Already in Cart', `${product.name} is already in your cart.`);
          return prevCart;
        } else {
          Alert.alert('Added to Cart', `${product.name} has been added to your cart.`);
          return [...prevCart, { name: product.name, price: product.price, quantity: 1 }];
        }
      });
      setSelectedModel(null);
      setSelectedBrand(null);
    } else {
      Alert.alert('Out of Stock', `${product.name} is out of stock.`);
    }
  };

  const handleIncrement = (productName) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        const product = carBrands.flatMap((brand) => brand.models.flatMap((model) => model.products)).find((p) => p.name === productName);
        if (item.name === productName && item.quantity < product.stock) {
          return { ...item, quantity: item.quantity + 1 };
        } else if (item.name === productName) {
          Alert.alert('Out of Stock', `Maximum stock available is ${product.stock}.`);
        }
        return item;
      })
    );
  };

  const handleDecrement = (productName) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => item.name === productName ? { ...item, quantity: item.quantity - 1 } : item)
        .filter((item) => item.quantity > 0)
    );
  };

  
    const handleBuyPress = () => {
  if (cart.length === 0) {
    Alert.alert('Cart Empty', 'Add some products to the cart before buying!');
    return;
  }

  const purchased = cart.map((item) => ({
    name: item.name,
    quantity: item.quantity,
    totalPrice: item.price * item.quantity,
  }));

  setPurchasedItems(purchased); // Set purchased items to display
  setPurchaseModalVisible(true); // Show the QR Code page
};
  

  const renderQRCodePage = () => (
    <View style={styles.qrContainer}>
      <Text style={styles.qrHeading}>Scan to Pay</Text>
      <QRCode
        value="https://openai.com/index/chatgpt/"
        size={200}
        color="#000"
        backgroundColor="#fff"
      />
      <TouchableOpacity
        style={styles.confirmButton}
        onPress={handleConfirmPurchase}>
        <Text style={styles.confirmButtonText}>Confirm</Text>
      </TouchableOpacity>
      <TouchableOpacity
  style={styles.closeButton2}
  onPress={() => setPurchaseModalVisible(false)}>
  <Text style={styles.closeButtonText2}>Cancel</Text>
</TouchableOpacity>
    </View>
  );
  const handleConfirmPurchase = () => {
    // Update stocks only after confirmation
    cart.forEach((cartItem) => {
      carBrands.forEach((brand) =>
        brand.models.forEach((model) =>
          model.products.forEach((product) => {
            if (product.name === cartItem.name) {
              product.stock -= cartItem.quantity; // Deduct stock
            }
          })
        )
      );
    });
  
    setCart([]); // Clear the cart
    setPurchaseModalVisible(false); // Close the QR Code page
    Alert.alert('Purchase Confirmed', 'Thank you for your purchase!');
  };
  

  const handlePayNow = () => {
    Alert.alert('Payment Initiated', 'Redirecting to the payment gateway...');
    // Logic to navigate to a payment gateway or perform an action
  };
  

  const handleMenuPress = () => setLoginModalVisible(true);
  const closeLoginModal = () => setLoginModalVisible(false);

  const renderHeader = () => showCart ? 'Proceed to Buy' : selectedModel ? 'Products' : selectedBrand ? 'Models' : 'Brands';

  const renderBrandItem = ({ item }) => (
    <TouchableOpacity style={styles.brandButton} onPress={() => handleBrandPress(item)}>
      <Text style={styles.brandText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderModelItem = ({ item }) => (
    <TouchableOpacity style={styles.modelButton} onPress={() => handleModelPress(item)}>
      <Text style={styles.modelText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderProductItem = ({ item }) => (
    <TouchableOpacity style={styles.productItem} onPress={() => handleProductPress(item)}>
      <Text style={styles.productText}>{item.name}</Text>
      <Text style={styles.productPrice}>{`₹${item.price}`}</Text>
      <Text style={styles.productStock}>{`Stock: ${item.stock}`}</Text>
    </TouchableOpacity>
  );

  const renderCart = () => (
    <View style={styles.cartContainer}>
      <Text style={styles.cartTitle}>Product List</Text>
      {cart.length === 0 ? (
        <Text style={styles.cartEmptyText}>Your cart is empty</Text>
      ) : (
        <FlatList
          data={cart}
          renderItem={({ item }) => (
            <View style={styles.cartItemContainer}>
              <Text style={styles.cartItem}>{item.name}</Text>
              <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={() => handleDecrement(item.name)}>
                  <Text style={styles.quantityButton}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{item.quantity}</Text>
                <TouchableOpacity onPress={() => handleIncrement(item.name)}>
                  <Text style={styles.quantityButton}>+</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.itemTotalPrice}>{`₹${item.price * item.quantity}`}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
      <TouchableOpacity style={styles.buyButton} onPress={handleBuyPress}>
        <Text style={styles.buyButtonText}>Buy Now - Total: ₹{calculateTotalPrice()}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    
    <View style={styles.container}>
      {!isLoggedIn ? (   
      renderLogin()
    ) : (
      <>
        <LinearGradient colors={['#6a11cb', '#2575fc']} style={styles.topHeader}>
          {(selectedBrand || selectedModel || showCart) && (
            <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
              <Text style={styles.backSymbol}>{'<'}</Text>
            </TouchableOpacity>
          )}
          <Text style={styles.headerText}>{renderHeader()}</Text>
            <TouchableOpacity style={styles.hamburgerButton} onPress={handleMenuPress}>
              <Text style={[styles.hamburgerLine, { marginBottom: -35 }]}>—</Text>
              <Text style={[styles.hamburgerLine, { marginBottom: -35 }]}>—</Text>
              <Text style={styles.hamburgerLine}>—</Text>
            </TouchableOpacity>
            
        </LinearGradient>
          <Modal animationType="slide" transparent={true} visible={loginModalVisible} onRequestClose={closeLoginModal}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Welcome!</Text>

                {/* Show Add Item button that opens ModalProductForm */}
                <TouchableOpacity style={styles.addItemButton} onPress={() => setStockUpdateModalVisible(true)}>
                  <Text style={styles.buttonText}>Add Stock</Text>
                </TouchableOpacity>


                <TouchableOpacity style={styles.addItemButton} onPress={() => setProductFormVisible(true)}>
                  <Text style={styles.buttonText}>Add Item</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.LogOutButton} onPress={handleLogout}>
                  <Text style={styles.buttonText}>Log Out</Text>
                </TouchableOpacity>

                {/* Close button to close the modal */}
                <TouchableOpacity onPress={closeLoginModal} style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          {productFormVisible && (
            <ModalProductForm
              visible={productFormVisible}
              onClose={() => setProductFormVisible(false)} // Close ModalProductForm
            />
          )}
          {stockUpdateModalVisible && (
            <ModalStockUpdate
              visible={stockUpdateModalVisible}
              onClose={() => setStockUpdateModalVisible(false)}
              onUpdateStock={handleUpdateStock}
           />
          )}
          

        {purchaseModalVisible ? (
          renderQRCodePage()
        ) : showCart ? (
          renderCart()
        ) : (
          <>
            {!selectedBrand && (
              <FlatList
                data={carBrands}
                renderItem={renderBrandItem}
                keyExtractor={(item) => item.id}
                style={styles.list}
              />
            )}
            {selectedBrand && !selectedModel && (
              <FlatList
                data={selectedBrand.models}
                renderItem={renderModelItem}
                keyExtractor={(item, index) => index.toString()}
                style={styles.list}
              />
            )}
            {selectedModel && (
              <FlatList
                data={selectedModel.products}
                renderItem={renderProductItem}
                keyExtractor={(item, index) => index.toString()}
                style={styles.list}
              />
            )}
            <TouchableOpacity style={styles.viewCartButton} onPress={() => setShowCart(true)}>
              <Text style={styles.viewCartButtonText}>View Cart</Text>
            </TouchableOpacity>
          </>
        )}
      </>
    )}
  </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1e', // Darker background color for comfort
  },
  topHeader: {
    paddingVertical: 25,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#2c2c2e', // Slightly lighter dark color
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  backButton: {
    padding: 8,
  },
  backSymbol: {
    fontSize: 24,
    color: '#b0b3b8', // Soft gray for eye comfort
    fontWeight: 'bold',
  },
  headerText: {
    fontSize: 26,
    fontWeight: '600',
    textAlign: 'center',
    color: '#e0e0e3', // Light gray to reduce strain
    flex: 1,
  },
  hamburgerButton: {
    position: 'absolute',
    right: 20,
    top: 30,
    padding: 5,
  },
  hamburgerLine: {
    fontSize: 22,
    color: '#b0b3b8',
  },
  brandButton: {
    backgroundColor: '#2c2c2e',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  brandText: {
    color: '#e0e0e3',
    fontSize: 18,
    fontWeight: '600',
  },
  modelButton: {
    backgroundColor: '#2c2c2e',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  modelText: {
    color: '#e0e0e3',
    fontSize: 18,
    fontWeight: '600',
  },
  productItem: {
    backgroundColor: '#2c2c2e',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  productText: {
    fontSize: 18,
    color: '#e0e0e3',
    fontWeight: '500',
  },
  productPrice: {
    fontSize: 16,
    color: '#d4d4d8',
    fontWeight: 'bold',
  },
  productStock: {
    fontSize: 14,
    color: '#8e8e93',
  },
  viewCartButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    margin: 15,
  },
  viewCartButtonText: {
    color: '#e0e0e3',
    fontSize: 18,
    fontWeight: '700',
  },
  cartContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1c1c1e',
  },
  cartTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#e0e0e3',
    marginBottom: 20,
  },
  cartEmptyText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#8e8e93',
    marginVertical: 20,
  },
  cartItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    paddingVertical: 10,
  },
  cartItem: {
    fontSize: 18,
    color: '#d4d4d8',
    flex: 1,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    fontSize: 24,
    color: '#5e9cf4', // Softer blue for comfort
    paddingHorizontal: 10,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#d4d4d8',
  },
  itemTotalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e0e0e3',
  },
  buyButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
  },
  buyButtonText: {
    color: '#f0f0f3',
    fontSize: 18,
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#2c2c2e',
    padding: 25,
    borderRadius: 15,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#e0e0e3',
    marginBottom: 20,
  },
  
  signupButton: {
    backgroundColor: '#28a745',
    padding: 12,
    borderRadius: 30,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#f0f0f3',
    fontSize: 16,
    fontWeight: '600',
  },
  closeButton: {
    marginTop: 15,
  },
  closeButtonText: {
    fontSize: 16,
    color: '#5e9cf4', // Muted blue for eye comfort
    fontWeight: '500',
  },
  logcontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1c1c1e',
  },
  logtitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#b0b3b8',
    marginBottom: 25,
  },
  loginput: {
    width: '100%',
    height: 55,
    borderColor: '#444',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#2c2c2e',
    color: '#e0e0e3',
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  loginButton: {
    backgroundColor: '#4285f4',
    paddingVertical: 14, 
    paddingHorizontal: 20,
    borderRadius: 30,
    marginVertical: 12,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
  },
  logbuttonText: {
    color: '#f0f0f3',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },

  addItemButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 8, 
    alignItems: 'center',
    marginTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3, 
    flexDirection: 'row', 
    justifyContent: 'center',
  },
  LogOutButton: {
    backgroundColor: '#E53935',
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 8, 
    alignItems: 'center',
    marginTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3, 
    flexDirection: 'row', 
    justifyContent: 'center',
  },
  addItemButtonText: {
    color: '#f0f0f3',
    fontSize: 18, 
    fontWeight: '600',
    letterSpacing: 0.5, 
  },
  modalBackground1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContainer1: {
    width: '90%',
    padding: 30,
    borderRadius: 25,
    backgroundColor: '#2c2c2e',
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 10 },
    borderColor: '#28a745',
    borderWidth: 2,
  },
  input1: {
    borderWidth: 1,
    borderColor: '#444',
    padding: 18,
    borderRadius: 15,
    marginBottom: 20,
    backgroundColor: '#2c2c2e',
    fontSize: 16,
    color: '#f0f0f3',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
    color: '#28a745',
    letterSpacing: 1,
  },
  submitButton1: {
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#218838',
    elevation: 5,
  },
  submitButtonText1: {
    color: '#f0f0f3',
    fontWeight: 'bold',
    fontSize: 18,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  closeButtonText1: {
    textAlign: 'center',
    color: '#f0f0f3',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10,
  },
  showPasswordText: {
    color: '#5e9cf4',
    fontSize: 14,
    marginLeft: 20,
  },
  qrContainer: {
    backgroundColor: '#f5f5f5', // Subtle light-gray background for contrast
    borderRadius: 20,
    padding: 20,
    elevation: 5, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    marginTop:80,
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrHeading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50', // Dark gray for contrast
    marginBottom: 20,
    textAlign: 'center',
  },
  qrCode: {
    padding: 20,
    backgroundColor: '#fff', // White background to emphasize the QR code
    borderRadius: 10,
    elevation: 10, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  qrText: {
    color: '#ffffff',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 15,
    opacity: 0.9,
    fontFamily: 'Helvetica Neue', // Consistent modern font
  },
  qrPaymentLink: {
    fontSize: 16,
    color: '#3498db', // Blue link color for visibility
    marginTop: 20,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  closeButton2: {
    marginTop: 20,
    backgroundColor: '#e74c3c', // Bold red for the close button
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 10,
    elevation: 5,
  },
  closeButtonText2: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  confirmButton: {
    marginTop: 30,
    backgroundColor: 'green', // Bold red for the close button
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    elevation: 5,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});
