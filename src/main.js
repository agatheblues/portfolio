import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import Gallery from './components/Gallery/Gallery.js';
// require('./main.scss');

ReactDOM.render(
  <div>
    <Gallery />
    <h1>Coucou</h1>
  </div>,
  document.getElementById('root')
);
