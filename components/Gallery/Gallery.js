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

// // Component for gallery modal
// class GalleryModal extends React.Component {
//   render() {
//     if (this.props.isOpen === false) {
//       return null;
//     }
//
//     return (
//       <div isOpen={this.props.isOpen} className='modal-overlay' onClick={this.props.onClick} name={this.props.name}>
//         <div className='modal-body'>
//           <a className='modal-close' href='#' onClick={this.props.onClick}><span className='fa fa-times'></span></a>
//           <img src={this.props.src} />
//         </div>
//       </div>
//     )
//   }
// }

// Component for gallery
const Gallery = createReactClass({
  getInitialState: function() {
    return {
      showModal: false,
      url: ''
    };

    this.openModal = this.openModal.bind(this);

    this.closeModal = this.closeModal.bind(this);
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
              return <div className='col-sm-6 col-md-3 col-xl-2' key={index}>
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
