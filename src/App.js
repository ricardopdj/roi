import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import * as TodoAPI from './TodoAPI'

class App extends Component {
  componentDidMount () {
    this.initSession()
  }

  initSession () {
    TodoAPI
      .initSession()
      .then((data) => {
        console.log(data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render () {
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className='App-link'
            href='https://reactjs.org'
            target='_blank'
            rel='noopener noreferrer'
          >
            Learn React
          </a>
        </header>
      </div>
    )
  }
}

export default App
