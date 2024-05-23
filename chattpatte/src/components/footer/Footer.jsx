import React from "react";
import { Link } from 'react-router-dom';
import './footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

export default function Footer(){
  return (
      <>
        <div className="footer_main">
            <div className="logo">
                <h2>chattpatte</h2>
            </div>
            <div className="footer_link">
                <Link to="/">Home</Link>
                <Link to="/">About Us</Link>
                <Link to="/contacts">Contacts</Link>
            </div>
            <div className="socialIcon">
                <a href="#"><FontAwesomeIcon icon={faFacebook}/></a>
                <a href="#"><FontAwesomeIcon icon={faInstagram}/></a>
                <a href="#"><FontAwesomeIcon icon={faLinkedin}/></a>
            </div>
            <p className="copyrightText">©2024, Matina Dongol, all rights reserved.</p>
        </div>
      </>
  );
}