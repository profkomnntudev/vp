import React from 'react';
import Nominations from '../Nominations/Nominations';
import Sponsors from '../Sponsors/Sponsors';
import "./Main.css"

class Main extends React.Component{

    componentDidMount() {
    }
    render() {
        return (
            <div className="App">
                <div>
                   <div className="banner">
                    <div className="name">
                        Время первых
                    </div>
                    <div className="desc">
                        ЕЖЕГОДНАЯ ПРЕМИЯ
                    </div>
                    <div className={"banner-img"}>
                        <img className={"banner-img"} src={window.location.origin + '/banner.png'}></img>
                    </div>
                </div>
                <Nominations isStudent={true} nominants={false}/>
                <Nominations isTeacher={true} nominants={false}/>
                <Nominations nominants={false}/>
                <Sponsors/>
                </div>

            </div>
        )
    }
}

export default Main;
