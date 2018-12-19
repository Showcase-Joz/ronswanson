import React from 'react';

class Select extends React.Component {
constructor(props) {
  super(props);

    this.state = {
      quotes: [],
      key: undefined,
      quote: 'No option selected yet'
    }
    // this.handleSelect = this.handleSelect.bind(this);
  }


  componentWillMount(){
    // console.log('select - componentWillMount');
  }

  componentDidMount() {
    // console.log('select - componentDidMount');
  }

  componentWillUpdate() {
    // console.log('select - componentWillUpdate');
  }

  componentDidUpdate(prevProps) {
    // console.log('select - componentDidUpdate');
    if(this.props.gotQuotes.length === 0)
    return
    else {
      this.createQuote(prevProps);
    }
  }

  createQuote(prevProps) {
    // infinity loop test
      if (this.props.gotQuotes.length !== prevProps.gotQuotes.length) {
      const quotes = this.props.gotQuotes

      this.setState({
        quotes: quotes
      })
    }
  }

  


  render() {
    console.log(this.state);
    
    return(
      <div>
        <select value={this.props.selectedQuote}
          onChange={this.props.handleSelect}>
         {this.state.quotes.map((quote, index) => 
         <option key={index} value={quote}>{index}</option>)}
        </select>

      </div>
    )
  }
  
}

export default Select;