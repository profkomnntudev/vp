import React from 'react';
import {GoogleLogin, GoogleLogout} from 'react-google-login';
import CustomButton from '../CustomButton/CustomButton';
import "./Header.css"
import axios from "axios";
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import {domen} from "../../App"

class Header extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
      };
    constructor(props){
        super(props);
        this.state = {
            'loggedIn': false
        }
    }

    responseGoogle = (response) => {
        console.log(response)
        const { cookies } = this.props;
        //добавляем куки id_token
        cookies.set('id_token', response.tokenId, { path: '/' });
        //посылаем на бек запрос с response.googleId
        axios.post(domen + "/api/voted/login", {
            googleID: response.googleId,
            })
            .then(res=>console.log(res))
            .catch(err=>console.error(err))
        this.setState({'loggedIn': true})
    }

    logout = () => {
        const { cookies } = this.props;
        //чистим куки
        cookies.remove('id_token');
        cookies.remove('G_ENABLED_IDPS');
        cookies.remove('G_AUTHUSER_H');
        this.setState({'loggedIn': false})
    }


    render() {
        let buttonStyle = {
            left: "calc(50% - 220px/2 + 488px)",
            outline: "none",
            top: "16px"
        }
        console.log(window.location.origin)
        return (
            <div className="header">
                <img src={window.location.origin + '/logo.svg'} className={"logo"}/>
                {!this.state.loggedIn ? 
                <GoogleLogin
                    clientId="1040836497320-u9e9nufpbcga9bf6jqbunv0ji321464p.apps.googleusercontent.com"
                    render={renderProps => (
                        <CustomButton text={"Войти"} disabled={renderProps.disabled ? "Disabled" : ""} onClick={renderProps.onClick}
                                      style={buttonStyle}/>
                    )}
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                    cookiePolicy={'single_host_origin'}
                /> 
                :
                <GoogleLogout
                    clientId="1040836497320-u9e9nufpbcga9bf6jqbunv0ji321464p.apps.googleusercontent.com"
                    buttonText="Logout"
                    render={renderProps => (
                        <CustomButton text={"Выйти"} disabled={renderProps.disabled ? "Disabled" : ""} onClick={renderProps.onClick}
                                      style={buttonStyle}/>
                    )}
                    onLogoutSuccess={this.logout}
                    >
                </GoogleLogout>}
            </div>
        )
    };
}

export default withCookies(Header);
