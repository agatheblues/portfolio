require('../ColumnContent/ColumnContent.scss');
import PropTypes from 'prop-types';
import React from 'react';
import {NavLink} from 'react-router-dom';
const createReactClass = require('create-react-class');


const ColumnContent = createReactClass({
  propTypes: {
    title: PropTypes.string.isRequired,
    description: PropTypes.array.isRequired,
    links: PropTypes.object.isRequired,
  },
  addSpans(s) {
    const spans = s.match(/\{\{(.*?)\}\}/g);

    if (!spans) {
      return <p>{s}</p>;
    } else {
      const textParts = s.split(/\{\{(.*?)\}\}/g);
      const indexes = [];

      spans.map((span) => {
        // Remove curly brackets
        const spanCleaned = span.substr(2, span.length - 4);

        // Find index of span part in sentence
        indexes.push(textParts.indexOf(spanCleaned));
      });

      return <p>{
        textParts.map((textPart, index) => {
          const link = this.props.links[textPart];

          if (link && indexes.indexOf(index) != -1) {
            if (link.isExternal) {
              return <a className='highlight' key={index} href={link.url}>{textPart}</a>;
            } else {
              return <NavLink className='highlight' key={index} to={link.url}>{textPart}</NavLink>;
            }
          } else {
            return <span key={index}>{textPart}</span>;
          }
        })}</p>;
    }
  },
  render() {
    return (
      <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6'>
        <div className='column-title'>
          <h2>{this.props.title}</h2>
        </div>

        {
          this.props.description.map((text, index) => {
            return (
              <div key={index}>
                {this.addSpans(text)}
                <br></br>
              </div>
            );
          })
        }
      </div>
    );
  },
});

export {ColumnContent};
