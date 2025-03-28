// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import './CSS/Loginsignup.css';

// const Signup = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//   });

//   const signup = async () => {
//     // Check if passwords match before sending the request
//     if (formData.password !== formData.confirmPassword) {
//       alert('Passwords do not match');
//       return;
//     }

//     // Check if password meets the minimum length requirement
//     if (formData.password.length < 8) {
//       alert('Password must be at least 8 characters long');
//       return;
//     }

//     try {
//       console.log("Signup Function Executed", formData);
      
//       // Only send the required fields to the backend
//       const { username, email, password, confirmPassword } = formData;
      
//       const response = await axios.post('http://192.168.1.109:3000/api/user/signup', { username, email, password, confirmPassword }, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       const responseData = response.data;

//       if (responseData.success) {
//         alert(responseData.message); // Show the success message
//         // Clear the form fields after successful signup
//         setFormData({
//           username: '',
//           email: '',
//           password: '',
//           confirmPassword: '',
//         });
//         window.location.replace('/login');
//       } else {
//         alert(responseData.error);
//       }
//     } catch (error) {
//       console.error('Error in signup request:', error);
//       alert('An error occurred while signing up.');
//     }
//   };

//   const changeHandler = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   return (
//     <div className='loginsign'>
//       <div className="loginsignup-container">
//         <h1>Sign Up</h1>
//         <div className="loginsignup-field">
//           <input name='username' value={formData.username} onChange={changeHandler} type='text' placeholder='Your Name' />
//           <input name='email' value={formData.email} onChange={changeHandler} type='email' placeholder='Email Address' />
//           <input name='password' value={formData.password} onChange={changeHandler} type='password' placeholder='Password' />
//           <input name='confirmPassword' value={formData.confirmPassword} onChange={changeHandler} type='password' placeholder='Confirm Password' />
//         </div>
//         <button onClick={signup}>Sign Up</button>
//         <p className='loginsignup-login'>
//           Already have an account? <Link to='/login'>Login here</Link>
//         </p>
//         {/* <div className="loginsignup-agree">
//           <input type='checkbox' name='' id='' />
//           <p>By continuing, I agree to the terms of use & privacy.</p>
//         </div> */}
//       </div>
//     </div>
//   );
// };

// export default Signup;

import React, { useState } from 'react';
import axios from 'axios';
import './CSS/Loginsignup.css';

const Signup = ({ closeModal }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const signup = async () => {
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }

    try {
      console.log("Signup Function Executed", formData);
      
      const { username, email, password, confirmPassword } = formData;
      
      const response = await axios.post(
        'http://192.168.1.109:3000/api/user/signup',
        { username, email, password, confirmPassword },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true, // Ensure cookies are included for session handling
        }
      );

      const responseData = response.data;

      if (responseData.success) {
        alert(responseData.message);
        setFormData({
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
        window.location.replace('/login');
      } else {
        alert(responseData.error);
      }
    } catch (error) {
      console.error('Error in signup request:', error);
      alert('An error occurred while signing up.');
    }
  };

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className='modal'>
      <div className='modal-content'>
        <span className='close' onClick={closeModal}>&times;</span>
        <h1>Sign Up</h1>
        <div className="loginsignup-field">
          <input
            name='username'
            value={formData.username}
            onChange={changeHandler}
            type='text'
            placeholder='Your Name'
          />
          <input
            name='email'
            value={formData.email}
            onChange={changeHandler}
            type='email'
            placeholder='Email Address'
          />
          <input
            name='password'
            value={formData.password}
            onChange={changeHandler}
            type='password'
            placeholder='Password'
          />
          <input
            name='confirmPassword'
            value={formData.confirmPassword}
            onChange={changeHandler}
            type='password'
            placeholder='Confirm Password'
          />
        </div>
        <button onClick={signup}>Sign Up</button>
      </div>
    </div>
  );
};

export default Signup;
