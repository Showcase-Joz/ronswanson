import React from 'react';



class GetQuote extends React.Component {
  render() {
    
    return (
      <input type="button"
        className="main-action"
        value="Get Bacon!"
        onClick={this.props.getAQuote} />
    )
  }
};
export default GetQuote;