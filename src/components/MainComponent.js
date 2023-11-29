import React, { Component } from 'react'
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import Footer from './FooterComponents';
import Header from './HeaderComponent';
import Home from './Home';
import Dashboard from './admin/AdminHome';
import ClientDashboard from './client/ClientHome';
import AdminProject from './admin/AdminProject';
import ClientProject from './client/ClientProject';
import Contact from './ContactComponent';
import About from './AboutComponent';
import AdminBug from './admin/AdminBug';
import ClientBug from './client/ClientBug';
import AdminBugDetail from './admin/AdminBugDetail';
import ClientBugDetail from './client/ClientBugDetail';
import StaffBug from './staff/StaffBug';

import { postComment, fetchLeaders, fetchProjects, postFeedback, fetchBugs, fetchComments } from '../redux/ActionCreators';
import Profile from './ProfileComponent';
import StaffProject from './staff/StaffProject';
import StaffDashboard from './staff/StaffHome';
import StaffBugDetail from './staff/StaffBugDetail';

const mapStateToProps = state => {
  return {
    leaders: state.leaders,
    projects: state.projects,
    comments: state.comments,
    bugs: state.bugs
  };
}

const mapDispatchToProps = dispatch => ({
    postComment: (postId, bugId, comment, accessToken) => dispatch(postComment(postId, bugId, comment, accessToken)),
    postFeedback: (firstName, lastName, telNum, email, agree, contactType, message) => dispatch(postFeedback(firstName, lastName, telNum, email, agree, contactType, message)),
    fetchLeaders: () => dispatch(fetchLeaders()),
    fetchProjects: () => dispatch(fetchProjects()),
    resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
    fetchBugs: () => dispatch(fetchBugs()),
    fetchComments: () => { dispatch(fetchComments())},
  });

class Main extends Component {

    componentDidMount() {
        this.props.fetchLeaders();
        this.props.fetchProjects();
        this.props.fetchComments();
        this.props.fetchBugs();
      }

      onDishSelect(bugId) {
        this.setState({selectedBug: bugId});
      }
    

    render() {
        const ClientDashboardPage = () => {
            
            return (
                <ClientDashboard/>
            );
        }

        const DashboardPage = () => {
            
          return (
              <Dashboard/>
          );
      }

      const StaffDashboardPage = () => {
            
        return (
            <StaffDashboard/>
        );
    }

        const HomePage = () => {
            
          return (
              <Home 
                  leader={this.props.leaders.leaders.filter((leader) => leader.roleId=== 1)[0]}
                  leadersLoading={this.props.leaders.isLoading}
                  leadersErrMess={this.props.leaders.errMess}/>
          );
        }

        const AdminProjectPage = () => {
            
          return (
              <AdminProject
                projects={this.props.projects.projects}
                projectsLoading={this.props.projects.isLoading}
                projectsErrMess={this.props.projects.errMess}
              />
          );
        }

        const StaffProjectPage = () => {
            
          return (
              <StaffProject
                projects={this.props.projects.projects}
                projectsLoading={this.props.projects.isLoading}
                projectsErrMess={this.props.projects.errMess}
              />
          );
        }

        const ProfilePage = () => {
            
          return (
              <Profile
                users={this.props.leaders.leaders.filter((leader) => leader.userId=== parseInt(sessionStorage.getItem("userId")))[0]}
              />
          );
        }

        const ClientProjectPage = () => {
            
          return (
              <ClientProject
                projects={this.props.projects.projects.filter((project)=> project.clientId=== parseInt(sessionStorage.getItem("userId")))}
                projectsLoading={this.props.projects.isLoading}
                projectsErrMess={this.props.projects.errMess}
              />
          );
        }

        const BugDetail = ({match}) => {
          return (
            <AdminBugDetail bug={this.props.bugs.bugs.filter((bug) => bug.bugId === parseInt(match.params.bugId,10))[0]}
              isLoading={this.props.bugs.isLoading}
              errMess={this.props.bugs.errMess}
              comments={this.props.comments.comments.filter((comment) => comment.bugId === parseInt(match.params.bugId,10))}
              commentsErrMess={this.props.comments.errMess}
              postComment={this.props.postComment}
            />
          );
        }

        const StaffBugDetail1 = ({match}) => {
          return (
            <StaffBugDetail bug={this.props.bugs.bugs.filter((bug) => bug.bugId === parseInt(match.params.bugId,10))[0]}
              isLoading={this.props.bugs.isLoading}
              errMess={this.props.bugs.errMess}
              comments={this.props.comments.comments.filter((comment) => comment.bugId === parseInt(match.params.bugId,10))}
              commentsErrMess={this.props.comments.errMess}
              postComment={this.props.postComment}  
            />
          );
        }

        const ClientBugDetail2 = ({match}) => {
          return (
            <ClientBugDetail bug={this.props.bugs.bugs.filter((bug) => bug.bugId === parseInt(match.params.bugId,10))[0]}
              isLoading={this.props.bugs.isLoading}
              errMess={this.props.bugs.errMess}
              comments={this.props.comments.comments.filter((comment) => comment.bugId === parseInt(match.params.bugId,10))}
              commentsErrMess={this.props.comments.errMess}
              postComment={this.props.postComment}
            />
          );
        }

        const ContactPage = () => {
          return (
            <Contact 
              resetFeedbackForm={this.props.resetFeedbackForm} 
              postFeedback= {this.props.postFeedback}
            />
          );
        }

        const AdminBugPage = () => {
          return (
            <AdminBug 
              bugs={this.props.bugs.bugs.filter((bug) => bug.severity !== 'test')}
              bugsLoading={this.props.bugs.isLoading}
              bugsErrMess={this.props.bugs.errMess}
            />
          );
        }

        const StaffBugPage = () => {
          return (
            <StaffBug 
              bugs={this.props.bugs.bugs.filter((bug) => bug.staffId === parseInt(sessionStorage.getItem("userId")))}
              bugsLoading={this.props.bugs.isLoading}
              bugsErrMess={this.props.bugs.errMess}
            />
          );
        }

        const ClientBugPage = () => {
          return (
            <ClientBug 
            bugs={this.props.bugs.bugs.filter((bug) => bug.imageName.slice(-2)===sessionStorage.getItem("userId"))}
              bugsLoading={this.props.bugs.isLoading}
              bugsErrMess={this.props.bugs.errMess}
            />
          );
        }

        return (
        <div>
            <Header/>
            <TransitionGroup>
              <CSSTransition key= {this.props.location.key} classNames= 'page' timeout={300}>
                <Switch>
                    <Route path="/admin-home" component={DashboardPage}/>
                    <Route path="/staff-home" component={StaffDashboardPage}/>
                    <Route path="/client-home" component={ClientDashboardPage}/>
                    <Route path="/home" component={HomePage}/>
                    <Route path="/profile" component={ProfilePage}/>
                    <Route path="/admin-project" component={AdminProjectPage}/>
                    <Route path="/staff-project" component={StaffProjectPage}/>
                    <Route path="/client-project" component={ClientProjectPage}/>
                    <Route exact path='/admin-bug' component={AdminBugPage}/>
                    <Route exact path='/staff-bug' component={StaffBugPage}/>
                    <Route exact path='/client-bug' component={ClientBugPage}/>
                    <Route path='/admin-bug/:bugId' component={BugDetail}/>
                    <Route path='/staff-bug/:bugId' component={StaffBugDetail1}/>
                    <Route path='/client-bug/:bugId' component={ClientBugDetail2}/>
                    <Route exact path='/contact-us' component={ContactPage}/>
                    <Route exact path= "/about-us" component= {()=> <About leaders= {this.props.leaders.leaders.filter((leader) => leader.roleId=== 2)}/>}/>
                    <Redirect to='/home'/>
                </Switch>
              </CSSTransition>
            </TransitionGroup>
            <Footer/>
        </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
