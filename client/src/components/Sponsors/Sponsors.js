import React from "react";
import "./Sponsors.css"

function importAll(r) {
    return r.keys().map(r);
  }
  

class Sponsors extends React.Component{
    render(){
        const sponsors = importAll(require.context('../../static/sponsors', false, /\.(png|jpe?g|svg)$/));
        console.log(sponsors[0].default)
        return (
            <div className="sponsors">
                <div className="text">
                    Наши партнеры
                </div>
                <div className="formBlockSponsors">
                    {sponsors.map((sponsor) => <div className="partners"><img src={sponsor.default}></img></div>)}
                </div>
                
            </div>
            
            )
    }
};

export default Sponsors;
