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
        const { cookies } = this.props;
        //добавляем куки id_token
        const token = cookies.get('id_token');
        if(token!=="undefined"){
            console.log(undefined===true)
            this.setState({'loggedIn': true})
            console.log(this.state.loggedIn)
        }
    }

    responseGoogle = (response) => {
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
        this.setState({'loggedIn': false})
    }

    handleVkResponse = (data) => {
        const { cookies } = this.props;
        const token = data.uid
        cookies.set('id_token', token, { path: '/' });
        //посылаем на бек запрос с response.googleId
        axios.post(domen + "/api/voted/login", {
            googleID: token,
            })
            .then(res=>console.log(res))
            .catch(err=>console.error(err))
        this.setState({'loggedIn': true})
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
                        <Login buttonStyle={buttonStyle}></Login> 
                        :
                        <CustomButton onClick={this.logout} text={'Выйти'} style={buttonStyle} disabled={''}></CustomButton> 
                    }
               </>
                :
                <>
                {!this.state.loggedIn 
                        ? 
                        <Login buttonStyle={buttonStyleMobile}></Login> 
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



