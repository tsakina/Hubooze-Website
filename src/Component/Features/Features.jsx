import React from "react";
import "./Features.css";
import Facility1 from '../Assets/images/ad-90-days-return.jpg'; 

function Features() {
  return (
    <section className="section-how" id="how">

      <div>
        <hr style={{ height: '2px', backgroundColor: 'black', border: 'none', marginBottom: '50px' }} />
      </div>

      <div className="container">
        <h2 className="heading-secondary">Enhance your shopping experience with our convenient features</h2>
      </div>

      <div className="container grid grid--3-cols grid--center-v">
        {/* Row 1: Headings */}
        <div className="step-text-box">
          <h3 className="heading-tertiary">90-Day Return Policy</h3>
        </div>
        <div className="step-text-box">
          <h3 className="heading-tertiary">2-Day Delivery</h3>
        </div>
        <div className="step-text-box">
          <h3 className="heading-tertiary">Shipping to Remote Areas</h3>
        </div>

        {/* Row 2: Descriptions */}
        <div className="step-text-box">
          <p className="step-description">
            Shop with confidence knowing you have 90 days to return any item. Your satisfaction is our priority!
          </p>
        </div>
        <div className="step-text-box">
          <p className="step-description">
            Get your purchases swiftly with our fast, 2-day delivery service. No more waiting around for your essentials.
          </p>
        </div>
        <div className="step-text-box">
          <p className="step-description">
            We ensure that even the most remote locations receive our products. Wherever you are, we’ve got you covered!
          </p>
        </div>
      </div>

      {/* Image section below the grid */}
      <div className="feature-img-container">
        <img src={Facility1} className="feature-img" alt="90-Day Return Policy" />
      </div>
    </section>
  );
}

export default Features;
