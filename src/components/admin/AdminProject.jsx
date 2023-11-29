import React, { Component } from 'react';
import '../../customs/AdminProject.css';
import { Loading } from '../LoadingComponent';
import {Link} from 'react-router-dom';
import { FadeTransform } from 'react-animation-components';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

export default class AdminProject extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      flipped: false
    };
    this.flip = this.flip.bind(this);
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
            <div className='row col-12' style={{"paddingLeft": "100px"}}>
                <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to= "/admin-home">Dashboard</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>
                            projects
                        </BreadcrumbItem>
                </Breadcrumb>
            </div>
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
                      <h1 className="title">{project.projectName}</h1>
                    </div>
                    <h4 className="title">Project Id: {project.projectId}</h4>
                    <div className="main-area">
                      <div className="blog-post">
                        <div className='row'>
                          <p className="date">{project.startedAt}</p>&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;
                          {project.onGoing? <span className='dot'/>: <span className='reddot'/>}
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