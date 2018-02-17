import PropTypes from 'prop-types';
import React from 'react';
import P5Wrapper from 'react-p5-wrapper';
import {Title} from '../../Title/Title.js';
import {debounce} from '../../Utils/Utils.js';
import {Methodology} from '../../Methodology/Methodology.js';
import {Slider} from '../../Slider/Slider.js';
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
      postValue: 2,
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
                { this.renderP5Wrapper(this.sketchBjorkDebut, this.state.debutData, this.state.debutValue) }
                <Slider min={4} max={40} handleSlider={this.handleDebutSlider} defaultValue={4}/>
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
                { this.renderP5Wrapper(this.sketchBjorkPost, this.state.postData, this.state.postValue) }
                <Slider min={2} max={40} handleSlider={this.handlePostSlider} defaultValue={2}/>
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
                { this.renderP5Wrapper(this.sketchBjorkHomogenic, this.state.homogenicData, this.state.homogenicValue) }
                <Slider min={0} max={9} handleSlider={this.handleHomogenicSlider} defaultValue={0}/>
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


  renderP5Wrapper(sketch, data, value) {
    if (!this.state.load) {
      return <P5Wrapper sketch={this.loader} width={this.state.width} value={value}/>;
    }
    return <P5Wrapper sketch={sketch} width={this.state.width} data={data} value={value}/>;
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
      alpha = p.map(r1, 0, 50, 255, 0);
    };
  },


  sketchBjorkDebut (p) {
    let img;
    const sliderStep = 2;
    const picWidth = 500;
    let maxStep = 40;
    let minStep = 4;
    let step = Math.round(maxStep / sliderStep) * sliderStep;
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

      p.background(p.color('#f4efe4'));

      if (hasPixelData) {
        for (let x = 0; x < picWidth; x += step) {
          for (let y = 0; y < picWidth; y += step) {
            let pixel = pixelData[x + y * picWidth];

            p.push();
            p.translate(p.map(x, 0, picWidth, 0, canvasWidth), p.map(y, 0, picWidth, 0, canvasWidth));
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
    let minStep = 2;
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

      let pixWidth = Math.round(p.map(canvasWidth, 0, 600, 0, step/3));

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
