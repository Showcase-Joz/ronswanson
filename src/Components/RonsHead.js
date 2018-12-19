import React, { Component } from 'react';
// import logo from '../images/ron.png';

class RonsHead extends Component {

  state = {
    src: './images/ron.png',
  }

  handleOnMouseDown = () => {
    this.setState(() => {
      return {
        src: '../images/ouch-ron.png'
      }
    })
  }

  handleOnMouseUp = () => {
    this.setState(() => {
      return {
        src: '../images/ron.png'
      }
    })
  }

 render() {
   
    return (
      <img src={this.state.src} className="App-logo" alt="logo" onClick={this.props.moron} onMouseDown={this.handleOnMouseDown} onMouseUp={this.handleOnMouseUp}/>
    )
  }
}

export default RonsHead;