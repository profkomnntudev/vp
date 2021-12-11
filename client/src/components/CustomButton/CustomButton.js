import React from "react";
import "./CustomButton.css"

class CustomButton extends React.Component{
    render(){
        return(
            <button className={"customButton"+this.props.disabled} style={this.props.style} disabled={this.props.disabled === "Disabled"} onClick={this.props.onClick}>
            <div>{this.props.text}</div>
        </button>
        )
    }
}

export default CustomButton;
