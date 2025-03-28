import React, { useContext } from 'react';
import RazorpayPayment from '../Component/RazorpayIntegration';
import ShippingComponent from '../Component/Shipping';
import { ShopContext } from '../Context/ShopContext';
import axios from 'axios';


const CheckoutPage = () => {
  const { cartData, userData } = useContext(ShopContext);

  const handlePaymentSuccess = async (paymentDetails) => {
    try {
      // Save the order to the database
      const newOrder = {
        userId: userData._id,
        order_id: paymentDetails.razorpay_order_id,
        payment_id: paymentDetails.razorpay_payment_id,
        cartData,
        status: 'paid',
      };
      await axios.post('http://192.168.1.109:3000/api/payment/create', newOrder);

      // Send a confirmation email
      await axios.post('http://192.168.1.109:3000/api/shipping/sendEmail', {
        userId: userData._id,
        orderId: paymentDetails.razorpay_order_id,
        email: userData.email,
        address: userData.address,
        pincode: userData.pincode,
        phone: userData.phone,
        shippingDetails: { tracking_id: paymentDetails.razorpay_order_id },
      });

      // Show a thank you pop-up
      alert('Thank you! Your order has been placed successfully.');

      // Redirect to the home page
      window.location.href = '/';
    } catch (error) {
      console.error('Error handling payment success:', error);
    }
  };

  return (
    <div>
      <h1>Checkout</h1>
      <ShippingComponent />
      <RazorpayPayment onSuccess={handlePaymentSuccess} />
    </div>
  );
};

export default CheckoutPage;
