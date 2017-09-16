require('../Gallery/Gallery.scss');
import PropTypes from 'prop-types';
var React = require('react');
var createReactClass = require('create-react-class');

// Component for gallery image
const GalleryImage = createReactClass({
  propTypes: {
    className: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired
  },
  render() {
    return(
      <img className={this.props.className} src={this.props.src} alt={this.props.alt} />
    );
  }
});

// Component for gallery
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
                return <div className='col-sm-12 col-md-12 col-xl-12' key={index}>
                  <div className='gallery-card'>
                    <GalleryImage className='gallery-thumbnail' src={url} alt={'Image number ' + (index + 1)}/>
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
