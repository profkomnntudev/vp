import React from "react";
import CustomButton from "../../CustomButton/CustomButton";
import HistoryModal from "../../historyModal/historyModal";
import { withCookies, Cookies } from 'react-cookie';
import "./Nomination.css"


class Nomination extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            showModal: false,
            buttonDisabled: false
        }
    }

    handleOpenModal = () => {
        this.setState({'showModal': true})
    }

    handleCloseModal = () => {
        this.setState({'showModal': false})
    }

    render(){
        const { cookies } = this.props;
        const token = cookies.get('id_token');
        const buttonStyleAbout = {
            outline: "none",
            width: "180px",
            height: "40px",
            left: "20px",
        }
        
        const buttonStyle = {
            bottom: this.props.isNominant ? "-8px" : "-40px",
            left: "20px",
            width: "180px",
            heigth: "40px",
        }
        const additionalClassName = this.props.isNonActive || !token ? "Disabled" : ""
        const additionalClassNameTitle = !this.props.choosen && (this.props.isNonActive || !token) ? "Disabled" : ""
        return(
            <div className={"nomination"}>
                <span className={"label"+additionalClassNameTitle}>{this.props.label}</span>
                <div className="img">
                    <img className={"img"} src={this.props.img || window.location.origin + '/sampleDude.png'}/>
                </div>
                {this.props.isNominant && <CustomButton text={"Об участнике"} disabled={""} onClick={this.handleOpenModal} style={buttonStyleAbout}/>}
                <CustomButton text={this.props.buttonText} disabled={additionalClassName} onClick={this.props.onClick} style={buttonStyle}/>
                <HistoryModal name={"Обо мне"} story={this.props.story || ""} showModal={this.state.showModal} close={this.handleCloseModal} />
            </div>
        )
    }
};

export default withCookies(Nomination);
// function ModalWindow() {
//     return <Modal/>
// }