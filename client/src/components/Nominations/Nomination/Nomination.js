import React from "react";
import CustomButton from "../../CustomButton/CustomButton";
import HistoryModal from "../../historyModal/historyModal";
import { withCookies, Cookies } from 'react-cookie';
import "./Nomination.css"
import sample from "../../../static/sampleDude.png"


class Nomination extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            showModal: false,
            buttonDisabled = false
        }
    }

    handleOpenModal = () => {
        this.setState({'showModal': true})
    }

    handleCloseModal = () => {
        this.setState({'showModal': false})
    }

    render(){
        const buttonStyleAbout = {
            outline: "none",
            width: "180px",
            height: "40px",
            left: "11px",
        }
        
        const buttonStyle = {
            bottom: this.props.isNominant ? "-8px" : "-40px",
            left: "11px",
            width: "180px",
            heigth: "40px",
        }

        const additionalClassName = this.props.isNonActive ? "Disabled" : ""
        return(
            <div className={"nomination"}>
                <span className={"label"+additionalClassName}>{this.props.label}</span>
                <div className="img">
                    <img  src={this.props.img || sample}/>
                </div>
                {this.props.isNominant && <CustomButton text={"Об участнике"} disabled={additionalClassName} onClick={this.handleOpenModal} style={buttonStyleAbout}/>}
                <CustomButton text={this.props.buttonText} disabled={additionalClassName} onClick={this.props.onClick} style={buttonStyle}/>
                <HistoryModal name={this.props.name || 'sample name'} story={this.props.story || 'sample story'} showModal={this.state.showModal} close={this.handleCloseModal} />
                {this.props.isNonActive && <div className="nonActive">*Вы уже проголосовали в данной категории</div>}
            </div>
        )
    }
};

export default withCookies(Nomination);
// function ModalWindow() {
//     return <Modal/>
// }
