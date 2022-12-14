import React from 'react';
import VK, { Auth } from "react-vk";
import CustomButton from '../CustomButton/CustomButton';
import axios from "axios";
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import {domen} from "../../App"
import Modal from 'react-modal';
import './Login.css'
import device from "current-device"



class Login extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
      };
    constructor(props){
        super(props);
        this.state = {
            'modalIsOpen': false
        }
        this.closeModal = this.closeModal.bind(this)
        this.openModal = this.openModal.bind(this)
    }

    openModal = () => {
        this.setState({
          modalIsOpen: true,
        });
      };
    
    closeModal = () => {
        this.setState({
          modalIsOpen: false,
          run: false,
        });
      };

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
        this.closeModal();
    }

    render() {
        const { modalIsOpen} = this.state;
        const customStyles = {
            content: {
                width: 350,
                height: 500,
                margin: 'auto',
              maxHeight: '70%',
              textAlign: 'center',
              display: 'flex',
                justifyContent: 'center',
                backgroundImage: 'url("https://vremya-pervih.ru/static/media/background.995ec146d1d0f3eced5f.jpg")',
                borderRadius: '10px',
            },
          };
        return (
            <>
            <CustomButton onClick={this.openModal} text={'Войти'} style={this.props.buttonStyle} disabled={''}></CustomButton>
            <Modal
                ariaHideApp={false}
                isOpen={modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                contentLabel="Example Modal"
                style={customStyles}
                >
                    <div className={'loginWhrapper'}>
                        <div className='loginWhrapper__text'>Войти через ВК</div>
                        <VK apiId={51502517}>
                            <Auth options={{width: 100, onAuth: this.handleVkResponse}}/>
                        </VK> 
                    </div>
            </Modal>
            </>
        )
    }
}

export default withCookies(Login);
