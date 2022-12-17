import React from 'react';
import { Col, Container, Nav, Tab, Row } from 'react-bootstrap'
import Table from 'react-bootstrap/Table';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "./Admin.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

class Admin extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            isLoading: true,
            isLoggedIn: false,
            code: "",
        };
        this.onSubmit = this.onSubmit.bind(this)
    }
    async getWinners(){
        const domen = `https://vremya-pervih.ru`;
        let data = {};
        await axios.get(domen+ "/api/nominations/result")
            .then(res=>{
                for(let i=0;i<res.data.length;i++){
                    data[res.data[i].nomination] = [...data[res.data[i].nomination] || [], res.data[i]]
                }
                console.log(data)
                this.setState({data: data});
                this.setState({isLoading: false});
            })
    }

    getTable(){
        var objects = []
        for (var nomination in this.state.data){
            console.log(nomination)
            objects.push(
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>{nomination}</th>
                        <th>Фамилия</th>
                        <th>Имя</th>
                        <th>Отчество</th>
                        <th>Количество голосов</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data[nomination].sort((a, b)=> a.countVotes < b.countVotes).map((item, i) => 
                            <tr>
                                <td></td>
                                <td>{item.surname || '-'}</td>
                                <td>{item.name || '-'}</td>
                                <td>{item.patronymic || '-'}</td>
                                <td>{item.countVotes}</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            )
        }
        return objects
    }

    onSubmit(event) {
        event.preventDefault();
        console.log(this.state.code)
        if(this.state.code=='M1sUlRGs'){
            this.setState({isLoggedIn: true})
        }
    }

    async componentWillMount(){
        await this.getWinners()
    }
    render(){
        return(
            <div className='adminContainer'>
                {!this.state.isLoggedIn ? 
                <div className="Auth-form-container">
                    <form className="Auth-form" onSubmit={this.onSubmit}>
                        <div className="Auth-form-content">
                        <h3 className="Auth-form-title">Вход</h3>
                        <div className="form-group mt-3">
                            <label>Код</label>
                            <input
                            type="password"
                            className="form-control mt-1"
                            placeholder="password"
                            onChange={(evt)=>this.setState({code: evt.target.value})}
                            />
                        </div>
                        <div className="d-grid gap-2 mt-3">
                            <button type="submit" className="btn btn-primary">
                            Войти
                            </button>
                        </div>
                        </div>
                    </form>
                </div>
                :
                <Container>
                    <Tab.Container id="ledt-tabs-example" defaultActiveKey={'Посмотреть на номинантов'}>
                        <Row>
                            <Col sm={3}>
                                <Nav variant="pills" className="flex-column mt-5">
                                    <Nav.Item>
                                        <Nav.Link eventKey="Посмотреть на номинантов"> Таблицы лидеров </Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Col>
                            <Col sm={9}>
                                <Tab.Content className="mt-5">
                                    <Tab.Pane eventKey="Посмотреть на номинантов">
                                        {this.state.isLoading &&  
                                        <div className="btnLoader">
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                        </div> }
                                        {!this.state.isLoading && this.getTable().map((item) => item)}
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="Добавить номинанта">
                                        <h4> Добавление номинанта </h4>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="Увидеть победителей">
                                        <h4> Победители: </h4>
                                    </Tab.Pane>
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                </Container>
                }
            </div>
        )
    }
}

export default Admin