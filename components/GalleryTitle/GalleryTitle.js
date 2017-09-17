require('../GalleryTitle/GalleryTitle.scss');
import PropTypes from 'prop-types';
import React from 'react';
var createReactClass = require('create-react-class');


const GalleryTitle = createReactClass({
  getInitialState: function() {
    return {
    };
  },
  propTypes: {
    title: PropTypes.string.isRequired
  },
  render() {
    return(
      <div className="gallery-title-container">
        <h1>{this.props.title}</h1>
      </div>
    );
  }
});

export {GalleryTitle};
