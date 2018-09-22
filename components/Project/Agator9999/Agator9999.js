import PropTypes from 'prop-types';
import React from 'react';
import {Title} from '../../Title/Title.js';
import {Methodology} from '../../Methodology/Methodology.js';
require('../Agator9999/Agator9999.scss');
var createReactClass = require('create-react-class');


const Agator9999 = createReactClass({
  propTypes: {
    projectData: PropTypes.object.isRequired
  },

  render() {

    return (
      <div className='section-container'>
        <Title
          title={this.props.projectData.projectDetails.title}
          subtitle={this.props.projectData.projectDetails.subtitle}
          authors={this.props.projectData.projectDetails.authors}
          date={this.props.projectData.projectDetails.date}
        />

        <div className='section--light-grey'>
          <div className='container'>
            <img className='image-full-centered' src='../../static/images/projects/library.png' />
          </div>
        </div>

        <div>
          <div className='container'>
            <section className='section-wrapper'>
              <h2 className='section-title'>About</h2>
              <p className='section-description'>Hitting the <span className='italic'>Save</span> button on an album or a song has a limit in Spotify: you can save up to 10 000 songs in your library. I created agator9999 to get around this problem.</p>
              <p className='section-description'>agator9999 is a personal music library built with React and Firebase. It allows you to store, browse and enrich a library of albums and artists in a friendly interface.</p>
              <p className='section-description'>On top of this, agator9999 also solves the trouble of having multiple sources of music streaming platforms by allowing to browse in one single place all the artists you like.</p>
              <p className='section-description'>Anybody can setup his/her own agator9999, use it locally or deploy it, by following the instructions in the Github repo!</p>
              <hr className='hline-seperator'/>
              <div className='button-list'>
                <a className='btn' href='https://agator9999-demo.firebaseapp.com/'>Check the demo &nbsp; &#x21A3;</a>
                <a className='btn' href='https://github.com/agatheblues/agator9999'>See on Github &nbsp; &#x21A3;</a>
              </div>
            </section>
          </div>
        </div>


        <div className='section--gold'>
          <div className='container'>
            <section className='section-wrapper'>
              <h2 className='section-title inverted'>Features</h2>
              <p className='section-description'>In agator9999, you can synchronize all the albums that are saved in your Spotify library. Additionnaly, you can manually add an album from Spotify, Youtube, or Bandcamp along with its Discogs metadata by providing two URLs.</p>
              <p className='section-description'>You can browse your list of artists, and view the list of albums for one artist.</p>
              <hr className='hline-seperator hline-seperator--inverted'/>
              <img className='section-image' src='../../static/images/projects/agator1.png' />
              <img className='section-image' src='../../static/images/projects/agator2.png' />
              <p className='section-description first-paragraph'>It is always possible to link an album from Spotify to its Discogs counterpart. By doing so, you enrich the metadata of an album as Discogs provides <span className='italic'>genres</span> and  <span className='italic'>styles</span> data.</p>
              <hr className='hline-seperator hline-seperator--inverted'/>
              <img className='section-image' src='../../static/images/projects/agator3.png' />
              <p className='section-description first-paragraph'>If there are duplicate artists from different sources, you can merge them into one. It is also possible to <span className='italic'>unmerge</span> an artist, which means removing a reference to one of its sources.</p>
              <hr className='hline-seperator hline-seperator--inverted'/>
              <img className='section-image' src='../../static/images/projects/agator4.png' />
            </section>
          </div>
        </div>

        <div className='section-container--half'>
          <div className='container'>
            <section className='section-wrapper'>
              <Methodology content={this.props.projectData.projectDetails.methodology}/>
              <div className='thanks-container'>
                <p className='thanks-content'>Thanks to &nbsp;&nbsp;<a href='https://github.com/PierreGUI' className='link link-small'>PierreGUI</a>&nbsp;&nbsp; & &nbsp;&nbsp;<a href='https://github.com/ktorz' className='link link-small'>KtorZ</a>&nbsp;&nbsp; for their patience and help &nbsp;<span className='heart-icon'>❤️</span></p>
              </div>
            </section>
          </div>
        </div>

      </div>
    );
  }
});

export {Agator9999};
