import PropTypes from 'prop-types';
import React from 'react';
import {debounce, mapValue} from '../../../Utils/Utils.js';
import P5Wrapper from 'react-p5-wrapper';
import {Slider} from '../../../Slider/Slider.js';
import axios from 'axios';
var createReactClass = require('create-react-class');


const P5BjorkSketch = createReactClass({
  getInitialState: function() {
    return {
      load: false,
      data: [],
      value: this.props.defaultValue
    };
  },

  propTypes: {
    sketch: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    filePath: PropTypes.string.isRequired,
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    step: PropTypes.number,
    defaultValue: PropTypes.number.isRequired
  },

  componentDidMount() {

    const _this = this;
    this.serverRequest = axios
      .get(this.props.filePath)
      .then(function(result) {
        _this.setState({
          data: result.data,
          load: true
        });
      })
      .catch(error => console.log(error));
  },


  handleValue(value) {
    this.setState({
      value: value
    });
  },

  render() {
    return this.renderP5Wrapper();
  },


  renderP5Wrapper() {
    if (!this.state.load) {
      return <P5Wrapper sketch={this.loader} width={this.props.width}/>;
    }

    return (
      <div>
        <P5Wrapper
          sketch={this[this.props.sketch]}
          width={this.props.width}
          data={this.state.data}
          value={this.state.value}
        />
        <Slider
          min={this.props.min}
          max={this.props.max}
          handleSlider={this.handleValue}
          defaultValue={this.props.defaultValue}
          step={this.props.step}
          width={this.props.width}
        />
      </div>
    );
  },

  loader (p) {
    let canvasWidth = 600;
    let r1 = 0, alpha = 255;

    p.setup = function () {
      p.createCanvas(canvasWidth, canvasWidth);
      p.noStroke();
    };

    p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
      if (props.width) {
        canvasWidth = ( props.width < 600 ) ? props.width : 600;
        p.resizeCanvas(canvasWidth, canvasWidth);
      }
    };

    p.draw = function() {
      p.clear();
      p.fill(155, 143, 120, alpha);
      p.ellipse(canvasWidth/2, canvasWidth/2, r1, r1);

      r1 = (r1 + 0.5 > 50) ? 0 : r1 + 0.5;
      alpha = mapValue(r1, 0, 50, 255, 0);
    };
  },

  sketchBjorkDebut (p) {
    let img;
    const picWidth = 500;
    let maxStep = 40;
    let minStep = 4;
    let step = 40;
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
      //     pixelData[x + y * picWidth] = [r, g, b, Math.round(brightness * 2 * Math.PI / 255 * 100) / 100];
      //   }
      // }
      //
      // console.log('debut', pixelData);
    };

    p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
      if (props.width && (props.width != canvasWidth)) {
        canvasWidth = ( props.width < 600 ) ? props.width : 600;
        p.resizeCanvas(canvasWidth, canvasWidth);
        setTimeout(() => p.redraw(), 100);
      }

      if (props.data && !hasPixelData) {
        pixelData = props.data;
        hasPixelData = true;
        setTimeout(() => p.redraw(), 100);
      }

      let newStep = mapValue(props.value, maxStep, minStep, minStep, maxStep);
      if (step != newStep && hasPixelData) {
        step = newStep;
        setTimeout(() => p.redraw(), 100);
      }
    };

    p.draw = function () {
      p.background(p.color('#f4efe4'));

      if (hasPixelData) {
        for (let x = 0; x < picWidth; x += step) {
          for (let y = 0; y < picWidth; y += step) {
            let pixel = pixelData[x + y * picWidth];

            p.push();
            p.translate(mapValue(x, 0, picWidth, 0, canvasWidth), mapValue(y, 0, picWidth, 0, canvasWidth));
            p.rotate(pixel[3]);
            p.stroke(pixel[0], pixel[1], pixel[2]);
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
    let maxStep = 40;
    let minStep = 8;
    let step = Math.round(maxStep / sliderStep) * sliderStep;
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
      //
      // for (let x = 0; x < picWidth; x++) {
      //   for (let y = 0; y < picWidth; y++) {
      //     let idx = 4*( x + y * picWidth);
      //     let r = img.pixels[ idx ];
      //     let g = img.pixels[ idx + 1 ];
      //     let b = img.pixels[ idx + 2 ];
      //
      //     pixelData[x + y * picWidth] = [r, g, b];
      //   }
      // }
      //
      // console.log('post', pixelData);
    };

    p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
      if (props.width && (props.width != canvasWidth)) {
        canvasWidth = ( props.width < 600 ) ? props.width : 600;
        p.resizeCanvas(canvasWidth, canvasWidth);
        setTimeout(() => p.redraw(), 100);
      }

      if (props.data && !hasPixelData) {
        pixelData = props.data;
        hasPixelData = true;
        setTimeout(() => p.redraw(), 100);
      }

      let newStep = mapValue(props.value, maxStep, minStep, minStep, maxStep);
      if (step != newStep && hasPixelData) {
        step = newStep;
        setTimeout(() => p.redraw(), 100);
      }
    };


    p.draw = function () {

      p.background(p.color('#001274'));

      let pixWidth = Math.round(mapValue(canvasWidth, 0, 600, 0, step/2));

      if (hasPixelData) {
        for (let x = 0; x < picWidth; x += step) {
          for (let y = 0; y < picWidth; y += step) {
            let pixel = pixelData[x + y * picWidth];

            p.push();
            p.translate(mapValue(x, 0, picWidth, 0, canvasWidth), mapValue(y, 0, picWidth, 0, canvasWidth));

            // Red
            p.fill(pixel[0], 0, 0);
            let redRadius =  mapValue(pixel[0], 0, 255, 0, pixWidth);
            p.ellipse(0, 0, redRadius, redRadius);

            // Blue
            p.fill(0, 0, pixel[2]);
            let blueRadius =  mapValue(pixel[2], 0, 255, 0, pixWidth);
            p.ellipse(- step/4, step/2, blueRadius, blueRadius);

            // Green
            p.fill(0, pixel[1], 0);
            let greenRadius =  mapValue(pixel[1], 0, 255, 0, pixWidth);
            p.ellipse(step/4, step/2, greenRadius, greenRadius);
            p.pop();

          }
        }
      }
    };
  },

  sketchBjorkHomogenic (p) {
    let step = 0;
    const maxStep = 9;
    const picWidth = 500;
    let canvasWidth = 600;
    let pixelData = [];
    let hasPixelData = false;

    p.setup = function () {
      p.createCanvas(canvasWidth, canvasWidth);
      p.noLoop();
      p.noStroke();
    };

    p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
      if (props.width && (props.width != canvasWidth)) {
        canvasWidth = ( props.width < 600 ) ? props.width : 600;
        p.resizeCanvas(canvasWidth, canvasWidth);
        setTimeout(() => p.redraw(), 100);
      }

      if (props.data && !hasPixelData) {
        pixelData = props.data;
        hasPixelData = true;
        setTimeout(() => p.redraw(), 100);
      }

      let newStep = props.value;
      if (step != newStep && hasPixelData) {
        step = newStep;
        setTimeout(() => p.redraw(), 100);
      }
    };

    p.draw = function () {
      p.background(p.color('#c7203a'));
      let pixWidth = Math.round(mapValue(canvasWidth, 300, 600, 2, 5));
      console.log(pixWidth);
      if (hasPixelData) {

        for (let x = 0; x < picWidth / 5; x++) {
          for (let y = 0; y < picWidth / 5; y++) {
            let pixel = pixelData[y + x * picWidth / 5];

            p.fill(p.color('#' + pixel[step]));
            p.rect(mapValue(x * 5, 0, picWidth, 0, canvasWidth), mapValue(y * 5, 0, picWidth, 0, canvasWidth), pixWidth, pixWidth);
          }
        }

      }
    };
  }
});

export {P5BjorkSketch};
