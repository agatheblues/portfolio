require('../Footer/Footer.scss');
import React from 'react';
const createReactClass = require('create-react-class');

const Footer = createReactClass({
  getInitialState: function() {
    return {
    };
  },
  propTypes: {
  },
  render() {
    return (
      <div className='footer-container'>
        <p className='copyright'>All rights reserved &#169; 2015-2018 Agathe Lenclen</p>
      </div>
    );
  },
});

export {Footer};
