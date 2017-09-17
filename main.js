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
import {HomePage} from './pages/HomePage.js';
import {PhotographyPage} from './pages/PhotographyPage.js';
import {Header} from './components/Header/Header.js';

const menuItems = [
  {name: 'Home', link: '/'},
  {name: 'About', link: '/about'},
  {name: 'Photography', link: '/photography'}];

const BasicExample = () => (
  <Router>
    <div>
      <Header menuItems={menuItems}/>
      <Route exact path="/" component={HomePage}/>
      <Route exact path="/about" component={AboutPage}/>
      <Route exact path="/photography" component={PhotographyPage}/>
      <Route exact path="/photography/gallery" component={GalleryPage}/>
    </div>
  </Router>
);

export default BasicExample;

ReactDOM.render(
  <BasicExample />,
  document.querySelector('.container')
);
