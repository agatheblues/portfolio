import React from 'react';
import PropTypes from 'prop-types';
import {Card} from '../components/Card/Card.js';
var createReactClass = require('create-react-class');

const ProjectPage = createReactClass({
  propTypes: {
    cardItems: PropTypes.array.isRequired
  },
  render() {
    return(
      <div>
        <Card origin='/projects' cardItems={this.props.cardItems} />
      </div>
    );
  }
});

export {ProjectPage};
