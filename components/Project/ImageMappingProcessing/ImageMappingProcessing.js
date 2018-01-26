import PropTypes from 'prop-types';
import React from 'react';
import P5Wrapper from 'react-p5-wrapper';
require('../ImageMappingProcessing/ImageMappingProcessing.scss');
var createReactClass = require('create-react-class');


const ImageMappingProcessing = createReactClass({
  propTypes: {
    projectData: PropTypes.object.isRequired
  },
  componentDidMount() {
  },
  render() {
    return (
      <div>
        <div className='ImageMappingProcessing-title'>
          <h2>{this.props.projectData.title}</h2>
        </div>
        <div className='ImageMappingProcessing-description'>
          <p>{this.props.projectData.longDescription}</p>
        </div>
        <P5Wrapper sketch={this.sketchBjorkLines}/>
      </div>
    );
  },
  sketchBjorkLines (p) {
    let img;
    const sliderStep = 2;
    const width = 600;
    const height = 600;
    const threshold = 1;
    let step = Math.round(40 / sliderStep) * sliderStep;;

    p.preload = function () {
      img = p.loadImage('components/Project/ImageMappingProcessing/data/debut.jpg');
    };

    p.setup = function () {
      p.createCanvas(width, height);
      p.noLoop();
      img.loadPixels();
    };

    p.mouseMoved = function() {
      let newStep = 0;
      let speed = Math.abs(p.mouseX - p.pmouseX);

      if ((p.mouseY >= 0) && (p.mouseY <= height)) {
        if (p.mouseX < 0) {
          newStep = Math.round(40 / sliderStep) * sliderStep;
        } else if (p.mouseX > width) {
          newStep = Math.round((2 + sliderStep) / sliderStep) * sliderStep;
        } else if (speed > threshold) {
          newStep = Math.round(p.map(p.mouseX, 0, width, 40, (2 + sliderStep)) / sliderStep) * sliderStep;
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
      console.log(step);
      p.background(255);

      for (let x = 0; x < width; x += step) {
        for (let y = 0; y < height; y += step) {
          let idx = 4*( x + y * width);
          let r = img.pixels[ idx ];
          let g = img.pixels[ idx + 1 ];
          let b = img.pixels[ idx + 2 ];
          let a = img.pixels[ idx + 3 ];

          let color = p.color(r, g, b, a);

          let brightness = p.brightness(color);

          let rot =  p.map(brightness, 0, 255, 0, p.TWO_PI);

          p.push();
          p.translate(x, y);
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
