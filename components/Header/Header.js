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
    title: PropTypes.string.isRequired
  },
  render() {
    return(
      <header className="header-container">
        <h1>{this.props.title}</h1>
      </header>
    );
  }
});

export {Header};
