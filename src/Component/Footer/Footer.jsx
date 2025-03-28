import React from "react";
import "./Footer.css";

// Importing images
// Importing images
import linkedinIcon from '../Assets/images/linkdein.png';
import twitterIcon from '../Assets/images/twitter.png';
import instagramIcon from '../Assets/images/instagram_icon.png';
import whatsappIcon from '../Assets/images/whatsapp_icon.png'; // Example additional icon
import youtubeIcon from '../Assets/images/youtube.png'

function Footer() {
  return (
    <>
    
  <footer>
    <div className="wrapper">
      <div className="footer">
        <div className="social-icons">
          <div className="footer-icon-container">
            <a href="https://www.instagram.com/hubooze.in/"><img src={instagramIcon} alt="Instagram"/></a>
          </div>
          <div className="footer-icon-container">
            <a href="https://wa.me/919004908382" target="_blank" rel="noopener noreferrer" ><img src={whatsappIcon} alt="WhatsApp" /></a>
          </div>
          <div className="footer-icon-container">
            <a href="https://x.com/hubooze66918?t=n4uL3ChyMBNbNw-8FciodA&s=09"><img src={twitterIcon} alt="Twitter"/></a>
          </div>
          <div className="footer-icon-container">
            <a href="https://www.linkedin.com/company/hubooze/posts/?feedView=all"><img src={linkedinIcon} alt="facebook"/></a>
          </div>
          <div className="footer-icon-container">
            <a href="https://www.bing.com/ck/a?!&&p=77b16271602701d6JmltdHM9MTcyNjQ0NDgwMCZpZ3VpZD0yYTY4MmUwMC04MGZmLTYwYzUtMmI3YS0zYWE0ODE2NDYxMDkmaW5zaWQ9NTE5NA&ptn=3&ver=2&hsh=3&fclid=2a682e00-80ff-60c5-2b7a-3aa481646109&psq=Hubooze+youtube&u=a1aHR0cHM6Ly93d3cueW91dHViZS5jb20vQGh1Ym9vemU&ntb=1"><img src={youtubeIcon} alt="youtube"/></a>
          </div>
        </div>

        <div className="footer-links">
          <a href="/about">ABOUT US</a>
          <a href="/careers">CAREERS</a>
          <a href="/employees">EMPLOYEES</a>
          <a href="/policy">POLICY</a>
          <a href="/terms-and-conditions">TERMS & CONDITIONS</a>
          <a href="/press-releases">PRESS RELEASE</a>
          <a href="/blogs">BLOGS</a>
        </div>

        <div className="footerlogo">
          <a href="/" className="footer-logo-link">
            <p>Hubooze.in</p>
          </a>
        </div>

        <div className="footer-copyright">
          <hr />
          <p>Copyright @ 2024 - All Rights Reserved.</p>
          <p>Powered by hubooze</p>
        </div>

      </div>
    </div>
  </footer>
    </>
  );
}

export default Footer;