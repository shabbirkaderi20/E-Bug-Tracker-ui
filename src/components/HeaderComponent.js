/* eslint-disable react/jsx-pascal-case */
import React, {Component} from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Button,
  Modal, ModalHeader, ModalBody, FormGroup, Input, Label, Col, Row, Jumbotron } from 'reactstrap';
import {NavLink} from 'react-router-dom';
import {Control, LocalForm, Errors} from 'react-redux-form';
import axios from 'axios';
import '../customs/Navbar.css';
import Slideshow from '../customs/SlideShow';
import { Redirect } from 'react-router-dom';

const required= (val) => val && val.length;
const maxLength= (len) => (val) => !(val) || (val.length <= len);
const mobile_digits= (len) => (val) => !(val) || (val.length === len);
const minLength= (len) => (val) => (val) && (val.length >= len);
const password_regex = new RegExp("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}$");
const contextCheck = (val) => password_regex.test(val);
const mobile_regex = new RegExp("^[0-9]*$")
const mobile_context = (val) => mobile_regex.test(val);
const email_regex = new RegExp("[a-z0-9]+@[a-z]+\\.[a-z]{2,3}")
const email_context = (val) => email_regex.test(val);

class Header extends Component {

    constructor(props) {
      super(props);

      this.state= {
        state: null,
        isNavOpen: false,
        isNavOpenSignup: false,
        isModalOpen: false,
        isModalOpenSignup: false
      };

      this.toggleNav= this.toggleNav.bind(this);
      this.toggleNavSignup= this.toggleNavSignup.bind(this);
      this.toggleModal= this.toggleModal.bind(this);
      this.handleLogin= this.handleLogin.bind(this);
      this.toggleModalSignUp= this.toggleModalSignUp.bind(this);
      this.handleLogout= this.handleLogout.bind(this);
      this.navbarSelector= this.navbarSelector.bind(this);
    }

    toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
    }

    toggleModalSignUp() {
      this.setState({
        isModalOpenSignup: !this.state.isModalOpenSignup
      });
    }

    toggleNav() {
      this.setState({
        isNavOpen: !this.state.isNavOpen
      });
    }

    toggleNavSignup() {
      this.setState({
        isNavOpenSignup: !this.state.isNavOpenSignup
      });
    }

     myFunction() {
      if(window.confirm("Are you sure ?")){
        sessionStorage.clear();
        window.location.reload(true);
        return <Redirect to= "/home"/>
      };
    }

    handleLogout() {
      this.myFunction();
    }

    handleLogin(values) {

      this.toggleModal();

        var cred= {
          userName: values.username,
          password: values.password
        }
      
        let headers = {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
        axios.post("http://localhost:9002/users/authenticate", cred, headers)
          .then(response =>  {

            sessionStorage.clear();
            sessionStorage.setItem("userId", response.data.user.userId)
            sessionStorage.setItem("roleId", response.data.user.roleId);
            sessionStorage.setItem("name", response.data.user.firstName+ " "+ response.data.user.lastName);
            sessionStorage.setItem("accessToken", response.data.accessToken);
            
            window.location.reload(true);

          if(sessionStorage.getItem("userId")=== "1") {
            return <Redirect to= "/admin-home"/>
          }else if(sessionStorage.getItem("userId")=== "2") {
            return <Redirect to= "/staff-home"/>
          }else if(sessionStorage.getItem("userId")=== "3") {
            return <Redirect to= "/client-home"/>
          }
          })
          .catch(error => {
            alert("login unsuccessful :"+ JSON.stringify(error.message))
          });
    }

    navbarSelector() {

      if(this.state.state === null || this.state.state === undefined) {
          return (
            <Navbar className="navbar navbar-expand-lg navbar-dark bdr2 text"> 
              <NavbarToggler onClick= {this.toggleNavSignup}/>
              <Collapse isOpen= {this.state.isNavOpenSignup} navbar>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                  <Nav className="navbar-nav text" navbar>
                    <NavItem className="nav-item active">
                      <NavLink className="nav-link text" to="/home">
                          <span className='fa fa-home fa-lg'></span> Home
                        </NavLink>
                    </NavItem>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <NavItem className="nav-item active">
                      <NavLink className="nav-link text" to="/about-us">
                          <span className='fa fa-info fa-lg'></span> About us
                        </NavLink>
                    </NavItem>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <NavItem className="nav-item active">
                      <NavLink className="nav-link text" to="/contact-us">
                          <span className='fa fa-address-card fa-lg'></span> Contact us
                        </NavLink>
                    </NavItem>
                  </Nav>
                </div>
              </Collapse>
            </Navbar>
          );
      }else if(this.state.state === "1") {
          return (
            <Navbar className="navbar navbar-expand-lg navbar-dark bdr2 text"> 
              <NavbarToggler onClick= {this.toggleNavSignup}/>
              <Collapse isOpen= {this.state.isNavOpenSignup} navbar>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                  <Nav className="navbar-nav text" navbar>
                    <NavItem className="nav-item active">
                      <NavLink className="nav-link text" to="/admin-home">
                          <span className='fa fa-home fa-lg'></span> Dashboard
                        </NavLink>
                    </NavItem>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <NavItem className="nav-item active">
                      <NavLink className="nav-link text" to="/admin-project">
                          <span className='fa fa-list fa-lg'></span> Projects
                        </NavLink>
                    </NavItem>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <NavItem className="nav-item active">
                      <NavLink className="nav-link text" to="/admin-bug">
                          <span className='fa fa-bug fa-lg'></span> Bugs
                        </NavLink>
                    </NavItem>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <NavItem className="nav-item active">
                      <NavLink className="nav-link text" to="/profile">
                          <span className='fa fa-user fa-lg'></span> Profile
                        </NavLink>
                    </NavItem>
                  </Nav>
                </div>
              </Collapse>
            </Navbar>  
          );
      }else if(this.state.state === "2") {
        return (
          <Navbar className="navbar navbar-expand-lg navbar-dark bdr2 text"> 
              <NavbarToggler onClick= {this.toggleNavSignup}/>
              <Collapse isOpen= {this.state.isNavOpenSignup} navbar>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                  <Nav className="navbar-nav text" navbar>
                    <NavItem className="nav-item active">
                      <NavLink className="nav-link text" to="/staff-home">
                          <span className='fa fa-home fa-lg'></span> Dashboard
                        </NavLink>
                    </NavItem>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <NavItem className="nav-item active">
                      <NavLink className="nav-link text" to="/staff-project">
                          <span className='fa fa-list fa-lg'></span> Projects
                        </NavLink>
                    </NavItem>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <NavItem className="nav-item active">
                      <NavLink className="nav-link text" to="/staff-bug">
                          <span className='fa fa-bug fa-lg'></span> Bugs
                        </NavLink>
                    </NavItem>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <NavItem className="nav-item active">
                      <NavLink className="nav-link text" to="/profile">
                          <span className='fa fa-user fa-lg'></span> Profile
                        </NavLink>
                    </NavItem>
                  </Nav>
                </div>
              </Collapse>
            </Navbar>
        );
      }else if(this.state.state === "3") {
        return (
          <Navbar className="navbar navbar-expand-lg navbar-dark bdr2 text"> 
              <NavbarToggler onClick= {this.toggleNavSignup}/>
              <Collapse isOpen= {this.state.isNavOpenSignup} navbar>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                  <Nav className="navbar-nav text" navbar>
                    <NavItem className="nav-item active">
                      <NavLink className="nav-link text" to="/client-home">
                          <span className='fa fa-home fa-lg'></span> Dashboard
                        </NavLink>
                    </NavItem>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <NavItem className="nav-item active">
                      <NavLink className="nav-link text" to="/client-project">
                          <span className='fa fa-list fa-lg'></span> Projects
                        </NavLink>
                    </NavItem>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <NavItem className="nav-item active">
                      <NavLink className="nav-link text" to="/client-bug">
                          <span className='fa fa-bug fa-lg'></span> Bugs
                        </NavLink>
                    </NavItem>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <NavItem className="nav-item active">
                      <NavLink className="nav-link text" to="/profile">
                          <span className='fa fa-user fa-lg'></span> Profile
                        </NavLink>
                    </NavItem>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <NavItem className="nav-item active">
                      <NavLink className="nav-link text" to="/about-us">
                          <span className='fa fa-info fa-lg'></span> About us
                        </NavLink>
                    </NavItem>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <NavItem className="nav-item active">
                      <NavLink className="nav-link text" to="/contact-us">
                          <span className='fa fa-address-card fa-lg'></span> Contact us
                        </NavLink>
                    </NavItem>
                  </Nav>
                </div>
              </Collapse>
            </Navbar>  
        );
      } 
    }

    handleSignUp(values) {

      this.setState({
        isModalOpen: false
      });

      this.toggleModalSignUp();
      
      var signup= {
          userName: values.username,
          password: values.password,
          firstName: values.firstname,
          lastName: values.lastname,
          contactNo: values.contactno,
          email: values.email,
          birthDate: values.birthdate,
          address: values.address,
          roleId: values.roleId
      }

        let headers = {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*"
        }

        axios.post("http://localhost:9002/users/registerUserAccount", signup, headers)
          .then(response =>  {
            alert("Welcome to Bug-Tracker");
            console.log(response.data);
            this.toggleModal();
          })
          .catch(error => {
            alert("registration unsuccessful :", JSON.stringify(error))
          });
    }

    componentDidMount() {

      this.setState({
        state: sessionStorage.getItem("roleId")
      });
    }

    render() {
         return (<>{
          this.state.state===undefined || this.state.state===null?

          <Navbar className="navbar navbar-expand-lg navbar-light bg-light bdr text">
            <NavbarToggler onClick= {this.toggleNav}/>
              <NavbarBrand className="mr-auto" href="/">
                <img src= "assets/images/logo.png" height= "60" width= "60" alt= "Bug-Tracking System"/>&nbsp;
              </NavbarBrand>
              <h3>Bug-Tracking System</h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Collapse isOpen= {this.state.isNavOpen} navbar>
              <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <Nav className="navbar-nav text">
                  <form className="d-flex nav-right">
                    <input className="form-control me-2 customize" type="search" placeholder="Search" aria-label="Search"/>
                    <button type="button" className="btn btn-dark">Search</button>
                  </form>
                </Nav>
              </div>
              <div className="mr-auto">
                <ul className="navbar-nav">
                <li className="nav-item mr-auto">
                    <Nav className= 'ml-auto' navbar>
                      <Navbar>
                        <Button className= "btn btn-light" 
                          online onClick= {this.toggleModal}>
                          <span className='fa fa-sign-in fa-lg'></span> Login
                        </Button>
                      </Navbar>
                    </Nav>
                  </li>
                </ul>
              </div>
            </Collapse>
          </Navbar>
          : 
          <Navbar className="navbar navbar-expand-lg navbar-light bg-light bdr text">
            <NavbarToggler onClick= {this.toggleNav}/>
              <NavbarBrand className="mr-auto" href="/">
                <img src= "assets/images/logo.png" height= "60" width= "60" alt= "Bug-Tracking System"/>&nbsp;
              </NavbarBrand>
              <h3>Bug-Tracking System</h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Collapse isOpen= {this.state.isNavOpen} navbar>
              <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <Nav className="navbar-nav text">
                  <form className="d-flex nav-right">
                    <input className="form-control me-2 customize" type="search" placeholder="Search" aria-label="Search"/>
                    <button type="button" className="btn btn-dark">Search</button>
                  </form>
                </Nav>
              </div>
              <div className="mr-auto">
                <ul className="navbar-nav">
                  <li className="nav-item mr-auto">
                    <Nav className= 'ml-auto' navbar>
                      <Navbar>
                        <Button className= "btn btn-danger" online onClick= {this.handleLogout}>
                          <span className='fa fa-sign-out fa-lg'></span> Logout
                        </Button>
                      </Navbar>
                    </Nav>
                  </li>
                </ul>
              </div>
            </Collapse>
          </Navbar>
    }
          {this.navbarSelector()}
          <Jumbotron>
              <Slideshow/>
          </Jumbotron>

          <Modal isOpen= {this.state.isModalOpen} toggle= {this.toggleModal}>
            <ModalHeader toggle= {this.toggleModal}>Login</ModalHeader>
            <ModalBody>
                <LocalForm onSubmit= {(values)=> this.handleLogin(values)}>
                <Row className= "form-group">
                      <Col>
                        <Label htmlFor= ".username">Username &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                         <small>Need a account ?</small><Button className= "btn btn-link btn-sm" 
                            style= {{"border": "0px"}}
                            online onClick= {()=> {
                              this.toggleModal();
                              this.toggleModalSignUp()}}
                            >Sign up</Button></Label>
                          <Control.text model= ".username" 
                            id= "username" 
                            name= "username" 
                            className= "form-control" 
                            placeholder= "Username"
                            validators={{
                              required
                          }}/>
                          <Errors className= "text-danger" 
                            model= ".username" 
                            show= "touched" 
                            messages= {{
                            required: "Required"
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
                            required: "Required"
                          }}/>
                      </Col>
                    </Row>
                    <FormGroup check>
                      <Label check>
                        <Input type= "checkbox" name= "remember" 
                        innerRef= {(input) => this.remember= input}/> Remember me
                      </Label> 
                    </FormGroup><br/>
                    <Button type= "submit" value= "submit" color= "primary">Login</Button>
                </LocalForm>
            </ModalBody>
          </Modal>
          <Modal isOpen= {this.state.isModalOpenSignup} toggle= {this.toggleModalSignUp}  >
            <ModalHeader toggle= {this.toggleModalSignUp}>Sign Up</ModalHeader>
            <ModalBody>
                <LocalForm onSubmit= {(values)=> this.handleSignUp(values)}>
                    <Row className= "form-group">
                      <Col>
                        <Label htmlFor= ".username">Username</Label>
                          <Control.text model= ".username" 
                            id= "username" 
                            name= "username" 
                            className= "form-control" 
                            placeholder= "Username"
                            validators={{
                              required, minLength: minLength(3), maxLength: maxLength(20)
                          }}/>
                          <Errors className= "text-danger" 
                            model= ".username" 
                            show= "touched" 
                            messages= {{
                            required: "Required ",
                            minLength: "Must be greater than 3 characters ",
                            maxLength: "Must be less than 20 characters "
                          }}/>
                      </Col>
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
                          <Label htmlFor= ".email">Email Id</Label>
                            <Control.text model= ".email" 
                              id= "email" 
                              name= "email" 
                              className= "form-control" 
                              placeholder= "abc@xyz.com"
                              validators={{
                                required, email_context
                            }}/>
                            <Errors className= "text-danger" 
                              model= ".email" 
                              show= "touched" 
                              messages= {{
                              required: "Required ",
                              mobile_digits: "Enter a valid email id ",
                            }}/>
                        </Col>
                      </Row>
                      <Row className= "form-group">
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
                          <Label htmlFor= "roleId">Role</Label>
                              <Control.select model= ".roleId" 
                              name= "roleId" 
                              className= "form-control">
                                  <option value={2}>Staff</option>
                                  <option value={3}>Client</option>
                              </Control.select>
                          </Col>
                      </Row>
                    <Button type= "submit" value= "submit" color= "primary" className="btn">Sign up</Button>
                </LocalForm>
            </ModalBody>
          </Modal>
         </>);
    }
}

export default Header;