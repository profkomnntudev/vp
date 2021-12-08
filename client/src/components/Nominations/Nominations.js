import React from "react";
import Nomination from "./Nomination/Nomination";
import "./Nominations.css"
import axios from "axios";

class Nominations extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            teachers : [],
            students : [],
            used : [],
        };
    }
    async getNominations(){
        const domen = `http://localhost:3001`;
        await axios.get(domen+ "/api/nominations")
            .then(res=>{
                for(let i=0;i<res.data.length;i++){
                    if(res.data[i]['teacher']  ===false){
                        this.state.students.push(res.data[i]);
                    }
                    else{
                        this.state.teachers.push(res.data[i]);
                    }
                }
            })

    }

    setNominations(){
        this.setState({used: this.props.nominants ? this.props.nominants : this.props.isStudent ? this.state.students : this.state.teachers})
        console.log(this.state.used[0])
    }

    async componentWillMount() {
        await this.getNominations()
        this.setNominations()
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
        console.log(this.state.used)
        let buttonText = this.props.nominants ? "Проголосовать" : "Открыть";
        return (
            <div className="nominations">
                {!this.props.nominants && <div className="text">
                    {this.props.isStudent ? "Номинации для студентов" : "Номинации для преподавателей"}
                </div>}
                <div className="formBlock">
                    {this.state.used.map((item) =>
                        <div className="forms"><Nomination label={item.title || item} buttonText={buttonText} onClick={() => {
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
