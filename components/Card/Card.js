require('../Card/Card.scss');
import PropTypes from 'prop-types';
import React from 'react';
import {Link} from 'react-router-dom';
const createReactClass = require('create-react-class');

const CardItem = createReactClass({
  getInitialState: function() {
    return {
    };
  },
  propTypes: {
    imgUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    alt: PropTypes.string,
  },
  render() {
    return (
      <div>
        <img className='card-thumbnail' src={this.props.imgUrl} alt={this.props.alt}/>
        <hr className='hline-seperator'></hr>
        <h2 className='card-title'>{this.props.title}</h2>
        <p className='card-description'>{this.props.description}</p>
      </div>
    );
  },
});

const Card = createReactClass({
  getInitialState: function() {
    return {
      cardClicked: '',
    };
  },
  propTypes: {
    cardItems: PropTypes.array.isRequired,
    origin: PropTypes.string.isRequired,
  },
  makeClickHandler: function(divId) {
    return function(e) {
      this.setState({
        cardClicked: divId,
      });
    }.bind(this);
  },
  render() {
    return (
      <section className='card-container'>
        <div className='row'>
          {
            this.props.cardItems.map((item, index) => {
              if (!item.id) {
                return;
              }
              const cardPath = this.props.origin + '/' + item.id;

              return <div className='col-xs-12 col-sm-6 col-md-4 col-lg-4 row-item'
                key={index}
                onClick={this.makeClickHandler(item.id)}
                id={item.id}>
                <Link to={cardPath} id={index}>
                  <div className='card-wrapper'>
                    <div className='card'>
                      <CardItem imgUrl={item.imgUrl} title={item.title} description={item.description} />
                    </div>
                  </div>
                </Link>
              </div>;
            })
          }
        </div>
      </section>
    );
  },
});

export {Card};
