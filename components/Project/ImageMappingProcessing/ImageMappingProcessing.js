import PropTypes from 'prop-types';
import React from 'react';
import P5Wrapper from 'react-p5-wrapper';
import {Title} from '../../Title/Title.js';
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
      <div>
        <Title
          title={this.props.projectData.projectDetails.title}
          subtitle={this.props.projectData.projectDetails.subtitle}
          authors={this.props.projectData.projectDetails.authors}
          date={this.props.projectData.projectDetails.date}
        />

        <div className='section-container'>
          <div className='container'>
            <section className='section-wrapper'>
              <div ref={this.setCanvasNode} className='ImageMappingProcessing'>
                <div className='ImageMappingProcessing-description'>
                  <p>{this.props.projectData.longDescription}</p>
                </div>
                <P5Wrapper sketch={this.sketchBjorkLines} width={this.state.width}/>
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  },

  sketchBjorkLines (p) {
    let img;
    const sliderStep = 2;
    const picWidth = 500;
    let step = Math.round(40 / sliderStep) * sliderStep;
    let canvasWidth = 600;
    let pixelData = [];

    p.preload = function () {
      img = p.loadImage('components/Project/ImageMappingProcessing/data/debut2.jpg');
    };

    p.setup = function () {
      p.createCanvas(canvasWidth, canvasWidth);
      p.noLoop();
      img.loadPixels();

      for (let x = 0; x < picWidth; x++) {
        for (let y = 0; y < picWidth; y++) {
          let idx = 4*( x + y * picWidth);
          let r = img.pixels[ idx ];
          let g = img.pixels[ idx + 1 ];
          let b = img.pixels[ idx + 2 ];
          let a = img.pixels[ idx + 3 ];

          let color = p.color(r, g, b, a);
          let brightness = p.brightness(color);
          pixelData[x + y * picWidth] = {
            'color': color,
            'rot': brightness * 2 * Math.PI / 255
          };
        }
      }
    };

    p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
      if (props.width) {
        canvasWidth = ( props.width < 600 ) ? props.width : 600;
        p.resizeCanvas(canvasWidth, canvasWidth);
      }
    };

    p.mouseMoved = function() {
      let newStep = 0;

      if ((p.mouseY >= 0) && (p.mouseY <= canvasWidth)) {
        if (p.mouseX < 0) {
          newStep = Math.round(40 / sliderStep) * sliderStep;
        } else if (p.mouseX > canvasWidth) {
          newStep = Math.round((2 + sliderStep) / sliderStep) * sliderStep;
        } else {
          newStep = Math.round(p.map(p.mouseX, 0, canvasWidth, 40, (2 + sliderStep)) / sliderStep) * sliderStep;
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
          let pixel = pixelData[x + y * picWidth];

          p.push();
          p.translate(p.map(x, 0, picWidth, 0, canvasWidth), p.map(y, 0, picWidth, 0, canvasWidth));
          p.rotate(pixel.rot);
          p.stroke(pixel.color);
          p.line(- step, - step, step, step);
          p.pop();
        }
      }
    };
  }
});

export {ImageMappingProcessing};
