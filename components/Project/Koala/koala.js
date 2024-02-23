require('../Koala/Koala.scss');
import PropTypes from 'prop-types';
import React from 'react';
import {Header} from '../../Header/Header.js';
import * as d3 from 'd3';
const createReactClass = require('create-react-class');


const Koala = createReactClass({
  propTypes: {
    projectData: PropTypes.object.isRequired,
    menuItems: PropTypes.array.isRequired,
  },
  componentDidMount() {
    main();
  },
  render() {
    return (
      <div className='container'>
        <Header menuItems={this.props.menuItems}/>
        <h2>{this.props.projectData.title}</h2>
        <div id='dots' className='koala-container'></div>
        <button id="recommencer" className="button">Do it again!</button>
      </div>
    );
  },
});

export {Koala};

/* eslint-disable require-jsdoc, no-invalid-this*/
function createCircles(svg, r0) {
  svg.attr('width', r0)
    .attr('height', r0)
    .append('circle')
    .attr('cx', r0/2)
    .attr('cy', r0/2)
    .attr('r', r0/2)
    .attr('fill', function() {
      return colorScale();
    })
    .on('mouseover', function() {
      const r = d3.select(this).attr('r');
      split(r, d3.select(this.parentNode));
    });
}

function split(r0, parent) {
  parent.select('circle').remove();

  // coin 00
  const coin00 = parent.append('g')
    .attr('transform', 'translate('+ 0 +','+ 0 +')');

  // coin 10
  const coin10 = parent.append('g')
    .attr('transform', 'translate('+ 0 +','+ r0 +')');

  // coin 01
  const coin01 = parent.append('g')
    .attr('transform', 'translate('+ r0 +','+ 0 +')');

  // coin 11
  const coin11 = parent.append('g')
    .attr('transform', 'translate('+ r0 +','+ r0 +')');

  createCircles(coin00, r0);
  createCircles(coin10, r0);
  createCircles(coin01, r0);
  createCircles(coin11, r0);
}

function colorScale() {
  const randomColor1 = Math.floor( Math.random()*255 );
  const randomColor2 = Math.floor( Math.random()*255 );
  const randomColor3 = Math.floor( Math.random()*255 );
  return 'rgb('+ randomColor1 + ',' + randomColor2 + ',' + randomColor3 +')';
}

function main() {
  const margin = {top: 50, right: 50, bottom: 50, left: 50};
  const width = parseInt(d3.select('#dots').style('width')) - margin.left - margin.right;
  const height = window.innerHeight * 0.6;

  const w = (width > height) ? height : width;

  const svg = d3.select('#dots')
    .append('svg')
    .attr('width', w)
    .attr('height', w)
    .attr('class', 'mainSVG');

  svg.append('circle')
    .attr('cx', w/2)
    .attr('cy', w/2)
    .attr('r', w/2)
    .attr('fill', colorScale())
    .on('mouseover', function() {
      const r = d3.select(this).attr('r');
      d3.select(this).remove();
      split(r, svg);
    });

  d3.select('#recommencer')
    .on('click', function() {
      d3.selectAll('svg')
        .remove();
      main();
    });
}
/* eslint-enable require-jsdoc, no-invalid-this */
