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
            teachers : [],
            students : [],
            events:[],
        };
    }

    async getNominations(){
        const domen = `https://vremya-pervih.ru/`;
        let stud=[];
        let teach=[];
        let event=[];
        await axios.get(domen+ "/api/nominations")
            .then(res=>{
                for(let i=0;i<res.data.length;i++){
                    if(res.data[i]['teacher'] ==='student'){
                        stud.push(res.data[i]);
                    }
                    if(res.data[i]['teacher'] ==='teacher'){
                        teach.push(res.data[i]);
                    }
                    if(res.data[i]['teacher'] ==='event'){
                        event.push(res.data[i]);
                    }
                }
                this.setState({students:stud, teachers: teach, events: event});
            })

    }
    async getNominants(){
        let tempTitle = ""
        let noms=""
        this.setState({title: tempTitle});
        const domen = `https://vremya-pervih.ru`;
        let nominee = [];
        await  axios.get(domen + "/api/candidates", {
            params:{
                nomination: noms
            }
        })
            .then(res=>{
                for(let i=0;i<res.data.length;i++)
                {
                    nominee.push({'name': res.data[i].name+" "+res.data[i].surname, 'id': res.data[i].id, 'img': res.data[i].img, 'story': res.data[i].about});
                }
                this.setState({nominants: nominee});
            })
    }
    render(){
        return(
            <div className='adminContainer'>
                <Container>
                    <Tab.Container id="ledt-tabs-example" defaultActiveKey={'Посмотреть на номинантов'}>
                        <Row>
                            <Col sm={3}>
                                <Nav variant="pills" className="flex-column mt-5">
                                    <Nav.Item>
                                        <Nav.Link eventKey="Посмотреть на номинантов"> Посмотреть на номинантов </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="Добавить номинанта"> Добавить номинанта </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="Увидеть победителей"> Увидеть победителей </Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Col>
                            <Col sm={9}>
                                <Tab.Content className="mt-5">
                                    <Tab.Pane eventKey="Посмотреть на номинантов">
                                        <h4> Номинанты: </h4>
                                        Студенты:
                                        <Table striped bordered hover>
                                            <thead>
                                                <tr>
                                                <th>#</th>
                                                <th>Name</th>
                                                <th>Photo</th>
                                                <th>Story</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {this.state.students.map((item, i) =>
                                                <tr>
                                                    <td>{i}</td>
                                                    <td>{item.title || item.name}</td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                                )}
                                            </tbody>
                                        </Table>    
                                        Преподаватели:
                                        <Table striped bordered hover>
                                            <thead>
                                                <tr>
                                                <th>#</th>
                                                <th>Name</th>
                                                <th>Photo</th>
                                                <th>Story</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {this.state.teachers.map((item, i) =>
                                                <tr>
                                                    <td>{i}</td>
                                                    <td>{item.title || item.name}</td>
                                                    <td><img className={"img"} src={item.img || window.location.origin + '/sampleDude.png'}/></td>
                                                    <td>{item.story ? item.story : ""}</td>
                                                </tr>
                                                )}
                                            </tbody>
                                        </Table>  
                                        Мероприятия:
                                        <Table striped bordered hover>
                                            <thead>
                                                <tr>
                                                <th>#</th>
                                                <th>Name</th>
                                                <th>Photo</th>
                                                <th>Story</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {this.state.events.map((item, i) =>
                                                <tr>
                                                    <td>{i}</td>
                                                    <td>{item.title || item.name}</td>
                                                    <td><img className={"img"} src={item.img || window.location.origin + '/sampleDude.png'}/></td>
                                                    <td>{item.story ? item.story : ""}</td>
                                                </tr>
                                                )}
                                            </tbody>
                                        </Table> 
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
            </div>
        )
    }
}

export default Admin