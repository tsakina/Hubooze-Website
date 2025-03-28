import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WishListCard from '../Component/WishListCard/WishListCard';
import './CSS/WishListPage.css'
import axios from 'axios';

const WishList = () => {
  const [wishList, setWishList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch Wishlist from the backend
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get('http://192.168.1.109:3000/api/wishlist/getwishlist', {
          withCredentials: true, // Include credentials for authentication
        });
        const products = response.data.wishlist?.products || []; // Ensure products exist
        setWishList(products);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          // Unauthorized, redirect to home or login
          navigate('/');
        } else {
          setError('Failed to fetch wishlist.');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchWishlist();
  }, [navigate]);

  // Function to remove product from wishlist
  const removeFromWishlist = async (productId) => {
    try {
      await axios.delete(`http://192.168.1.109:3000/api/wishlist/removefromwishlist/${productId}`, {
        withCredentials: true, // Sends the cookie for authentication
      });

      // Update UI after removing the item
      setWishList((prevItems) =>
        prevItems.filter((item) => item.productId._id !== productId)
      );
    } catch (err) {
      setError('Failed to remove item from wishlist.');
    }
  };

  if (loading) return <p>Loading wishlist...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className='wl-container'>
      <div className='heading'>
        <h1>Wishlist</h1>
        <span className="material-symbols-outlined icon">favorite</span>
        <span className='total-item'><p>({wishList.length})</p></span>
      </div>
      <div className='card'>
        {Array.isArray(wishList) && wishList.length > 0 ? (
          wishList.map(item => (
            <WishListCard
              key={item._id} // The unique key should be based on item._id, which is unique to each wishlist entry
              productImg={item.productId.image[0]} // Display the first image from the array
              productName={item.productId.name}
              productDescription={item.productId.description}
              productPrice={item.productId.selling_price}
              productColor={item.productId.color}
              productId={item.productId._id}
              onRemove={removeFromWishlist} // Pass the remove function
            />
          ))
        ) : (
          <p>No items in your wishlist</p>
        )}
      </div>
    </div>
  );
};

export default WishList;



// import React, { useState, useEffect } from 'react';
// import WishListCard from '../Component/WishListCard/WishListCard';
// import './CSS/WishListPage.css'
// import axios from 'axios';

// const WishList = () => {

//   const [wishList, setWishList] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch Wishlist from the backend
//   useEffect(() => {
//     const fetchWishlist = async () => {
//       try {
//         const response = await axios.get('http://192.168.1.109:3000/api/wishlist/getwishlist', {
//           withCredentials: true, // Include credentials for authentication
//         });
//         setWishList(response.data.wishlist.products || []); // Ensure it's an array
//       } catch (err) {
//         setError('Failed to fetch wishlist.');
//         setWishList([]); // Fallback to empty array in case of error
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchWishlist();
//   }, []);

//   // Function to remove product from wishlist
//   const removeFromWishlist = async (productId) => {
//     try {
//       await axios.post('http://192.168.1.109:3000/api/wishlist/removefromwishlist', { productId }, {
//         withCredentials: true, // Sends the cookie for authentication
//       });

//       // Update UI after removing the item
//       setWishList((prevItems) =>
//         prevItems.filter((item) => item.productId._id !== productId)
//       );
//     } catch (err) {
//       setError('Failed to remove item from wishlist.');
//     }
//   };

//   if (loading) return <p>Loading wishlist...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className='wl-container'>
//       <div className='heading'>
//         <h1>Wishlist</h1>
//         <span className="material-symbols-outlined icon">favorite</span>
//         <span className='total-item'><p>({wishList.length})</p></span>
//       </div>
//       <div className='card'>
//         {Array.isArray(wishList) && wishList.length > 0 ? (
//           wishList.map(item => (
//             <WishListCard
//               key={item.productId}
//               productImg={item.productId.image}
//               productName={item.productId.name}
//               productDescription={item.productId.description}
//               productPrice={item.productId.selling_price}
//               productColor={item.productId.color}
//               productId={item.productId._id}
//               onRemove={removeFromWishlist} // Pass the remove function
//             />
//           ))
//         ) : (
//           <p>No items in your wishlist</p>
//         )}
//       </div>
//       {/* <div className='card'>
//         {wishListItems.length === 0 ? (
//           <p>No items in wishlist</p>
//         ) : (
//           wishListItems.map((item, index) => (
//             <WishListCard
//               key={index}
//               productImg={item.productId.image}
//               productName={item.productId.name}
//               productDescription={item.productId.description}
//               productPrice={item.productId.selling_price}
//               productColor={item.productId.color}
//               productId={item.productId._id}
//               onRemove={removeFromWishlist} // Pass the remove function
//             />
//           ))
//         )}
//       </div> */}
//     </div>
//   );
// };

// export default WishList;
    

//     return (
//            <div className='wlp-container'>
//       <div className='wlp-heading'><h1>Wishlist</h1><span class="wlp-material-symbols-outlined wlp-icon">
// favorite 
// </span><span className='wlp-total-item'><p>(10)</p></span></div>
//       <div className='wlp-card'>
        
//            {wishListItems.map((item, index) => (
//           <WishListCard
//           key={index}
//           productImg={item.productImg}
//           productName={item.productName}
//           productDescription={item.productDescription}
//           productPrice={item.productPrice}
//           productColor={item.productColor}
//         />
//       ))} 
//                  </div>
//     </div>
//     );
// }

// export default WishList;

// const wishListItems = [
//   {
//     productImg: "https://assets.ajio.com/medias/sys_master/root/20240808/vtEm/66b502f16f60443f31f9565f/-473Wx593H-441893888-mediumblue-MODEL.jpg",
//     productName: "Slim Fit Shirt",
//     productDescription: "Men Slim Fit Shirt with Patch Pocket",
//     productPrice: "₹995",
//     productColor: "#405d8c"
//   },
//   {
//     productImg: "https://assets.ajio.com/medias/sys_master/root/20240808/5Rgh/66b4d2ba6f60443f31f80965/-473Wx593H-442436773-white-MODEL.jpg",
//     productName: "Navy Blue Jacket",
//     productDescription: "Men Navy Blue Jacket with Hood",
//     productPrice: "₹1,999",
//     productColor: "white"
//   },
//   {
//     productImg: "https://assets.ajio.com/medias/sys_master/root/20240808/Xl8D/66b5055d1d763220fa6b8dd2/-473Wx593H-441761650-teal-MODEL.jpg",
//     productName: "Casual Trousers",
//     productDescription: "Men Light Brown Casual Trousers",
//     productPrice: "₹1,499",
//     productColor: "#1c3849"
//   },
//   {
//     productImg: "https://assets.ajio.com/medias/sys_master/root/20240808/bqoj/66b4c94f1d763220fa6a2fdc/-473Wx593H-442436789-maroon-MODEL.jpg",
//     productName: "Graphic T-Shirt",
//     productDescription: "Men Grey Graphic T-Shirt",
//     productPrice: "₹699",
//     productColor: "#6f3146"
//   },
//   {
//     productImg: "https://assets.ajio.com/medias/sys_master/root/20240808/BxkN/66b4d3ac6f60443f31f80db1/-473Wx593H-441894767-darkpurple-MODEL.jpg",
//     productName: "Checked Shirt",
//     productDescription: "Men Navy Blue Checked Shirt",
//     productPrice: "₹1,295",
//     productColor: "#1e1624"
//   },
//   {
//     productImg: "https://assets.ajio.com/medias/sys_master/root/20240808/y13v/66b4cd156f60443f31f7eb7b/-473Wx593H-441893887-green-MODEL.jpg",
//     productName: "Casual Shoes",
//     productDescription: "Men Red Casual Shoes",
//     productPrice: "₹2,195",
//     productColor: "#5e7f80"
//   },
//   {
//     productImg: "https://assets.ajio.com/medias/sys_master/root/20240808/STN4/66b4ce7a6f60443f31f7f251/-473Wx593H-442436911-black-MODEL.jpg",
//     productName: "Denim Jeans",
//     productDescription: "Men Blue Denim Jeans",
//     productPrice: "₹1,799",
//     productColor: "#161618"
//   },
//   {
//     productImg: "https://assets.ajio.com/medias/sys_master/root/20240808/xSNl/66b4e56f1d763220fa6ad0c7/-473Wx593H-442194574-red-MODEL.jpg",
//     productName: "Polo T-Shirt",
//     productDescription: "Men Maroon Polo T-Shirt",
//     productPrice: "₹895",
//     productColor: "#e99599"
//   },
//   {
//     productImg: "https://assets.ajio.com/medias/sys_master/root/20240514/0Zfc/66433ea616fd2c6e6a03b312/-473Wx593H-466070817-maroon-MODEL.jpg",
//     productName: "Leather Belt",
//     productDescription: "Men Black Leather Belt",
//     productPrice: "₹599",
//     productColor: "#a91f2c"
//   },
//   {
//     productImg: "https://assets.ajio.com/medias/sys_master/root/20220729/13gE/62e3ed78aeb26921afac2b68/-473Wx593H-462029786-blue-MODEL3.jpg",
//     productName: "Slim Fit Jeans",
//     productDescription: "Men Light Blue Slim Fit Jeans",
//     productPrice: "₹1,299",
//     productColor: "#c7d3d9"
//   },
// ];
