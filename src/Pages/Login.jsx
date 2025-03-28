// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import './CSS/Loginsignup.css';

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });

//   const login = async () => {
//     try {
//       console.log("Login Function Executed", formData);
//       const response = await axios.post('http://192.168.1.109:3000/api/user/login', formData, {
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });
      
//       const responesData = response.data;

//       if (responesData.success) {
//         window.location.replace('/');
//       } else {
//         alert(responesData.error);
//       }
//     } catch (error) {
//       console.error("Error in login request:", error);
//       alert('An error occurred while logging in.');
//     }
//   };

//   const changeHandler = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   return (
//     <div className='loginsign'>
//       <div className="loginsignup-container">
//         <h1>Login</h1>
//         <div className="loginsignup-field">
//           <input name='email' value={formData.email} type='email' onChange={changeHandler} placeholder='Email Address' />
//           <input name='password' value={formData.password} onChange={changeHandler} type='password' placeholder='Password' />
//         </div>
//         <button onClick={login}>Login</button>
//         <p className='loginsignup-login'>
//           Don't have an account? <Link to='/signup'>Sign Up here</Link>
//         </p>
//         {/* <div className="loginsignup-agree">
//           <input type='checkbox' name='' id='' />
//           <p>By continuing, I agree to the terms of use & privacy.</p>
//         </div> */}
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from 'react';
import axios from 'axios';
import './CSS/Loginsignup.css';

const Login = ({ closeModal }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const login = async () => {
    try {
      console.log("Login Function Executed", formData);
      const response = await axios.post(
        'http://192.168.1.109:3000/api/user/login',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true, // Ensure cookies are included
        }
      );

      const responseData = response.data;

      if (responseData.success) {
        window.location.replace('/');
      } else {
        alert(responseData.error);
      }
    } catch (error) {
      console.error("Error in login request:", error);
      alert('An error occurred while logging in.');
    }
  };

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className='modal'>
      <div className='modal-content'>
        <span className='close' onClick={closeModal}>&times;</span>
        <h1>Login</h1>
        <div className="loginsignup-field">
          <input
            name='email'
            value={formData.email}
            type='email'
            onChange={changeHandler}
            placeholder='Email Address'
          />
          <input
            name='password'
            value={formData.password}
            onChange={changeHandler}
            type='password'
            placeholder='Password'
          />
        </div>
        <button onClick={login}>Login</button>
      </div>
    </div>
  );
};

export default Login;
