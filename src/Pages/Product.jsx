import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import productData from './Productdata'; // Import your static data
import './CSS/Product.css'; // Import CSS for styling
// import './CSS/Test.css';
import axios from 'axios';

const Product = () => {
  // Retrieve the product ID from the URL parameters
  // const { ProductId } = useParams();

  // // Find the product with the matching ID from static data
  // const product = productData.find(item => item.id === ProductId);

  // // State to manage the currently selected image
  // const [selectedImage, setSelectedImage] = useState('');

  // // Set the initial selected image if product exists
  // useEffect(() => {
  //   if (product) {
  //     setSelectedImage(product.images[0]);
  //   }
  // }, [product]);

  // // Handle image click to update the main image
  // const handleImageClick = (image) => {
  //   setSelectedImage(image);
  // };

  // // Ensure the product exists, otherwise return a not found message
  // if (!product) {
  //   return <p>Product not found</p>;
  // }

  const { id } = useParams(); // Get the product ID from the URL
  console.log('ProductId:', id); // Check if ProductId is correct

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wishlistMessage, setWishlistMessage] = useState('');

  // Fetch product details by ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://192.168.1.109:3000/api/products/${id}`);
        setProduct(response.data.product);
        setSelectedImage(response.data.product.image[0]);
        setLoading(false);
      } catch (err) {
        setError('Product not found');
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // Handle image click to update the main image
  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  // Function to add product to the wishlist
  // Function to add product to the wishlist
  const addToWishlist = async () => {
    try {
      const response = await axios.post('http://192.168.1.109:3000/api/wishlist/addtowishlist', { productId: product._id }, {
        withCredentials: true, // Sends cookies for authentication
      });

      if (response.data.message === 'Product already in wishlist') {
        setWishlistMessage('Product is already in your wishlist!');
      } else {
        setWishlistMessage('Product added to wishlist!');
      }
    } catch (err) {
      setWishlistMessage('Failed to add product to wishlist.');
    }
  };

  // If loading, show a loading spinner
  if (loading) {
    return <p>Loading...</p>;
  }

  // If an error occurs, show an error message
  if (error) {
    return <p>{error}</p>;
  }


  // Return the component JSX
  return (
    <div className="product-details-page">
      <div className="product-details-header">
        <div className="product-details-images">
          {/* Main image */}
          <img className="main-image" src={selectedImage} alt={`${product.name} Main`} />

          {/* Thumbnail images */}
          <div className="small-images">
            {product.image && product.image.length > 0 ? (
              product.image.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className={`thumbnail ${selectedImage === image ? 'active' : ''}`}
                  onClick={() => handleImageClick(image)}
                />
              ))
            ) : (
              <p>No images available</p>
            )}
          </div>
        </div>
        <div className="product-details-info">
          <hr />
          <h1>{product.name}</h1>
          <div className='product-details-info-prices'>
            <p className="price">₹{product.selling_price.toFixed(2)}</p>
            <h3 className="old-price">₹{product.market_price.toFixed(2)}</h3>
          </div>
          <p className="description">{product.description}</p>
          <hr />
          <div className='product-details-delivery'>
            <ul>
              <li><span className="material-symbols-outlined">local_shipping</span><p>Fast <b>2 Days</b> Delivery</p></li>
              <li><span className="material-symbols-outlined">event_repeat</span><p>Easy <b>90</b> Days return</p></li>
              <li><span className="material-symbols-outlined">currency_rupee</span><p><b>Cash on</b> Delivery</p></li>
            </ul>
          </div>
        
          <div className='product-details-buttons-outer'>
            <div className='product-details-buttons'>
              <button onClick={addToWishlist}><h2>Add to Wishlist</h2></button>
              <button><h2>Buy Now</h2></button>
              <button><h2>Add to Cart</h2></button>
            </div>
          </div>
          
          {/* Wishlist Message */}
          {wishlistMessage && <p>{wishlistMessage}</p>}
        </div>
      </div>
    </div>
  );
}

export default Product;


//   return (
//     <div className="product-details-page">
//       <div className="product-details-header">
//         <div className="product-details-images">
//           {/* Main image */}
//           <img className="main-image" src={selectedImage} alt={`${product.name} Main`} />

//           {/* Thumbnail images */}
//           {/* <div className="small-images">
//             {product.images.map((image, index) => (
//               <img
//                 key={index}
//                 src={image}
//                 alt={`${product.name} ${index + 1}`}
//                 className={`thumbnail ${selectedImage === image ? 'active' : ''}`}
//                 onClick={() => handleImageClick(image)}
//               />
//             ))}
//           </div> */}
//           {/* Thumbnail images */}
//           <div className="small-images">
//             {product.image && product.image.length > 0 ? (
//               product.image.map((image, index) => (
//                 <img
//                   key={index}
//                   src={image}
//                   alt={`${product.name} ${index + 1}`}
//                   className={`thumbnail ${selectedImage === image ? 'active' : ''}`}
//                   onClick={() => handleImageClick(image)}
//                 />
//               ))
//             ) : (
//               <p>No images available</p>
//             )}
//           </div>
//         </div>
//         <div className="product-details-info">
//           <hr />
//           <h1>{product.name}</h1>
//           <div className='product-details-info-prices'> <p className="price">₹{product.selling_price.toFixed(2)}</p>
//             <h3 className="old-price">₹{product.market_price.toFixed(2)}</h3></div>
//           <p className="description">{product.description}</p>
//           <hr />
//           {/* <div className="product-details-product-info-sizes">
//             <span className="size">Sizes:</span>
//             {product.size.map((size, index) => (
//               <span key={index} className="size-item">{size}</span>
//             ))}
//           </div> */}
//           <hr />
//           <div className='product-details-delivery'>
//             <ul>
//               <li><span class="material-symbols-outlined">
//                 local_shipping
//               </span> <p>Fast <b>2 Days</b> Delivery</p></li>

//               <li><span class="material-symbols-outlined">
//                 event_repeat
//               </span> <p>Easy <b>90</b> Days return</p></li>

//               <li><span class="material-symbols-outlined">
//               currency_rupee
//               </span><p  ><b>Cash on</b> Delivery</p></li>
//             </ul>
//         </div>
        
//         <div className='product-details-buttons-outer' >
//           <div className='product-details-buttons'>
//             <ul>
//               <li><span class="material-symbols-outlined">
//                 <span class="material-symbols-outlined">
//                   favorite
//                 </span>
//               </span> </li>
//             </ul>
//             <button onClick={addToWishlist}><h2>Add to Wishlist</h2></button>
//             <button><h2>Buy Now</h2></button>
//             <button><h2>Add to Cart</h2></button>
//           </div>
//         </div>
//       </div>
        
//       </div>
//       {/* <div className='buttons-outer' >
//         <div className='buttons'>
//           <ul>
//             <li><span class="material-symbols-outlined">
//               <span class="material-symbols-outlined">
//                 favorite
//               </span>
//             </span> </li>
//           </ul>
//           <button><h2>Buy Now</h2></button>
//           <button><h2>Add to Cart</h2></button>
//         </div>
//       </div> */}
//     </div>
//   );
// }

// export default Product;
