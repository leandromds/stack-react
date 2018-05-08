import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Content from './components/Text.js'

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>{Content.title}</h1>
        <h2>{Content.subtitle}</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

module.hot.accept();