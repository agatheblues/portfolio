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
    imgUrls: PropTypes.array.isRequired
  },
  render() {
    return(
      <div className='container-fluid gallery-container'>
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
    );
  }
});

//  // Function for opening modal dialog
//  openModal(url, e) {
//   this.setState({
//    showModal: true,
//    url: url
//   })
//  };
//
//  // Function for closing modal dialog
//  closeModal() {
//   this.setState({
//     showModal: false,
//     url: ''
//   })
//  }
// }

export {Gallery};
