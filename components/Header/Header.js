require('../Header/Header.scss');
import PropTypes from 'prop-types';
import React from 'react';
import {NavLink} from 'react-router-dom';
var createReactClass = require('create-react-class');


const Header = createReactClass({
  propTypes: {
    menuItems: PropTypes.array.isRequired
  },
  render() {
    return(
      <header className="header-container">
        <div>
          <ul className="header-list">
            {
              this.props.menuItems.map((item, index) => {
                return (
                  <li className='header-items' key={index}>
                    <NavLink to={item.link}
                      id={index}
                      activeClassName='active'
                      exact={item.exact}>{item.name}</NavLink>
                  </li>);
              })
            }
          </ul>
        </div>
      </header>
    );
  }
});

export {Header};
