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
    render () {
        const isTabletOrMobile = device.type == 'mobile'
        const customStyles = {
            content: {
              width: isTabletOrMobile ? 250 : 1196,
              height: 500,
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: 'auto',
              marginBottom: 'auto',
              maxHeight: '70%',
              textAlign: 'center',
              display: 'flex',
              justifyContent: 'center',
              backgroundImage: 'url("https://vremya-pervih.ru/static/media/background.995ec146d1d0f3eced5f.jpg")',
              borderRadius: '10px',
            },
          };
        return (
            <div>
                <ReactModal isOpen={this.props.showModal} style={customStyles}>
                    <div className="aboutWhrapper">
                        <div className="modalName">ОБО МНЕ</div>
                        <div className="modalStory">{this.props.story}</div>
                        <div className="modalStoryButton">
                            <CustomButton onClick={this.props.close} style={buttonStyle} text={'Назад'} disabled={""}></CustomButton>
                        </div>
                    </div>
                    
                </ReactModal> 
            </div>
        );
    }
}
export default HistoryModal;
 