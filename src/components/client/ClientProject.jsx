/* eslint-disable react/jsx-pascal-case */
import React, { Component } from 'react';
import '../../customs/AdminProject.css';
import { Loading } from '../LoadingComponent';
import { FadeTransform } from 'react-animation-components';
import { Button} from '@mui/material';
import { Breadcrumb, Label, BreadcrumbItem,Modal,ModalBody,ModalHeader,Col,Row} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Control, LocalForm, Errors} from 'react-redux-form';
import axios from 'axios';
const required= (val) => val && val.length;
export default class ClientProject extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      flipped: false,
      alignment: 'all',
      isModalOpen: false,
      isModalUpdateOpen:false,

    };
    this.flip = this.flip.bind(this);
    this.toggleModal= this.toggleModal.bind(this);
    this.toggleUpdateModal=this.toggleUpdateModal.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
}

toggleUpdateModal() {
  this.setState({
    isModalUpdateOpen: !this.state.isModalUpdateOpen
  });
}


handleSubmit(values) {

  this.toggleModal();

    var pro= {
      clientId: sessionStorage.getItem("userId"),
      projectName: values.projectname,
      startedAt: values.startedat,
      projectInfo:values.projectinfo,
      accessToken: sessionStorage.getItem("accessToken"),

    }
  
    let headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
    axios.post("http://localhost:9003/projects/addProject", pro, headers)
      .then(response =>  {

        console.log(response.data) ;
        
        alert("Project Added Successful")
        
        window.location.reload(true);
      })
      .catch(error => {
        alert("Error in Adding Project :"+ JSON.stringify(error.message))
      });
}

  
handleUpdate(values) {

  this.toggleUpdateModal();

    var updatepro= {
      projectId: this.props.projects,
      projectName: values.projectname,
      projectInfo:values.projectinfo,
      isOnGoing:values.isongoing,
      endedOn:values.endedon,
      accessToken: sessionStorage.getItem("accessToken"),

    }
  
    let headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
    axios.put("http://localhost:9003/projects/updateProject", updatepro, headers)
      .then(response =>  {

        console.log(response.data) ;
        
        alert("Project Updated Successful")
        
        window.location.reload(true);
      })
      .catch(error => {
        alert("Error in Adding Project :"+ JSON.stringify(error.message))
      });
}

   
     flip = () => {
      this.setState({ flipped: !this.state.flipped });
    }

    render(){
        if (this.props.projectsLoading) {
          return(
            <Loading />
          );
        }
        else if (this.props.projectsErrMess) {
          return(
            <h4>{this.props.projectsErrMess}</h4>
          );
        }else {
          return (
            <div>
            <div className='row col-12 custom'>
            <Breadcrumb>
                    <BreadcrumbItem>
                        <Link to= "/admin-home">Dashboard</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>
                        all-projects
                    </BreadcrumbItem>
            </Breadcrumb>
           <button type="button" class="btn btn-primary bt-sm"style={{"marginLeft":"auto", "width": "100px", "height": "40px"}} onClick={this.toggleModal}>Add Project</button>
        </div>

        
        <Modal isOpen= {this.state.isModalOpen} toggle= {this.toggleModal}>
            <ModalHeader toggle= {this.toggleModal}>New Project</ModalHeader>
            <ModalBody>
                <LocalForm onSubmit= {(values)=> this.handleSubmit(values)}>
                <Row className= "form-group">
                      <Col>
                        <Label htmlFor= ".projectname">Project Name</Label>
                          <Control.text model= ".projectname" 
                            id= "projectname" 
                            name= "projectname" 
                            className= "form-control" 
                            placeholder= "Project Name"
                            validators={{
                              required
                          }}/>
                          <Errors className= "text-danger" 
                            model= ".projectname" 
                            show= "touched" 
                            messages= {{
                            required: "Required"
                          }}/>
                      </Col>
                    </Row>
                    <Row className= "form-group">
                        <Col>
                          <Label htmlFor= ".startedat">Start Date</Label>
                            <Control type='date' model= ".startedat" 
                              id= "startedat" 
                              name= "startedat" 
                              className= "form-control" 
                              placeholder= "Start Date"
                              validators={{
                                required
                            }}/>
                            <Errors className= "text-danger" 
                              model= ".startedat" 
                              show= "touched" 
                              messages= {{
                              required: "Required "
                            }}/>
                        </Col>
                      </Row>
                      <Row className= "form-group">
                      <Col>
                        <Label htmlFor= ".projectinfo">Project Information</Label>
                          <Control.text model= ".projectinfo" 
                            id= "projectinfo" 
                            name= "projectinfo" 
                            className= "form-control" 
                            placeholder= "Project Infomation"
                            validators={{
                              required
                          }}/>
                          <Errors className= "text-danger" 
                            model= ".projectinfo" 
                            show= "touched" 
                            messages= {{
                            required: "Required"
                          }}/>
                      </Col>
                    </Row>
                  <br/>
                   <Button type= "submit" value= "submit" color= "primary">Submit</Button>
                </LocalForm>
            </ModalBody>
          </Modal>


          <Modal isOpen= {this.state.isModalUpdateOpen} toggle= {this.toggleUpdateModal}>
            <ModalHeader toggle= {this.toggleUpdateModal}>Update Project</ModalHeader>
            <ModalBody>
                <LocalForm onSubmit= {(values)=> this.handleUpdate(values)}>
                <Row className= "form-group">
                      <Col>
                        <Label htmlFor= ".projectid">Project Id</Label>
                          <Control.text model= ".projectid" 
                            id= "projectid" 
                            name= "projectid" 
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
                        <Label htmlFor= ".projectname">Project Name</Label>
                          <Control.text model= ".projectname" 
                            id= "projectname" 
                            name= "projectname" 
                            className= "form-control" 
                            placeholder= "Project Name"
                            validators={{
                              required
                          }}/>
                          <Errors className= "text-danger" 
                            model= ".projectname" 
                            show= "touched" 
                            messages= {{
                            required: "Required"
                          }}/>
                      </Col>
                    </Row>
                     <Row className= "form-group">
                      <Col>
                        <Label htmlFor= ".projectinfo">Project Information</Label>
                          <Control.text model= ".projectinfo" 
                            id= "projectinfo" 
                            name= "projectinfo" 
                            className= "form-control" 
                            placeholder= "Project Infomation"
                            validators={{
                              required
                          }}/>
                          <Errors className= "text-danger" 
                            model= ".projectinfo" 
                            show= "touched" 
                            messages= {{
                            required: "Required"
                          }}/>
                      </Col>
                    </Row>
                    <Row className= "form-group">
                      <Col>
                        <Label htmlFor= ".isongoing">Project OnGoing</Label>
                          <Control.text model= ".isongoing" 
                            id= "isongoing" 
                            name= "isongoing" 
                            className= "form-control" 
                            placeholder= "Project Infomation"
                            validators={{
                              required
                          }}/>
                          <Errors className= "text-danger" 
                            model= ".isongoing" 
                            show= "touched" 
                            messages= {{
                            required: "Required"
                          }}/>
                      </Col>
                    </Row>
                    <Row className= "form-group">
                        <Col>
                          <Label htmlFor= ".endedon">End Date</Label>
                            <Control type='date' model= ".endedon" 
                              id= "endedon" 
                              name= "endedon" 
                              className= "form-control" 
                              placeholder= "End Date"
                              validators={{
                                required
                            }}/>
                            <Errors className= "text-danger" 
                              model= ".endedon" 
                              show= "touched" 
                              messages= {{
                              required: "Required "
                            }}/>
                        </Col>
                      </Row>
                     
                  <br/>
                   <Button type= "submit" value= "submit" color= "primary">Submit</Button>
                </LocalForm>
            </ModalBody>
          </Modal>
  
  
            <FadeTransform in 
            FadeTransformProps={{
                exitTransform: 'scale(0.5) translateY(-50%)'
            }}>
              <table>
                <tbody>  
                { this.props.projects.map((project) => {
                  
                  return <td key= {project.projectId}>
                    <div style= {{"margin": "20px"}} className="page-container">
                    <div onMouseEnter={this.flip} onMouseLeave={this.flip} className={"card-container" + (this.state.flipped ? " flipped" : "")}>
                      <div className="front">
                      <div className="image-container">
                      <img className="card-image" src="assets/images/project.jpg" alt={this.props.projects.projectName}/>
                      
                    </div>
                    <h4 className="title">{project.projectName}</h4>
                    <h5 className="title">Project Id: {project.projectId}</h5>
  
                    <div className="main-area">
                      <div className="blog-post">
                        <div className='row'>
                          <p className="date">{project.startedAt}</p>&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;
                          {project.onGoing === true ? <span className='dot'/>: <span className='reddot'/>}
                        
                        </div>  
                       
                        <p className="read-more">Project info...</p>
                      </div>
                      
                     
                    </div>
                    </div>
                    <div className="back">
                      <p>{project.projectInfo}</p>
                      <small className='date'><i>started at: {project.startedAt}</i></small><br/>
                        {!project.onGoing ? <small className='date'><i>ended on: {project.endedOn}</i><br/></small>: <small className='date'><i>present</i><br/></small>}
                        &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;
                        &ensp;&ensp;&ensp;&ensp;&ensp;
                        <small><i>-- Client id: {project.clientId}</i></small>
                        <button type="button" class="btn btn-primary nisha" onClick={this.toggleUpdateModal}>Update Project</button>
                    </div>
                    </div>
                    </div>
                  </td>
                })}
                </tbody>
              </table>
        </FadeTransform>   
        </div>  
          );
        }    
    }
}