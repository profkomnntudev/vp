import React from 'react';
import { GoogleLogin } from 'react-google-login';

class Header extends React.Component{

    responseGoogle = (response) => {
        console.log(response);
      }

    render() {
        return(
            <div>
                Header
                <GoogleLogin
                    clientId="1040836497320-5l8asulqvqgv0a01jp6caoesdc7a59lq.apps.googleusercontent.com"
                    buttonText="Войти через Google"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />,
            </div>
        )
    };
}
export default Header;
