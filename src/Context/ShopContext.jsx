import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ShopContext = createContext();

const ShopProvider = ({ children }) => {
  const [cartData, setCartData] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
  const [user, setUser] = useState({});

  useEffect(() => {
    console.log('ShopProvider mounted');


    // Fetch User Data
    const fetchUserData = async () => {
      try {
        console.log('Fetching user data...');
        const response = await axios.get('http://192.168.1.109:3000/api/user/profile', {
          withCredentials: true, // Send HTTP-only cookies automatically
        });
        console.log('User data fetched:', response.data);
        setUser(response.data); // Update user state with the response data
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    

    // Fetch Cart Data
    const fetchCartData = async () => {
      try {
        console.log('Fetching cart data...');
        const response = await axios.get('http://192.168.1.109:3000/api/cart/getcart', {
          withCredentials: true, // Send HTTP-only cookies automatically
        });
        console.log('Cart data fetched:', response.data);
        setCartData(response.data.cart); // Adjust to match your API response structure
        calculateTotalAmount(response.data.cart);
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };


    // Fetch cart and user data when the component is mounted
    fetchCartData();
    fetchUserData();

    return () => {
      console.log('ShopProvider unmounted');
    };
  }, []);  // Runs only once on component mount
  
  // Helper to get product price by ID
  const getProductPriceById = async (itemId) => {
    try {
      const response = await axios.get(`http://192.168.1.109:3000/api/products/${itemId}`);
      return response.data.price;
    } catch (error) {
      console.error('Error fetching product price:', error);
      return 0;
    }
  };

  // Calculate total amount in the cart
  const calculateTotalAmount = async (cartData) => {
    console.log('Calculating total amount...');
    let total = 0;
    for (let item of cartData.items) {
      const price = await getProductPriceById(item.productId);
      total += item.quantity * price;
    }
    console.log('Total amount calculated:', total);
    setTotalAmount(total);
  };

  // Add item to cart
  const addToCart = async (productId) => {
    console.log('Adding to cart:', productId);
    try {
      await axios.post('http://192.168.1.109:3000/api/cart/addtocart', { productId, quantity: 1 }, {
        withCredentials: true, // Send HTTP-only cookies automatically
      });
      setCartData((prevCartData) => {
        const updatedCart = {
          ...prevCartData,
          items: [
            ...prevCartData.items,
            { productId, quantity: 1 },
          ],
        };
        calculateTotalAmount(updatedCart);
        return updatedCart;
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  // Remove item from cart
  const removeFromCart = async (productId) => {
    console.log('Removing from cart:', productId);
    try {
      await axios.post('http://192.168.1.109:3000/api/cart/removefromcart', { productId }, {
        withCredentials: true, // Send HTTP-only cookies automatically
      });
      setCartData((prevCartData) => {
        const updatedCart = {
          ...prevCartData,
          items: prevCartData.items.filter(item => item.productId !== productId),
        };
        calculateTotalAmount(updatedCart);
        return updatedCart;
      });
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  return (
    <ShopContext.Provider value={{ cartData, addToCart, removeFromCart, totalAmount, user }}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopProvider;
