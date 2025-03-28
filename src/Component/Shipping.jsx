import React, { useState, useContext } from 'react';
import axios from 'axios';
import { ShopContext } from '../Context/ShopContext';

const ShippingComponent = () => {
  const { cartData, userData } = useContext(ShopContext);
  const [shippingDetails, setShippingDetails] = useState({
    address: userData.address || '',
    pinCode: userData.pinCode || '',
    contactNumber: userData.phone || '',
    waybill: '',
    shipmentStatus: '',
    shippingLabel: '',
    trackingNumber: '',
  });

  const createShipment = async () => {
    try {
      const response = await axios.post('http://192.168.1.109:3000/api/shipping/create-shipment', {
        orderId: cartData.orderId,
        address: {
          recipientName: userData.name,
          street: shippingDetails.address.street,
          city: shippingDetails.address.city,
          postalCode: shippingDetails.pinCode,
          state: shippingDetails.address.state,
          country: shippingDetails.address.country,
          phone: shippingDetails.contactNumber,
        },
      });

      setShippingDetails((prevDetails) => ({
        ...prevDetails,
        trackingNumber: response.data.trackingNumber,
      }));
    } catch (error) {
      console.error('Error creating shipment:', error);
    }
  };

  const fetchShippingStatus = async () => {
    try {
      const response = await axios.get(`http://192.168.1.109:3000/api/shipping/shipping-status/${shippingDetails.trackingNumber}`);
      setShippingDetails((prevDetails) => ({
        ...prevDetails,
        shipmentStatus: response.data.status,
      }));
    } catch (error) {
      console.error('Error fetching shipping status:', error);
    }
  };

  const generateShippingLabel = async () => {
    try {
      const response = await axios.post(`http://192.168.1.109:3000/api/shipping/generate-label/${cartData.orderId}`);
      setShippingDetails((prevDetails) => ({
        ...prevDetails,
        shippingLabel: response.data.label,
      }));
    } catch (error) {
      console.error('Error generating shipping label:', error);
    }
  };

  const createPickupRequest = async () => {
    try {
      const response = await axios.post('http://192.168.1.109:3000/api/shipping/create-pickup-request', {
        address: shippingDetails.address,
      });
      console.log('Pickup request created:', response.data);
    } catch (error) {
      console.error('Error creating pickup request:', error);
    }
  };

  const checkPinCodeServiceability = async () => {
    try {
      const response = await axios.get(`http://192.168.1.109:3000/api/shipping/check-pincode-serviceability/${shippingDetails.pinCode}`);
      console.log('Pin code serviceability:', response.data);
    } catch (error) {
      console.error('Error checking pin code serviceability:', error);
    }
  };

  return (
    <div>
      <h2>Shipping Details</h2>
      <input
        type="text"
        placeholder="Address"
        value={shippingDetails.address}
        onChange={(e) => setShippingDetails({ ...shippingDetails, address: e.target.value })}
      />
      <input
        type="text"
        placeholder="Pin Code"
        value={shippingDetails.pinCode}
        onChange={(e) => setShippingDetails({ ...shippingDetails, pinCode: e.target.value })}
      />
      <input
        type="text"
        placeholder="Contact Number"
        value={shippingDetails.contactNumber}
        onChange={(e) => setShippingDetails({ ...shippingDetails, contactNumber: e.target.value })}
      />
      <button onClick={createShipment}>Create Shipment</button>
      <button onClick={fetchShippingStatus}>Fetch Shipping Status</button>
      <button onClick={generateShippingLabel}>Generate Shipping Label</button>
      <button onClick={createPickupRequest}>Create Pickup Request</button>
      <button onClick={checkPinCodeServiceability}>Check Pin Code Serviceability</button>

      {shippingDetails.shipmentStatus && <p>Shipment Status: {shippingDetails.shipmentStatus}</p>}
      {shippingDetails.shippingLabel && <p>Shipping Label: {shippingDetails.shippingLabel}</p>}
    </div>
  );
};

export default ShippingComponent;
