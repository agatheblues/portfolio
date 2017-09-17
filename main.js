import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
require('./main.scss');
import {GalleryPage} from './pages/GalleryPage.js';
import {AboutPage} from './pages/AboutPage.js';


const BasicExample = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>

      <Route exact path="/" component={GalleryPage}/>
      <Route exact path="/about" component={AboutPage}/>
    </div>
  </Router>
);

export default BasicExample;

ReactDOM.render(
  <BasicExample />,
  document.querySelector('.container')
);
