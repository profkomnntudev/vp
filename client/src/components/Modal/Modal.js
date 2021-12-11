import React from "react";
import axios from "axios";
import ReactModal from 'react-modal';
import CustomButton from "../CustomButton/CustomButton";
import './Modal.css'

const customStyles = {
    overlay:{
        height: '265px',
        width: '560px',
        borderRadius: '16px',
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  const buttonStyle = {
    outline: "none",
    width: "220px",
    height: "40px",
}

const buttonStyleCancel = {
    outline: "none",
    width: "220px",
    height: "40px",
    background: '#E7E7E7'
}

class Modal extends React.Component{
    render () {
        return (
            <div>
                <ReactModal isOpen={this.props.showModal} style={{
                    content: {
                        height: '265px',
                        width: '560px',
                    top: '35%',
                    left: '35%',
                    right: 'auto',
                    bottom: 'auto',
                    border: '1px solid #ccc',
                    borderRadius: '16px',
                    background: '#fff',
                    overflow: 'auto',
                    WebkitOverflowScrolling: 'touch',
                    outline: 'none',
                    padding: '20px'
                    }
                }}>
                    <span className="voteText">Вы уверены что хотите проголосовать за</span>
                    <span className="voteName">{this.props.name}</span>
                    <div style={{display: "inline-block", marginLeft:"48px", marginRight:"24px"}}>
                        <CustomButton onClick={this.props.close} style={buttonStyle} text={'Проголосовать'}></CustomButton>
                    </div>
                    <div style={{display: "inline-block"}}>
                    <CustomButton onClick={this.props.cancel} style={buttonStyleCancel} text={'Отмена'}></CustomButton>
                    </div>
                </ReactModal>
            </div>
        );
    }
}
export default Modal;
