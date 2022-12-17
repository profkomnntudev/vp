import React from "react";
import ReactModal from 'react-modal';
import device from "current-device"
import CustomButton from "../CustomButton/CustomButton";
import "./historyModal.css"

const buttonStyle = {
    outline: "none",
    width: "220px",
    height: "40px",
}

class HistoryModal extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            showModal: false,
        }
    }
    handleOpenModal = () => {
        this.setState({'showModal': true})
    }

    handleCloseModal = () => {
        this.setState({'showModal': false})
    }
    render () {
        const isTabletOrMobile = device.type == 'mobile'
        const customStyles = {
            content: {
              width: isTabletOrMobile ? 320 : 1196,
              height: 500,
              marginLeft: isTabletOrMobile ? '-5vw' : 'auto',
              marginTop: isTabletOrMobile ? 380 + this.props.ind * 340 : 'auto',
              marginRight: isTabletOrMobile ? 0 : 'auto',
              marginBottom: isTabletOrMobile ? 0 : 'auto',
              maxHeight: '70%',
              textAlign: 'center',
              display: 'flex',
              justifyContent: 'center',
              backgroundImage: 'url("https://vremya-pervih.ru/static/media/background.995ec146d1d0f3eced5f.jpg")',
              borderRadius: '10px',
            },
            overlay: {
                width: '100vw'
            }
          };

        const buttonStyleAbout = {
            outline: "none",
            width: "180px",
            height: "40px",
            left: "20px",
        }
        return (
            <div>
                <CustomButton text={"Об участнике"} disabled={""} onClick={this.handleOpenModal} style={buttonStyleAbout}/>
                <ReactModal isOpen={this.state.showModal} style={customStyles}>
                    <div className="aboutWhrapper">
                        <div className="modalName">ОБО МНЕ</div>
                        <div className={isTabletOrMobile ? "modalStoryMobile" : "modalStory"}>{this.props.story}</div>
                        <div className="modalStoryButton">
                            <CustomButton onClick={this.handleCloseModal} style={buttonStyle} text={'Назад'} disabled={""}></CustomButton>
                        </div>
                    </div>
                    
                </ReactModal> 
            </div>
        );
    }
}
export default HistoryModal;
 