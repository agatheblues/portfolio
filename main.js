import React from 'react';
import ReactDOM from 'react-dom';
import {Gallery} from './components/Gallery/Gallery.js';
import {Header} from './components/Header/Header.js';
require('./main.scss');

// Create new array with URLs for images
let imgUrlsList = [
  './data/images/IMG_4666.JPG',
  './data/images/IMG_4667.JPG',
  './data/images/IMG_4686.JPG',
  'https://source.unsplash.com/2Bjq3A7rGn4/800x600',
  'https://source.unsplash.com/t20pc32VbrU/800x600',
  'https://source.unsplash.com/pHANr-CpbYM/800x600',
  'https://source.unsplash.com/3PmwYw2uErY/800x600',
  'https://source.unsplash.com/uOi3lg8fGl4/800x600',
  'https://source.unsplash.com/CwkiN6_qpDI/800x600',
  'https://source.unsplash.com/9O1oQ9SzQZQ/800x600',
  'https://source.unsplash.com/E4944K_4SvI/800x600',
  'https://source.unsplash.com/-hI5dX2ObAs/800x600',
  'https://source.unsplash.com/vZlTg_McCDo/800x600'

];


ReactDOM.render(
  <div>
    <Header title={'My title'}/>
    <Gallery imgUrls={imgUrlsList} />
  </div>,
  document.querySelector('.container')
);
