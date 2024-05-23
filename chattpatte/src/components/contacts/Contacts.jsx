import React, { useEffect } from "react";
import './contacts.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faMapMarkerAlt, faPhoneAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';

export default function Contacts(){
    return (
        <>
            <div className="contacts_main">
                <div className="contactForm">
                    <div className="contactFormInsideDiv">
                        <h1>Get in touch</h1>
                        <p>Feel free to drop us a message.</p>
                        <form>
                            <div className="formField">
                                <label>Name</label>
                                <input type="text" placeholder="your full name"/>
                            </div>
                            <div className="formField">
                                <label>Email</label>
                                <input type="email" placeholder="your email address"/>
                            </div>
                            <div className="formField">
                                <label>Message</label>
                                <textarea placeholder="your message"></textarea>
                            </div>
                        </form>
                        <div className="about_buttonDiv">
                            <button className="greenbutton">
                                Send 
                                <FontAwesomeIcon icon={faArrowRight} />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="contactDetails">
                    <h1>Contact Us</h1>
                    <p>Feel free to drop us a message.</p>
                    <div className="contactDescription">
                        <div className="contactDescList">
                            <FontAwesomeIcon icon={faPhoneAlt} />
                            <span>+1 (342) 323 4542</span>
                        </div>
                        <div className="contactDescList">
                            <FontAwesomeIcon icon={faMapMarkerAlt} />
                            <span>73 Duckworth Rd, Cambridge, ON</span>
                        </div>
                        <div className="contactDescList">
                            <FontAwesomeIcon icon={faEnvelope} />
                            <span>dongolmt@gmail.com</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="googleMap">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2899.038707418102!2d-80.38314992360931!3d43.397120371115605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b8a11a4a771e1%3A0x38c4191ded010270!2s73%20Duckworth%20Rd%2C%20Cambridge%2C%20ON%20N3H%205L5!5e0!3m2!1sen!2sca!4v1715202400627!5m2!1sen!2sca"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Google Map"
                />
            </div>
        </>
    );
}