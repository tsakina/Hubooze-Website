import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newProduct, setNewProduct] = useState({
    name: '',
    HIN_No: '',
    category: '',
    sub_category: '',
    type: '',
    brand: '',
    market_price: '',
    selling_price: '',
    quantity: '',
    description: '',
    color: '',
    size: '',
    available: '',
    image: ''
  });
  const [editProductId, setEditProductId] = useState(null);
  const [editProductData, setEditProductData] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check admin authentication status in an unconditionally called useEffect
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(`http://192.168.1.109:3000/api/admin/check-auth?timestamp=${new Date().getTime()}`, { withCredentials: true });

        console.log('Check auth response:', response);

        if (response.data.message === 'Authenticated') { // Match this with your backend response
          setIsAuthenticated(true);
          console.log('Navigating to dashboard');
        } else {
          navigate('/adminlogin');
        }
      } catch (error) {
        console.error('Error during authentication check:', error);
        navigate('/adminlogin');
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [navigate]);  

  // Fetch products if authenticated
  useEffect(() => {
    const fetchProducts = async () => {
      if (isAuthenticated) {
        setLoading(true);
        try {
          const response = await axios.get('http://192.168.1.109:3000/api/products');
          setProducts(response.data.products || []);
        } catch (error) {
          console.error('Error fetching products:', error);
          setProducts([]); // Ensure products is always an array
        } finally {
          setLoading(false);
        }
      }
    };
    fetchProducts();
  }, [isAuthenticated]);

  // Conditional rendering after hooks
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!isAuthenticated) {
    return <p>Unauthorized access. Redirecting to login...</p>;
  }

  const handleLogout = async () => {
    try {
      await axios.post('http://192.168.1.109:3000/api/admin/adminlogout', {}, { withCredentials: true });
      navigate('/adminlogin');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const handleRegister = () => {
    navigate('/adminregister');
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(`http://192.168.1.109:3000/api/products?name=${searchTerm}`);
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error searching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://192.168.1.109:3000/api/products/${productId}`);
      setProducts(products.filter(product => product._id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://192.168.1.109:3000/api/products', newProduct, { withCredentials: true });
      setProducts([...products, response.data.product]);
      setNewProduct({
        name: '',
        HIN_No: '',
        category: '',
        sub_category: '',
        type: '',
        brand: '',
        market_price: '',
        selling_price: '',
        quantity: '',
        description: '',
        color: '',
        size: '',
        available: '',
        image: ''
      });
    } catch (error) {
      console.error('Error creating product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditProduct = (productId) => {
    const productToEdit = products.find(product => product._id === productId);
    setEditProductId(productId);
    setEditProductData({
      name: productToEdit.name,
      selling_price: productToEdit.selling_price,
      quantity: productToEdit.quantity,
    });
  };

  const handleUpdateProduct = async (productId) => {
    setLoading(true);
    try {
      const response = await axios.put(`http://192.168.1.109:3000/api/products/${productId}`, editProductData, { withCredentials: true });
      const updatedProduct = response.data.updatedProduct;
      setProducts(products.map(product => product._id === productId ? updatedProduct : product));
      setEditProductId(null);
      setEditProductData({});
    } catch (error) {
      console.error('Error updating product:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleRegister}>Register</button>

      {/* Create Product Form */}
      <div>
        <h2>Create New Product</h2>
        <form onSubmit={handleCreateProduct}>
          {/* New product form fields */}
          {Object.keys(newProduct).map((field) => (
            <input
              key={field}
              type={field === 'market_price' || field === 'selling_price' || field === 'quantity' ? 'number' : 'text'}
              placeholder={field.replace('_', ' ').toUpperCase()}
              value={newProduct[field]}
              onChange={(e) => setNewProduct({ ...newProduct, [field]: e.target.value })}
            />
          ))}
          <button type="submit" disabled={isLoading}>Create</button>
        </form>
      </div>

      {/* Search Bar */}
      <div>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" disabled={isLoading}>Search</button>
        </form>
      </div>

      {/* Product Table */}
      <div>
        <h2>All Products</h2>
        {isLoading ? <p>Loading...</p> : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>HIN No</th>
                <th>Category</th>
                <th>Sub-category</th>
                <th>Type</th>
                <th>Brand</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product._id}>
                  <td>
                    {editProductId === product._id ? (
                      <input
                        type="text"
                        value={editProductData.name}
                        onChange={(e) => setEditProductData({ ...editProductData, name: e.target.value })}
                      />
                    ) : (
                      product.name
                    )}
                  </td>
                  <td>{product.HIN_No}</td>
                  <td>{product.category}</td>
                  <td>{product.sub_category}</td>
                  <td>{product.type}</td>
                  <td>{product.brand}</td>
                  <td>
                    {editProductId === product._id ? (
                      <input
                        type="number"
                        value={editProductData.selling_price}
                        onChange={(e) => setEditProductData({ ...editProductData, selling_price: e.target.value })}
                      />
                    ) : (
                      product.selling_price
                    )}
                  </td>
                  <td>
                    {editProductId === product._id ? (
                      <input
                        type="number"
                        value={editProductData.quantity}
                        onChange={(e) => setEditProductData({ ...editProductData, quantity: e.target.value })}
                      />
                    ) : (
                      product.quantity
                    )}
                  </td>
                  <td>
                    {editProductId === product._id ? (
                      <button onClick={() => handleUpdateProduct(product._id)} disabled={isLoading}>Save</button>
                    ) : (
                      <button onClick={() => handleEditProduct(product._id)}>Edit</button>
                    )}
                    <button onClick={() => handleDelete(product._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;


// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const AdminDashboard = () => {
//   const navigate = useNavigate();
//   const [products, setProducts] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [newProduct, setNewProduct] = useState({
//     name: '',
//     HIN_No: '',
//     category: '',
//     sub_category: '',
//     type: '',
//     brand: '',
//     market_price: '',
//     selling_price: '',
//     quantity: '',
//     description: '',
//     color: '',
//     size: '',
//     available: '',
//     image: ''
//   });
//   const [editProductId, setEditProductId] = useState(null);
//   const [editProductData, setEditProductData] = useState({});
//   const [isLoading, setLoading] = useState(true);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   // Check admin authentication status
//   useEffect(() => {
//     axios.get('http://192.168.1.109:3000/api/admin/check-auth', { withCredentials: true })
//       .then((response) => {
//         if (response.data.isAuthenticated) {
//           setIsAuthenticated(true);
//         } else {
//           navigate('/adminlogin'); // Redirect to login if not authenticated
//         }
//       })
//       .catch((err) => {
//         console.error(err);
//         navigate('/adminlogin'); // Redirect to login if there is an error
//       })
//       .finally(() => {
//         setLoading(false); // Set loading to false after request completes
//       });
//   }, [navigate]);

//   if (isLoading) {
//     return <p>Loading...</p>; // Show loading while checking authentication
//   }

//   if (!isAuthenticated) {
//     return <p>Unauthorized access. Redirecting to login...</p>;
//   }
  

//   useEffect(() => {
//     const fetchProducts = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get('http://192.168.1.109:3000/api/products');
//         if (response.data.products) {
//           setProducts(response.data.products);
//         } else {
//           setProducts([]);  // Fallback to empty array if no products are returned
//         }
//       } catch (error) {
//         console.error('Error fetching products:', error);
//         setProducts([]);  // Ensure products is always an array
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, []);

//   const handleLogout = async () => {
//     try {
//       await axios.post('http://192.168.1.109:3000/api/admin/logout', {}, { withCredentials: true });
//       navigate('/adminlogin');
//     } catch (err) {
//       console.error('Logout failed:', err);
//     }
//   };

//   const handleRegister = () => {
//     navigate('/adminregister');
//   };

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const response = await axios.get(`http://192.168.1.109:3000/api/products?name=${searchTerm}`);
//       setProducts(response.data.products);
//     } catch (error) {
//       console.error('Error searching products:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (productId) => {
//     try {
//       await axios.delete(`http://192.168.1.109:3000/api/products/${productId}`);
//       setProducts(products.filter(product => product._id !== productId));
//     } catch (error) {
//       console.error('Error deleting product:', error);
//     }
//   };

//   const handleCreateProduct = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const response = await axios.post('http://192.168.1.109:3000/api/products', newProduct, { withCredentials: true });
//       setProducts([...products, response.data.product]);
//       setNewProduct({
//         name: '',
//         HIN_No: '',
//         category: '',
//         sub_category: '',
//         type: '',
//         brand: '',
//         market_price: '',
//         selling_price: '',
//         quantity: '',
//         description: '',
//         color: '',
//         size: '',
//         available: '',
//         image: ''
//       });
//     } catch (error) {
//       console.error('Error creating product:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEditProduct = (productId) => {
//     const productToEdit = products.find(product => product._id === productId);
//     setEditProductId(productId);
//     setEditProductData({
//       name: productToEdit.name,
//       selling_price: productToEdit.selling_price,
//       quantity: productToEdit.quantity,
//     });
//   };

//   const handleUpdateProduct = async (productId) => {
//     setLoading(true);
//     try {
//       const response = await axios.put(`http://192.168.1.109:3000/api/products/${productId}`, editProductData, { withCredentials: true });
//       const updatedProduct = response.data.updatedProduct;
  
//       setProducts(products.map(product =>
//         product._id === productId ? updatedProduct : product
//       ));
  
//       setEditProductId(null);
//       setEditProductData({});
//     } catch (error) {
//       console.error('Error updating product:', error);
//     } finally {
//       setLoading(false);
//     }
//   };
  

//   return (
//     <div>
//       <h1>Admin Dashboard</h1>
//       <button onClick={handleLogout}>Logout</button>
//       <button onClick={handleRegister}>Register</button>

//       {/* Create Product Form */}
//       <div>
//         <h2>Create New Product</h2>
//         <form onSubmit={handleCreateProduct}>
//           <input
//             type="text"
//             placeholder="Name"
//             value={newProduct.name}
//             onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
//           />
//           <input
//             type="number"
//             placeholder="HIN No"
//             value={newProduct.HIN_No}
//             onChange={(e) => setNewProduct({ ...newProduct, HIN_No: e.target.value })}
//           />
//           <input
//             type="text"
//             placeholder="Category"
//             value={newProduct.category}
//             onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
//           />
//           <input
//             type="text"
//             placeholder="Sub-category"
//             value={newProduct.sub_category}
//             onChange={(e) => setNewProduct({ ...newProduct, sub_category: e.target.value })}
//           />
//           <input
//             type="text"
//             placeholder="Type"
//             value={newProduct.type}
//             onChange={(e) => setNewProduct({ ...newProduct, type: e.target.value })}
//           />
//           <input
//             type="text"
//             placeholder="Brand"
//             value={newProduct.brand}
//             onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
//           />
//           <input
//             type="number"
//             placeholder="MRP"
//             value={newProduct.market_price}
//             onChange={(e) => setNewProduct({ ...newProduct, market_price: e.target.value })}
//           />
//           <input
//             type="number"
//             placeholder="Price"
//             value={newProduct.selling_price}
//             onChange={(e) => setNewProduct({ ...newProduct, selling_price: e.target.value })}
//           />
//           <input
//             type="number"
//             placeholder="Quantity"
//             value={newProduct.quantity}
//             onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
//           />
//           <input
//             type="text"
//             placeholder="Description"
//             value={newProduct.description}
//             onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
//           />
//           <input
//             type="text"
//             placeholder="Color"
//             value={newProduct.color}
//             onChange={(e) => setNewProduct({ ...newProduct, color: e.target.value })}
//           />
//           <input
//             type="text"
//             placeholder="Size"
//             value={newProduct.size}
//             onChange={(e) => setNewProduct({ ...newProduct, size: e.target.value })}
//           />
//           <input
//             type="boolean"
//             placeholder="Available"
//             value={newProduct.available}
//             onChange={(e) => setNewProduct({ ...newProduct, available: e.target.value })}
//           />
//           <input
//             type="[String]"
//             placeholder="Image"
//             value={newProduct.image}
//             onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
//           />
//           <button type="submit" disabled={isLoading}>Create</button>
//         </form>
//       </div>

//       {/* Search Bar */}
//       <div>
//         <form onSubmit={handleSearch}>
//           <input
//             type="text"
//             placeholder="Search by name..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <button type="submit" disabled={isLoading}>Search</button>
//         </form>
//       </div>

//       {/* Product Table */}
//       <div>
//         <h2>All Products</h2>
//         {isLoading ? <p>Loading...</p> : (
//           <table>
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>HIN No</th>
//                 <th>Category</th>
//                 <th>Sub-category</th>
//                 <th>Type</th>
//                 <th>Brand</th>
//                 <th>Price</th>
//                 <th>Quantity</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {products.map(product => (
//                 <tr key={product._id}>
//                   <td>
//                     {editProductId === product._id ? (
//                       <input
//                         type="text"
//                         value={editProductData.name}
//                         onChange={(e) => setEditProductData({ ...editProductData, name: e.target.value })}
//                       />
//                     ) : (
//                       product.name
//                     )}
//                   </td>
//                   <td>{product.HIN_No}</td>
//                   <td>{product.category}</td>
//                   <td>{product.sub_category}</td>
//                   <td>{product.type}</td>
//                   <td>{product.brand}</td>
//                   <td>
//                     {editProductId === product._id ? (
//                       <input
//                         type="number"
//                         value={editProductData.selling_price}
//                         onChange={(e) => setEditProductData({ ...editProductData, selling_price: e.target.value })}
//                       />
//                     ) : (
//                       product.selling_price
//                     )}
//                   </td>
//                   <td>
//                     {editProductId === product._id ? (
//                       <input
//                         type="number"
//                         value={editProductData.quantity}
//                         onChange={(e) => setEditProductData({ ...editProductData, quantity: e.target.value })}
//                       />
//                     ) : (
//                       product.quantity
//                     )}
//                   </td>
//                   <td>
//                     {editProductId === product._id ? (
//                       <button onClick={() => handleUpdateProduct(product._id)} disabled={isLoading}>Save</button>
//                     ) : (
//                       <button onClick={() => handleEditProduct(product._id)}>Edit</button>
//                     )}
//                     <button onClick={() => handleDelete(product._id)}>Delete</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;
