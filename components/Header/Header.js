require('../Header/Header.scss');
import PropTypes from 'prop-types';
var React = require('react');
var createReactClass = require('create-react-class');


const Header = createReactClass({
  getInitialState: function() {
    return {
    };
  },
  propTypes: {
  },
  render() {
    return(
      <h1>My title</h1>
    );
  }
});

export {Header};
