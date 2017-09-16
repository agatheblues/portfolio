import React from 'react';
import ReactDOM from 'react-dom';
import {Gallery} from './components/Gallery/Gallery.js';
require('./main.scss');

// Cache gallery container
const galleryContainer = document.querySelector('.gallery-container');

// Create new array with URLs for images
let imgUrlsList = [
  'https://source.unsplash.com/3Z70SDuYs5g/800x600',
  'https://source.unsplash.com/01vFmYAOqQ0/800x600',
  'https://source.unsplash.com/2Bjq3A7rGn4/800x600',
  'https://source.unsplash.com/t20pc32VbrU/800x600',
  'https://source.unsplash.com/pHANr-CpbYM/800x600',
  'https://source.unsplash.com/3PmwYw2uErY/800x600',
  'https://source.unsplash.com/uOi3lg8fGl4/800x600',
  'https://source.unsplash.com/CwkiN6_qpDI/800x600',
  'https://source.unsplash.com/9O1oQ9SzQZQ/800x600',
  'https://source.unsplash.com/E4944K_4SvI/800x600',
  'https://source.unsplash.com/-hI5dX2ObAs/800x600',
  'https://source.unsplash.com/vZlTg_McCDo/800x600'
];

ReactDOM.render(
  <Gallery imgUrls={imgUrlsList} />,
  galleryContainer
);

// var FriendsContainer = React.createClass({
//   getInitialState: function(){
//     return {
//       friends: ['coucou', 'caca']
//     }
//   },
//   addFriend: function(newFriend){
//     this.setState({
//       friends: this.state.friends.concat([newFriend])
//     })
//   },
//   render: function(){
//     return (
//       <div>
//         <AddFriend newFriend={this.addFriend}/>
//         <ShowList friends={this.state.friends}/>
//       </div>
//     )
//   }
// });
//
// var AddFriend = React.createClass({
//   getInitialState: function(){
//     return {
//       newFriend: ''
//     }
//   },
//   updateNewFriend: function(e){
//     this.setState({
//       newFriend: e.target.value
//     });
//   },
//   addFriend: function(){
//     this.props.newFriend(this.state.newFriend);
//     this.setState({
//       newFriend: ''
//     });
//   },
//   render: function(){
//     return (
//       <div>
//         <input
//           type='text'
//           value={this.state.newFriend}
//           onChange={this.updateNewFriend}>
//         </input>
//         <button onClick={this.addFriend}>Add Friend</button>
//       </div>
//     )
//   }
// });
//
// var ShowList = React.createClass({
//   render: function(){
//     var listItem = this.props.friends.map(title => (<li>{title}</li>));
//     console.log(listItem);
//     return (
//       <ul>
//         {listItem}
//       </ul>
//     )
//   }
// });
//
// ReactDOM.render(
//   <FriendsContainer />,
//   document.getElementById('app')
// );
