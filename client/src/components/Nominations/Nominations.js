import React from "react";
import Nomination from "./Nomination/Nomination";
import "./Nominations.css"

class Nominations extends React.Component{
    render(){
        let students = [
            {
                title: "АКТИВИСТ ГОДА", 
                link: "activeOfTheYear"
            },
            {
                title: "ПОЛИТЕХНИК ГОДА",                
                link: "politehnikOfTheYear"
            }, 
            {
                title: "САМЫЙ УМНЫЙ",                
                link: "theMostKind"
            }, 
            {
                title: "САМЫЙ ИЗОБРЕТАТЕЛЬНЫЙ",                
                link: "theMostInventive"
            }, 
            {
                title: "СТУДЕНТ ГОДА",
                link: "sportsmanOfTheYear"
            }
        ];
        let teachers = [
            {
                title: "САМЫЙ СТИЛЬНЫЙ",                
                link: "theMostStylish"
            }, 
            {
                title: "ЛУЧШИЙ ЛЕКТОР",                
                link: "bestLector"
            }, 
            {
                title: "САМЫЙ ПОЗИТИВНЫЙ",                
                link: "theMostPositive"
            }, 
            {
                title: "САМЫЙ ИННОВАЦИОННЫЙ",                
                link: "theMostInnovative"
            }, 
            {
                title: "ПРЕПОДАВАТЕЛЬ ГОДА",                
                link: "teacherOfTheYear"
            },
        ];
        let used = this.props.nominants ? this.props.nominants : this.props.isStudent ? students : teachers
        let buttonText = this.props.nominants ? "Проголосовать" : "Открыть"
        return (
            <div className="nominations">
                {!this.props.nominants && <div className="text">
                    {this.props.isStudent ? "Номинации для студентов" : "Номинации для преподавателей"}
                </div>}
                <div className="formBlock">
                    {used.map((item) => <div className="forms"><Nomination label={item.title || item} buttonText={buttonText} onClick={() => {
                        if (!this.props.nominants){
                            window.location.href = "/vote/"+item.link
                        } else {
                            //here voting function
                            alert("ТУТ НОМИНАНТЫ НИКУДА НЕ ПЕРЕЙДЕШЬ")
                        }
                    }}/></div>)}
                </div>
                
            </div>
            
            )
    }
};

export default Nominations;
