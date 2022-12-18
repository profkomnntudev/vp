import React from "react";
import Nomination from "./Nomination/Nomination";
import "./Nominations.css"
import axios from "axios";
 import Modal from "../Modal/Modal"
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import {domen} from "../../App"
import device from "current-device"


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
        let stud=[];
        let teach=[];
        let event=[];
        await axios.get(domen+ "/api/nominations")
            .then(res=>{
                for(let i=0;i<res.data.length;i++){
                    if(res.data[i]['teacher'] ==='Студент'){
                        stud.push(res.data[i]);
                    }
                    if(res.data[i]['teacher'] ==='Преподаватель'){
                        teach.push(res.data[i]);
                    }
                    if(res.data[i]['teacher'] ==='Мероприятие'){
                        event.push(res.data[i]);
                    }
                }
                this.setState({students:stud, teachers: teach, events: event});
            })

    }

    setNominations(){
        this.setState({used: 
            this.props.nominants 
            ? this.props.nominants 
            : this.props.isEvent 
                ? this.state.events 
                : this.props.isStudent 
                    ? this.state.students 
                    : this.state.teachers
        })
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
        const token = localStorage.token;
        const hash = localStorage.hash;
        axios.post(domen+"/api/voted/getVote", {
            vkId: token,
            nomination: nomination,
            nomineeID: id,
            hash: hash,
        })
        this.checkVoting(nomination)
    }

    handleOpenModal = () => {
        this.setState({'showModal': true})
    }

    checkVoting = (nomination) => {
        const { cookies } = this.props;
        const token = localStorage.token;
        const hash = localStorage.hash;
        if(token){axios.put(domen+"/api/voted/checkNomination", {
            vkId: token,
            nomination: nomination,
            hash: hash,
        })
        .then((res)=>{
            this.setState({'votedFor': res.data.id})
        })}

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
        const isTabletOrMobile = device.type == 'mobile'
        let buttonText = this.props.nominants ? "Проголосовать" : "Открыть";
        return (
            <>
            {!isTabletOrMobile ? <div className="nominations">
                {!this.props.nominants && <div className="nomtext">
                    {this.props.isStudent ? "Номинации для студентов" : this.props.isTeacher ? "Номинации для преподавателей" : "Мероприятия"}
                </div>}
                <div className="formBlock">
                    {this.state.used.map((item) => {
                        let name = item.title || item.name
                        if (name === "Самый медийный") name = "Самый инновационный"
                        return (
                          <div className="forms">
                                <Nomination 
                                story={item.story ? item.story : ""} 
                                img={item.img ? window.location.origin + '/nominants/'+item.img : window.location.origin + '/sampleDude.png'} 
                                label={name} 
                                buttonText={buttonText} 
                                isNominant={!!this.props.nominants} 
                                isNonActive={!!this.state.votedFor} 
                                isActiveButton={this.state.votedFor === 0} 
                                choosen={item.id===this.state.votedFor} 
                                onClick={() => {
                            if (!this.props.nominants){
                                window.location.href = "/vote/"+item.link
                            } else {
                                this.handleSetItem(item)
                                this.handleOpenModal()
                            }
                            }}/>

                            </div>  
                        )
                    }
                        
                        )}
                </div>
                <Modal votingFunc={this.voting} showModal={this.state.showModal} close={this.handleCloseModal} cancel={this.handleCancelModal} name={this.state.choosedItem.name}/>
                {this.state.votedFor && <div className="nonActive">*Вы уже проголосовали в данной категории</div>}
            </div> : 
            <div className="nominationsMobile">
                {!this.props.nominants && <div className="nomtextmob">
                    {this.props.isStudent ? "Номинации для студентов" : this.props.isTeacher ? "Номинации для преподавателей" : "Мероприятия"}
                </div>}
                <div>
                {this.state.used.map((item) => {
                        let name = item.title || item.name
                        if (name === "Самый медийный") name = "Самый инновационный"
                        return (
                          <div className="forms">
                                <Nomination 
                                story={item.story ? item.story : ""} 
                                img={item.img ? window.location.origin + '/nominants/'+item.img : window.location.origin + '/sampleDude.png'} 
                                label={name} 
                                buttonText={buttonText} 
                                isNominant={!!this.props.nominants} 
                                isNonActive={!!this.state.votedFor} 
                                isActiveButton={this.state.votedFor === 0} 
                                choosen={item.id===this.state.votedFor} 
                                onClick={() => {
                            if (!this.props.nominants){
                                window.location.href = "/vote/"+item.link
                            } else {
                                this.handleSetItem(item)
                                this.handleOpenModal()
                            }
                            }}/>

                            </div>  
                        )
                    }
                        
                        )}
                </div>
                <Modal votingFunc={this.voting} showModal={this.state.showModal} close={this.handleCloseModal} cancel={this.handleCancelModal} name={this.state.choosedItem.name}/>
                {this.state.votedFor && <div className="nonActive">*Вы уже проголосовали в данной категории</div>}
            </div>}
            </>
            )
    }
};

export default withCookies(Nominations);
