import PropTypes from 'prop-types';
import React from 'react';
import P5Wrapper from 'react-p5-wrapper';
import axios from 'axios';
var createReactClass = require('create-react-class');


const P5BjorkSketch = createReactClass({

  propTypes: {
    sketch: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired,
    value: PropTypes.number.isRequired,
    load: PropTypes.bool.isRequired,
    width: PropTypes.number.isRequired
  },

  render() {
    return this.renderP5Wrapper(this.props.sketch, this.props.data, this.props.value, this.props.load, this.props.width);
  },


  renderP5Wrapper(sketch, data, value, load, width) {
    if (!load) {
      return <P5Wrapper sketch={this.loader} width={width}/>;
    }

    return <P5Wrapper sketch={sketch} width={width} data={data} value={value}/>;
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
  }
});

export {P5BjorkSketch};
