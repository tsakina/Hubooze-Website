import React, { useState } from 'react';

const UserProfile = () => {
  const [editProfile, setEditProfile] = useState(false);
  const [editAddress, setEditAddress] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setEditProfile(false);
    setSuccessMessage('Profile updated successfully!');
  };

  const handleSaveAddress = (e) => {
    e.preventDefault();
    setEditAddress(false);
    setSuccessMessage('Address updated successfully!');
  };

  return (
    <div className="user-profile-container">
      <h2>User Profile</h2>

      <div className="profile-section">
        <div className="profile-info-wrapper">
          <span>Name:</span>
          <span className="profile-value">John Doe</span>
        </div>
        <div className="profile-info-wrapper">
          <span>Email:</span>
          <span className="profile-value">john.doe@example.com</span>
        </div>
        <button
          className="edit-profile-btn"
          onClick={() => setEditProfile(!editProfile)}
        >
          {editProfile ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      {editProfile && (
        <div className="edit-profile-modal">
          <div className="modal-content-wrapper">
            <button
              className="modal-close-btn"
              onClick={() => setEditProfile(false)}
            >
              &times;
            </button>
            <h3>Edit Profile</h3>
            <form onSubmit={handleSaveProfile}>
              <input type="text" defaultValue="John Doe" required />
              <input type="email" defaultValue="john.doe@example.com" required />
              <button className="save-profile-btn" type="submit">
                Save
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="address-section">
        <h2>Address</h2>
        <div className="address-details-wrapper">
          <h3>Home Address</h3>
          <p>1234 Elm Street, Springfield, IL</p>
          <button
            className="edit-address-btn"
            onClick={() => setEditAddress(!editAddress)}
          >
            {editAddress ? 'Cancel' : 'Edit Address'}
          </button>
        </div>
      </div>

      {editAddress && (
        <div className="edit-address-modal">
          <div className="modal-content-wrapper">
            <button
              className="modal-close-btn"
              onClick={() => setEditAddress(false)}
            >
              &times;
            </button>
            <h3>Edit Address</h3>
            <form onSubmit={handleSaveAddress}>
              <input
                type="text"
                defaultValue="1234 Elm Street, Springfield, IL"
                required
              />
              <button className="save-address-btn" type="submit">
                Save
              </button>
            </form>
          </div>
        </div>
      )}

      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
};

export default UserProfile;
