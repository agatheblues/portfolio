require('../ColumnContent/ColumnContent.scss');
import PropTypes from 'prop-types';
import React from 'react';
var createReactClass = require('create-react-class');


const ColumnContent = createReactClass({
  propTypes: {
    title: PropTypes.string.isRequired,
    description: PropTypes.array.isRequired
  },
  render() {
    return(
      <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6'>
        <div className='column-title'>
          <h2>{this.props.title}</h2>
        </div>
        <hr className='hline-seperator'></hr>
        {
          this.props.description.map((text, index) => {
            return (
              <div key={index}>
                <p>{text}</p>
                <br></br>
              </div>
            );
          })
        }
      </div>
    );
  }
});

export {ColumnContent};
