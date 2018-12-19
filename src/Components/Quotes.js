import React, {
  Component
} from 'react';

class Quotes extends Component {
  

  componentWillMount() {
    if (this.props.initialise === 0 && this.props.getCurrent === undefined) {

      this.props.getAQuote();
      // console.log(this.props.getCurrent);
    } 
  }

  componentDidMount() {
    console.log('quotes - componentDidMount');

    if (this.props.initialise === 1 && this.props.getCurrent !== undefined && this.props.getState === false) {
      this.currentInstance = this.props.getQuotes;
  }
}
 
  componentWillUpdate(prevProps) {
    // console.log('updated');    
    

    console.log('quotes - componentWillUpdate');

  }

  componentWillReceiveProps(prevProps) {
    if (this.props === prevProps) {
      this.currentInstance = 'Gathering Quotes'

    } else if (this.props !== prevProps) {

      if (this.props.getState === true) {
        this.currentInstance = this.props.getMoron;

      } else if (this.props.handleNewSelected !== prevProps.handleNewSelected) {
        this.currentInstance = this.props.handleNewSelected;

      } else if (this.props.initialise === 0 && this.props.getCurrent === undefined) {
        this.currentInstance = this.props.getQuotes;

      } else if (this.props.initialise === 1 && this.props.getState === false && this.props.getCurrent !== undefined) {
        this.currentInstance = this.props.getCurrent;

      }
    }
  }

  componentDidUpdate() {
    
    console.log(this.props.handleNewSelected);
    console.log(this.props);
    
  }

  render() {

    return ( 
      <div className = "quote-block" >
        <h4>
          {this.currentInstance}
        </h4>
      </div>
    )
  }
}

export default Quotes;