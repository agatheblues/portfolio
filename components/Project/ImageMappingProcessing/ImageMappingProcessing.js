import PropTypes from 'prop-types';
import React from 'react';
import P5Wrapper from 'react-p5-wrapper';
import {debounce} from '../../Utils/Utils.js';
require('../ImageMappingProcessing/ImageMappingProcessing.scss');
var createReactClass = require('create-react-class');


const ImageMappingProcessing = createReactClass({
  getInitialState: function() {
    return {
      width: 600
    };
  },

  propTypes: {
    projectData: PropTypes.object.isRequired
  },

  componentDidMount() {
    this.setState({
      width: this.canvasNode.clientWidth,
    });

    window.addEventListener('resize', debounce(this.handleResize, 200));
  },

  canvasNode: null,

  setCanvasNode(node) {
    this.canvasNode = node;
  },

  handleResize() {
    this.setState({
      width: this.canvasNode.clientWidth,
    });
  },

  render() {
    return (
      <div ref={this.setCanvasNode} className='ImageMappingProcessing'>
        <div className='ImageMappingProcessing-title'>
          <h2>{this.props.projectData.title}</h2>
        </div>
        <div className='ImageMappingProcessing-description'>
          <p>{this.props.projectData.longDescription}</p>
        </div>
        <P5Wrapper sketch={this.sketchBjorkLines} width={this.state.width}/>
      </div>
    );
  },

  sketchBjorkLines (p) {
    let img;
    const sliderStep = 2;
    const threshold = 0;
    const picWidth = 600;
    let step = Math.round(40 / sliderStep) * sliderStep;
    let canvasWidth = 600;

    p.preload = function () {
      img = p.loadImage('components/Project/ImageMappingProcessing/data/debut.jpg');
    };

    p.setup = function () {
      p.createCanvas(canvasWidth, canvasWidth);
      p.noLoop();

      img.loadPixels();
    };

    p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
      if (props.width && props.width < 600) {
        canvasWidth = props.width;
        p.resizeCanvas(canvasWidth, canvasWidth);
      }
    };

    p.mouseMoved = function() {
      let newStep = 0;
      let speed = Math.abs(p.mouseX - p.pmouseX);

      if ((p.mouseY >= 0) && (p.mouseY <= canvasWidth)) {
        if (p.mouseX < 0) {
          newStep = Math.round(40 / sliderStep) * sliderStep;
        } else if (p.mouseX > canvasWidth) {
          newStep = Math.round((2 + sliderStep) / sliderStep) * sliderStep;
        } else if (speed > threshold) {
          newStep = Math.round(p.map(p.mouseX, 0, canvasWidth, 40, (2 + sliderStep)) / sliderStep) * sliderStep;
        } else {
          newStep = step;
        }

        if (newStep != step) {
          step = newStep;
          p.redraw();
        }
      }

    };

    p.draw = function () {
      p.background(255);

      for (let x = 0; x < picWidth; x += step) {
        for (let y = 0; y < picWidth; y += step) {
          let idx = 4*( x + y * picWidth);
          let r = img.pixels[ idx ];
          let g = img.pixels[ idx + 1 ];
          let b = img.pixels[ idx + 2 ];
          let a = img.pixels[ idx + 3 ];

          let color = p.color(r, g, b, a);

          let brightness = p.brightness(color);

          let rot =  p.map(brightness, 0, 255, 0, p.TWO_PI);

          p.push();
          p.translate(p.map(x, 0, picWidth, 0, canvasWidth), p.map(y, 0, picWidth, 0, canvasWidth));
          p.rotate(rot);
          p.stroke(color);
          p.line(- step, - step, step, step);
          p.pop();
        }
      }
    };
  }
});

export {ImageMappingProcessing};
