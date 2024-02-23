import React from 'react';
import PropTypes from 'prop-types';
import {Header} from '../components/Header/Header.js';
import {ColumnContent} from '../components/ColumnContent/ColumnContent.js';
const createReactClass = require('create-react-class');

const AboutPage = createReactClass({
  propTypes: {
    aboutContent: PropTypes.object.isRequired,
    menuItems: PropTypes.array.isRequired,
  },
  render() {
    const {aboutContent} = this.props;

    return (
      <div className='container'>
        <Header menuItems={this.props.menuItems}/>
        <div className='row'>
          <ColumnContent
            title={aboutContent.aboutMe.title}
            description={aboutContent.aboutMe.description}
            links={aboutContent.links}/>
        </div>
      </div>
    );
  },
});

export {AboutPage};
