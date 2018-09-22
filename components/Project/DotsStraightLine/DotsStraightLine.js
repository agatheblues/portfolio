require('../DotsStraightLine/DotsStraightLine.scss');
import {Slider} from '../../Slider/Slider.js';
import PropTypes from 'prop-types';
import React from 'react';
import * as d3 from 'd3';
var createReactClass = require('create-react-class');


const DotsStraightLine = createReactClass({
  getInitialState: function() {
    return {
      dataset: new Array(25),
      width: 0,
      nbLines: 15
    };
  },
  propTypes: {
    projectData: PropTypes.object.isRequired
  },
  update(w) {
    var svg = d3.select('svg');
    //Graph of the dots moving in straight lines
    var graphContainer = d3.select('#graphContainer');

    var mainLineContainer = d3.select('#mainLineContainer');

    var mainCircleContainer = d3.select('#mainCircleContainer');

    var padding = 10;
    var transitionDuration = 5000;

    // Lines containers
    var lineContainer = mainLineContainer.selectAll('g.lineContainer')
      .data(this.state.dataset);

    var length = this.state.dataset.length;

    //New lines
    lineContainer.enter()
      .append('g')
      .attr('class','lineContainer')
      .attr('transform',function(d,i){
        var angleDeg = (360*i)/(2*length); //Parent container gets rotated; but content should not. Counter rotate here.
        var angleRad = angleDeg * (Math.PI / 180);
        var transX = w/2 * (1 - Math.cos(angleRad));
        var transY = -w/2 * Math.sin(angleRad);
        return 'translate('+ transX +','+ (w/2+transY) +') rotate('+ angleDeg +')';
      })
      .append('line') //Line creation
      .attr('y1',0)
      .attr('x1', padding)
      .attr('y2',0)
      .attr('x2', w-padding)
      .attr('class','straightLines');

    //Moves Update + Enter
    lineContainer.transition()
      .duration(500)
      .attr('transform',function(d,i){
        var angleDeg = (360*i)/(2*length); //Parent container gets rotated; but content should not. Counter rotate here.
        var angleRad = angleDeg * (Math.PI / 180);
        var transX = w/2 * (1 - Math.cos(angleRad));
        var transY = -w/2 * Math.sin(angleRad);
        return 'translate('+ transX +','+ (w/2+transY) +') rotate('+ angleDeg +')';
      });

    //Remove what's not in update or enter
    lineContainer.exit()
      .remove();

    mainLineContainer.append('circle')
      .attr('cx', w/2)
      .attr('cy', w/2)
      .attr('r', 25)
      .attr('class', 'centralCircle');

    // Circles containers
    var circleContainer = mainCircleContainer.selectAll('g.circleContainer')
      .data(this.state.dataset);

    //New circles
    circleContainer.enter()
      .append('g')
      .attr('class','circleContainer')
      .attr('transform',function(d,i){
        var angleDeg = (360*i)/(2*length); //Parent container gets rotated; but content should not. Counter rotate here.
        var angleRad = angleDeg * (Math.PI / 180);
        var transX = w/2 * (1 - Math.cos(angleRad));
        var transY = -w/2 * Math.sin(angleRad);
        return 'translate('+ transX +','+ (w/2+transY) +') rotate('+ angleDeg +')';}
      )
      .append('circle')     // Circle creation
      .attr('r', 5)
      .attr('cx', padding)
      .attr('cy', 0)
      .attr('class', 'straightCircles')
      .attr('id', function(d, i){return 'straightCircles'+i;});

    //Moves Update + Enter
    circleContainer.transition()
      .duration(500)
      .attr('transform',function(d,i){
        var angleDeg = (360*i)/(2*length); //Parent container gets rotated; but content should not. Counter rotate here.
        var angleRad = angleDeg * (Math.PI / 180);
        var transX = w/2 * (1 - Math.cos(angleRad));
        var transY = -w/2 * Math.sin(angleRad);
        return 'translate('+ transX +','+ (w/2+transY) +') rotate('+ angleDeg +')';}
      );

    //Remove what's not in update or enter
    circleContainer.exit()
      .remove();

    // Animation
    var animateCircle = function(selection){

      selection.transition()
        .duration(transitionDuration)
        .ease(d3.easeSinInOut)
        .delay(
          function(d,i){
            return i*(transitionDuration/(length));
          })
        .attr('cx', w-padding)
        .transition()
        .duration(transitionDuration)
        .ease(d3.easeSinInOut)
        .attr('cx', padding)
        .on('end', function(d,i){
          if (i===0){
            animateCircle(selection);
          }
        });
    };

    animateCircle(d3.selectAll('.circleContainer').select('.straightCircles'));

    function sinInOut(t) {
      return (1 - Math.cos(Math.PI * t)) / 2;
    }
  },
  main() {

    var margin = {top: 50, right: 50, bottom: 50, left: 50};
    var height = window.innerHeight * 0.6;
    var width = parseInt(d3.select('#chart').style('width')) - margin.left - margin.right;
    var w = (width>height) ? height : width;
    this.setState({width: w});

    var svg = d3.select('#chart').append('svg')
      .attr('width', w)
      .attr('height', w);

    //Graph of the dots moving in straight lines
    var graphContainer = svg.append('g')
      .attr('id', 'graphContainer');

    var mainLineContainer = graphContainer.append('g')
      .attr('id','mainLineContainer');

    var mainCircleContainer = graphContainer.append('g')
      .attr('id','mainCircleContainer');

    this.update(w);

  },
  componentDidMount() {
    this.main();
  },
  handleSlider: function(value) {
    this.setState({
      dataset: new Array(parseInt(value)),
      nbLines: value
    });
    this.update(this.state.width);
  },
  render() {
    return (
      <div  className='container'>
        <h2>{this.props.projectData.title}</h2>

        <div id='chart' className='dots-straightline-container'>
        </div>

        <div className='slider-container'>
          <p id='slider'>Number of circles</p>
          <Slider min={1} max={30} id={'nData'} defaultValue={15} handleSlider={this.handleSlider} />
          <p>{this.state.nbLines}</p>
        </div>
      </div>
    );
  }
});

export {DotsStraightLine};
