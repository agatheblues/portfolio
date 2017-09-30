require('../Koala/Koala.scss');
import PropTypes from 'prop-types';
import React from 'react';
import * as d3 from 'd3';
var createReactClass = require('create-react-class');


const Koala = createReactClass({
  propTypes: {
  },
  componentDidMount() {
    main();
  },
  render() {
    return (
      <div>
        <div id='dots' className='koala-container'></div>
        <button id="recommencer" className="button">Do it again!</button>
      </div>
    );
  }
});

export {Koala};


function createCircles(svg, r0){

  svg.attr('width', r0)
    .attr('height', r0)
    .append('circle')
    .attr('cx', r0/2)
    .attr('cy', r0/2)
    .attr('r', r0/2)
    .attr('fill', function(){ return colorScale(); })
    .on('mouseover', function(){
      var r = d3.select(this).attr('r');
      split(r, d3.select(this.parentNode));
    });
}

function split(r0, parent){
  parent.select('circle').remove();

  //coin 00
  var coin00 = parent.append('g')
    .attr('transform', 'translate('+ 0 +','+ 0 +')');

  //coin 10
  var coin10 = parent.append('g')
    .attr('transform', 'translate('+ 0 +','+ r0 +')');

  //coin 01
  var coin01 = parent.append('g')
    .attr('transform', 'translate('+ r0 +','+ 0 +')');

  //coin 11
  var coin11 = parent.append('g')
    .attr('transform', 'translate('+ r0 +','+ r0 +')');

  createCircles(coin00,r0);
  createCircles(coin10,r0);
  createCircles(coin01,r0);
  createCircles(coin11,r0);
}

function colorScale() {
  var randomColor1 = Math.floor( Math.random()*255 );
  var randomColor2 = Math.floor( Math.random()*255 );
  var randomColor3 = Math.floor( Math.random()*255 );
  return 'rgb('+ randomColor1 + ',' + randomColor2 + ',' + randomColor3 +')';
}

function main(){
  var margin = {top: 50, right: 50, bottom: 50, left: 50};
  var width = parseInt(d3.select('#dots').style('width')) - margin.left - margin.right;
  var height = window.innerHeight * 0.75;

  var w = (width > height) ? height : width;

  var svg = d3.select('#dots')
    .append('svg')
    .attr('width', w)
    .attr('height', w)
    .attr('class', 'mainSVG');

  var c0 = svg.append('circle')
    .attr('cx', w/2)
    .attr('cy', w/2)
    .attr('r', w/2)
    .attr('fill', colorScale())
    .on('mouseover', function(){
      var r = d3.select(this).attr('r');
      d3.select(this).remove();
      split(r, svg);
    });

  d3.select('#recommencer')
    .on('click', function(){
      d3.selectAll('svg')
        .remove();
      main();
    });
}
