import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageSlider from '../ImageSlider/ImageSlider';
import Item from '../Item/Item';
import './ProductSection.css'; // Rename the CSS file to be generic

const ProductSection = ({ category }) => {
    const [openDropdown, setOpenDropdown] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [products, setProducts] = useState([]); // State to store fetched products
    const [filteredProducts, setFilteredProducts] = useState([]); // For filtered products
    const [filters, setFilters] = useState({
        category: category || '',
        subcategory: '',
        type: [],
        brand: [],
        size: [],
        color: [],
        minPrice: '',
        maxPrice: ''
    });

    const toggleDropdown = (dropdown) => {
        setOpenDropdown(openDropdown === dropdown ? null : dropdown);
    };

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        if (category) {
            axios.get(`http://192.168.1.109:3000/api/products/category/${category}`)
                .then(response => {
                    console.log('API Response:', response.data); // Log the response to check it
                    const data = response.data;
                    // Check if the response data is an array
                    if (data.success && Array.isArray(data.products)) {
                        data.products.forEach(product => {
                            console.log('Product:', product); // Check individual product fields
                            console.log('Product ID:', product._id); // Check if _id exists
                            console.log('Product Image:', product.image); // Check if image exists
                        });
                      
                        setProducts(data.products);
                    } else {
                        console.error('Unexpected API response:', data);
                        setProducts([]);
                    }
                })
                .catch(error => {
                    console.error('Error fetching products:', error);
                    setProducts([]);  // Set products to an empty array on error
                });
        }
    }, [category]);

    // Filter products based on selected filters
    useEffect(() => {
        const filtered = products.filter(product => {
            const matchesSubcategory = !filters.subcategory || product.subcategory === filters.subcategory;
            const matchesType = filters.type.length === 0 || filters.type.includes(product.type);
            const matchesBrand = filters.brand.length === 0 || filters.brand.includes(product.brand);
            const matchesSize = filters.size.length === 0 || filters.size.includes(product.size);
            const matchesColor = filters.color.length === 0 || filters.color.includes(product.color);
            const matchesMinPrice = !filters.minPrice || product.selling_price >= filters.minPrice;
            const matchesMaxPrice = !filters.maxPrice || product.selling_price <= filters.maxPrice;

            return matchesSubcategory && matchesType && matchesBrand && matchesSize && matchesColor && matchesMinPrice && matchesMaxPrice;
        });
        setFilteredProducts(filtered);
    }, [filters, products]);

    // Handle changes in checkboxes and other filters
    const handleFilterChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            setFilters(prevFilters => {
                const values = prevFilters[name] || [];
                if (checked) {
                    return { ...prevFilters, [name]: [...values, value] };
                } else {
                    return { ...prevFilters, [name]: values.filter(v => v !== value) };
                }
            });
        } else {
            setFilters(prevFilters => ({
                ...prevFilters,
                [name]: value
            }));
        }
    };

    if (!category) {
        return <div>Error: No section provided</div>;
    }

    const images = [
        'https://via.placeholder.com/800x400.png?text=Free+Shipping',
        'https://via.placeholder.com/800x400.png?text=Exclusive+Offer',
        'https://via.placeholder.com/800x400.png?text=Shop+Now',
    ];

    return (
        <div>
            <ImageSlider images={images} />
            <h1 className='heading'>New Arrivals: Sale up to 50% Off!</h1>
            <button className=" btn relative" onClick={toggleNavbar}>
            {isOpen ? (
              <span>
                <h1>Filters -</h1>
              </span>
            ) : (
              <span>
                <h1>Filters + </h1>
              </span>
            )}
          </button>
            <div className="main-content">
          
                <div className="category-container category-container-hide ">
                    <h1>Filters</h1>
                    <hr />
                    <div className={`dropdown ${openDropdown === 'type' ? 'active' : ''}`}>
                        <h1 className='aside-options' onClick={() => toggleDropdown('type')}>
                            Type <span>{openDropdown === 'type' ? '−' : '+'}</span>
                        </h1>
                        <div className="dropdown-content">
                            <label> Ethnic <input type="checkbox" name="type" onChange={handleFilterChange} /></label>
                            <label> Western  <input type="checkbox" name="type" onChange={handleFilterChange} /></label>
                            <label> Sports  <input type="checkbox" name="type" onChange={handleFilterChange} /></label>
            
                        </div>
                    </div>
                    <hr />
                    <div className={`dropdown ${openDropdown === 'subcategory' ? 'active' : ''}`}>
                        <h1 onClick={() => toggleDropdown('subcategory')}>
                            Subcategory <span>{openDropdown === 'subcategory' ? '−' : '+'}</span>
                        </h1>
                        <div className="dropdown-content">
                            <label> Shirt <input type="checkbox" name="subcategory" value="Shirt" onChange={handleFilterChange} /></label>
                            <label> T-Shirt <input type="checkbox" name="subcategory" value="T-Shirt" onChange={handleFilterChange} /></label>
                            <label> Kurta-Set <input type="checkbox" name="subcategory" value="Kurta-Set" onChange={handleFilterChange} /></label>
                            <label> Dress <input type="checkbox" name="subcategory" value="Dress" onChange={handleFilterChange} /></label>
                        </div>
                    </div>
                    <hr />
                    <div className={`dropdown ${openDropdown === 'brand' ? 'active' : ''}`}>
                        <h1 onClick={() => toggleDropdown('brand')}>
                            Brand <span>{openDropdown === 'brand' ? '−' : '+'}</span>
                        </h1>
                        <div className="dropdown-content">
                        
                            <label> Zara <input type="checkbox" name="brand" onChange={handleFilterChange} /></label>
                            <label> Nike <input type="checkbox" name="brand" onChange={handleFilterChange} /></label>
                            <label> Addidas <input type="checkbox" name="brand" onChange={handleFilterChange} /></label>
            
                        </div>
                    </div>
                    <hr />

                    <div className={`dropdown ${openDropdown === 'color' ? 'active' : ''}`}>
                        <h1 onClick={() => toggleDropdown('color')}>
                            Color <span>{openDropdown === 'color' ? '−' : '+'}</span>
                        </h1>
                        <div className="dropdown-content">
                            <label> Red <input type="checkbox" name="color" value="Red" onChange={handleFilterChange} /></label>
                            <label> Blue <input type="checkbox" name="color" value="Blue" onChange={handleFilterChange} /></label>
                            <label> Black <input type="checkbox" name="color" value="Black" onChange={handleFilterChange} /></label>
                        </div>
                    </div>
                    <hr />
    
                    <div className={`dropdown ${openDropdown === 'size' ? 'active' : ''}`}>
                        <h1 onClick={() => toggleDropdown('size')}>
                            Sizes <span> {openDropdown === 'size' ? '−' : '+'}</span>
                        </h1>
                        <div className="dropdown-content">         
                            <label> S <input type="checkbox" name="size" value="S" onChange={handleFilterChange} /></label>
                            <label> M <input type="checkbox" name="size" value="M" onChange={handleFilterChange} /></label>
                            <label> L <input type="checkbox" name="size" value="L" onChange={handleFilterChange} /></label>
                            <label> XL <input type="checkbox" name="size" value="XL" onChange={handleFilterChange} /></label>
                            <label> Onesize <input type="checkbox" name="size" value="Onesize" onChange={handleFilterChange} /></label>
                        </div>
                    </div>
                    <hr />
                    <div className="dropdown">
                        <h1>Price Range</h1>
                        <div className="dropdown-content">
                            <label>Min Price: <input type="number" name="minPrice" value={filters.minPrice} onChange={handleFilterChange} /></label>
                            <label>Max Price: <input type="number" name="maxPrice" value={filters.maxPrice} onChange={handleFilterChange} /></label>
                        </div>
                    </div>
                    
                    
                </div>
                
                <div className="shopCategory-product product-grid">
                    {filteredProducts.map(product => (
                        <Item
                            key={product._id}
                            productId={product._id} // Ensure you're passing this
                            name={product.name}
                            image={product.image}
                            market_price={product.market_price}
                            selling_price={product.selling_price}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProductSection;
