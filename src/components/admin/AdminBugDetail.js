/* eslint-disable react/jsx-pascal-case */
import React, {useState, Component} from 'react';
import {Card, CardImg, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, CardText, CardImgOverlay,
    Button, Modal, ModalHeader, ModalBody, Label, Col, Row} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Control, LocalForm } from 'react-redux-form';
import { Loading } from '../LoadingComponent';
import { bugBaseUrl, projectBaseUrl, userBaseUrl } from '../../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';
import axios from 'axios';

function RenderBug({bug}) {

    const[isModalOpen2, setIsModalOpen2]= useState(false);

    const handleSubmit= (values, bugId) => {

        handleSubmit1();

        let tagStaffDto= {
            bugId: bugId,
            staffId: values.staffId,
            accessToken: sessionStorage.getItem("accessToken")
        }
    
            let headers = {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
              }
    
              
              if(window.confirm("Are you sure ?")){
                axios.post(bugBaseUrl+ "/tagStaff", tagStaffDto, headers)
                 .then(response=> {
                     if(response.data) {
                         alert("Staff with Id "+ values.staffId+ " tagged to this bug");
                        window.location.reload(true);
                     }
             })
        .catch(error=> {
            alert(JSON.stringify(error.message))
        })
              };

        
    }

    const handleSubmit1= () =>{
        setIsModalOpen2(!isModalOpen2)
    }

    const[staff, setStaff]= useState([])

    const getStaffList= () => {

        let headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }

        axios.get(userBaseUrl+ "/all", headers)
        .then(response=> {
            setStaff(response.data);
            console.log(staff)
        })
        .catch(error=> {
            console.log(JSON.stringify(error.message))
        })
    }

    let title;
    let severity;
    let status;
    
    if(bug.status === 'solved') {
        title= (<div><span className='dot'/></div>); 
    }else if(bug.status === 'assigned') {
        title= (<div><span className='holo'/></div>);
    }else if(bug.status === 'pending') {
        title= (<div><span className='reddot'/></div>);
    }

    if(bug.status === 'solved') {
         status= <i><b style={{"color": "green"}}>closed</b></i>
    }else if(bug.status === 'assigned') {
        status= <i><b style={{"color": "orange"}}>assigned</b></i>
    }else if(bug.status === 'pending') {
        status= <i><b style={{"color": "red"}}>initiated</b></i>
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

    return (<div className='col-12 col-md-5 m-1'>
        <FadeTransform in 
        FadeTransformProps={{
            exitTransform: 'scale(0.5) translateY(-50%)'
        }}>
            <div style={{"boxShadow": "2px 2px 8px black"}}>
            <Card>
                <CardImg width= "100%" src= {bugBaseUrl+ `/bugImageById/${bug.bugId}`} alt= {bug.imageName}/>
                <CardImgOverlay>
                    <CardTitle style= {{"textAlign": "left"}}>
                        {title}
                    </CardTitle>
                </CardImgOverlay>
                <CardBody>                
                    <CardText>
                    <i style={{"color": "rgb(0, 153, 255)"}}>Bug Id: </i>{bug.bugId}<br/>
                    <i style={{"color": "rgb(0, 153, 255)"}}>Project Id: </i>{bug.projectId}<br/>
                    <i style={{"color": "rgb(0, 153, 255)"}}>severity : </i>{severity}<br/>
                    <i style={{"color": "rgb(0, 153, 255)"}}>Note : </i>{bug.bugNote}<br/>
                    {bug.staffId!= null? <p><i style={{"color": "rgb(0, 153, 255)"}}>Staff : </i>{GetStaffName(bug.staffId)}</p>:  <p><i style={{"color": "rgb(0, 153, 255)"}}>Staff : </i>not assigned</p>}
                    <i style={{"color": "rgb(0, 153, 255)"}}>status : </i>{status}<br/>
                    </CardText>
                </CardBody> 
            </Card>
            {!bug.staffAssigned?<Button className= "btn btn-primary-outline btn-rounded btn-block" online onClick= {()=> {
                handleSubmit1();
                     getStaffList();}}>
                        Tag Staff
        </Button>: null}
            </div>
        </FadeTransform>
        <Modal isOpen= {isModalOpen2} toggle= {()=> {setIsModalOpen2(!isModalOpen2)}}>
            <ModalHeader toggle= {() => {setIsModalOpen2(!isModalOpen2)}}>tag staff</ModalHeader>
            <ModalBody>
                <LocalForm onSubmit= {(values)=> handleSubmit(values, bug.bugId)}>
                    <Row className= "form-group">
                        <Col>
                            <Label htmlFor= "comment">Comment</Label>
                            <Control.select model="user.faveColor" id="user.faveColor">
                                {
                                    
                                    staff.filter((staff1) => staff1.roleId=== 2).map((staff)=>{
                                        return <option value= {staff.userId}>{staff.firstName+ " "+ staff.lastName}</option>
                                    })
                                }
                            </Control.select>
                        </Col>
                    </Row>
                    <Button type= "submit" value= "submit" color= "primary">Submit</Button>
                </LocalForm>
            </ModalBody>
        </Modal>
    </div>);
}

function GetName(postId) {

    const[name, setName]= useState("");

    let headers= {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }

    axios.get(`http://localhost:9002/users/getUser/${postId}`, headers)
        .then(response => {
           setName(response.data.user.firstName+ " "+ response.data.user.lastName);
        })
        .catch(error => {
            console.log(JSON.stringify(error.message))
        });
    return name;
}

function GetStaffName(staffId) {

    const[name, setName]= useState("");

    let headers= {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }

    axios.get(`http://localhost:9002/users/getUser/${staffId}`, headers)
        .then(response => {
           setName(response.data.user.firstName+ " "+ response.data.user.lastName);
        })
        .catch(error => {
            console.log(JSON.stringify(error.message))
        });
    return <b>{name}</b>;
}

function GetStamp(postId) {

    if(postId=== 1) {
        return <kbd style={{'background': 'grey'}}>Administrator</kbd>
    }else if(postId=== 2) {
        return <kbd style={{'background': 'grey'}}>staff</kbd>
    }else if(postId=== 1) {
        return null;
    }
}

function RenderComments({comments, postComment, bugId, status}){

    return <div className='col-12 col-md-5 m-1' style={{"boxShadow": "1px 1px 8px black"}}>
        <Card style={{"border": '0px'}}>
        <CardTitle style= {{"color": "rgb(0, 153, 255)", "fontFamily": "Verdana, Arial, Tahoma, Serif" }}><br/><span className='fa fa-comments'/>&emsp;Comments : </CardTitle><br/><div class="fade_rule"></div>

            <Stagger in >
                {
                    comments.map((comment) => {

                        return (
                            <Fade in>
                            <CardBody key= {comment.commentId}>
                                <span className='fa fa-comment'/>&emsp;{comment.comment}
                                <p style={{"textIndent": "30px"}}><i style={{'color': 'grey'}}>-- {GetName(comment.postId)}</i>&emsp;{GetStamp(comment.postId)}<br/><kbd className='kbd' style={{"paddingLeft": "30px"}}>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}</kbd></p>
                            </CardBody>
                            <div class="fade_rule"></div>
                            </Fade>
                        );
                    })
                }
            </Stagger>
            <br/>
                
        </Card>
        <CommentForm bugId={bugId} postComment={postComment} status= {status} />
    </div>
}

class CommentForm extends Component {

    constructor(props){
        super(props);

        this.state= {
            isModalOpen: false
        };

        this.toggleModal= this.toggleModal.bind(this);
        this.handleSubmit= this.handleSubmit.bind(this);
    }
    
    
    toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.postComment(sessionStorage.getItem("userId"), this.props.bugId, values.comment, sessionStorage.getItem("accessToken"));
    }

    render() {
        return (<div>
        <center>
        {this.props.status==="solved"? null: <Button className= "btn btn-primary-outline btn-rounded" online onClick= {this.toggleModal}>
          <span className='fa fa-pencil fa-lg'></span> Submit comment
        </Button>}<br/></center>
        
        <Modal isOpen= {this.state.isModalOpen} toggle= {this.toggleModal}>
            <ModalHeader toggle= {this.toggleModal}>Submit comment</ModalHeader>
            <ModalBody>
                <LocalForm onSubmit= {(values)=> this.handleSubmit(values)}>
                    <Row className= "form-group">
                        <Col>
                        <Label htmlFor= "comment">Comment</Label>
                            <Control.textarea model= ".comment" id= "comment" name= "comment" rows= "6" className= "form-control" placeholder= "type your comment here"/> 
                        </Col>
                    </Row>
                    <Button type= "submit" value= "submit" color= "primary">Submit</Button>
                </LocalForm>
            </ModalBody>
        </Modal>
        </div>);
  }
}

function GetProjectName(projectId) {
    
    const[projectName, setProjectName]= useState("");

    let headers= {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }

    axios.get(projectBaseUrl+ `/projectById/${projectId}`, headers)
        .then(response => {
            console.log(response.data)
           setProjectName(response.data.projectName);
        })
        .catch(error => {
            console.log(JSON.stringify(error.message))
        });
    return <b>{projectName}</b>;
}

const AdminBugDetail = (props) => {
    if (props.isLoading) {
        return(
            <div >
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">            
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }else if(props.dish !== null) {    
        return <div className='container'>
             <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/admin-bug">Bugs</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.bug.bugId}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3><i style={{"color": "grey"}}>Project Name:</i><b><i> {GetProjectName(props.bug.projectId)}</i></b></h3>
                        <hr />
                    </div>                
                </div>
                <div className="row" style={{"paddingLeft": "100px"}}>
                    <RenderBug bug={props.bug} />
                    <RenderComments comments={props.comments}
                      postComment={props.postComment}
                      bugId={props.bug.bugId}
                      status= {props.bug.status} /></div>
        </div>;
    }else {
        return null;    
    }
}

  export default AdminBugDetail;