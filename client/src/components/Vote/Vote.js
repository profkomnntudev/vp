import React from 'react';
import Nominations from '../Nominations/Nominations';
import Sponsors from '../Sponsors/Sponsors';
import "./Vote.css"
import axios from "axios";
import { withCookies, Cookies } from 'react-cookie';
import {instanceOf} from "prop-types";
import device from "current-device"

class Votee extends React.Component{
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    constructor(props) {
        super(props);
        this.state = {
            nominants: [],
            title:'',
            isLoading: true
        };
    }
    async getNominants(){
        const  voteId  = window.location.pathname.split("/")[2];
        let tempTitle = ""
        let noms=""
        switch (voteId){
            case "activeOfTheYear":
                tempTitle = "Активист года"
                noms=tempTitle;
                break
            case "politehnikOfTheYear":
                tempTitle = "Политехник года"
                noms=tempTitle;
                //тут спарсить номинантов
                break
            case "theMostCreative":
                tempTitle = "Самый творческий"
                noms=tempTitle;
                //тут спарсить номинантов
                break
            case "theMostInventive":
                tempTitle = "Самый изобретательный"
                noms=tempTitle;
                //тут спарсить номинантов
                break
            case "sportsmanOfTheYear":
                tempTitle = "Спортсмен года"
                noms=tempTitle;
                //тут спарсить номинантов
                break
            case "theMostStylish":
                tempTitle = "Самый стильный"
                noms=tempTitle;
                //тут спарсить номинантов
                break
            case "theMostMedia":
                tempTitle = "Самый медийный"
                noms=tempTitle;
                tempTitle = "Самый инновационный"
                //тут спарсить номинантов
                break
            case "bestLector":
                tempTitle = "Лучший лектор"
                noms=tempTitle;
                //тут спарсить номинантов
                break
            case "theSoulOfTheCompany":
                tempTitle = "Душа компании"
                noms=tempTitle;
                //тут спарсить номинантов
                break
            case "teacherOfTheYear":
                tempTitle = "Преподаватель года"
                noms=tempTitle;
                //тут спарсить номинантов
                break
            case "theBestEvent":
                tempTitle = "Лучшее мероприятие"
                noms=tempTitle;
                break
        }
        this.setState({title: tempTitle});
        const domen = `https://vremya-pervih.ru`;
        let nominee = [];
        let photos = [];
        await  axios.get(domen + "/api/candidates", {
            params:{
                nomination: noms
            }
        })
            .then(res=>{
                // console.log(res);
                for(let i=0;i<res.data.length;i++)
                {
                    let name = ""
                    if (res.data[i].surname) name = res.data[i].surname + '\n'
                    name = name + res.data[i].name + " "
                    if (res.data[i].patronymic) name = name + res.data[i].patronymic 
                    nominee.push({'name': name, 'id': res.data[i].id, 'img': res.data[i].img, 'story': res.data[i].about});
                }
                this.setState({nominants: nominee});
            })
        // console.log(this.state.nominants);
    }
    async componentWillMount() {
        await this.getNominants().then(()=>{this.setState({'isLoading': false});})
    }
    render() {
        const isTabletOrMobile = device.type == 'mobile'
        return (
             <div className="App">
               {!isTabletOrMobile ? <div>
                    <div className="link">
                        <a href="/">Главная</a> / {this.state.title}
                    </div>
                    <div className="text" style={{marginLeft: "calc(50% - 1196px/2)", marginTop: "48.5px", marginBottom: "-110px" }} >
                        {this.state.title}
                    </div>
                    <div  className="intro">
                        Уважаемые посетители! Свой голос можно отдать только за одного участника номинации. Пожалуйста, будьте внимательны при выборе кандидата, так как после нажатия на кнопку Проголосовать, изменить свой выбор уже будет невозможно. Спасибо за участие!
                    </div>
                    {this.state.isLoading &&  
                    <div className="btnLoader">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div> }
                    {!this.state.isLoading && <Nominations nominants={this.state.nominants} nomination={this.state.title}/>}
                </div> : 
                <div>
                <div className="link">
                    <a href="/">Главная</a> / {this.state.title}
                </div>
                <div className="text" style={{marginTop: "48.5px", marginBottom: "-110px" }} >
                    {this.state.title}
                </div>
                <div  className="introMobile">
                    Уважаемые посетители! Свой голос можно отдать только за одного участника номинации. Пожалуйста, будьте внимательны при выборе кандидата, так как после нажатия на кнопку Проголосовать, изменить свой выбор уже будет невозможно. Спасибо за участие!
                </div>
                <div style={{marginTop: "60px"}}>
                    {this.state.isLoading &&  
                    <div className="btnLoader">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div> }
                    {!this.state.isLoading && <Nominations nominants={this.state.nominants} nomination={this.state.title}/>}
                </div>
            </div>}
            </div>
        )
    }
}

// async function Vote() {
//     //ЕБУЧИЙ РЕАКТ РОУТЕР БЛЯТЬ ЗАСТАВИЛ ИСПОЛЬЗОВАТЬ ЕБАНЫЙ ВИНДОВ ЛОКАТИОН СУКА
//     const  voteId  = window.location.pathname.split("/")[2];
//     let title = ""
//     let candidate= {name:'', surname:'',patronymic:''};
//     let nominants = [];
//     let noms='';
//     switch(voteId){
//         case "activeOfTheYear":
//             title = "Активист года"
//             noms=title;
//             break
//         case "politehnikOfTheYear":
//             title = "Политехник года"
//             noms=title;
//             //тут спарсить номинантов
//             break
//         case "theMostKind":
//             title = "Самый умный"
//             noms=title;
//             //тут спарсить номинантов
//             break
//         case "theMostInventive":
//             title = "Самый изобретательный"
//             noms=title;
//             //тут спарсить номинантов
//             break
//         case "sportsmanOfTheYear":
//             title = "Спортсмен года"
//             noms=title;
//             //тут спарсить номинантов
//             break
//         case "theMostStylish":
//             title = "Самый стильный"
//             noms=title;
//             //тут спарсить номинантов
//             break
//         case "bestLector":
//             title = "Лучший лектор"
//             noms=title;
//             //тут спарсить номинантов
//             break
//         case "theMostPositive":
//             title = "Самый позитивный"
//             noms=title;
//             //тут спарсить номинантов
//             break
//         case "theMostInnovative":
//             title = "Самый инновационный"
//             noms=title;
//             //тут спарсить номинантов
//             break
//         case "teacherOfTheYear":
//             title = "Преподаватель года"
//             noms=title;
//             //тут спарсить номинантов
//             break
//     }
//     const domen = `http://localhost:3001`;
//     await axios.get(domen + "/api/candidates", {
//         params:{
//             nomination: noms
//         }
//     })
//         .then(res=>{
//             console.log(res);
//             for(let i=0;i<res.data.length;i++)
//             {
//                 candidate = {name:res.data[i].name, surname:res.data[i].surname,patronymic: res.data[i].patronymic};
//                 nominants.push(res.data[i].name+" "+res.data[i].surname);
//             }
//         })
//     console.log(nominants);
//     //let nominants = ["Иван Иванов", "Иван Иванов", "Иван Иванов", "Иван Иванов", "Иван Иванов"]
//     return (
//         <div className="App">
//             <div>
//                <div className="link">
//                    <a href="/">Главная</a> / {title}
//                </div>
//                 <div className="text" style={{marginLeft: "calc(50% - 1196px/2)", marginTop: "48.5px", marginBottom: "-110px" }} >
//                     {title}
//                 </div>
//                 <div  className="intro">
//                 Уважаемые посетители! Свой голос можно отдать только за одного участника номинации. Пожалуйста, будьте внимательны при выборе кандидата, так как после нажатия на кнопку Проголосовать, изменить свой выбор уже будет невозможно. Спасибо за участие!
//                </div>
//             <Nominations nominants={nominants}/>
//             <Sponsors/>
//             </div>
//         </div>
//     )
// }

export default withCookies(Votee);
