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
import {Header} from './components/Header/Header.js';

const menuItems = [
  {name: 'Home', link: '/'},
  {name: 'About', link: '/about'},
  {name: 'Photography', link: '/photography'}];

const BasicExample = () => (
  <Router>
    <div>
      <Header menuItems={menuItems}/>
      <Route exact path="/" component={AboutPage}/>
      <Route exact path="/about" component={AboutPage}/>
      <Route exact path="/photography" component={GalleryPage}/>
    </div>
  </Router>
);

export default BasicExample;

ReactDOM.render(
  <BasicExample />,
  document.querySelector('.container')
);

// <ul>
//   <li><Link to="/">Home</Link></li>
//   <li><Link to="/about">About</Link></li>
// </ul>
