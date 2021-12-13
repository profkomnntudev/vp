import React from 'react';

class VotingIsOver extends React.Component{
    render() {
        let additionalClassName = this.props.isMobile ? "Mobile" : ""
        return(
        <>
            <div className={"text"+additionalClassName}>
               Голосование окончено. Всем спасибо за участие!
            </div>
            </>
        )
    };
}
export default VotingIsOver;
