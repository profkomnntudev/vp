import React from "react";
import ReactModal from 'react-modal';
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
        return (
            <div>
                {!isTabletOrMobile ? <ReactModal isOpen={this.props.showModal} style={{
                    content: {
                        width: '1196px',
                        height: '350px',
                        top: '30%',
                        left: '17.5%',
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
                    <div className="modalName">ОБО МНЕ</div>
                    <div className="modalStory">{this.props.story}</div>
                    <div className="modalStoryButton"><CustomButton onClick={this.props.close} style={buttonStyle} text={'Назад'} disabled={""}></CustomButton></div>
                </ReactModal> : 
                <ReactModal isOpen={this.props.showModal} style={{
                    content: {
                        width: '350px',
                        height: '350px',
                        top: '30%',
                        left: 'auto',
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
                    <div className="modalName">ОБО МНЕ</div>
                    <div className="modalStory">{this.props.story}</div>
                    <div className="modalStoryButton"><CustomButton onClick={this.props.close} style={buttonStyle} text={'Назад'} disabled={""}></CustomButton></div>
                </ReactModal>}
            </div>
        );
    }
}
export default HistoryModal;
 