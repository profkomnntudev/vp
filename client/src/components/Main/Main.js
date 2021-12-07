import React from 'react';
import axios from "axios";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

class Main extends React.Component{

    componentDidMount() {
    }
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <button onClick={this.signIn}>Log in</button>
                    <button onClick={this.signOut}>Log out</button>
                </header>
            </div>
        )
    }
}
//     render() {
//         return(
//             // <div>
//             //     <Header/>
//             //     <div>Main page</div>
//             //     <button onClick={this.signIn}>Log in</button>
//             //     <button onClick={this.signOut}>Log out</button>
//             //     <Footer/>
//             // </div>
//
//         )
//             };
// }
export default Main;
