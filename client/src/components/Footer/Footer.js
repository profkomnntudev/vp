import React from 'react';
import "./Footer.css"
import { useMediaQuery } from 'react-responsive'

class Footer extends React.Component{
    render() {
        const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
        return(<>
            {!isTabletOrMobile &&<div className="footer">
                <img src={window.location.origin + '/logo.svg'} className={"footerlogo"}/>
            </div>}
            </>
        )
    };
}
export default Footer;
