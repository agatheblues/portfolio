require('../DotsStraightLine/DotsStraightLine.scss');
import {Slider} from '../../Slider/Slider.js';
import PropTypes from 'prop-types';
import {Header} from '../../Header/Header.js';
import React from 'react';
import * as d3 from 'd3';
const createReactClass = require('create-react-class');


const DotsStraightLine = createReactClass({
  getInitialState: function() {
    return {
      dataset: new Array(25),
      width: 0,
      nbLines: 15,
    };
  },
  propTypes: {
    projectData: PropTypes.object.isRequired,
    menuItems: PropTypes.array.isRequired,
  },
  update(w) {
    const mainLineContainer = d3.select('#mainLineContainer');

    const mainCircleContainer = d3.select('#mainCircleContainer');

    const padding = 10;
    const transitionDuration = 5000;

    // Lines containers
    const lineContainer = mainLineContainer.selectAll('g.lineContainer')
      .data(this.state.dataset);

    const length = this.state.dataset.length;

    // New lines
    lineContainer.enter()
      .append('g')
      .attr('class', 'lineContainer')
      .attr('transform', function(d, i) {
        const angleDeg = (360*i)/(2*length); // Parent container gets rotated; but content should not. Counter rotate here.
        const angleRad = angleDeg * (Math.PI / 180);
        const transX = w/2 * (1 - Math.cos(angleRad));
        const transY = -w/2 * Math.sin(angleRad);
        return 'translate('+ transX +','+ (w/2+transY) +') rotate('+ angleDeg +')';
      })
      .append('line') // Line creation
      .attr('y1', 0)
      .attr('x1', padding)
      .attr('y2', 0)
      .attr('x2', w-padding)
      .attr('class', 'straightLines');

    // Moves Update + Enter
    lineContainer.transition()
      .duration(500)
      .attr('transform', function(d, i) {
        const angleDeg = (360*i)/(2*length); // Parent container gets rotated; but content should not. Counter rotate here.
        const angleRad = angleDeg * (Math.PI / 180);
        const transX = w/2 * (1 - Math.cos(angleRad));
        const transY = -w/2 * Math.sin(angleRad);
        return 'translate('+ transX +','+ (w/2+transY) +') rotate('+ angleDeg +')';
      });

    // Remove what's not in update or enter
    lineContainer.exit()
      .remove();

    mainLineContainer.append('circle')
      .attr('cx', w/2)
      .attr('cy', w/2)
      .attr('r', 25)
      .attr('class', 'centralCircle');

    // Circles containers
    const circleContainer = mainCircleContainer.selectAll('g.circleContainer')
      .data(this.state.dataset);

    // New circles
    circleContainer.enter()
      .append('g')
      .attr('class', 'circleContainer')
      .attr('transform', function(d, i) {
        const angleDeg = (360*i)/(2*length); // Parent container gets rotated; but content should not. Counter rotate here.
        const angleRad = angleDeg * (Math.PI / 180);
        const transX = w/2 * (1 - Math.cos(angleRad));
        const transY = -w/2 * Math.sin(angleRad);
        return 'translate('+ transX +','+ (w/2+transY) +') rotate('+ angleDeg +')';
      },
      )
      .append('circle') // Circle creation
      .attr('r', 5)
      .attr('cx', padding)
      .attr('cy', 0)
      .attr('class', 'straightCircles')
      .attr('id', function(d, i) {
        return 'straightCircles'+i;
      });

    // Moves Update + Enter
    circleContainer.transition()
      .duration(500)
      .attr('transform', function(d, i) {
        const angleDeg = (360*i)/(2*length); // Parent container gets rotated; but content should not. Counter rotate here.
        const angleRad = angleDeg * (Math.PI / 180);
        const transX = w/2 * (1 - Math.cos(angleRad));
        const transY = -w/2 * Math.sin(angleRad);
        return 'translate('+ transX +','+ (w/2+transY) +') rotate('+ angleDeg +')';
      },
      );

    // Remove what's not in update or enter
    circleContainer.exit()
      .remove();

    // Animation
    const animateCircle = function(selection) {
      selection.transition()
        .duration(transitionDuration)
        .ease(d3.easeSinInOut)
        .delay(
          function(d, i) {
            return i*(transitionDuration/(length));
          })
        .attr('cx', w-padding)
        .transition()
        .duration(transitionDuration)
        .ease(d3.easeSinInOut)
        .attr('cx', padding)
        .on('end', function(d, i) {
          if (i===0) {
            animateCircle(selection);
          }
        });
    };

    animateCircle(d3.selectAll('.circleContainer').select('.straightCircles'));
  },
  main() {
    const margin = {top: 50, right: 50, bottom: 50, left: 50};
    const height = window.innerHeight * 0.6;
    const width = parseInt(d3.select('#chart').style('width')) - margin.left - margin.right;
    const w = (width>height) ? height : width;
    this.setState({width: w});

    const svg = d3.select('#chart').append('svg')
      .attr('width', w)
      .attr('height', w);

    // Graph of the dots moving in straight lines
    const graphContainer = svg.append('g')
      .attr('id', 'graphContainer');

    graphContainer.append('g')
      .attr('id', 'mainLineContainer');

    graphContainer.append('g')
      .attr('id', 'mainCircleContainer');

    this.update(w);
  },
  componentDidMount() {
    this.main();
  },
  handleSlider: function(value) {
    this.setState({
      dataset: new Array(parseInt(value)),
      nbLines: value,
    });
    this.update(this.state.width);
  },
  render() {
    return (
      <div className='container'>
        <Header menuItems={this.props.menuItems}/>
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
  },
});

export {DotsStraightLine};
