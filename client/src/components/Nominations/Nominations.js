import React from "react";
import Nomination from "./Nomination/Nomination";
import "./Nominations.css"
import axios from "axios";

class Nominations extends React.Component{
    teachers =[];
    students = [];
    async getNominations(){
        const domen = `http://localhost:3001`;
        await axios.get(domen+ "/api/nominations")
            .then(res=>{
                console.log(res.data.length);
                for(let i=0;i<res.data.length;i++){
                    //console.log(res.data[i].teacher);
                    if(res.data[i]['teacher']  ===false){
                        this.students.push(res.data[i]);
                    }
                    else{
                        this.teachers.push(res.data[i]);
                    }
                }
               console.log(this.teachers);
               console.log(this.students);
            })

    }
    async componentDidMount() {
        await this.getNominations();
        // console.log(this.students);
        // console.log(this.teachers);
    }

    render(){
        // let students = [
        //         {
        //             title: "АКТИВИСТ ГОДА",
        //             link: "activeOfTheYear"
        //         },
        //         {
        //             title: "ПОЛИТЕХНИК ГОДА",
        //             link: "politehnikOfTheYear"
        //         },
        //         {
        //         title: "САМЫЙ УМНЫЙ",
        //         link: "theMostKind"
        //     },
        //     {
        //         title: "САМЫЙ ИЗОБРЕТАТЕЛЬНЫЙ",
        //         link: "theMostInventive"
        //     },
        //     {
        //         title: "СТУДЕНТ ГОДА",
        //         link: "sportsmanOfTheYear"
        //     }
        // ];
        // let teachers = [
        //     {
        //         title: "САМЫЙ СТИЛЬНЫЙ",
        //         link: "theMostStylish"
        //     },
        //     {
        //         title: "ЛУЧШИЙ ЛЕКТОР",
        //         link: "bestLector"
        //     },
        //     {
        //         title: "САМЫЙ ПОЗИТИВНЫЙ",
        //         link: "theMostPositive"
        //     },
        //     {
        //         title: "САМЫЙ ИННОВАЦИОННЫЙ",
        //         link: "theMostInnovative"
        //     },
        //     {
        //         title: "ПРЕПОДАВАТЕЛЬ ГОДА",
        //         link: "teacherOfTheYear"
        //     },
        // ];
        let used = this.props.nominants ? this.props.nominants : this.props.isStudent ? this.students : this.teachers;
        // console.log(this.students);
        // console.log(this.teachers);
        let buttonText = this.props.nominants ? "Проголосовать" : "Открыть";
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

function Voting() {

}
