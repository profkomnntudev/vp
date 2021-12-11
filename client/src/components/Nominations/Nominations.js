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
            events:[],
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
        let stud=[];
        let teach=[];
        let event=[];
        await axios.get(domen+ "/api/nominations")
            .then(res=>{
                for(let i=0;i<res.data.length;i++){
                    if(res.data[i]['teacher'] ==='student'){
                        stud.push(res.data[i]);
                    }
                    if(res.data[i]['teacher'] ==='teacher'){
                        teach.push(res.data[i]);
                    }
                    if(res.data[i]['teacher'] ==='event'){
                        event.push(res.data[i]);
                    }
                }
                this.setState({students:stud, teachers: teach, events: event});
                //console.log(this.state.students);
            })

    }

    setNominations(){
        this.setState({used: this.props.nominants ? this.props.nominants : this.props.isEvent ? this.state.events : this.props.isStudent? this.state.students: this.state.teachers})
    }

    async componentWillMount() {
        await this.getNominations()
        this.setNominations()
        if (this.props.nominants) {
            this.checkVoting(this.props.nomination)
        }
    }

    voting = (nomination, id) => {
        const { cookies } = this.props;
        const token = cookies.get('id_token');
        axios.post(domen+"/api/voted/getVote", {
            idToken: token,
            nomination: nomination,
            nomineeID: id
        })
            .catch(err=>{console.log(err)})
        this.checkVoting(nomination)
    }

    handleOpenModal = () => {
        this.setState({'showModal': true})
    }

    checkVoting = (nomination) => {
        const { cookies } = this.props;
        const token = cookies.get('id_token');
        axios.put(domen+"/api/voted/checkNomination", {
            idToken: token,
            nomination: nomination
        })
        .then((res)=>{
            this.setState({'votedFor': res.data.id})
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
        return (
            <div className="nominations">
                {!this.props.nominants && <div className="text">
                    {this.props.isStudent ? "Номинации для студентов" : this.props.isTeacher ? "Номинации для преподавателей" : "Мероприятия"}
                </div>}
                <div className="formBlock">
                    {this.state.used.map((item) =>
                        <div className="forms">
                            <Nomination story={item.story ? item.story : ""} img={item.img ? window.location.origin + '/nominants/'+item.img : window.location.origin + '/sampleDude.png'} label={item.title || item.name} buttonText={buttonText} isNominant={!!this.props.nominants} isNonActive={!!this.state.votedFor} isActiveButton={this.state.votedFor === 0} choosen={item.id===this.state.votedFor} onClick={() => {
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
                {this.state.votedFor && <div className="nonActive">*Вы уже проголосовали в данной категории</div>}
            </div>
            
            )
    }
};

export default withCookies(Nominations);
