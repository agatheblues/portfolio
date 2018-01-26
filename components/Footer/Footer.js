require('../Footer/Footer.scss');
import PropTypes from 'prop-types';
import React from 'react';
var createReactClass = require('create-react-class');

const Footer = createReactClass({
  getInitialState: function() {
    return {
    };
  },
  propTypes: {
  },
  render() {
    return(
      <div className='footer-container'>
        <p className='copyright'>All rights reserved &#169; 2015-2018 Agathe Lenclen</p>
      </div>
    );
  }
});

export {Footer};
