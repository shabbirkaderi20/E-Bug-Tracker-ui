/* eslint-disable react/jsx-pascal-case */
import React, {Component} from "react";
import { ToggleButton, ToggleButtonGroup} from '@mui/material';
import {Card, CardImg, CardImgOverlay, CardBody, CardTitle, Breadcrumb, BreadcrumbItem} from 'reactstrap';
import { bugBaseUrl } from '../../shared/baseUrl';
import { Loading } from '../LoadingComponent';
import {Link} from 'react-router-dom';
import '../../customs/AdminBug.css';
import { Button,
    Modal, ModalHeader, ModalBody, Label, Col, Row } from 'reactstrap';
import {Control, LocalForm, Errors} from 'react-redux-form';
import axios from "axios";

const required= (val) => val && val.length;
const maxLength= (len) => (val) => !(val) || (val.length <= len);
const minLength= (len) => (val) => (val) && (val.length >= len);

function RenderMenuItem({bug}) { 
    
    let title;
    let severity;
    
    if(bug.status === 'solved') {
        title= (<div><span className='dot'/></div>); 
    }else if(bug.status === 'assigned') {
        title= (<div><span className='holo'/></div>);
    }else if(bug.status === 'pending') {
        title= (<div><span className='reddot'/></div>);
    }

    if(bug.severity === 'high') {
        severity= (<i style={{"color": "red"}}>High</i>); 
    }else if(bug.severity === 'medium') {
        severity= (<i style={{"color": "rgb(253, 228, 0)"}}>Medium</i>);
    }else if(bug.severity === 'low') {
        severity= (<i style={{"color": "green"}}>Low</i>);
    }else {
        severity= (<i style={{"color": "grey"}}>undefined</i>);
    }

    return (
        <Card style= {{"width": "430px", "box-shadow": "2px 2px 10px black"}}>
            <Link to= {`/client-bug/${bug.bugId}`}>
                <CardImg width= "100%" src= {bugBaseUrl+ `/bugImageById/${bug.bugId}`} alt= {bug.imageName} style= {{"width": "100%", "height": "300px"}}/>
                <CardImgOverlay>
                    <CardTitle style= {{"textAlign": "left"}}>
                        {title}
                    </CardTitle>
                </CardImgOverlay>
                <CardBody style= {{"textAlign": "left"}}>
                    Bug for Project id : {bug.projectId} &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;
                    severity : {severity}
                </CardBody>
            </Link>
        </Card>
        );
}

export default class ClientBug extends Component {

    constructor(props) {
        super();

        this.state= {
            alignment: 'all',
            isModalOpen: false
        }

        this.viewBugs= this.viewBugs.bind(this);
        this.toggleModal= this.toggleModal.bind(this);
        this.handleBug= this.handleBug.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    handleBug(values) {

        this.toggleModal();

        var bugDto= {
            "bugNote" : values.bugNote,
            "severity": values.severity,
            "projectId": values.projectId  
        }

        const img = new FormData() 
        img.append('file', values.selectedFile)

        let data = {bugDto, img};

        let headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }

        axios.post("http://localhost:9004/bugs/addBug", data, headers)
        .then(response => {
            alert("bug added successfully");
            window.location.reload(true);
        })
        .catch(error => {
            alert("login unsuccessful :"+ JSON.stringify(error.message))
        });

    }

    viewBugs() {

        let menu;

        if(this.state.alignment === "all") {
            menu= this.props.bugs.map((bug)=> {
                return (<div key= {bug.bugId} className='col-12 col-md-5 m-1' style={{"padding": "30px"}}>
                    <RenderMenuItem bug= {bug}/>
                </div>);
                });
        }else if(this.state.alignment === "assigned") {
                menu= this.props.bugs.filter((bug) => bug.status === "assigned").map((bug)=> {
                    return (<div key= {bug.bugId} className='col-12 col-md-5 m-1' style={{"padding": "30px"}}>
                        <RenderMenuItem bug= {bug}/>
                    </div>);
                 }); 
        }else if(this.state.alignment === "pending") {
                menu= this.props.bugs.filter((bug) => bug.status === "pending").map((bug)=> {
                    return (<div key= {bug.bugId} className='col-12 col-md-5 m-1' style={{"padding": "30px"}}>
                        <RenderMenuItem bug= {bug}/>
                    </div>);
                 }); 
        }

        if (this.props.bugsLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (this.props.bugsErrMess) {
            return(
                <div className="container">
                    <div className="row"> 
                        <div className="col-12">
                            <h4>{this.props.bugErrMess}</h4>
                        </div>
                    </div>
                </div>
            );
        }else {
            return (<div className='container'style={{"paddingLeft": "30px"}}>
                <div className='row'>
                    {menu}
                </div>
            </div>);
        }
    }

    render() {
        return (<div className="container">
            <div className='row col-12'>
                <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to= "/client-home">Dashboard</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>
                            all-bugs
                        </BreadcrumbItem>
                </Breadcrumb>
                <button type="button" class="btn btn-primary"style={{"marginLeft":"auto"}} onClick={this.toggleModal}>Raise Bug</button>
            </div>
            <center><div>
            <ToggleButtonGroup
              color="primary"
              value={this.state.alignment}
              exclusive
              onChange={(e)=> {
                this.setState({
                    alignment: e.target.value
                })
              }}
              style= {{"paddingBottom": "20px"}}
              >
                <ToggleButton value="all">All Bugs</ToggleButton>
                <ToggleButton value="assigned">Tagged Bugs</ToggleButton>
                <ToggleButton value="pending">Pending Bugs</ToggleButton>
            </ToggleButtonGroup>
            </div></center>
            {this.viewBugs()}

            <Modal isOpen= {this.state.isModalOpen} toggle= {this.toggleModal}>
            <ModalHeader toggle= {this.toggleModal}>Add bug</ModalHeader>
            <ModalBody>
                <LocalForm onSubmit= {(values)=> this.handleBug(values)}>
                <Row className= "form-group">
                      <Col>
                        <Label htmlFor= ".bugNote">Bug note</Label>
                          <Control.textarea model= ".bugNote" 
                            id= "bugNote" 
                            name= "bugNote" 
                            className= "form-control" 
                            placeholder= "Bug note"
                            validators={{
                              required, maxLength: maxLength(50), minLength: minLength(20)
                          }}/>
                          <Errors className= "text-danger" 
                            model= ".username" 
                            show= "touched" 
                            messages= {{
                            required: "Required",
                            maxLength: "Cannot be greater than 50 characters",
                            minLength: "Must br greater than 20 characters"
                          }}/>
                      </Col>
                      </Row>
                      <Row className= "form-group">
                          <Col>
                          <Label htmlFor= "severity">Severity</Label>
                              <Control.select model= ".severity" 
                              name= "severity" 
                              className= "form-control">
                                  <option value="low">Low</option>
                                  <option value="medium">Medium</option>
                                  <option value="high">High</option>
                              </Control.select>
                          </Col>
                      </Row>
                      <Row className= "form-group">
                      <Col>
                        <Label htmlFor= ".projectId">Project Id</Label>
                          <Control.text model= ".projectId" 
                            id= "projectId" 
                            name= "projectId" 
                            className= "form-control" 
                            placeholder= "Project Id"
                            validators={{
                              required
                          }}/>
                          <Errors className= "text-danger" 
                            model= ".projectId" 
                            show= "touched" 
                            messages= {{
                            required: "Required"
                          }}/>
                      </Col>
                    </Row>
                      <Row className= "form-group">
                      <Col>
                        <Label htmlFor= ".image">Snippet</Label>
                          <Control.file model= ".image" 
                            id= "image" 
                            name= "image" 
                            className= "form-control" 
                            placeholder= "Path to image"
                            validators={{
                              required
                          }}/>
                          <Errors className= "text-danger" 
                            model= ".image" 
                            show= "touched" 
                            messages= {{
                            required: "Required"
                          }}/>
                      </Col>
                    </Row>
                    <br/>
                    <Button type= "submit" value= "submit" color= "primary">Raise</Button>
                </LocalForm>
            </ModalBody>
          </Modal>
        </div>);
    }
}