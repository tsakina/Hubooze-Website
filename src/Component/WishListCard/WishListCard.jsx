import React from 'react';
import './WishListCard.css';

const WishListCard = ({ productImg, productName, productDescription, productPrice, productColor, productId, onRemove }) => {
    const getColorStyle = (color) => {
        let baseColor = color.toLowerCase();
        if (baseColor.startsWith('light-')) {
            baseColor = baseColor.replace('light-', '');
            return {
                backgroundColor: baseColor,
                filter: 'brightness(1.2)',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                marginRight: '10px',
                border: '1px solid #ccc'
            };
        } else if (baseColor.startsWith('dark-')) {
            baseColor = baseColor.replace('dark-', '');
            return {
                backgroundColor: baseColor,
                filter: 'brightness(0.8)',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                marginRight: '10px',
                border: '1px solid #ccc'
            };
        }
        return {
            backgroundColor: color,
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            marginRight: '10px',
            border: '1px solid #ccc'
        };
    };

    const trimDescription = (description) => {
        const words = description.split(' ');
        return words.length > 3 ? words.slice(0, 3).join(' ') + '...' : description;
    };

    // Handle Remove button click
    const handleRemoveClick = () => {
        onRemove(productId); // Call the onRemove function passed from the parent with productId
    };

    return (
        <article className='wishlist-card-container'>
            <section className='wishlist-img-text'>
                <div id='wishlist-img-div'><img src={productImg} alt={productName} /></div>
                <div id='wishlist-text-div' className='wishlist-card-text'>
                    <h3>{productName}</h3>
                    <p>{trimDescription(productDescription)}</p>
                    <p>{productPrice}</p>
                    <div className='wishlist-color-p'>
                        <p> Color</p>
                        <span style={getColorStyle(productColor)}></span>
                    </div>
                </div>
            </section>
            <section id='wishlist-button-div' className='wishlist-buttons'>
                <button id='wishlist-buy-btn'>Buy Now</button>
                <div id='wishlist-second-btn'>
                    <button id='wishlist-add-btn'>Add to Cart</button>
                    <button id='wishlist-remove-btn' onClick={handleRemoveClick}>Remove</button>
                </div>
            </section>
        </article>
    );
};

export default WishListCard;


// import React from 'react';
// import './WishListCard.css';

// const WishListCard = ({ productImg, productName, productDescription, productPrice, productColor }) => {
//     // Function to get a color for the circle
//     const getColorStyle = (color) => {
//         let baseColor = color.toLowerCase();

//         if (baseColor.startsWith('light-')) {
//             baseColor = baseColor.replace('light-', '');
//             return {
//                 backgroundColor: baseColor,
//                 filter: 'brightness(1.2)', // Make it lighter
//                 width: '20px',
//                 height: '20px',
//                 borderRadius: '50%',
//                 display: 'inline-block',
//                 marginRight: '10px',
//                 border: '1px solid #ccc'
//             };
//         } else if (baseColor.startsWith('dark-')) {
//             baseColor = baseColor.replace('dark-', '');
//             return {
//                 backgroundColor: baseColor,
//                 filter: 'brightness(0.8)', // Make it darker
//                 width: '20px',
//                 height: '20px',
//                 borderRadius: '50%',
//                 display: 'inline-block',
//                 marginRight: '10px',
//                 border: '1px solid #ccc'
//             };
//         }

//         return {
//             backgroundColor: color,
//             width: '20px',
//             height: '20px',
//             borderRadius: '50%',
//             display: 'inline-block',
//             marginRight: '10px',
//             border: '1px solid #ccc'
//         };
//     };

//     const trimDescription = (description) => {
//         const words = description.split(' ');
//         if (words.length > 3) {
//             return words.slice(0, 3).join(' ') + '...';
//         }
//         return description;
//     };

//     return (
//         <div className='wishlist-card-container'>
//            <div className='wishlist-img-text'>
//            <div id='wishlist-img-div'><img src={productImg} alt={productName} /></div>
//             <div id='wishlist-text-div' className='wishlist-card-text'>
//                 <h3>{productName}</h3>
//                 <p>{trimDescription(productDescription)}</p>
//                 <p>{productPrice}</p>
//                 <div className='wishlist-color-p'>
//                    <p> Color</p>
//                     <span style={getColorStyle(productColor)}></span>
//                     {/* {productColor} */}
//                 </div>
//             </div>
//            </div>
//             <div id='wishlist-button-div' className='wishlist-buttons'>
//                 <div><button id='wishlist-buy-btn'>Buy Now</button></div>
//                 <div id='wishlist-second-btn'>
//                     <button id='wishlist-add-btn'>Add to Cart</button>
//                     <button id='wishlist-remove-btn'>Remove</button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default WishListCard;