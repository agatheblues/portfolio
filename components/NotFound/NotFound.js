require('../NotFound/NotFound.scss');
import React from 'react';
const createReactClass = require('create-react-class');


const NotFound = createReactClass({
  getInitialState: function() {
    return {
    };
  },
  propTypes: {
  },
  render() {
    return (
      <div className='title-container'>
        <div className='container container--vertical-centered'>
          <p>🚣‍♀️ There is nothing here.</p>
        </div>
      </div>
    );
  },
});

export {NotFound};
