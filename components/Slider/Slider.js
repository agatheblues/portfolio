require('../Slider/Slider.scss');
import PropTypes from 'prop-types';
import React from 'react';
const createReactClass = require('create-react-class');


const Slider = createReactClass({
  getInitialState: function() {
    return {
      value: this.props.defaultValue,
      className: 'range-container',
    };
  },

  propTypes: {
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    step: PropTypes.number,
    defaultValue: PropTypes.number.isRequired,
    id: PropTypes.string,
    handleSlider: PropTypes.func.isRequired,
    width: PropTypes.number,
  },

  handleSliderChange(event) {
    const value = event.target.value;
    this.setState({
      value: value,
    });
    this.props.handleSlider(parseInt(value));
  },

  componentDidMount() {
    if (this.props.width && this.props.width >= 600) {
      this.setState({
        className: 'range-container range-container--600',
      });
    } else {
      this.setState({
        className: 'range-container',
      });
    }
  },

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.width && (nextProps.width != this.props.width)) {
      if (nextProps.width >= 600) {
        this.setState({
          className: 'range-container range-container--600',
        });
      } else {
        this.setState({
          className: 'range-container',
        });
      }
    }
  },

  render() {
    return (
      <div className={this.state.className}>
        <input
          type='range'
          min={this.props.min}
          max={this.props.max}
          value={this.state.value}
          step={this.props.step}
          id={this.props.id}
          className='input-range'
          onChange={this.handleSliderChange}
        />
      </div>
    );
  },
});

export {Slider};
