import React, { useContext, useState } from 'react';
import axios from 'axios';
import { ShopContext } from '../Context/ShopContext';

const RazorpayPayment = ({ onSuccess }) => {
  const { cartData, userData, totalAmount } = useContext(ShopContext);
  const [paymentId, setPaymentId] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [signature, setSignature] = useState(null);

  const handlePayment = async () => {
    try {
      // Create order on the server
      const orderResponse = await axios.post('http://192.168.1.109:3000/api/payment/create', {
        amount: totalAmount, // Amount in currency unit
        currency: 'INR',
        receipt: `receipt_${Date.now()}`, // Generate a unique receipt ID
      });

      const { id: razorpayOrderId } = orderResponse.data;

      // Set up Razorpay options
      const options = {
        key: 'YOUR_RAZORPAY_KEY_ID',
        amount: totalAmount * 100, // Amount in paisa
        currency: 'INR',
        name: userData.name,
        description: 'Payment for order',
        image: '/your-logo.png',
        order_id: razorpayOrderId,
        handler: async (response) => {
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;
          setPaymentId(razorpay_payment_id);
          setOrderId(razorpay_order_id);
          setSignature(razorpay_signature);

          // Call onSuccess to handle post-payment logic
          onSuccess({ razorpay_payment_id, razorpay_order_id, razorpay_signature });
        },
        prefill: {
          name: userData.name,
          email: userData.email,
          contact: userData.phone,
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Error during payment:', error);
    }
  };

  return (
    <div>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
};

export default RazorpayPayment;
