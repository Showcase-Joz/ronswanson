import React, { Component } from 'react';
import './App.css';
import RonsHead from './Components/RonsHead';
import Quotes from './Components/Quotes';
import Select from './Components/Select';
import GetQuote from './Components/GetQuote';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quotes: []
    }
    this.child = React.createRef();
    
    this.getQuotes = this.getQuotes.bind(this);
  }

  handleFetch = () => {
    this.child.current.randomQuote();
  }

  handleMoron = () => {
    this.child.current.moron();
    
  }
  
  handleFetchAll = () => {
    let allQuotes = this.child.current ? this.child.current.allQuotes() : [];

    this.setState({
      quotes: allQuotes
    });
    console.log('running apps handlefetchall');
  }

  componentWillMount = () => {
    if (this.state.quotes.length === 0) {
      this.getQuotes();
    }
  };

  getQuotes = async () => {
    try {
      let res = await fetch('http://ron-swanson-quotes.herokuapp.com/v2/quotes/99/');
      if (res.status === 200) {
        console.log('got ron\'s quotes');
        let quotes = await res.json();

        this.setState({
          quotes: quotes
        });
      } else {
        throw res.status;
      }
    } catch (err) {
      console.log('error getting quotes at app level');
      console.error(err);
      return null;
    }
  };


  // componentDidUpdate(prevProps) {
  //   console.log(prevProps !== this.props);
  //   if (this.state.quotes.length === 0) {
  //     this.handleFetchAll();
  //   }

  //   // console.log('running apps didupdate');
    
  //   // this.currentQuotes = this.state.quotes;

  //   // console.log(this.currentQuotes);

    
  // }


  render() {
    
    
    
    
    return (
      <div className="App">
        <header className="App-header">
          <RonsHead moron={this.handleMoron} />
          <h2 className="shadow">Ron Swanson</h2>
          <Quotes ref={this.child}  />
          
          <Select fetchAllQuotes={this.handleFetchAll} populateQuotes={this.componentDidUpdate} quotesArray={this.state.quotes}/>
          <GetQuote
            mainActionHandler={this.handleFetch} />
          
        </header>
        <footer>
          <h6>...plays fetch() with React || <a className="App-link" href="https://www.imdb.com/title/tt1266020/mediaviewer/rm2663962368?ft0=name&fv0=nm0644406&ft1=image_type&fv1=still_frame" rel="noopener noreferrer" target="_blank">&#x2665;</a></h6>
          
        </footer>
      </div>
    );
  }
}

export default App;
