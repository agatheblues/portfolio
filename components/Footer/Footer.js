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
        <hr className='hline-top'></hr>
        <p className='copyright'>Tous droits réservés &#169; 2016-2017 Agathe Lenclen</p>
      </div>
    );
  }
});

export {Footer};
