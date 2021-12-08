import React from "react";
import CustomButton from "../../CustomButton/CustomButton";
import "./Nomination.css"
import sample from "../../../static/sampleDude.png"

class Nomination extends React.Component{
    render(){
        let buttonStyle = {
            bottom: "-50px",
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
                <CustomButton text={this.props.buttonText} disabled={false} onClick={this.props.onClick} style={buttonStyle}/>
            </div>
        )
    }
};

export default Nomination;
