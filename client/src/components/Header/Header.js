import React from 'react';
import {GoogleLogin, GoogleLogout} from 'react-google-login';
import CustomButton from '../CustomButton/CustomButton';
import logo from "../../static/logo.svg"
import "./Header.css"
import axios from "axios";

class Header extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            'loggedIn': false
        }
    }

    responseGoogle = (response) => {
        console.log(response);
        console.log(response.profileObj)
        //добавляем куки access_token
        //посылаем на бек запрос с acess_token
        this.setState({'loggedIn': true})
    }

    logout = (response) => {
        //чистим куки от access_token
        this.setState({'loggedIn': false})
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
                {!this.state.loggedIn ? 
                <GoogleLogin
                    clientId="1040836497320-5l8asulqvqgv0a01jp6caoesdc7a59lq.apps.googleusercontent.com"
                    render={renderProps => (
                        <CustomButton text={"Войти"} disabled={renderProps.disabled} onClick={renderProps.onClick}
                                      style={buttonStyle}/>
                    )}
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                    cookiePolicy={'single_host_origin'}
                /> 
                :
                <GoogleLogout
                    clientId="1040836497320-5l8asulqvqgv0a01jp6caoesdc7a59lq.apps.googleusercontent.com"
                    buttonText="Logout"
                    render={renderProps => (
                        <CustomButton text={"Выйти"} disabled={renderProps.disabled} onClick={renderProps.onClick}
                                      style={buttonStyle}/>
                    )}
                    onLogoutSuccess={this.logout}
                    >
                </GoogleLogout>}
            </div>
        )
    };
}

export default Header;