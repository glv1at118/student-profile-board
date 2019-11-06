import React from 'react';
import './styles/app.css';
import QueryPart from './components/QueryPart.jsx';
import ListPart from './components/ListPart.jsx';
import { connect } from 'react-redux';
import { makeRequest } from './redux/actions.js';

class App extends React.Component {
  render() {
    return (
      <div id="app" >
        <QueryPart></QueryPart>
        <ListPart></ListPart>
      </div>
    );
  }
  componentDidMount() {
    // Upon app mount, make api request
    this.props.makeRequest();
  }
}

export default connect(null, {
  makeRequest: makeRequest
})(App);