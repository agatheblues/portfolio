import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {Gallery} from '../components/Gallery/Gallery.js';
import {Header} from '../components/Header/Header.js';
import {Footer} from '../components/Footer/Footer.js';
var createReactClass = require('create-react-class');


const GalleryPage = createReactClass({
  propTypes: {
    cardItem: PropTypes.object.isRequired,
    menuItems: PropTypes.array.isRequired
  },
  getInitialState: function() {
    return {
      galleryContent: []
    };
  },
  componentDidMount: function() {
    const _this = this;
    const url = './static/galleries/' + this.props.cardItem.id + '.json';

    _this.serverRequest =
      axios
        .get(url)
        .then(function(result) {
          _this.setState({
            galleryContent: result.data.galleryContent
          });
        })
        .catch((error) => {
          const response = error.response;
          console.log(response.data.errors);
        });
  },
  componentWillUnmount: function() {
    // TODO
    // this.serverRequest.abort();
  },
  render() {
    return(
      <div className='container'>
        <Header menuItems={this.props.menuItems}/>
        <div className="gallery-title-container">
          <h1 className="gallery-title">{this.props.cardItem.title}</h1>
          <div className="gallery-metadata-container">
            <p className="gallery-metadata-item">{this.props.cardItem.location}</p>
            <span>/</span>
            <p className="gallery-metadata-item">{this.props.cardItem.year}</p>
          </div>
        </div>
        {
          this.state.galleryContent.map((item, index) => {
            return <Gallery
              key={index}
              imgUrls={item.imgUrlsList}
              title={item.title}
              description={item.description}/>;
          })
        }
        <Footer />
      </div>
    );
  }
});

export {GalleryPage};
