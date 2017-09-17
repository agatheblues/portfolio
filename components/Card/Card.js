require('../Card/Card.scss');
import PropTypes from 'prop-types';
import React from 'react';
import {Link} from 'react-router-dom';
var createReactClass = require('create-react-class');

const CardItem = createReactClass({
  getInitialState: function() {
    return {
    };
  },
  propTypes: {
    imgUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    alt: PropTypes.string
  },
  render() {
    return(
      <div>
        <img className='card-thumbnail' src={this.props.imgUrl} alt={this.props.alt}/>
        <hr className='hline-seperator'></hr>
        <h2 className='card-title'>{this.props.title}</h2>
        <p className='card-description'>{this.props.description}</p>
      </div>
    );
  }
});

const Card = createReactClass({
  getInitialState: function() {
    return {
      galleryClicked: ''
    };
  },
  propTypes: {
    cardItems: PropTypes.array.isRequired
  },
  handleClick: function(e) {
    console.log('coucou');
    console.log(e.target);
  },
  render() {
    return(
      <section className='card-container'>
        <div className='row'>
          {
            this.props.cardItems.map((item, index) => {
              if (!item.linkTo | !item.id) {return;}
              return <div className='col-xs-12 col-sm-6 col-md-4 col-lg-4'
                key={index}
                onClick={this.handleClick}
                id={item.id}>
                <Link to={item.linkTo} id={index}>
                  <div className='card-wrapper'>
                    <div className='card'>
                      <CardItem imgUrl={item.imgUrl} linkTo={item.linkTo} title={item.title} description={item.description} />
                    </div>
                  </div>
                </Link>
              </div>;
            })
          }
        </div>
      </section>
    );
  }
});

export {Card};
