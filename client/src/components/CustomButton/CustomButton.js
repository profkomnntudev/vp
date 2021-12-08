import React from "react";
import "./CustomButton.css"

class CustomButton extends React.Component{
    render(){
        return(
            <button className="customButton" style={this.props.style} disabled={this.props.disabled} onClick={this.props.onClick}>
            <div>{this.props.text}</div>
        </button>
        )
    }
}

export default CustomButton;
