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
      // postData: [],
      // debutData: [],
      homogenicData: [],
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

        <div className='section-container section-container--third'>
          <div className='container'>
            <section className='section-wrapper'>
              <div ref={this.setCanvasNode} className='ImageMappingProcessing'>
                <div className='ImageMappingProcessing-title'>
                  <h2>Homogenic</h2>
                </div>
                { this.renderP5Wrapper(this.sketchBjorkHomogenic, this.state.homogenicData) }
              </div>
            </section>
          </div>
        </div>

        <div className='section-container section-container--fourth section-container--half'>
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
      }

      if (props.data) {
        pixelData = props.data;
        hasPixelData = true;
        p.redraw();
      }
    };

    p.mouseMoved = function() {
      let newStep = 0;

      if ((p.mouseY >= 0) && (p.mouseY <= canvasWidth) && (p.mouseX >= 0) && (p.mouseX <= canvasWidth)) {
        newStep = Math.round(p.map(p.mouseX, 0, canvasWidth, 40, (2 + sliderStep)) / sliderStep) * sliderStep;

        if (newStep != step && hasPixelData) {
          step = newStep;
          p.redraw();
        }
      }

    };

    p.draw = function () {

      console.log('redraw debut');
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
    let step = Math.round(40 / sliderStep) * sliderStep;
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
      }

      if (props.data) {
        pixelData = props.data;
        hasPixelData = true;
        p.redraw();
      }
    };

    p.mouseMoved = function() {
      let newStep = 0;

      if ((p.mouseY >= 0) && (p.mouseY <= canvasWidth) && (p.mouseX >= 0) && (p.mouseX <= canvasWidth)) {
        newStep = Math.round(p.map(p.mouseX, 0, canvasWidth, 40, (2 + sliderStep)) / sliderStep) * sliderStep;

        if (newStep != step && hasPixelData) {
          step = newStep;
          p.redraw();
        }
      }
    };

    p.draw = function () {
      console.log('redraw post');
      p.background(p.color('#001274'));

      if (hasPixelData) {
        for (let x = 0; x < picWidth; x += step) {
          for (let y = 0; y < picWidth; y += step) {
            let pixel = pixelData[x + y * picWidth];

            p.push();
            p.translate(p.map(x, 0, picWidth, 0, canvasWidth), p.map(y, 0, picWidth, 0, canvasWidth));

            // Red
            p.fill(pixel[0], 0, 0);
            let redRadius =  p.map(pixel[0], 0, 255, 0, step/2);
            p.ellipse(0, 0, redRadius, redRadius);

            // Blue
            p.fill(0, 0, pixel[2]);
            let blueRadius =  p.map(pixel[2], 0, 255, 0, step/2);
            p.ellipse(- step/4, step/2, blueRadius, blueRadius);

            // Green
            p.fill(0, pixel[1], 0);
            let greenRadius =  p.map(pixel[1], 0, 255, 0, step/2);
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
      }

      if (props.data) {
        pixelData = props.data;
        hasPixelData = true;
        p.redraw();
      }
    };

    p.mouseMoved = function() {
      let newStep = 0;

      if ((p.mouseY >= 0) && (p.mouseY <= canvasWidth) && (p.mouseX >= 0) && (p.mouseX <= canvasWidth)) {
        newStep = Math.round(p.map(p.mouseX, 0, canvasWidth, 0, maxStep));

        if (newStep != step) {
          step = newStep;
          p.redraw();
        }
      }
    };

    p.draw = function () {
      console.log('draw homogenic ', step);
      p.background(p.color('#c7203a'));

      if (hasPixelData) {

        for (let x = 0; x < picWidth; x+= 5) {
          for (let y = 0; y < picWidth; y+=5) {
            let pixel = pixelData[y + x * picWidth];
            p.fill(p.color('#' + pixel[step]));
            p.ellipse(x, y, 5, 5);
          }
        }
      }
    };
  }
});

export {ImageMappingProcessing};
