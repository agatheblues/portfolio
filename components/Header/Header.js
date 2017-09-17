require('../Header/Header.scss');
import PropTypes from 'prop-types';
import React from 'react';
import {Link} from 'react-router-dom';
var createReactClass = require('create-react-class');


const Header = createReactClass({
  getInitialState: function() {
    return {
      activeIndex: 0
    };
  },
  propTypes: {
    menuItems: PropTypes.array.isRequired
  },
  setActive(e) {
    const index = e.target.id;
    this.setState({ activeIndex: index });
  },
  render() {
    return(
      <header className="header-container">
        <div>
          <ul onClick={this.setActive} className="header-list">
            {
              this.props.menuItems.map((item, index) => {
                return <li
                  className={this.state.activeIndex==index ? 'header-items active': 'header-items'}
                  key={index}><Link to={item.link} id={index}>{item.name}</Link></li>;
              })
            }
          </ul>
        </div>
      </header>
    );
  }
});

export {Header};
