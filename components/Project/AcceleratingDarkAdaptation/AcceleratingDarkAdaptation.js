import PropTypes from 'prop-types';
import React from 'react';
import {Title} from '../../Title/Title.js';
import {Methodology} from '../../Methodology/Methodology.js';
import {Header} from '../../Header/Header.js';
require('../AcceleratingDarkAdaptation/AcceleratingDarkAdaptation.scss');
const createReactClass = require('create-react-class');


const AcceleratingDarkAdaptation = createReactClass({
  propTypes: {
    projectData: PropTypes.object.isRequired,
    menuItems: PropTypes.array.isRequired,
  },

  /* eslint-disable max-len */
  render() {
    return (

      <div>
        <div className='section-container section-container--top'>
          <div className='container'>
            <Header menuItems={this.props.menuItems} />
          </div>
        </div>

        <div className='section-container'>
          <Title
            title={this.props.projectData.projectDetails.title}
            subtitle={this.props.projectData.projectDetails.subtitle}
            authors={this.props.projectData.projectDetails.authors}
            date={this.props.projectData.projectDetails.date}
          />

          <div className='section--black'>
            <div className='container'>
              <video className='video-full-centered' autoPlay muted loop>
                <source src="../../static/videos/ada_rotate.mp4" type="video/mp4" />
              </video>
            </div>
          </div>

          <div className='section--black'>
            <div className='container'>
              <section className='section-wrapper'>
                <h2 className='section-title'>About</h2>
                <p className='section-description'>Accelerating Dark Adaptation is the graduation project of Manon Féval at the Royal Academy of Art, The Hague (KABK).</p>
                <p className='section-description'>I advised her in creating the digital experience of her project, and developed its website.</p>
                <hr className='hline-seperator' />
                <div className='button-list'>
                  <a className='btn' href='http://acceleratingdarkadaptation.com'>Go to website &nbsp; &#x21A3;</a>
                  <a className='btn' href='https://github.com/agatheblues/accelerating-dark-adaptation'>See on Github &nbsp; &#x21A3;</a>
                </div>
              </section>
            </div>
          </div>

          <div className='section--black'>
            <div className='container'>
              <video className='video-full-centered' autoPlay muted loop>
                <source src="../../static/videos/ada_title.mp4" type="video/mp4" />
              </video>
            </div>
          </div>

          <div className='section--gold'>
            <div className='container'>
              <section className='section-wrapper'>
                <h2 className='section-title inverted'>Concept</h2>
                <p className='section-description'>Accelerating Dark Adaptation is a website in which the viewer can experience the city of Amsterdam at night through an infrared lens, navigating data points in which the light intensity and night quality have been measured. The viewer can visit these sites while listening to a collection of perspectives on darkness.</p>
                <p className='section-description'>The aim is to bring a more positive image of darkness into our urban space as well as a better understanding of the negative effects of artificial lights, in order to preserve and protect our night skies not only out there, but also in here.</p>
                <hr className='hline-seperator hline-seperator--inverted' />
                <img className='section-image' src='../../static/images/projects/ada_center.png' />
              </section>
            </div>
          </div>

          <div className='section--black'>
            <div className='container'>
              <section className='section-wrapper'>
                <h2 className='section-title'>Features</h2>
                <p className='section-description'>The website is divided in two modes: a documentary mode and an exploration mode. The documentary is a guided experience through the map, telling one story, as crafted by Manon, to the viewer.</p>
                <p className='section-description'>The explore mode lets users free of moving and interacting with the map. Users can navigate through multiple stories, as well as visualize luminous emittance and sky quality in various neighbourhoods of Amsterdam.</p>
                <hr className='hline-seperator hline-seperator--inverted' />
                <img className='section-image' src='../../static/images/projects/ada_video.png' />
                <img className='section-image' src='../../static/images/projects/ada_data.png' />
              </section>
            </div>
          </div>


          <div className='section-container--half'>
            <div className='container'>
              <section className='section-wrapper'>
                <Methodology content={this.props.projectData.projectDetails.methodology} />
                <div className='thanks-container'>
                  <p className='thanks-content'>Thanks to Manon Féval for trusting me and giving me the opportunity to develop this project. Thanks to &nbsp;<a href='https://github.com/PierreGUI' className='link link-small'>PierreGUI</a> for his help and support. &nbsp;<span className='heart-icon'>❤️</span></p>
                </div>
              </section>
            </div>
          </div>

        </div>
      </div>
    );
  },
  /* eslint-enable max-len */
});

export {AcceleratingDarkAdaptation};
