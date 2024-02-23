import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
require('./main.scss');
// import {GalleryPage} from './pages/GalleryPage.js';
import {AboutPage} from './pages/AboutPage.js';
// import {PhotographyPage} from './pages/PhotographyPage.js';
import {ProjectPage} from './pages/ProjectPage.js';
import {Project} from './components/Project/Project.js';
import {NotFound} from './components/NotFound/NotFound.js';
import axios from 'axios';

const createReactClass = require('create-react-class');

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
}

const menuItems = [
  {name: 'Projects', link: '/projects', exact: false},
  // {name: 'Photography', link: '/photography', exact: false},
  {name: 'About', link: '/about', exact: false}];


const MainWrapper = createReactClass({
  getInitialState: function() {
    return {
      projects: {},
      photography: {},
      about: {},
    };
  },
  componentDidMount: function() {
    const _this = this;
    this.serverRequest =
      axios
        .get('./static/main.json')
        .then(function(result) {
          _this.setState({
            projects: result.data.projects,
            // photography: result.data.photography,
            about: result.data.about,
          });
        })
        .catch((error) => {
          console.log(error);
        });
  },
  componentWillUnmount: function() {
    // TODO
    // this.serverRequest.abort();
  },
  render() {
    if (Object.keys(this.state.photography).length === 0 &&
    Object.keys(this.state.about).length === 0 &&
    Object.keys(this.state.projects).length === 0) return false;

    return (
      <Router>
        <Switch>
          <Route exact path="/" render={() => (<Redirect to="/projects"/>)}/>
          <Route exact path="/projects" render={(props) => (
            <ProjectPage {...props} menuItems={menuItems} cardItems={this.state.projects.projectList} />
          )}/>
          <Route exact path="/about" render={(props) => (
            <AboutPage {...props} menuItems={menuItems} aboutContent={this.state.about} />
          )}/>
          {/* <Route exact path="/photography" render={(props) => (
            <PhotographyPage {...props} menuItems={menuItems} cardItems={this.state.photography.galleries} />
          )}/> */}
          {/* {
            this.state.photography.galleries.map((item, index) => {
              if (!item.id) {
                return;
              }
              const galleryPath = '/photography/' + item.id;
              return <Route exact
                path={galleryPath}
                key={index}
                render={(props) => <GalleryPage {...props} menuItems={menuItems} cardItem={item}/>}/>;
            })
          } */}

          {
            this.state.projects.projectList.map((item, index) => {
              if (!item.id) {
                return;
              }
              const projectPath = '/projects/' + item.id;
              return <Route exact
                path={projectPath}
                key={index}
                render={(props) => <Project {...props} menuItems={menuItems} cardItem={item}/>}/>;
            })
          }
          <Route exact path="*" component={NotFound}/>
        </Switch>
      </Router>
    );
  },
});

export default MainWrapper;

ReactDOM.render(
  <MainWrapper />,
  document.querySelector('#app'),
);
