require('../Sopranos/Sopranos.scss');
import PropTypes from 'prop-types';
import {Title} from '../../Title/Title.js';
import React from 'react';
import axios from 'axios';
import * as d3 from 'd3';

var createReactClass = require('create-react-class');

const Sopranos = createReactClass({
  getInitialState: function() {
    return {
      projectDetails: [],
      projectSectionBars: {}
    };
  },

  propTypes: {
    projectData: PropTypes.object.isRequired
  },

  svgNode: null,

  componentDidMount: function() {

    // Get data
    const _this = this;
    const url = './../static/projects/' + this.props.projectData.id + '.json';

    _this.serverRequest =
      axios
        .get(url)
        .then(function(result) {
          _this.setState({
            projectDetails: result.data.projectDetails,
            projectSectionBars: result.data.projectSections[0]
          });
        })
        .catch((error) => {
          const response = error.response;
          console.log(response.data.errors);
        });

    // Event listener
    window.addEventListener('resize', this.handleResize);
  },

  handleResize: function(e) {
    // Render bar graph
    barGraph(this.svgNode.clientWidth, this.state.projectSectionBars.graph);
  },

  componentWillUnmount: function() {
    window.removeEventListener('resize', this.handleResize);
  },

  render() {
    if (Object.keys(this.state.projectDetails).length === 0) {return false;}
    
    return (
      <div>
        <Title
          title={this.state.projectDetails.title}
          subtitle={this.state.projectDetails.subtitle}
          authors={this.state.projectDetails.authors}
          date={this.state.projectDetails.date}
        />
        <div className='section-container'>
          <div className='container'>
            <section className='section-wrapper'>
              <p>{this.state.projectSectionBars.description}</p>
            </section>

            <div>
              <svg
                className='bar-graph-container'
                id='sopranos-bar-graph'
                ref={(node)=> this.svgNode = node}>
              </svg>

            </div>
          </div>
        </div>
      </div>
    );
  },
  componentDidUpdate() {
    // Render bar graph
    barGraph(this.svgNode.clientWidth, this.state.projectSectionBars.graph);
  }
});

export {Sopranos};


function barGraph(width, graph) {
  var svg = d3.select('#sopranos-bar-graph');
  var height = (width / 2) * Math.floor(graph.data.length / 2);

  svg.attr('height', height);

  // Data: order by season
  graph.data.sort((a, b) => d3.ascending(a.season, b.season));

  console.log(graph.data);

  // Season update
  var seasonContainer = svg.selectAll('.season')
    .data(graph.data);

  // Season - exit
  seasonContainer.exit().remove();

  // Season - enter
  var seasonContainerEnter = seasonContainer.enter()
    .append('g')
    .attr('class', 'season')
    .attr('id', d => 'season' + d.season)
    .attr('transform', (d, i) => {
      var x = (i % 2) * width / 2;
      var y = (Math.floor(i / 2)) * height / 2;
      return 'translate(' + x + ',' + y +')';
    });

  seasonContainerEnter.append('rect')
    .attr('width', 100)
    .attr('height', 100)
    .attr('fill', 'red');

  seasonContainerEnter.append('text')
    .text(d => 'season' + d.season)
    .attr('x', 0)
    .attr('y', 0)
    .attr('class', 'season-number');

  // set the ranges
  var x = d3.scaleLinear().range([0, width/2]);
  var y = d3.scaleBand().range([0, width/2]).padding(0.1);
  console.log(d3.max(graph.data, function(d) { return d.values.total; }));
  x.domain([0, d3.max(graph.data, function(d) { return d.values.total; })]);
  y.domain(graph.data.map(function(d) { return d.values.episode; }));























}
