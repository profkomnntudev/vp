import React from 'react';
import Nominations from '../Nominations/Nominations';
import Sponsors from '../Sponsors/Sponsors';
import "./Main.css"
import device from "current-device"

class Main extends React.Component{

    componentDidMount() {
    }
    render() {
        const isTabletOrMobile = device.type == 'mobile'
        return (
            <div className="App">
                {!isTabletOrMobile ? <div>
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
                    <div className="text" style={{fontSize:"20px",marginLeft:"calc(50% - 1196px/2)", marginTop:"72px", marginBottom:"-152px"}}>*Для голосования войдите в систему</div>
                <Nominations isStudent={true} nominants={false}/>
                <Nominations isTeacher={true} nominants={false}/>
                <Nominations isEvent={true} nominants={false}/>
                <Sponsors/>
                </div> : 
                <div>
                    <div className="name">
                        Время первых
                    </div>
                    <div className="desc">
                        ЕЖЕГОДНАЯ ПРЕМИЯ
                    </div>
                    <div className="text" style={{fontSize:"20px",marginLeft:"50%", marginTop:"72px", marginBottom:"-152px"}}>*Для голосования войдите в систему</div>
                <Nominations isStudent={true} nominants={false}/>
                <Nominations isTeacher={true} nominants={false}/>
                <Nominations isEvent={true} nominants={false}/>
                <Sponsors/>
                </div>
                }

            </div>
        )
    }
}

export default Main;
