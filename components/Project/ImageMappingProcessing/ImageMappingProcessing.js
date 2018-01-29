import PropTypes from 'prop-types';
import React from 'react';
import P5Wrapper from 'react-p5-wrapper';
import {Title} from '../../Title/Title.js';
import {debounce} from '../../Utils/Utils.js';
import {Methodology} from '../../Methodology/Methodology.js';
import axios from 'axios';
require('../ImageMappingProcessing/ImageMappingProcessing.scss');
var createReactClass = require('create-react-class');


const ImageMappingProcessing = createReactClass({
  getInitialState: function() {
    return {
      width: 600,
      load: false,
      postData: [],
      debutData: []
    };
  },

  propTypes: {
    projectData: PropTypes.object.isRequired
  },

  componentDidMount() {
    const _this = this;
    this.serverRequest =
      axios
        .get('./static/projects/project-bjork.json')
        .then(function(result) {
          _this.setState({
            postData: result.data.post,
            debutData: result.data.debut,
            load: true
          });
        })
        .catch((error) => {
          const response = error.response;
          console.log(response);
        });

    this.setState({
      width: this.canvasNode.clientWidth
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
                <div className='ImageMappingProcessing-title'>
                  <h2>Debut</h2>
                </div>
                { this.renderP5Wrapper(this.sketchBjorkDebut, this.state.debutData) }
              </div>
            </section>
          </div>
        </div>

        <div className='section-container section-container--second'>
          <div className='container'>
            <section className='section-wrapper'>
              <div ref={this.setCanvasNode} className='ImageMappingProcessing'>
                <div className='ImageMappingProcessing-title'>
                  <h2>Post</h2>
                </div>
                { this.renderP5Wrapper(this.sketchBjorkPost, this.state.postData) }
              </div>
            </section>
          </div>
        </div>

        <div className='section-container section-container--third section-container--half'>
          <div className='container'>
            <section className='section-wrapper'>
              <Methodology content={this.props.projectData.projectDetails.methodology}/>
            </section>
          </div>
        </div>
      </div>
    );
  },

  renderP5Wrapper(sketch, data) {
    if (!this.state.load) {
      return null;
    }
    return <P5Wrapper sketch={sketch} width={this.state.width} data={data}/>;
  },

  sketchBjorkDebut (p) {
    let img;
    const sliderStep = 2;
    const picWidth = 500;
    let step = Math.round(40 / sliderStep) * sliderStep;
    let canvasWidth = 600;
    let pixelData = [];
    let hasPixelData = false;

    // p.preload = function () {
    //   img = p.loadImage('components/Project/ImageMappingProcessing/data/debut.jpg');
    // };

    p.setup = function () {
      p.createCanvas(canvasWidth, canvasWidth);
      p.noLoop();

      // TO GENERATE PIXELDATA ARRAY ON RUNTIME :
      // img.loadPixels();
      //
      // for (let x = 0; x < picWidth; x++) {
      //   for (let y = 0; y < picWidth; y++) {
      //     let idx = 4*( x + y * picWidth);
      //     let r = img.pixels[ idx ];
      //     let g = img.pixels[ idx + 1 ];
      //     let b = img.pixels[ idx + 2 ];
      //     let a = img.pixels[ idx + 3 ];
      //
      //     let color = p.color(r, g, b, a);
      //     let brightness = p.brightness(color);
      //     pixelData[x + y * picWidth] = {
      //       'r': r,
      //       'g': g,
      //       'b': b,
      //       'rot': brightness * 2 * Math.PI / 255
      //     };
      //   }
      // }
      //
      // console.log('debut', pixelData);
    };

    p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
      if (props.width) {
        canvasWidth = ( props.width < 600 ) ? props.width : 600;
        p.resizeCanvas(canvasWidth, canvasWidth);
      }

      if (props.data) {
        pixelData = props.data;
        hasPixelData = true;
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
      p.background(p.color('#f4efe4'));

      if (hasPixelData) {
        for (let x = 0; x < picWidth; x += step) {
          for (let y = 0; y < picWidth; y += step) {
            let pixel = pixelData[x + y * picWidth];

            p.push();
            p.translate(p.map(x, 0, picWidth, 0, canvasWidth), p.map(y, 0, picWidth, 0, canvasWidth));
            p.rotate(pixel.rot);
            p.stroke(pixel.r, pixel.g, pixel.b);
            p.line(- step, - step, step, step);
            p.pop();
          }
        }
      }
    };
  },

  sketchBjorkPost (p) {
    let img;
    const sliderStep = 2;
    const picWidth = 500;
    let canvasWidth = 600;
    let pixelData = [];
    let step = Math.round(40 / sliderStep) * sliderStep;
    let hasPixelData = false;

    // p.preload = function () {
    //   img = p.loadImage('components/Project/ImageMappingProcessing/data/post.jpg');
    // };

    p.setup = function () {
      p.createCanvas(canvasWidth, canvasWidth);
      p.noLoop();
      p.noStroke();


      // TO GENERATE PIXELDATA ARRAY ON RUNTIME :
      // img.loadPixels();

      // for (let x = 0; x < picWidth; x++) {
      //   for (let y = 0; y < picWidth; y++) {
      //     let idx = 4*( x + y * picWidth);
      //     let r = img.pixels[ idx ];
      //     let g = img.pixels[ idx + 1 ];
      //     let b = img.pixels[ idx + 2 ];
      //
      //     pixelData[x + y * picWidth] = {
      //       'redValue': r,
      //       'blueValue': b,
      //       'greenValue': g
      //     };
      //   }
      // }
      //
      // console.log('post', pixelData);
    };

    p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
      if (props.width) {
        canvasWidth = ( props.width < 600 ) ? props.width : 600;
        p.resizeCanvas(canvasWidth, canvasWidth);
      }

      if (props.data) {
        pixelData = props.data;
        hasPixelData = true;
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
      p.background(p.color('#001274'));

      if (hasPixelData) {
        for (let x = 0; x < picWidth; x += step) {
          for (let y = 0; y < picWidth; y += step) {
            let pixel = pixelData[x + y * picWidth];

            p.push();
            p.translate(p.map(x, 0, picWidth, 0, canvasWidth), p.map(y, 0, picWidth, 0, canvasWidth));

            // Red
            p.fill(pixel.redValue, 0, 0);
            let redRadius =  p.map(pixel.redValue, 0, 255, 0, step/2);
            p.ellipse(0, 0, redRadius, redRadius);

            // Blue
            p.fill(0, 0, pixel.blueValue);
            let blueRadius =  p.map(pixel.blueValue, 0, 255, 0, step/2);
            p.ellipse(- step/4, step/2, blueRadius, blueRadius);

            // Green
            p.fill(0, pixel.greenValue, 0);
            let greenRadius =  p.map(pixel.greenValue, 0, 255, 0, step/2);
            p.ellipse(step/4, step/2, greenRadius, greenRadius);
            p.pop();

          }
        }
      }
    };
  }
});

export {ImageMappingProcessing};
