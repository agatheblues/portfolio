import React from 'react';
import PropTypes from 'prop-types';
import {Card} from '../components/Card/Card.js';
import {Header} from '../components/Header/Header.js';
var createReactClass = require('create-react-class');

const PhotographyPage = createReactClass({
  propTypes: {
    cardItems: PropTypes.array.isRequired,
    menuItems: PropTypes.array.isRequired
  },
  render() {
    return(
      <div className='container'>
        <Header menuItems={this.props.menuItems}/>
        <Card origin='/photography' cardItems={this.props.cardItems} />
      </div>
    );
  }
});

export {PhotographyPage};
