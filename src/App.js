import React, {
  Component
} from 'react';
import './App.css';
import RonsHead from './Components/RonsHead';
import Quotes from './Components/Quotes';
import Select from './Components/Select';
import GetQuote from './Components/GetQuote';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quotes: [],
      selectedQuote: undefined,
      ronQuote: `Let's get some bacon, click below. Please and Thank You`,
      moronQuote: `I said "Get Bacon", you moron!`,
      moronTrue: false,
      currentQuote: undefined,
      initialise: 0
    }
    this.handleQuoteUpdate = this.handleQuoteUpdate.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  fetchRonQuotes() {
    const dataSet = this;
    fetch('http://ron-swanson-quotes.herokuapp.com/v2/quotes/99/', {
        method: "GET",
        mode: "cors",
        headers: {
          'Accept': 'application/json',
        },
      })
      .then(
        function (response) {
          if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
              response.status);
            return;
          }
          // Examine the text in the response
          response.json().then(function (data) {
            dataSet.setState({
              quotes: data
            })
            console.warn('fetched quotes!!!');
          });
        }
      )
      .catch(function (err) {
        console.warn('Fetch Error :-S', err);
      });
  }

  handleQuoteUpdate = () => {
    // set consts
    const quotes = this.state.quotes;
    const random = Math.floor(Math.random() * quotes.length);

    // get a single quote from array
    if (quotes.length === 0 || quotes.length === undefined) {
      console.warn('There are no quotes loaded into the array')
      this.handleInit();
    } else if (quotes.length > 0) {
      
      // get a random quote
      const quote = quotes[random];
      // set state from random selection for current quote
      this.setState({
        currentQuote: quote,
        moronTrue: false
      })
      this.handleInit();
      this.fetchRonQuotes();
    } 
  }

  handleMoron = () => {
    
    // use a boolean counter in child component
    this.setState(() => {
      return {
        moronTrue: true
      }
    })
    this.fetchRonQuotes();
  }

  handleInit = () => {
    const quotes = this.state.quotes;
    
    if (quotes.length === 0 || quotes.length === undefined) {
      console.log('trying to fetch quotes');
      
      this.fetchRonQuotes();
    } else if (quotes.length > 0 && quotes.length !== undefined) {
      
      this.setState(() => {
        return {
          initialise: 1
        }
      })
    }
    
  }

  componentDidMount() {
    //init fetchRonQuotes
    console.log('app - componentDidMount');
    // console.log(this.state.quotes.length);
    
  }

  componentDidUpdate() {
    console.log('app - componentDidUpdate');
    console.log(this.state);
  }

 

  handleSelect(e, prevState) {

    if (this.state !== prevState) {
      this.setState({
        selectedQuote: e.target.value
      })
    }
    
  }
 
  

  render() { 
    
    
    return (
      <div className="App">
        <header className="App-header">
          <RonsHead 
            moron={this.handleMoron}
            initialise={this.state.initialise}
          />
          <h2 className="shadow">Ron Swanson</h2>
          <Quotes 
            getQuotes={this.state.ronQuote}
            getMoron={this.state.moronQuote}
            getState={this.state.moronTrue}
            getCurrent={this.state.currentQuote}
            initialise={this.state.initialise}
            getAQuote={this.handleQuoteUpdate}
            handleNewSelected={this.state.selectedQuote}
          />
          
          <Select 
            gotQuotes={this.state.quotes}
            handleSelect={this.handleSelect}
          />
          <GetQuote getAQuote={this.handleQuoteUpdate} />
          
        </header>
        <footer>
          <h6>...plays fetch() with React || <a className="App-link" href="https://www.imdb.com/title/tt1266020/mediaviewer/rm2663962368?ft0=name&fv0=nm0644406&ft1=image_type&fv1=still_frame" rel="noopener noreferrer" target="_blank">&#x2665;</a></h6>
          
        </footer>
      </div>
    );
  }
}

export default App;