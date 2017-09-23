import React from 'react';
import {Card} from '../components/Card/Card.js';
var createReactClass = require('create-react-class');

const cardItems = [
  {
    title: 'Card 1',
    imgUrl: './data/images/IMG_4666.JPG',
    id: 'gallery-1',
    linkTo: '/photography/gallery',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt'
  },
  {
    title: 'Card 2',
    imgUrl: './data/images/IMG_4666.JPG',
    id: 'gallery-2',
    linkTo: '/photography/gallery'
  },
  {
    title: 'Card 3',
    imgUrl: './data/images/IMG_4666.JPG',
    id: 'gallery-3',
    linkTo: '/photography/gallery'
  },
  {
    title: 'Card 4',
    imgUrl: './data/images/IMG_4666.JPG',
    id: 'gallery-4',
    linkTo: '/photography/gallery'
  },
  {
    title: 'Card 5',
    imgUrl: './data/images/IMG_4666.JPG',
    id: 'gallery-5',
    linkTo: '/photography/gallery',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt'
  },
  {
    title: 'Card 6',
    imgUrl: './data/images/IMG_4666.JPG',
    id: 'gallery-6',
    linkTo: '/photography/gallery'
  },
  {
    title: 'Card 7',
    imgUrl: './data/images/IMG_4666.JPG',
    id: 'gallery-4',
    linkTo: '/photography/gallery',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt'
  }
];

const PhotographyPage = createReactClass({
  render() {
    return(
      <div>
        <Card cardItems={cardItems} />
      </div>
    );
  }
});

export {PhotographyPage};
