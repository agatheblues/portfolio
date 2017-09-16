require('../halfContainer/halfContainer.scss');
import PropTypes from 'prop-types';
var React = require('react');
var createReactClass = require('create-react-class');

const HalfContainer = createReactClass({
  getInitialState: function() {
    return {
      active: false
    };
  },
  propTypes: {
    isRight: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired
  },
  scrollTo: function(e) {
    // console.log(e.target.id);
    this.setState({active: true});
  },
  render: function() {
    let halfContainerClass = 'half-wrapper';
    halfContainerClass += this.state.active ? ' half-wrapper--selected' : '';
    halfContainerClass += this.props.isRight ? ' half-wrapper--right' : ' half-wrapper--left';

    console.log(this.state.active);
    return (
      <div className={halfContainerClass}>
        <a
          href='#test'
          id={this.props.title}
          className='halfContainer__title'
          onClick={this.scrollTo}>{this.props.title}</a>
      </div>
    );
  }
});

export {HalfContainer};
