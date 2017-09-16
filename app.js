import React from 'react';
import ReactDOM from 'react-dom';
import {Gallery} from './components/Gallery/Gallery.js';
require('./main.scss');

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
