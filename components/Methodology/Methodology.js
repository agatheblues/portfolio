require('../Methodology/Methodology.scss');
import PropTypes from 'prop-types';
import React from 'react';
var createReactClass = require('create-react-class');

const Methodology = createReactClass({
  getInitialState: function() {
    return {
    };
  },
  propTypes: {
    content: PropTypes.array.isRequired,
  },
  render() {
    return(
      <div className='methodology-container'>
        <h2 className='section-title'>Methodology</h2>
        {
          this.props.content.map((item, index) => {
            return <p className='methodology-content' key={index}>{item}</p>;
          })
        }
      </div>
    );
  }
});

export {Methodology};
