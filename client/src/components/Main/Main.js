import React from 'react';
import axios from "axios";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

class Main extends React.Component{
    componentDidMount() {
        axios.get('')
            .then(result=>{
                console.log(result);
                }
            )
    }

    render() {
        return(
            <div>
                <Header/>
                <div>Main page</div>
                <Footer/>
            </div>

        )
            };
}
export default Main;
