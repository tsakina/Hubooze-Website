import React from "react";
import Wethnics from '../Assets/images/saree.jpg'
import Wtraditional from '../Assets/images/kurta_set.jpg'
import Wwestern from '../Assets/images/black-geometric-satin-bell-sleeve-peplum-shirt.jpg'
import Wsports from '../Assets/images/WSports.png'
import Mtshirt from '../Assets/images/men-tshirt.jpeg'
import Mshirt from '../Assets/images/HM_SHIRT_09 (2).jpg'
import Mjeans from '../Assets/images/men-jeans.jpg'
import Methnics from '../Assets/images/men-ethnic.jpg'

import Boy from '../Assets/images/boy.jpg'
import Girl from '../Assets/images/girl.jpg'
import Sports from '../Assets/images/girl-sport.jpg'
import Baby from '../Assets/images/baby.jpg'
import "./Collection.css";

function Collection() {
  return (
    <div>
      <section className="shop-section">
        <span className="subheading SUBHEADING1">Womens Collection</span>
        <div className="shop-images">
          <div className="shop-link">
            <h3>T-Shirts & Jeans</h3>
            <img src={Wwestern} alt="card" />
            {/* <img src="images/Wethnics.jpeg" alt="card" /> */}
            <a href="#">Shop now</a>
          </div>
          <div className="shop-link">
            <h3>Kurta Sets</h3>
            <img src={Wtraditional} alt="card" />
            {/* <img src="images/WTraditional.jpeg" alt="card" /> */}
            <a href="#">Shop now</a>
          </div>
          <div className="shop-link">
            <h3>Sarees</h3>
            <img src={Wethnics} alt="card" />
            {/* <img src="images/Wwestern.jpeg" alt="card" /> */}
            <a href="#">Shop now</a>
          </div>
          <div className="shop-link">
            <h3>Sports</h3>
            <img src={Wsports} alt="card" />
            {/* <img src="images/WSports.png" alt="card" /> */}
            <a href="#">Shop now</a>
          </div>
        </div>
      </section>

      <section className="shop-section">
        <span className="subheading">Mens Collection</span>
        <div className="shop-images">
          <div className="shop-link">
            <h3>Tshirts </h3>
            <img src={Mtshirt} alt="card" />
            {/* <img src="images/Methnics.jpeg" alt="card" /> */}
            <a href="#">Shop now</a>
          </div>
          <div className="shop-link">
            <h3>Shirts</h3>
            <img src={Mshirt} alt="card" />
            {/* <img src="images/MTraditional.jpeg" alt="card" /> */}
            <a href="#">Shop now</a>
          </div>
          <div className="shop-link">
            <h3>Jeans & Trousers</h3>
            <img src={Mjeans} alt="card" />
            {/* <img src="images/Mwestern.jpeg" alt="card" /> */}
            <a href="#">Shop now</a>
          </div>
          <div className="shop-link">
            <h3>Ethnic</h3>
            <img src={Methnics} alt="card" />
            {/* <img src="images/Msports.jpeg" alt="card" /> */}
            <a href="#">Shop now</a>
          </div>
        </div>
      </section>

      <section className="shop-section">
        <span className="subheading">Kids Collection</span>
        <div className="shop-images">
          <div className="shop-link">
            <h3>Boys</h3>
            <img src={Boy} alt="card" />
            {/* <img src="images/Ethnics.jpeg" alt="card" /> */}
            <a href="#">Shop now</a>
          </div>
          <div className="shop-link">
            <h3>Girls</h3>
            <img src={Girl} alt="card" />
            {/* <img src="images/Ethnics.jpeg" alt="card" /> */}
            <a href="#">Shop now</a>
          </div>
          <div className="shop-link">
            <h3>Sports</h3>
            <img src={Sports} alt="card" />
            {/* <img src="images/Western.jpeg" alt="card" /> */}
            <a href="#">Shop now</a>
          </div>
          <div className="shop-link">
            <h3>Baby</h3>
            <img src={Baby} alt="card" />
            {/* <img src="images/Sports.jpeg" alt="card" /> */}
            <a href="#">Shop now</a>
          </div>
        </div>
      </section>
    </div>
  );
} 

export default Collection;