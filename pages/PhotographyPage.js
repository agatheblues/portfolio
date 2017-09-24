import React from 'react';
import PropTypes from 'prop-types';
import {Card} from '../components/Card/Card.js';
var createReactClass = require('create-react-class');

const PhotographyPage = createReactClass({
  propTypes: {
    cardItems: PropTypes.array.isRequired
  },
  render() {
    return(
      <div>
        <Card cardItems={this.props.cardItems} />
      </div>
    );
  }
});

export {PhotographyPage};
