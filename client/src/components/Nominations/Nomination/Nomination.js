import React from "react";
import CustomButton from "../../CustomButton/CustomButton";
import HistoryModal from "../../historyModal/historyModal";
import "./Nomination.css"
import sample from "../../../static/sampleDude.png"


class Nomination extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            showModal: false
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
            background: "linear-gradient(0deg, #F5E5C0, #F5E5C0)"
        }
        
        const buttonStyle = {
            bottom: this.props.isNominant ? "-8px" : "-40px",
            left: "11px",
            width: "180px",
            heigth: "40px"
        }
        return(
            <div className={"nomination"}>
                <span className="label">{this.props.label}</span>
                <div className="img">
                    <img  src={this.props.img || sample}/>
                </div>
                {this.props.isNominant && <CustomButton text={"Об участнике"} disabled={false} onClick={this.handleOpenModal} style={buttonStyleAbout}/>}
                <CustomButton text={this.props.buttonText} disabled={false} onClick={this.props.onClick} style={buttonStyle}/>
                <HistoryModal name={this.props.name || 'sample name'} story={this.props.story || 'sample story'} showModal={this.state.showModal} close={this.handleCloseModal} />
            </div>
        )
    }
};

export default Nomination;
// function ModalWindow() {
//     return <Modal/>
// }
