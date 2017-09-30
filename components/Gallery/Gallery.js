require('../Gallery/Gallery.scss');
import PropTypes from 'prop-types';
import React from 'react';
import LazyLoad from 'react-lazyload';
var createReactClass = require('create-react-class');

const PlaceholderComponent = createReactClass({
  render() {
    return(
      <div className='gallery-placeholder'>
        <img className='gallery-thumbnail' src='./static/images/placeholder.png' alt='placeholder'/>
        <div className='sk-cube-grid'>
          <div className='sk-cube sk-cube1'></div>
          <div className='sk-cube sk-cube2'></div>
          <div className='sk-cube sk-cube3'></div>
        </div>
      </div>
    );
  }
});

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
                    <LazyLoad height={600}
                      placeholder={<PlaceholderComponent/>}
                      debounce={500}
                      offset={200}>
                      <img className='gallery-thumbnail' src={url} alt={'Image number ' + (index + 1)}/>
                    </LazyLoad>
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
