import React from 'react';
import VK, { Auth } from "react-vk";
import CustomButton from '../CustomButton/CustomButton';
import "./Header.css"
import axios from "axios";
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import {domen} from "../../App"
import device from "current-device"
import Login from '../Login/Login';

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

    componentDidMount() {
        //добавляем куки id_token
        const token = localStorage.token;
        if(token){
            this.setState({'loggedIn': true})
        }
    }

    logout = () => {
        //чистим куки
        localStorage.clear()
        this.setState({'loggedIn': false})
        window.location.href = '/'
    }

    login = () => {
        this.setState({'loggedIn': true})
        window.location.href = '/'
    }



    render() {
        let buttonStyle = {
            left: "calc(50% - 220px/2 + 488px)",
            outline: "none",
            top: "16px"
        }
        let buttonStyleMobile = {
            position: "absolute",
            right: "20px",
            outline: "none",
            top: "16px",
            width: "122px",
            heigth: "20px"
        }

        const isTabletOrMobile = device.type == 'mobile'
        return (
            
            <div className="header">
                {!isTabletOrMobile ? 
                <>
                    <img src={window.location.origin + '/logo.svg'} className={"logo"}/>
                    {!this.state.loggedIn 
                        ? 
                        <Login buttonStyle={buttonStyle} login={this.login}></Login> 
                        :
                        <CustomButton onClick={this.logout} text={'Выйти'} style={buttonStyle} disabled={''}></CustomButton> 
                    }
               </>
                :
                <>
                {!this.state.loggedIn 
                        ? 
                        <Login buttonStyle={buttonStyleMobile} login={this.login} isMobile={true}></Login> 
                        :
                        <CustomButton onClick={this.logout} text={'Выйти'} style={buttonStyleMobile} disabled={''}></CustomButton> 
                    }
                <img src={window.location.origin + '/logo.svg'} className={"logo"}/>
                </>}
            </div>
        )
    };
}

export default withCookies(Header);



