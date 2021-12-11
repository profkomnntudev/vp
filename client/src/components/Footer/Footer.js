import React from 'react';
// import { GoogleLogin } from 'react-google-login';
import "./Footer.css"

class Footer extends React.Component{
    render() {
        return(
            <div className="footer">
                <img src={window.location.origin + '/logo.svg'} className={"footerlogo"}/>
            </div>
        )
    };
}
export default Footer;
