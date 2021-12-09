import React from "react";
import Nomination from "./Nomination/Nomination";
import "./Nominations.css"
import axios from "axios";
import Modal from "../Modal/Modal"
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

class Nominations extends React.Component{
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
      };

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
    }

    async componentWillMount() {
        await this.getNominations()
        this.setNominations()
    }

    voting = (nomination) => {
        const { cookies } = this.props;
        const token = cookies.get('id_token')
        const domen = `http://localhost:3001`;
        axios.post(domen, {
            idToken: token,
            nomination: nomination,
            nomineeID: 3
        })
            .catch(err=>{console.log(err)})
        // let content = [];
        // content.push(<Modal/>);
   return <Modal/>
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
                    {this.state.used.map((item) =>
                        <div className="forms"><Nomination label={item.title || item} buttonText={buttonText} onClick={() => {
                        if (!this.props.nominants){
                            window.location.href = "/vote/"+item.link
                        } else {
                            ModalWindow();
                            // voting(item.link);

                        }
                        }}/></div>)}
                </div>
                
            </div>
            
            )
    }
};

export default withCookies(Nominations);

//перенес в класс
function voting(nomination) {

    //alert("голос+1");
    const domen = `http://localhost:3001`;
    axios.post(domen, {
        googleID: 1,
        nomination: nomination,
        nomineeID: 3
    })
        .catch(err=>{console.log(err)})
    // let content = [];
    // content.push(<Modal/>);
   return <Modal/>
}

function ModalWindow() {

return <Modal/>

}
