import React from 'react';
import Nominations from '../Nominations/Nominations';
import Sponsors from '../Sponsors/Sponsors';
import "./Vote.css"

class Votes extends React.Component{
    constructor(props){
        super(props);
        this.choose = "";
    }

    componentDidMount() {
    }

    render() {
        console.log(this.props)
        return (
            <div className="App">
                <div>
                   <div>
                       <a href="/">Главная</a> / {}
                   </div>
                <Sponsors/> 
                </div>
            </div>
        )
    }
}

function Vote() {
    //ЕБУЧИЙ РЕАКТ РОУТЕР БЛЯТЬ ЗАСТАВИЛ ИСПОЛЬЗОВАТЬ ЕБАНЫЙ ВИНДОВ ЛОКАТИОН СУКА
    const  voteId  = window.location.pathname.split("/")[2];
    let title = ""
    switch(voteId){
        case "activeOfTheYear":
            title = "Активист года"
            //тут спарсить номинантов
            break
        case "politehnikOfTheYear":
            title = "Политехник года"
            //тут спарсить номинантов
            break
        case "theMostKind":
            title = "Самый умный"
            //тут спарсить номинантов
            break
        case "theMostInventive":
            title = "Самый изобретательный"
            //тут спарсить номинантов
            break
        case "sportsmanOfTheYear":
            title = "Спортсмен года"
            //тут спарсить номинантов
            break
        case "theMostStylish":
            title = "Самый стильный"
            //тут спарсить номинантов
            break
        case "bestLector":
            title = "Лучший лектор"
            //тут спарсить номинантов
            break
        case "theMostPositive":
            title = "Самый позитивный"
            //тут спарсить номинантов
            break
        case "theMostInnovative":
            title = "Самый инновационный"
            //тут спарсить номинантов
            break
        case "teacherOfTheYear":
            title = "Преподаватель года"
            //тут спарсить номинантов
            break
    }   
    let nominants = ["Иван Иванов", "Иван Иванов", "Иван Иванов", "Иван Иванов", "Иван Иванов"]
    return (
        <div className="App">
            <div>
               <div className="link">
                   <a href="/">Главная</a> / {title}
               </div>
                <div className="text" style={{marginLeft: "122px", marginTop: "93px", marginBottom: "-110px"}}>
                    {title}
                </div>
                <div  className="intro">
                Уважаемые посетители! Свой голос можно отдать только за одного участника конкурса. Пожалуйста, будьте внимательны при выборе кандидата, так как после нажатия на кнопку Прголосовать, изменить свой выбор уже будет невозможно. Спасибо за участие!
               </div>
            <Nominations nominants={nominants}/>
            <Sponsors/> 
            </div>
        </div>
    )
}

export default Vote;
