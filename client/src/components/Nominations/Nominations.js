import React from "react";
import Nomination from "./Nomination/Nomination";
import "./Nominations.css"
import axios from "axios";
 import Modal from "../Modal/Modal"
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import ReactModal from "react-modal";
import CustomButton from "../CustomButton/CustomButton";
import {domen} from "../../App"


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
            votedFor: null,
            showModal: false,
            choosedItem: {
                title: '',
                id: 0
            }
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
                //console.log(this.state.students);
            })

    }

    setNominations(){
        this.setState({used: this.props.nominants ? this.props.nominants : this.props.isStudent ? this.state.students : this.state.teachers})
    }

    async componentWillMount() {
        await this.getNominations()
        this.setNominations()
    }

    voting = (nomination, id) => {
        const { cookies } = this.props;
        const token = cookies.get('id_token');
        console.log(domen+"/api/candidates")
        axios.post(domen+"/api/voted/getVote", {
            idToken: token,
            nomination: nomination,
            nomineeID: id
        })
            .catch(err=>{console.log(err)})
        alert('Ваш голос успешно учтён!');
    }

    handleOpenModal = () => {
        this.setState({'showModal': true})
    }

    checkVoting = (nomination) => {
        const { cookies } = this.props;
        const token = cookies.get('id_token');
        axios.get(domen+"", {
            idToken: token,
            nomination: nomination
        })
        .then((res)=>{
            this.setState({'votedFor': res.id})
        })

    }

    handleCancelModal = () => {
        this.setState({'choosedItem': {
            title: '',
            id: 0
        }})
        this.setState({'showModal': false})
    }

    handleCloseModal = () => {
        this.voting(this.props.nomination, this.state.choosedItem.id)
        this.checkVoting(this.props.nomination)
        this.setState({'showModal': false})
    }

    handleSetItem = (item) => {
        this.setState({'choosedItem': item})
    }

    render(){
        let buttonText = this.props.nominants ? "Проголосовать" : "Открыть";
        const way= window.location.origin + '/nominants/';
        return (
            <div className="nominations">
                {!this.props.nominants && <div className="text">
                    {this.props.isStudent ? "Номинации для студентов" : this.props.isTeacher ? "Номинации для преподавателей" : "Мероприятия"}
                </div>}
                <div className="formBlock">
                    {this.state.used.map((item) =>
                        <div className="forms">
                            <Nomination img={window.location.origin + '/nominants/'+this.props.nominants.img} label={item.title || item.name} buttonText={buttonText} isNominant={!!this.props.nominants} isNonActive={item.id === this.state.votedFor} isActiveButton={this.state.votedFor === 0} onClick={() => {
                        if (!this.props.nominants){
                            window.location.href = "/vote/"+item.link
                        } else {
                            this.handleSetItem(item)
                            this.handleOpenModal()
                        }
                        }}/>

                        </div>
                        )}
                </div>
                <Modal votingFunc={this.voting} showModal={this.state.showModal} close={this.handleCloseModal} cancel={this.handleCancelModal} name={this.state.choosedItem.name}/>
            </div>
            
            )
    }
};

export default withCookies(Nominations);
