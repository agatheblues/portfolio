import React from 'react';
import PropTypes from 'prop-types';
import {Header} from '../components/Header/Header.js';
import {ColumnContent} from '../components/ColumnContent/ColumnContent.js';
var createReactClass = require('create-react-class');

const AboutPage = createReactClass({
  propTypes: {
    aboutContent: PropTypes.object.isRequired,
    menuItems: PropTypes.array.isRequired
  },
  render() {
    var { aboutContent } = this.props;

    return(
      <div className='container'>
        <Header menuItems={this.props.menuItems}/>
        <div className='row'>
          <ColumnContent
            title={aboutContent.aboutMe.title}
            description={aboutContent.aboutMe.description}
            links={aboutContent.links}/>
          <ColumnContent
            title={aboutContent.contact.title}
            description={aboutContent.contact.description}
            links={aboutContent.links}/>
        </div>
        <div className='row'>
          <ColumnContent
            title={aboutContent.note.title}
            description={aboutContent.note.description}
            links={aboutContent.links}/>
        </div>
      </div>
    );
  }
});

export {AboutPage};
