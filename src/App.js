import React from 'react'
import './App.css'
import * as TodoAPI from './TodoAPI'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
library.add(faTrash)

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      todos: null,
      error: null
    }
  }

  componentDidMount () {
    this.initSession()
  }

  initSession () {
    TodoAPI
      .initSession()
      .then((data) => {
        this.getTodos(data.sessionId)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  getTodos (sessionId) {
    TodoAPI
      .getAll(sessionId)
      .then((data) => {
        switch (data.status) {
          case 'OK':
            this.setState({ todos: data.todos })
            console.log(this.state)
            break
          case 'ERROR':
            this.setState({ error: data.error })
            break
          default:
            console.log(data)
            break
        }
        console.log(this.state.todos)
      })
      .catch((error) => {
        console.log('error', error)
      })
  }

  render () {
    const todos = this.state.todos
    return (
      <div className='App'>
        <nav className='navbar navbar-expand-lg navbar-dark bg-primary'>
          <div className='container'>
            <a className='navbar-brand' href='#'>TodoROI</a>
            <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
              <span className='navbar-toggler-icon' />
            </button>

            <div className='collapse navbar-collapse' id='navbarSupportedContent'>
              <ul className='navbar-nav mr-auto'>
                <li className='nav-item active'>
                  <a className='nav-link' href='#'>Home <span className='sr-only'>(current)</span></a>
                </li>
              </ul>
              <form className='form-inline my-2 my-lg-0'>
                <input className='form-control mr-sm-2' type='search' placeholder='Search' aria-label='Search' />
                <button className='btn btn-outline-light my-2 my-sm-0' type='submit'>Search</button>
              </form>
            </div>
          </div>
        </nav>
        <div className='container py-5'>
          {
            this.state.error &&
            <p>{this.state.error}</p>
          }
          {
            todos &&
            Object.values(todos).map((todo, index) =>
              <div className='input-group mb-3 task' key={index}>
                <div className='input-group-prepend'>
                  <div className='input-group-text'>
                    <input
                      type='checkbox'
                      aria-label='Checkbox for following text input'
                      defaultChecked={todo.isCompleted}
                    />
                  </div>
                </div>
                <input
                  type='text'
                  className='form-control task-name'
                  aria-label='Text input with checkbox'
                  value={todo.text}
                  readOnly
                />
                <div className='input-group-append'>
                  <button className='btn btn-outline-secondary' type='button'>
                    <FontAwesomeIcon icon='trash' />
                  </button>
                </div>
              </div>
            )
          }
        </div>
      </div>
    )
  }
}

export default App
