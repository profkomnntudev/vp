import React from 'react';
import Nominations from '../Nominations/Nominations';
import VotingIsOver from '../VotingIsOver/VotingIsOver';
import "./Main.css"
import device from "current-device"

class Main extends React.Component{

    componentDidMount() {
    }
    render() {
        const isTabletOrMobile = device.type == 'mobile'
        const isOver = Date.now() < Date.parse('2021-12-13T22:00:00')
        return (
            <div className="App">
                {
                    !isOver ? 
                    <>
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
                </div> : 
                <div>
                    <div className="bannerMobile">
                    <div className="nameMobile">
                        Время первых
                    </div>
                    <div className="descMobile">
                        ЕЖЕГОДНАЯ ПРЕМИЯ
                    </div>
                    </div>
                    <div className="textMobile" style={{fontSize:"20px", marginLeft:"auto", marginTop:"72px"}}>*Для голосования войдите в систему</div>
                <Nominations isStudent={true} nominants={false}/>
                <Nominations isTeacher={true} nominants={false}/>
                <Nominations isEvent={true} nominants={false}/>
                </div>
                }
                    </> :
                    <>
                        <VotingIsOver isMobile={isTabletOrMobile}/>
                    </>
                }
                

            </div>
        )
    }
}

export default Main;
