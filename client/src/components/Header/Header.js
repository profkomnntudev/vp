import React from 'react';
import VkAuth from 'react-vk-auth';
import CustomButton from '../CustomButton/CustomButton';
import "./Header.css"
import axios from "axios";
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import {domen} from "../../App"
import device from "current-device"

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
        console.log("logout")
        cookies.remove('id_token');
        cookies.remove('G_ENABLED_IDPS');
        cookies.remove('G_AUTHUSER_H');
        this.setState({'loggedIn': false})
    }

    handleVkResponse = (data) => {
            console.warn(data)
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
                    <VkAuth apiId="57b9247157b9247157b92471ee54a8f9c4557b957b924713421a4a49b4a641e4dd99e2f" callback={this.handleVkResponse} />
               </>
                :
                <>
                <VkAuth apiId="51502517" callback={this.handleVkResponse} />
                <img src={window.location.origin + '/logo.svg'} className={"logo"}/>
                </>}
            </div>
        )
    };
}

export default withCookies(Header);
