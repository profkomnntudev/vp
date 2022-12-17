import React from 'react';
import "./Footer.css"
import device from "current-device"

class Footer extends React.Component{
    render() {
        const isTabletOrMobile = device.type == 'mobile'
        return(<>
            {!isTabletOrMobile &&<div className="footer">
                <div className='logos'>
                    <a href='https://vk.com/profkomngtu'><img src={window.location.origin + '/logo.svg'} className={"footerlogo"}/></a>
                    <a href='https://onnestories.com/'><img className={"sponsor"} src={window.location.origin + '/sponsors1.png'}/></a>
                    <a href='https://vk.com/public216470918'><img className={"sponsor"} src={window.location.origin + '/sponsors2.png'}/></a>
                </div>
                
            </div>}
            </>
        )
    };
}
export default Footer;
