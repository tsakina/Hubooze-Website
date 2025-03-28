import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
  
    if (!username || !password) {
      setError('Username and password are required');
      return;
    }
  
    const adminData = { username, password };
  
    axios.post('http://192.168.1.109:3000/api/admin/adminlogin', adminData, { withCredentials: true })
      .then(response => {
        if (response.status === 200) {
          console.log('Login successful, checking cookies...');
          // Navigate to dashboard after successful login
          navigate('/admin/dashboard');
        }
      })
      .catch(error => {
        console.error('Error logging in:', error);
        setError('Invalid credentials. Please try again.');
      });
  };
  
  return (
    <form onSubmit={handleLogin}>
      <h2>Admin Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default AdminLogin;



// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const AdminLogin = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
    
//     // Ensure that username and password are available
//     if (!username || !password) {
//         console.error('Username and password must be provided');
//         return;
//     }

//     try {
//         const res = await axios.post('http://192.168.1.109:3000/api/admin/adminlogin', { username, password });
//         localStorage.setItem('token', res.data.token);
//         console.log('Token set in local storage:', res.data.token);
//         navigate('/admin/dashboard');
//         console.log('Navigated to /admin/dashboard');
//     } catch (err) {
//         if (err.response) {
//             // The request was made and the server responded with a status code that falls out of the range of 2xx
//             console.error('Login failed', err.response.data);
//         } else if (err.request) {
//             // The request was made but no response was received
//             console.error('No response received from the server', err.request);
//         } else {
//             // Something happened in setting up the request that triggered an Error
//             console.error('Error', err.message);
//         }
//     }
// };


//   return (
//     <form onSubmit={handleLogin}>
//       <div>
//         <label>Username:</label>
//         <input 
//         type="text" 
//         value={username} 
//         onChange={(e) => setUsername(e.target.value)} />
//       </div>
//       <div>
//         <label>Password:</label>
//         <input 
//         type="password" 
//         value={password} 
//         onChange={(e) => setPassword(e.target.value)} />
//       </div>
//       <button type="submit">Login</button>
//     </form>
//   );
// };

// export default AdminLogin;
