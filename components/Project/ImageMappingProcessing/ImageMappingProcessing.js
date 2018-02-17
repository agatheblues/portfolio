import PropTypes from 'prop-types';
import React from 'react';
import P5Wrapper from 'react-p5-wrapper';
import {Title} from '../../Title/Title.js';
import {debounce} from '../../Utils/Utils.js';
import {Methodology} from '../../Methodology/Methodology.js';
import {Slider} from '../../Slider/Slider.js';
import {P5BjorkSketch} from './P5BjorkSketch/P5BjorkSketch.js';
import axios from 'axios';
require('../ImageMappingProcessing/ImageMappingProcessing.scss');
var createReactClass = require('create-react-class');


const ImageMappingProcessing = createReactClass({
  getInitialState: function() {
    return {
      width: 600,
      load: false,
      postData: [],
      debutData: [],
      homogenicData: [],
      debutValue: 4,
      postValue: 8,
      homogenicValue: 0
    };
  },

  propTypes: {
    projectData: PropTypes.object.isRequired
  },

  componentDidMount() {

    const _this = this;
    this.serverRequest = axios.all([
      axios.get('./static/projects/project-bjork-debut.js'),
      axios.get('./static/projects/project-bjork-post.js'),
      axios.get('./static/projects/project-bjork-homogenic.js')
    ])
      .then(axios.spread(function (debut, post, homogenic) {
        _this.setState({
          postData: post.data,
          debutData: debut.data,
          homogenicData: homogenic.data,
          load: true
        });
      }))
      .catch(error => console.log(error));

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

  handleDebutSlider(value) {
    this.setState({
      debutValue: value
    });
  },

  handlePostSlider(value) {
    this.setState({
      postValue: value
    });
  },

  handleHomogenicSlider(value) {
    this.setState({
      homogenicValue: value
    });
  },

  render() {
    console.log('IM RENDERING!!!' + this.state.debutValue);

    return (
      <div>
        <Title
          title={this.props.projectData.projectDetails.title}
          subtitle={this.props.projectData.projectDetails.subtitle}
          authors={this.props.projectData.projectDetails.authors}
          date={this.props.projectData.projectDetails.date}
        />


        <div className='section-container'>
          <div className='container container--vertical-centered'>
            <section className='section-wrapper'>
              <div ref={this.setCanvasNode} className='ImageMappingProcessing'>
                <div className='ImageMappingProcessing-title'>
                  <h2>Debut</h2>
                </div>
                <P5BjorkSketch sketch={this.sketchBjorkDebut} data={this.state.debutData} value={this.state.debutValue} load={this.state.load} width={this.state.width} />
                <Slider min={4} max={40} handleSlider={debounce(this.handleDebutSlider,100)} defaultValue={4} step={4}/>
              </div>
            </section>
          </div>
        </div>

        <div className='section-container section-container--second'>
          <div className='container container--vertical-centered'>
            <section className='section-wrapper'>
              <div ref={this.setCanvasNode} className='ImageMappingProcessing'>
                <div className='ImageMappingProcessing-title'>
                  <h2>Post</h2>
                </div>
                <P5BjorkSketch sketch={this.sketchBjorkPost} data={this.state.postData} value={this.state.postValue} load={this.state.load} width={this.state.width} />
                <Slider min={8} max={40} handleSlider={debounce(this.handlePostSlider, 100)} defaultValue={8} step={4}/>
              </div>
            </section>
          </div>
        </div>

        <div className='section-container section-container--third'>
          <div className='container container--vertical-centered'>
            <section className='section-wrapper'>
              <div ref={this.setCanvasNode} className='ImageMappingProcessing'>
                <div className='ImageMappingProcessing-title'>
                  <h2>Homogenic</h2>
                </div>
                <P5BjorkSketch sketch={this.sketchBjorkHomogenic} data={this.state.homogenicData} value={this.state.homogenicValue} load={this.state.load} width={this.state.width} />
                <Slider min={0} max={9} handleSlider={debounce(this.handleHomogenicSlider, 100)} defaultValue={0}/>
              </div>
            </section>
          </div>
        </div>

        <div className='section-container section-container--fourth section-container--half'>
          <div className='container container--vertical-centered'>
            <section className='section-wrapper'>
              <Methodology content={this.props.projectData.projectDetails.methodology}/>
              <div className='thanks-container'>
                <p className='thanks-content'>Thanks to &nbsp;&nbsp;<a href='https://github.com/PierreGUI' className='link link-small'>PierreGUI</a>&nbsp;&nbsp; & &nbsp;&nbsp;<a href='https://github.com/ktorz' className='link link-small'>KtorZ</a>&nbsp;&nbsp; for their patience and help &nbsp;<span className='heart-icon'>♥</span></p>
              </div>
            </section>
          </div>
        </div>
      </div>
    );
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
    let drawingIndex = 0;

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
      console.log('props:', props);
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

      let newStep = p.map(props.value, maxStep, minStep, minStep, maxStep);
      if (step != newStep && hasPixelData) {
        step = newStep;
        drawingIndex = 0;
        setTimeout(() => p.redraw(), 100);
      }
    };

    p.draw = function () {
      console.log('debut is drawing');

      if (drawingIndex == 0) {
        console.log('draw bg');
        p.background(p.color('#f4efe4'));
      }

      if (hasPixelData && (drawingIndex < picWidth - step)) {
        for (let x = 0; x < picWidth; x += step) {
          for (let y = drawingIndex; y < drawingIndex + step; y += step) {
            let pixel = pixelData[x + y * picWidth];

            p.push();
            p.translate(p.map(x, 0, picWidth, 0, canvasWidth), p.map(y, 0, picWidth, 0, canvasWidth));
            p.rotate(pixel[3]);
            p.stroke(pixel[0], pixel[1], pixel[2]);
            p.line(- step, - step, step, step);
            p.pop();
          }
        }

        drawingIndex = drawingIndex + step;
        setTimeout(() => p.redraw(), 100);
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
      p.pixelDensity(3);


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
      if (props.width) {
        canvasWidth = ( props.width < 600 ) ? props.width : 600;
        p.resizeCanvas(canvasWidth, canvasWidth);
        p.redraw();
      }

      if (props.data) {
        pixelData = props.data;
        hasPixelData = true;
        p.redraw();
      }

      if (props.value) {
        let newStep = p.map(props.value, maxStep, minStep, minStep, maxStep);
        if (step != newStep && hasPixelData) {
          step = newStep;
          p.redraw();
        }
      }
    };


    p.draw = function () {

      p.background(p.color('#001274'));

      let pixWidth = Math.round(p.map(canvasWidth, 0, 600, 0, step/2));

      if (hasPixelData) {
        for (let x = 0; x < picWidth; x += step) {
          for (let y = 0; y < picWidth; y += step) {
            let pixel = pixelData[x + y * picWidth];

            p.push();
            p.translate(p.map(x, 0, picWidth, 0, canvasWidth), p.map(y, 0, picWidth, 0, canvasWidth));

            // Red
            p.fill(pixel[0], 0, 0);
            let redRadius =  p.map(pixel[0], 0, 255, 0, pixWidth);
            p.ellipse(0, 0, redRadius, redRadius);

            // Blue
            p.fill(0, 0, pixel[2]);
            let blueRadius =  p.map(pixel[2], 0, 255, 0, pixWidth);
            p.ellipse(- step/4, step/2, blueRadius, blueRadius);

            // Green
            p.fill(0, pixel[1], 0);
            let greenRadius =  p.map(pixel[1], 0, 255, 0, pixWidth);
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
      if (props.width) {
        canvasWidth = ( props.width < 600 ) ? props.width : 600;
        p.resizeCanvas(canvasWidth, canvasWidth);
        p.redraw();
      }

      if (props.data) {
        pixelData = props.data;
        hasPixelData = true;
        p.redraw();
      }

      if (props.value) {
        let newStep = props.value;
        if (step != newStep && hasPixelData) {
          step = newStep;
          p.redraw();
        }
      }
    };

    p.draw = function () {
      p.background(p.color('#c7203a'));
      let pixWidth = Math.round(p.map(canvasWidth, 0, 600, 0, 5));

      if (hasPixelData) {

        for (let x = 0; x < picWidth / 5; x++) {
          for (let y = 0; y < picWidth / 5; y++) {
            let pixel = pixelData[y + x * picWidth / 5];

            p.fill(p.color('#' + pixel[step]));
            p.rect(p.map(x * 5, 0, picWidth, 0, canvasWidth), p.map(y * 5, 0, picWidth, 0, canvasWidth), pixWidth, pixWidth);
          }
        }

      }
    };
  }
});

export {ImageMappingProcessing};
