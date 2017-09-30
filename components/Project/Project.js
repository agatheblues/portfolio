require('../Project/Project.scss');
import {Koala} from './Koala/Koala.js';
import PropTypes from 'prop-types';
import {Header} from '../Header/Header.js';
import React from 'react';
var createReactClass = require('create-react-class');

const Project = createReactClass({
  propTypes: {
    cardItem: PropTypes.object.isRequired,
    menuItems: PropTypes.array.isRequired
  },
  render() {
    return(
      <div>
        <Header menuItems={this.props.menuItems}/>
        <Koala />
      </div>
    );
  }
});

export {Project};
