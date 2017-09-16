require('../Gallery/Gallery.scss');
import PropTypes from 'prop-types';
var React = require('react');
var createReactClass = require('create-react-class');


const Gallery = createReactClass({
  getInitialState: function() {
    return {
      active: false
    };
  },
  propTypes: {
  },
  render: function() {
    return (
      <div>
        <h1>Coucou</h1>
      </div>
    );
  }
});

export {Gallery};
