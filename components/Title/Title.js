require('../Title/Title.scss');
import PropTypes from 'prop-types';
import React from 'react';
import {NavLink} from 'react-router-dom';
var createReactClass = require('create-react-class');


const Title = createReactClass({
  propTypes: {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    authors: PropTypes.array.isRequired,
    date: PropTypes.string.isRequired
  },
  addNewLine(s = '') {
    let newlines = s.match(/\{\{\}\}/g);

    if (!newlines) {
      return <div><h1>{s}</h1></div>;
    } else {
      let textParts = s.split(/\{\{\}\}/g);
      return (<div className='title-wrapper'>
        {
          textParts.map((textPart, index) => {
            return (
              <div key={index}>
                <h1>{textPart}</h1>
                <br></br>
              </div>
            );
          })
        }
      </div>);
    }
  },
  renderAuthors() {
    if (!this.props.authors) {
      return false;
    }

    const length = this.props.authors.length;

    return this.props.authors.map((author, index) => {
      if (index != length-1) {
        if (author.link) {
          return (
            <p key={index}>&nbsp;&nbsp;<a href={author.link}>{author.name}</a>,</p>
          );
        } else {
          return (
            <p key={index}>&nbsp;&nbsp;{author.name},</p>
          );
        }
      } else {
        if (author.link) {
          return (
            <p key={index}>&nbsp;&nbsp;<a className='link' href={author.link}>{author.name}</a></p>
          );
        } else {
          return (
            <p key={index}>&nbsp;&nbsp;{author.name}</p>
          );
        }
      }
    });
  },
  render() {
    return(
      <div className='title-container'>
        <div className='container container--vertical-centered'>
          {this.addNewLine(this.props.title)}
          <hr className='hline-seperator hline-seperator--centered'></hr>
          <div className='subtitle-container'>
            <p>{this.props.subtitle}</p>
          </div>
          <div className='author-container'>
            <p>By</p>
            { this.renderAuthors() }
            <span>/</span>
            <p>{this.props.date}</p>
          </div>
        </div>
      </div>
    );
  }
});

export {Title};
