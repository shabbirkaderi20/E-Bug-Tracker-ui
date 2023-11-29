import React, {Component} from "react";
import { ToggleButton, ToggleButtonGroup} from '@mui/material';
import {Card, CardImg, CardImgOverlay, CardBody, CardTitle, Breadcrumb, BreadcrumbItem} from 'reactstrap';
import { bugBaseUrl } from '../../shared/baseUrl';
import { Loading } from '../LoadingComponent';
import {Link} from 'react-router-dom';
import '../../customs/AdminBug.css';

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
            <Link to= {`/admin-bug/${bug.bugId}`}>
                <CardImg width= "100%" src= {bugBaseUrl+ `/bugImageById/${bug.bugId}`} alt= {bug.imageName} style= {{"width": "100%", "height": "300px"}}/>
                <CardImgOverlay>
                    <CardTitle style= {{"textAlign": "left"}}>
                        {title}
                    </CardTitle>
                </CardImgOverlay>
                <CardBody style= {{"textAlign": "left"}}>
                    Bug for Project id : {bug.projectId} <br/>
                    {/* Project name : {ProjectName(bug.projectId)} <br/>*/}
                    severity : {severity} 
                </CardBody>
            </Link>
        </Card>
        );
}

export default class AdminBug extends Component {

    constructor(props) {
        super();

        this.state= {
            alignment: 'all'
        }

        this.viewBugs= this.viewBugs.bind(this);
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
                            <Link to= "/admin-home">Dashboard</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>
                            bugs
                        </BreadcrumbItem>
                </Breadcrumb>
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
        </div>);
    }
}