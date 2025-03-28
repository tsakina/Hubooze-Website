import React, { useState, useEffect } from 'react';
import './Item.css';
import { Link } from 'react-router-dom';

const Item = (props) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  console.log(props.productId)

  // Ensure that props.image is an array and not undefined or null
  const images = props.image && Array.isArray(props.image) ? props.image : [];

  // Handle automatic image sliding when hovered
  useEffect(() => {
    let interval;
    if (isHovered && images.length > 0) {
      interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 1500); // Change image every 1.5 seconds
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval); // Clean up the interval when not hovering or unmounting
  }, [isHovered, images.length]);
  
 

  return (
    <div
      className='item'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/products/${props.productId}`} key={props._id}>
        <div className='cart'>
          <span id='shopping_cart' className="material-symbols-outlined">add_shopping_cart</span>
        </div>

        {/* Display the current image based on the hover effect */}
        {images.length > 0 ? (
          <img className='imagehandler' src={images[currentImageIndex]} alt={props.name} />
        ) : (
          <div className="no-image-placeholder">No Image Available</div>
        )}

        <p className="item-name">{props.name}</p>
        <div className="item-prices-row">
          <div className="item-price-old">
            ₹{props.market_price}
          </div>
          <div className="item-price-new">
            <b>₹{props.selling_price}</b>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Item;
