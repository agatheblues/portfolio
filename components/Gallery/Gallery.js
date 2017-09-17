require('../Gallery/Gallery.scss');
import PropTypes from 'prop-types';
import React from 'react';
var createReactClass = require('create-react-class');

const Gallery = createReactClass({
  getInitialState: function() {
    return {
      url: ''
    };
  },
  propTypes: {
    imgUrls: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string
  },
  render() {
    return(
      <section className='gallery-container'>
        <div className='gallery-wrapper'>
          <div className='gallery-title'>
            <h2>{this.props.title}</h2>
          </div>
          <div className='gallery-description'>
            <p>{this.props.description}</p>
          </div>
          <hr className='hline-seperator'></hr>
          <div className='row'>
            {
              this.props.imgUrls.map((url, index) => {
                return <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12' key={index}>
                  <div className='gallery-card'>
                    <img className='gallery-thumbnail' src={url} alt={'Image number ' + (index + 1)}/>
                  </div>
                </div>;
              })
            }
          </div>
        </div>
      </section>
    );
  }
});

export {Gallery};
