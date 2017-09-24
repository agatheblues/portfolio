import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Route} from 'react-router-dom';
require('./main.scss');
import {GalleryPage} from './pages/GalleryPage.js';
import {AboutPage} from './pages/AboutPage.js';
import {HomePage} from './pages/HomePage.js';
import {PhotographyPage} from './pages/PhotographyPage.js';
import {Header} from './components/Header/Header.js';
import axios from 'axios';

var createReactClass = require('create-react-class');

const menuItems = [
  {name: 'Home', link: '/', exact: true},
  {name: 'About', link: '/about', exact: false},
  {name: 'Photography', link: '/photography', exact: false}];


const MainWrapper = createReactClass({
  getInitialState: function() {
    return {
      galleries: []
    };
  },
  componentDidMount: function() {
    var _this = this;
    this.serverRequest =
      axios
        .get('./static/galleries.json')
        .then(function(result) {
          _this.setState({
            galleries: result.data.galleries
          });
        })
        .catch((error) => {
          const response = error.response;
          console.log(response.data.errors);
        });
  },
  componentWillUnmount: function() {
    this.serverRequest.abort();
  },
  render() {
    return(
      <Router>
        <div>
          <Header menuItems={menuItems}/>
          <Route exact path="/" component={HomePage}/>
          <Route exact path="/about" component={AboutPage}/>
          <Route exact path="/photography" render={(props) => (
            <PhotographyPage {...props} cardItems={this.state.galleries} />
          )}/>
          {
            this.state.galleries.map((item, index) => {
              if (!item.id) {return;}
              const galleryPath = '/photography/' + item.id;
              return <Route exact
                path={galleryPath}
                key={index}
                render={(props) => <GalleryPage {...props} cardItem={item}/>}/>;
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
