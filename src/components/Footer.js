
/*import {
    FaAt,
    FaInstagram,
    FaGithub,
    FaTwitter,
    FaLinkedin
} from 'react-icons/fa';
import {
    FooterContainer,
    FooterWrap,
    SocialMedia,
    SocialMediaWrap,
    SocialLogo,
    SocialIcons,
    SocialIconLink
} from './FooterElements';


const Footer = () => {
    return(
        <FooterContainer>
            <FooterWrap>
                <SocialMedia>
                    <SocialMediaWrap>
                        <SocialLogo to="/">EatzzZ by Sairam Nomula</SocialLogo>
                        <SocialIcons>
                        <SocialIconLink 
                            href="/" target="_blank" aria-label="Email" rel="noopener noreferrer">
                                <FaAt />
                            </SocialIconLink>
                            <SocialIconLink 
                            href="https://www.instagram.com/sairam_nomula/" target="_blank" aria-label="Instagram" rel="noopener noreferrer">
                                <FaInstagram />
                            </SocialIconLink>
                            <SocialIconLink 
                            href="https://github.com/SairamNomula" target="_blank" aria-label="GitHub" rel="noopener noreferrer">
                                <FaGithub />
                            </SocialIconLink>
                            <SocialIconLink 
                            href="https://www.linkedin.com/in/sairam-nomula-8aa752192/" target="_blank" aria-label="LinkedIn" rel="noopener noreferrer">
                                <FaLinkedin />
                            </SocialIconLink>
                            <SocialIconLink 
                            href="https://www.twitter.com/in/Sairamnomula11?s=08" target="_blank" aria-label="LinkedIn" rel="noopener noreferrer">
                                <FaTwitter />
                            </SocialIconLink>
                            
                        </SocialIcons>
                    </SocialMediaWrap>
                </SocialMedia>
            </FooterWrap>
        </FooterContainer>
    )
}

export default Footer;
*/

/*   kkkkk
import React from "react";
import { RiFacebookCircleFill } from "react-icons/ri";
import { RiInstagramFill } from "react-icons/ri";
import { AiFillTwitterCircle } from 'react-icons/ai';
import { RiTelegramFill } from 'react-icons/ri';
import "../style/footer.css"

export default function Footer() {
    return (
        <div className="footer-dark" style={{marginTop:"200px",backgroundColor:"#ff3333"}} >
            <footer >
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 item text" style={{color:"#DEB887"}}>
                            <h3>About Our App</h3>
                            <p>Our Restaurant Location App helps you find the nearest Restaurant in your area quickly and easily.</p>
                            <p>With detailed information on each Restaurant, including hours of operation, contact information, and services offered, our app makes it easy to find the right Restaurant for your needs.</p>
                        </div>

                        <div className="col-sm-6 col-md-3 item">
                            <h3>About Us</h3>
                            <ul>
                                <li><h5 >Company</h5></li>
                                <li><h5>Team</h5></li>
                                <li><h5 >Careers</h5></li>
                            </ul>
                        </div>
                        <div className="col-sm-6 col-md-3 item">
                            <h3>Contact Us</h3>
                            <ul>
                                <li><h6 >Phone: 555-123-4567</h6></li>
                                <li><h6 >Email: info@pharmacylocationapp.com</h6></li>
                                <li><h6 >Address: 123 Main St, Morocco</h6></li>
                            </ul>
                        </div>
                        <div className="col item social">
                            <a href="https://web.telegram.org/z/"><RiTelegramFill/></a>
                            <a href="https://web.telegram.org/z/"><RiFacebookCircleFill/></a>
                            <a href="https://web.telegram.org/z/"><AiFillTwitterCircle/></a>
                            <a href="https://web.telegram.org/z/"><RiInstagramFill/></a>
                            </div>
                    </div>
                    <p className="copyright">Team Restaurant © 2023</p>
                </div>
            </footer>
        </div>
    );
}
*/

import "../style/footer.css"
import React from 'react';
import { RiFacebookCircleFill } from "react-icons/ri";
import { RiInstagramFill } from "react-icons/ri";
import { AiFillTwitterCircle } from 'react-icons/ai';
import { RiTelegramFill } from 'react-icons/ri';

import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBIcon,
  MDBBtn
} from 'mdb-react-ui-kit';

export default function Footer() {
  return (
    
    <MDBFooter className='bg-danger text-center text-dark' style={{marginTop:"200px",backgroundColor:"#dc3545"}}>
        
      <MDBContainer className='p-4 pb-0'>
      <MDBRow>
          <MDBCol lg='6' md='12' className='mb-4 mb-md-0'>
            <h5 className='text-uppercase'>About Our App</h5>

            <p>
            Our Restaurant Location App helps you find the nearest Restaurant in your area quickly and easily.
            </p>
            <p>With detailed information on each Restaurant, including hours of operation, contact information, and services offered, our app makes it easy to find the right Restaurant for your needs.</p>
          </MDBCol>

          <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
            <h5 className='text-uppercase'>Links</h5>

            <ul className='list-unstyled mb-0'>
              <li>
              <a href="https://web.telegram.org/z/"><RiTelegramFill/></a>
                            
                            
                            
               
              </li>
              <li>
              <a href="https://web.telegram.org/z/"><RiFacebookCircleFill/></a>  
               
              </li>
              <li>
                
              </li><a href="https://web.telegram.org/z/"><AiFillTwitterCircle/></a>
              <li>
              <a href="https://web.telegram.org/z/"><RiInstagramFill/></a>
              </li>
            </ul>
          </MDBCol>

          <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
            <h5 className='text-uppercase mb-0'>Links</h5>

            <ul>
                                <li><h6 >Phone: +212 612 450 316</h6></li>
                                <li><h6 >Email: locationRestaurantapp.com</h6></li>
                                <li><h6 >Address: 123 Marrakesh, Morocco</h6></li>
                            </ul>
          </MDBCol>
        </MDBRow>
        <section className='mb-4'>
          <MDBBtn
            floating
            className='m-1'
            style={{ backgroundColor: '#3b5998' }}
            href='#!'
            role='button'
          >
            <MDBIcon fab icon='facebook-f' />
          </MDBBtn>

          <MDBBtn
            floating
            className='m-1'
            style={{ backgroundColor: '#55acee' }}
            href='#!'
            role='button'
          >
            <MDBIcon fab icon='twitter' />
          </MDBBtn>

          <MDBBtn
            floating
            className='m-1'
            style={{ backgroundColor: '#dd4b39' }}
            href='#!'
            role='button'
          >
            <MDBIcon fab icon='google' />
          </MDBBtn>
          <MDBBtn
            floating
            className='m-1'
            style={{ backgroundColor: '#ac2bac' }}
            href='#!'
            role='button'
          >
            <MDBIcon fab icon='instagram' />
          </MDBBtn>

          <MDBBtn
            floating
            className='m-1'
            style={{ backgroundColor: '#0082ca' }}
            href='#!'
            role='button'
          >
            <MDBIcon fab icon='linkedin-in' />
          </MDBBtn>

          <MDBBtn
            floating
            className='m-1'
            style={{ backgroundColor: '#333333' }}
            href='#!'
            role='button'
          >
            <MDBIcon fab icon='github' />
          </MDBBtn>
        </section>
      </MDBContainer>

      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © 2020 Copyright:
        <a className='text-white' href='https://mdbootstrap.com/'>
          MDBootstrap.com
        </a>
      </div>
    </MDBFooter>
  );
}