import React from "react";
import Nomination from "./Nomination/Nomination";
import "./Nominations.css"

class Nominations extends React.Component{
    render(){
        let students = ["АКТИВИСТ ГОДА", "ПОЛИТЕХНИК ГОДА", "САМЫЙ УМНЫЙ", "САМЫЙ ИЗОБРЕТАТЕЛЬНЫЙ", "СТУДЕНТ ГОДА"];
        let teachers = ["САМЫЙ СТИЛЬНЫЙ", "ЛУЧШИЙ ЛЕКТОР", "САМЫЙ ПОЗИТИВНЫЙ", "САМЫЙ ИННОВАЦИОННЫЙ", "ПРЕПОДАВАТЕЛЬ ГОДА"]

        let used = this.props.isStudent ? students : teachers
        return (
            <div>
                <div className="text">
                    {this.props.isStudent ? "Номинации для студентов" : "Номинации для преподавателей"}
                </div>
                <div className="formBlock">
                    {used.map((title) => <div className="forms"><Nomination label={title} buttonText={"Открыть"}/></div>)}
                </div>
                
            </div>
            
            )
    }
};

export default Nominations;