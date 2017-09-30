import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Route} from 'react-router-dom';
require('./main.scss');
import {GalleryPage} from './pages/GalleryPage.js';
import {AboutPage} from './pages/AboutPage.js';
import {PhotographyPage} from './pages/PhotographyPage.js';
import {ProjectPage} from './pages/ProjectPage.js';
import {Project} from './components/Project/Project.js';
import axios from 'axios';

var createReactClass = require('create-react-class');

const menuItems = [
  {name: 'Projects', link: '/', exact: true},
  {name: 'Photography', link: '/photography', exact: false},
  {name: 'About', link: '/about', exact: false}];


const MainWrapper = createReactClass({
  getInitialState: function() {
    return {
      projects: {},
      photography: {},
      about: {}
    };
  },
  componentDidMount: function() {
    const _this = this;
    this.serverRequest =
      axios
        .get('./static/pages/main.json')
        .then(function(result) {
          _this.setState({
            projects: result.data.projects,
            photography: result.data.photography,
            about: result.data.about
          });
        })
        .catch((error) => {
          const response = error.response;
          console.log(response.data.errors);
        });
  },
  componentWillUnmount: function() {
    // TODO
    //this.serverRequest.abort();
  },
  render() {
    if (Object.keys(this.state.photography).length === 0 && Object.keys(this.state.about).length === 0) return false;
    return(
      <Router>
        <div>
          <Route exact path="/" render={(props) => (
            <ProjectPage {...props} menuItems={menuItems} cardItems={this.state.projects} />
          )}/>
          <Route exact path="/about" render={(props) => (
            <AboutPage {...props}  menuItems={menuItems} aboutContent={this.state.about} />
          )}/>
          <Route exact path="/photography" render={(props) => (
            <PhotographyPage {...props}  menuItems={menuItems} cardItems={this.state.photography.galleries} />
          )}/>
          {
            this.state.photography.galleries.map((item, index) => {
              if (!item.id) {return;}
              const galleryPath = '/photography/' + item.id;
              return <Route exact
                path={galleryPath}
                key={index}
                render={(props) => <GalleryPage {...props} menuItems={menuItems} cardItem={item}/>}/>;
            })
          }


        </div>
      </Router>
    );
  }
});

export default MainWrapper;

ReactDOM.render(
  <MainWrapper />,
  document.querySelector('.container')
);
//
// {
//   this.state.projects.map((item, index) => {
//     if (!item.id) {return;}
//     const projectPath = '/projects/' + item.id;
//     return <Route exact
//       path={projectPath}
//       key={index}
//       render={(props) => <Project {...props} cardItem={item}/>}/>;
//   })
// }
