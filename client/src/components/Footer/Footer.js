import React from 'react';
// import { GoogleLogin } from 'react-google-login';
import CustomButton from '../CustomButton/CustomButton';
import logo from "/logo.svg"
import "./Footer.css"

class Footer extends React.Component{
    render() {
        return(
            <div className="footer">
                <img src={logo} className={"footerlogo"}/>
            </div>
        )
    };
}
export default Footer;
