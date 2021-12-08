import React from 'react';
import {GoogleLogin} from 'react-google-login';
import CustomButton from '../CustomButton/CustomButton';
import logo from "../../static/logo.svg"
import "./Header.css"
import axios from "axios";

class Header extends React.Component {

    responseGoogle = (response) => {
        console.log(response);
    }


    render() {
        let buttonStyle = {
            left: "calc(50% - 220px/2 + 488px)",
            outline: "none",
            top: "16px"
        }
        return (
            <div className="header">
                <img src={logo} className={"logo"}/>
                <GoogleLogin
                    clientId="1040836497320-5l8asulqvqgv0a01jp6caoesdc7a59lq.apps.googleusercontent.com"
                    buttonText="Войти через Google"
                    render={renderProps => (
                        <CustomButton text={"Войти"} disabled={renderProps.disabled} onClick={renderProps.onClick}
                                      style={buttonStyle}/>
                    )}
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
            </div>
        )
    };
}

export default Header;
