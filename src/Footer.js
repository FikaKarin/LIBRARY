import React from "react";
import './Footer.css'
import { SiInstagram } from 'react-icons/si';
import { SiFacebook } from 'react-icons/si';
import { SiTwitter } from 'react-icons/si';
import { SiReddit } from 'react-icons/si';

/**
 * Footer component
 * @returns Contact info
 */
function Footer() {

  return (
 <div className="footer">
   
     Contact: Sebastian Miles
     <p><a href="mailto:hege@example.com">hoodbook@example.com</a></p>
     <p className="rightFooter"><SiInstagram /> <SiFacebook /> <SiTwitter /> <SiReddit /></p>
        
 </div>
  )
}

export default Footer;
