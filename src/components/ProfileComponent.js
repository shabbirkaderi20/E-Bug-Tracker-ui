/* eslint-disable react/jsx-pascal-case */
import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Col, Row, Card, CardImg, CardText,
     CardBody, CardTitle, Modal, ModalHeader, ModalBody, Label } from "reactstrap";
import {Control, LocalForm, Errors} from 'react-redux-form';
import {Link} from 'react-router-dom';
import axios from 'axios';

const required= (val) => val && val.length;
const email_regex = new RegExp("[a-z0-9]+@[a-z]+\\.[a-z]{2,3}")
const email_context = (val) => email_regex.test(val);
const password_regex = new RegExp("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}$");
const contextCheck = (val) => password_regex.test(val);
const maxLength= (len) => (val) => !(val) || (val.length <= len);
const minLength= (len) => (val) => (val) && (val.length >= len);
const checkCredibility= (val) => (val!== document.getElementById('newpassword'))
const mobile_regex = new RegExp("^[0-9]*$")
const mobile_context = (val) => mobile_regex.test(val);
const mobile_digits= (len) => (val) => !(val) || (val.length === len);

export default class Profile extends Component {

    constructor(props) {
        super(props);

        this.state= {
            name: sessionStorage.getItem("name"),
            isPassModalOpen: false,
            isEmailModalOpen: false,
            isUpdateModalOpen: false,
            isDeleteModalOpen: false
        }

        this.roleIdn= this.roleIdn.bind(this);
        this.togglePassModal= this.togglePassModal.bind(this);
        this.toggleEmailModal= this.toggleEmailModal.bind(this);
        this.toggleUpdateModal= this.toggleUpdateModal.bind(this);
        this.handlePassword= this.handlePassword.bind(this);
        this.handleEmail= this.handleEmail.bind(this);
        this.handleUpdate= this.handleUpdate.bind(this);
    }

    roleIdn() {
        if(parseInt(sessionStorage.getItem("roleId"))=== 1) {
            return <i>Administrator</i>
        }else if(parseInt(sessionStorage.getItem("roleId"))=== 2) {
            return <i>Staff</i>
        }else if(parseInt(sessionStorage.getItem("roleId"))=== 3) {
            return <i>Client</i>
        } 
    }

    toggleUpdateModal() {
        this.setState({
            isUpdateModalOpen: !this.state.isUpdateModalOpen
        })
    }

    togglePassModal() {

        this.setState({
            isPassModalOpen: !this.state.isPassModalOpen
        })
    }

    toggleEmailModal() {
        this.setState({
            isEmailModalOpen: !this.state.isEmailModalOpen
        })
    }

    handleEmail(values) {

        this.toggleEmailModal();

        if(window.confirm("Are you sure ?")) {
            let headers = {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
              }
            
              axios.put(`http://localhost:9002/users/changeEmail?userId=${parseInt(sessionStorage.getItem("userId"))}&password=${values.password}&email=${values.email}`, headers)
              .then(response =>  {
                  
                  alert("Email changed successfully");
                })
                .catch(error => {
                  alert("request unsuccessful :"+ JSON.stringify(error.message))
                });
            };
    }

    handlePassword(values) {

        this.togglePassModal();

        if(window.confirm("Are you sure ?")){
            
            let headers = {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
              }
            axios.put(`http://localhost:9002/users/changePassword?userId=${parseInt(sessionStorage.getItem("userId"))}&currentPassword=${values.oldpassword}&newPassword=${values.newPassword}`, headers)
            .then(response =>  {
                alert("Password Changed successfully")
              })
              .catch(error => {
                alert("request unsuccessful :"+ JSON.stringify(error.message))
              });
        };
    }

    handleUpdate(values) {

        this.toggleUpdateModal();
        
        if(window.confirm("Are you sure ?")){

            let headers = {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }

            var update= {
                "userId": parseInt(sessionStorage.getItem("userId")),
                "firstName": values.firstName,
                "lastName": values.lastName,
                "contactNo": values.contactno,
                "birthDate": values.birthdate,
                "address": values.address,
                "password": values.password
            }

            axios.put("http://localhost:9002/users/updateUserAccount", update, headers)
            .then(response =>  {
                alert("User details updated successfully")
            })
            .catch(error => {
                alert("request unsuccessful :"+ JSON.stringify(error.message))
            });

        }
    }

  render() {
    return (
      <div className= "container">
        <Breadcrumb>
            <BreadcrumbItem><Link to="/admin-home">Dashboard</Link></BreadcrumbItem>
            <BreadcrumbItem active>profile</BreadcrumbItem>
        </Breadcrumb>
        <h2>Profile Information</h2>
        <div className="column" style={{"border": "1px"}}>
            <center>
            <Card className="mb-3" style={{ maxWidth: '60%', "boxShadow": "2px 2px 5px black"  }}>

                <Row className="g-0">
                    <Col md={3} style={{"marginTop": "50px", "paddingLeft": "30px"}}>
                        <CardImg src="assets/images/profile.png" style={{ opacity:0.54 }}alt="profile" width="200px"/>     
                        {this.roleIdn()}
                    </Col>
                    <Col md={9}>
                    <CardBody>
                        <CardTitle style={{"marginLeft": "100px", "textAlign": "left"}}><b>{this.state.name}</b></CardTitle>
                        <CardText style={{"textAlign": "left"}}>
                            <b>User id:&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;</b>{this.props.users.userId}
                            <br/><b>Username: &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;</b>{this.props.users.userName}
                            <br/><b>Email id: &ensp;&ensp;&ensp;&ensp;&ensp;&emsp;&ensp;&ensp;&ensp;&ensp;&ensp;</b>{this.props.users.email}
                            <br/><b>Contact no: &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;</b>{this.props.users.contactNo}
                            <br/><b>Date of Birth:&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;</b>{this.props.users.birthDate}
                            <br/><b>Address:&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;</b>{this.props.users.address}
                        </CardText>
                    </CardBody>
                    </Col>  
                </Row>
            </Card>
            <Button className= "btn btn-outline-danger" onClick={this.togglePassModal}>Change password</Button>&emsp;
            <Button className= "btn btn-outline-warning" onClick={this.toggleEmailModal}>Change Email</Button>&emsp;
            <Button className= "btn btn-outline-primary" onClick={this.toggleUpdateModal}>Change User Details</Button>
            </center>
        </div>
        <Modal isOpen= {this.state.isPassModalOpen} toggle= {this.togglePassModal}>
            <ModalHeader toggle={this.togglePassModal}>Change Password</ModalHeader>
            <ModalBody>
                <LocalForm onSubmit= {(values)=> this.handlePassword(values)}>
                    <Row className= "form-group">
                      <Col>
                        <Label htmlFor= ".oldpassword">Old Password</Label>
                          <Control.password model= ".oldpassword" 
                            id= "oldpassword" 
                            name= "oldpassword" 
                            className= "form-control" 
                            placeholder= "Old Password"
                            validators={{
                                required
                          }}/>
                          <Errors className= "text-danger" 
                            model= ".oldpassword" 
                            show= "touched" 
                            messages= {{
                                required: "Required "
                          }}/>
                      </Col>
                    </Row>
                    <Row className= "form-group">
                      <Col>
                        <Label htmlFor= ".newpassword">New Password</Label>
                          <Control.password model= ".newpassword" 
                            id= "newpassword" 
                            name= "newpassword" 
                            className= "form-control" 
                            placeholder= "New Password"
                            validators={{
                                required, minLength: minLength(3), maxLength: maxLength(20), contextCheck
                          }}/>
                          <Errors className= "text-danger" 
                            model= ".newpassword" 
                            show= "touched" 
                            messages= {{
                                required: "Required ",
                                minLength: "Must be greater than 3 characters ",
                                maxLength: "Must be less than 20 characters ",
                                contextCheck: "Must have at least 1 Uppercase, lowercase and 1 character and a number "
                          }}/>
                      </Col>
                    </Row>
                    <Row className= "form-group">
                      <Col>
                        <Label htmlFor= ".repassword">Re-enter new Password</Label>
                          <Control.password model= ".repassword" 
                            id= "repassword" 
                            name= "repassword" 
                            className= "form-control" 
                            placeholder= "Re-enter new Password"
                            validators={{
                                required, checkCredibility, minLength: minLength(3), maxLength: maxLength(20), contextCheck
                          }}/>
                          <Errors className= "text-danger" 
                            model= ".repassword" 
                            show= "touched" 
                            messages= {{
                                required: "Required ",
                                minLength: "Must be greater than 3 characters ",
                                maxLength: "Must be less than 20 characters ",
                                contextCheck: "Must have at least 1 Uppercase, lowercase and 1 character and a number ",
                                checkCredibility: "Password don't match"
                          }}/>
                      </Col>
                    </Row>
                    <center><Button type= "submit" value= "submit" color= "primary" className="btn">Confirm</Button></center>
                </LocalForm>
            </ModalBody>
        </Modal>
        <Modal isOpen= {this.state.isEmailModalOpen} toggle= {this.toggleEmailModal}>
            <ModalHeader toggle={this.toggleEmailModal}>Change Email</ModalHeader>
            <ModalBody>
                <LocalForm onSubmit= {(values)=> this.handleEmail(values)}>
                    <Row className= "form-group">
                      <Col>
                        <Label htmlFor= ".email">New email</Label>
                          <Control.text model= ".email" 
                            id= "email" 
                            name= "email" 
                            className= "form-control" 
                            placeholder= "New email"
                            validators={{
                                required, email_context
                          }}/>
                          <Errors className= "text-danger" 
                            model= ".email" 
                            show= "touched" 
                            messages= {{
                                required: "Required ",
                                email_context: "Enter correct email id"
                          }}/>
                      </Col>
                    </Row>
                    <Row className= "form-group">
                      <Col>
                        <Label htmlFor= ".password">Password</Label>
                          <Control.password model= ".password" 
                            id= "password" 
                            name= "password" 
                            className= "form-control" 
                            placeholder= "Password"
                            validators={{
                                required
                          }}/>
                          <Errors className= "text-danger" 
                            model= ".password" 
                            show= "touched" 
                            messages= {{ 
                                required: "Required "
                          }}/>
                      </Col>
                    </Row>
                    <center><Button type= "submit" value= "submit" color= "primary" className="btn">Confirm</Button></center>
                </LocalForm>
            </ModalBody>
        </Modal>
        <Modal isOpen= {this.state.isUpdateModalOpen} toggle= {this.toggleUpdateModal}>
            <ModalHeader toggle={this.toggleUpdateModal}>Change user details</ModalHeader>
            <ModalBody>
                <LocalForm onSubmit= {(values)=> this.handleUpdate(values)}>
                <Row className= "form-group">
                      <Col>
                        <Label htmlFor= ".firstname">First name</Label>
                          <Control.text model= ".firstname" 
                            id= "firstname" 
                            name= "firstname" 
                            className= "form-control" 
                            placeholder= "First name"
                            validators={{
                              required, minLength: minLength(3), maxLength: maxLength(20)
                          }}/>
                          <Errors className= "text-danger" 
                            model= ".firstname" 
                            show= "touched" 
                            messages= {{
                            required: "Required ",
                            minLength: "Must be greater than 3 characters ",
                            maxLength: "Must be less than 20 characters "
                          }}/>
                      </Col>
                      <Col>
                        <Label htmlFor= ".lastname">Last name</Label>
                          <Control.text model= ".lastname" 
                            id= "lastname" 
                            name= "lastname" 
                            className= "form-control" 
                            placeholder= "Last name"
                            validators={{
                              required, minLength: minLength(3), maxLength: maxLength(20)
                          }}/>
                          <Errors className= "text-danger" 
                            model= ".lastname" 
                            show= "touched" 
                            messages= {{
                            required: "Required ",
                            minLength: "Must be greater than 3 characters ",
                            maxLength: "Must be less than 20 characters "
                          }}/>
                      </Col>
                    </Row>
                    <Row className= "form-group">
                        <Col>
                          <Label htmlFor= ".contactno">Contact no.</Label>
                            <Control.text model= ".contactno" 
                              id= "contactno" 
                              name= "contactno" 
                              className= "form-control" 
                              placeholder= "Contact no."
                              validators={{
                                required, mobile_digits: mobile_digits(10), mobile_context
                            }}/>
                            <Errors className= "text-danger" 
                              model= ".contactno" 
                              show= "touched" 
                              messages= {{
                              required: "Required ",
                              mobile_digits: "Enter a valid mobile no. ",
                              mobile_context: "Enter a valid mobile no. "
                            }}/>
                        </Col>
                        <Col>
                        <Label htmlFor= ".birthdate">Birth date</Label>
                            <Control type='date' model= ".birthdate" 
                              id= "birthdate" 
                              name= "birthdate" 
                              className= "form-control" 
                              placeholder= "Birth date"
                              validators={{
                                required
                            }}/>
                            <Errors className= "text-danger" 
                              model= ".birthdate" 
                              show= "touched" 
                              messages= {{
                              required: "Required "
                            }}/>
                        </Col>
                      </Row>
                      <Row className='form-group'>
                        <Col>
                            <Label htmlFor= ".address">Address</Label>
                              <Control.textarea model= ".address" 
                                id= "address" 
                                name= "address" 
                                className= "form-control" 
                                placeholder= "Address"
                                validators={{
                                  required, minLength: minLength(10), maxLength: maxLength(50)
                              }}/>
                              <Errors className= "text-danger" 
                                model= ".address" 
                                show= "touched" 
                                messages= {{
                                required: "Required ",
                                maxLength: "Length should be less than 50 characters ",
                                minLength: "Length should be greater than 10 characters "
                              }}/>
                          </Col>
                        </Row>
                        <Row className= "form-group">
                      <Col>
                        <Label htmlFor= ".password">Password</Label>
                          <Control.password model= ".password" 
                            id= "password" 
                            name= "password" 
                            className= "form-control" 
                            placeholder= "Password"
                            validators={{
                              required, minLength: minLength(3), maxLength: maxLength(20), contextCheck
                          }}/>
                          <Errors className= "text-danger" 
                            model= ".password" 
                            show= "touched" 
                            messages= {{
                            required: "Required ",
                            minLength: "Must be greater than 3 characters ",
                            maxLength: "Must be less than 20 characters ",
                            contextCheck: "Must have at least 1 Uppercase, lowercase and 1 character and a number "
                          }}/>
                      </Col>
                    </Row>
                    <center><Button type= "submit" value= "submit" color= "primary" className="btn">Confirm</Button></center>
                </LocalForm>
            </ModalBody>
        </Modal> 
      </div>
    )
  }
}
