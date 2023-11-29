import React from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader, Media } from 'reactstrap';
import { Link } from 'react-router-dom';
import {Fade} from 'react-animation-components';

function RenderLeader({leader}){
    return(
        <Media tag= "li">
                <Media left middle>
                    <Media object src= "assets/images/admin.jpg" alt= {leader.firstName+ " "+ leader.lastName}/>
                </Media>
            <Fade in>
                <Media body className="ml-5 m-1">
                    <Media heading>{leader.firstName+ " "+ leader.lastName}</Media>
                    <p>Staff</p>
                </Media>
            </Fade>
        </Media>
    );
  }

function About(props) {

    const leaders = props.leaders.map((leader) => {
        return (
            <p><RenderLeader leader= {leader}/></p>
        );
    });

    return(
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>About Us</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>About Us</h3>
                    <hr />
                </div>                
            </div>
            <div className="row row-content">
                <div className="col-12 col-md-6">
                    <h2>Our History</h2>
                    <p>Started in 2010, Bug-Tracker System quickly established itself as a Tech-solution icon par excellence in Bangalore. With its reliable solutions that can be found nowhere else, it enjoys patronage from the A-list clientele in Bangalore.  Featuring are best of the staffs in the world, you never know what will be available at your service at the time you visit us.</p>
                    <p>The application traces its humble beginnings to <em>Nisha I</em>, a successful chain started by our CEO, Mr. Akshay Reddy, that featured for the first time from the world's best Technicians.</p>
                </div>
                <div className="col-12 col-md-5">
                    <Card>
                        <CardHeader className="bg-primary text-white">Facts At a Glance</CardHeader>
                        <CardBody>
                            <dl className="row p-1">
                                <dt className="col-6">Started</dt>
                                <dd className="col-6">3 Feb. 2013</dd>
                                <dt className="col-6">Major Stake Holder</dt>
                                <dd className="col-6">bug-Tracker System</dd>
                                <dt className="col-6">Last Year's Turnover</dt>
                                <dd className="col-6">$1,250,375</dd>
                                <dt className="col-6">Employees</dt>
                                <dd className="col-6">40</dd>
                            </dl>
                        </CardBody>
                    </Card>
                </div>
                <div className="col-12">
                    <Card>
                        <CardBody className="bg-faded">
                            <blockquote className="blockquote">
                                <p className="mb-0">Rush TeNeT</p>
                            </blockquote>
                        </CardBody>
                    </Card>
                </div>
            </div>
            <div className="row row-content">
                <div className="col-12">
                    <h2>Corporate Leadership</h2>
                </div>
                <div className="col-12">
                    <Media list>
                        {leaders}
                    </Media>
                </div>
            </div>
        </div>
    );
}

export default About;    