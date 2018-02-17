require('../Slider/Slider.scss');
import PropTypes from 'prop-types';
import React from 'react';
import {NavLink} from 'react-router-dom';
var createReactClass = require('create-react-class');


const Slider = createReactClass({
  getInitialState: function() {
    return {
      value: this.props.defaultValue
    };
  },

  propTypes: {
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    step: PropTypes.number,
    defaultValue: PropTypes.number.isRequired,
    id: PropTypes.string,
    handleSlider: PropTypes.func.isRequired
  },

  handleSliderChange(event) {
    let value = event.target.value;
    this.setState({
      value: value
    });
    this.props.handleSlider(value);
  },

  render() {
    return(
      <div className='range-container'>
        <input type='range'
          min={this.props.min}
          max={this.props.max}
          value={this.state.value}
          step={this.props.step}
          id={this.props.id}
          className='input-range'
          onChange={this.handleSliderChange}>
        </input>
      </div>
    );
  }
});

export {Slider};
