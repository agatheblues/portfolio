require('../Footer/Footer.scss');
import PropTypes from 'prop-types';
var React = require('react');
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
      <div className="footer-container">
        <hr className='hline-top'></hr>
        <p>Coucou</p>
      </div>
    );
  }
});

export {Footer};
