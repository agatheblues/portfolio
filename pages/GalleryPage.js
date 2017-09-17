import React from 'react';
import {Gallery} from '../components/Gallery/Gallery.js';
import {Header} from '../components/Header/Header.js';
import {Footer} from '../components/Footer/Footer.js';
var createReactClass = require('create-react-class');

// Create new array with URLs for images
let imgUrlsList = [
  './data/images/IMG_4666.JPG',
  './data/images/IMG_4667.JPG',
  './data/images/IMG_4686.JPG'

];

const GalleryPage = createReactClass({
  render() {
    return(
      <div>
        <div className="gallery-title-container">
          <h1>Gallery</h1>
        </div>
        <Gallery imgUrls={imgUrlsList}
          title={'My title 2'}
          description={
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
          }/>
        <Gallery imgUrls={imgUrlsList}
          title={'My title 2'}
          description={
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
          }/>
        <Footer />
      </div>
    );
  }
});

export {GalleryPage};
