import React from 'react';
import "./Footer.css"
import device from "current-device"

class Footer extends React.Component{
    render() {
        const isTabletOrMobile = false
        return(<>
            {!isTabletOrMobile &&<div className="footer">
                <img src={window.location.origin + '/logo.svg'} className={"footerlogo"}/>
            </div>}
            </>
        )
    };
}
export default Footer;
