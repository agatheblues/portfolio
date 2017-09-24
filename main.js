import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Route} from 'react-router-dom';
require('./main.scss');
import {GalleryPage} from './pages/GalleryPage.js';
import {AboutPage} from './pages/AboutPage.js';
import {HomePage} from './pages/HomePage.js';
import {PhotographyPage} from './pages/PhotographyPage.js';
import {Header} from './components/Header/Header.js';

var createReactClass = require('create-react-class');

const menuItems = [
  {name: 'Home', link: '/', exact: true},
  {name: 'About', link: '/about', exact: false},
  {name: 'Photography', link: '/photography', exact: false}];

const cardItems = [
  {
    title: 'Card 1',
    imgUrl: './data/images/IMG_4666.JPG',
    id: 'gallery-1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt'
  },
  {
    title: 'Card 2',
    imgUrl: './data/images/IMG_4666.JPG',
    id: 'gallery-2',
  },
  {
    title: 'Card 3',
    imgUrl: './data/images/IMG_4666.JPG',
    id: 'gallery-3',
  },
  {
    title: 'Card 4',
    imgUrl: './data/images/IMG_4666.JPG',
    id: 'gallery-4',
  },
  {
    title: 'Card 5',
    imgUrl: './data/images/IMG_4666.JPG',
    id: 'gallery-5',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt'
  },
  {
    title: 'Card 6',
    imgUrl: './data/images/IMG_4666.JPG',
    id: 'gallery-6',
  },
  {
    title: 'Card 7',
    imgUrl: './data/images/IMG_4666.JPG',
    id: 'gallery-7',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt'
  }
];

const MainWrapper = createReactClass({
  getInitialState: function() {
    return {
      selectedGallery: 'coucou'
    };
  },
  render() {
    return(
      <Router>
        <div>
          <Header menuItems={menuItems}/>
          <Route exact path="/" component={HomePage}/>
          <Route exact path="/about" component={AboutPage}/>
          <Route exact path="/photography" render={(props) => (
            <PhotographyPage {...props} cardItems={cardItems} />
          )}/>
          {
            cardItems.map((item, index) => {
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
