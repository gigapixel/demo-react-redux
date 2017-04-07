import React, { Component } from 'react';

import store from './store';

class Person extends Component {
  render() {
    return (
      <div style={{marginBottom: 15}}>
        <label>Name: {this.props.name}</label>
        <br/>
        <label>Age: {this.props.age}</label>
        <br/>
      </div>
    );
  }
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      age: 0,
    };
  }

  componentWillMount() {
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  changeName(event) {
    this.setState({ name: event.target.value });
  }

  changeAge(event) {
    this.setState({ age: event.target.value });
  }

  addPerson() {
    let person = {
      name: this.state.name,
      age: this.state.age,
    };

    store.dispatch({type: 'ADD_PERSON', payload: person});

    this.setState({ name: '', age: 0 });
  }

  render() {
    let state = store.getState();

    let people = state.people.map((item, index) => {
      return <Person key={index} name={item.name} age={item.age}/>
    });

    return (
      <div>
        <h3>Hello People!</h3>
        <div>{people}</div>
        <br/>

        <label>Name: </label>
        <input type="text" value={this.state.name} onChange={this.changeName.bind(this)}/>

        <label>Age: </label>
        <input type="number" value={this.state.age} onChange={this.changeAge.bind(this)}/>
        <br/>

        <button type="button" onClick={this.addPerson.bind(this)} style={{marginTop: 25}}>
          Add Person
        </button>
      </div>
    );

  }

}

export default App;
