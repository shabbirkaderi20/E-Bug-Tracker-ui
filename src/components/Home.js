import React from 'react';
import {Card, CardImg, CardBody, CardText, CardTitle, CardSubtitle} from 'reactstrap';
import { Loading } from './LoadingComponent';
import { FadeTransform } from 'react-animation-components';

function RenderCard({item, isLoading, errMess}) {
  if (isLoading) {
    return(
            <Loading />
    );
  }
  else if (errMess) {
    return(
            <h4>{errMess}</h4>
    );
  }else {
    return (
        <FadeTransform in 
            FadeTransformProps={{
                exitTransform: 'scale(0.5) translateY(-50%)'
            }}>
            <Card style={{"border": "0px"}}>
              <center><CardImg src= {"/assets/images/admin.jpg"} alt= {item.firstName+ " "+ item.lastName}/></center>
                <CardBody>
                  <CardTitle>{item.firstName+ " "+ item.lastName}</CardTitle>
                  <CardSubtitle style= {{"text-transform": "capitalize"}}>Administrator</CardSubtitle>
                  <CardText>Our CEO, Peter, credits his hardworking East Asian immigrant parents who undertook the arduous journey to the shores of America with the intention of giving their children the best future. His knowledge in terms of java is gigantic.</CardText>
                </CardBody>
            </Card>
        </FadeTransform>
    );
  }
}

export default function Home(props) {
    
    return (
      <div className='container'>
        <div className='row align-items-start' >
            <div className='col-12 col-md m-1' style= {{
              "padding": "10px", "padding-right": "10px",
              "box-shadow": "1px 1px 3px grey"}}>
              <FadeTransform in 
                FadeTransformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                <Card style={{"border": "0px"}}>
                  <center><CardImg src= {"/assets/images/bug.jpg"} alt= "bug"/></center>
                    <CardBody>
                      <CardTitle>Bugs</CardTitle>
                      <CardText>A bug refers to an error, fault, or flaw in any computer program or a hardware system. A bug produces unexpected results or causes a system to behave unexpectedly. It is any behavior or result that a program or system gets but it was not designed to do.</CardText>
                    </CardBody>
                </Card>
              </FadeTransform>
            </div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <div className='col-12 col-md m-1' style= {{
              "padding": "10px", "padding-right": "10px",
              "box-shadow": "1px 1px 3px grey"}}>
             <FadeTransform in 
                FadeTransformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                <Card style={{"border": "0px"}}>
                  <center><CardImg src= {"/assets/images/homeprj.jpg"} alt= "bug"/></center>
                    <CardBody>
                      <CardTitle>Project Management</CardTitle>
                      <CardText>We grew to 30 projects with lots of plans and branches under each, which means 50 running builds at the same time. Tailor Jira Software’s scrum and kanban boards to match your team’s workflow. Increase transparency and maximize output. Use new roadmaps to sketch out the big picture.</CardText>
                    </CardBody>
                </Card>
              </FadeTransform>
            </div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <div className='col-12 col-md m-1' style= {{
              "padding": "10px", "padding-right": "10px",
              "box-shadow": "1px 1px 3px grey"}}>
            <RenderCard item={props.leader} 
                isLoading={props.leadersLoading} 
                errMess={props.leadersErrMess}/>
            </div>
        </div>
      </div>  
    );
  }

