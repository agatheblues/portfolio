import React from 'react';
import {ColumnContent} from '../components/ColumnContent/ColumnContent.js';
var createReactClass = require('create-react-class');

const content =  {
  title: 'About me',
  description: [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '
  ]
};

const HomePage = createReactClass({
  render() {
    return(
      <div className='row'>
        <ColumnContent title={content.title} description={content.description}/>
      </div>
    );
  }
});

export {HomePage};
