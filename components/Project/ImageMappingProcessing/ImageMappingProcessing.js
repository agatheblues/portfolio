import PropTypes from 'prop-types';
import React from 'react';
require('../ImageMappingProcessing/ImageMappingProcessing.scss');
var createReactClass = require('create-react-class');


const ImageMappingProcessing = createReactClass({
  propTypes: {
    projectData: PropTypes.object.isRequired
  },
  componentDidMount() {
  },
  render() {
    return (
      <div>
        <div className='ImageMappingProcessing-title'>
          <h2>{this.props.projectData.title}</h2>
        </div>
        <div className='ImageMappingProcessing-description'>
          <p>{this.props.projectData.longDescription}</p>
        </div>
        <canvas data-processing-sources="pixel_to_the_line.pde"></canvas>
      </div>
    );
  }
});

export {ImageMappingProcessing};
