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
        <p className='copyright'>All right reserved &#169; 2015-2017 Agathe Lenclen</p>
      </div>
    );
  }
});

export {Footer};
