require('../Project/Project.scss');
import {Koala} from './Koala/Koala.js';
import {DotsStraightLine} from './DotsStraightLine/DotsStraightLine.js';
import PropTypes from 'prop-types';
import {Header} from '../Header/Header.js';
import React from 'react';
var createReactClass = require('create-react-class');

const Project = createReactClass({
  propTypes: {
    cardItem: PropTypes.object.isRequired,
    menuItems: PropTypes.array.isRequired
  },
  renderProject: function(){
    switch (this.props.cardItem.id) {
    case 'project-koala':
      return(<Koala/>);
      break;
    case 'project-dots-straight-line':
      return(<DotsStraightLine projectData={this.props.cardItem}/>);
      break;
    default:
      return false;
    };
  },
  render() {
    return(
      <div>
        <Header menuItems={this.props.menuItems}/>
        {
          this.renderProject()
        }
      </div>
    );
  }
});

export {Project};
