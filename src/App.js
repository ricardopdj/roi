import React from 'react'
import './App.css'
import * as TodoAPI from './TodoAPI'
import Todo from './Todo'
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      sessionId: null,
      todos: null,
      error: null
    }
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount () {
    this.initSession()
  }

  initSession () {
    TodoAPI
      .initSession()
      .then((data) => {
        this.getTodos(data.sessionId)
        this.setState({ sessionId: data.sessionId })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  getTodos (sessionId) {
    TodoAPI
      .getAll(sessionId)
      .then((data) => {
        this.updateTodos(data)
      })
      .catch((error) => {
        console.log('error', error)
      })
  }

  handleDelete (todoId) {
    console.log(todoId)
    TodoAPI
      .deleteTodo(this.state.sessionId, todoId)
      .then((data) => {
        this.updateTodos(data)
      })
      .catch((error) => {
        console.log('error', error)
      })
  }

  updateTodos (data) {
    console.log(data)
    if (data.status === 'OK') {
      this.setState({ todos: data.todos })
    }
    this.setState({ error: data.error })
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
                  <a className='nav-link' href='#'>Add <span className='sr-only'>(current)</span></a>
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
          <div className='row justify-content-md-center'>
            <div className='col col-lg-8'>
              {
                this.state.error &&
                <p>{this.state.error}</p>
              }
              {
                todos &&
                Object.values(todos).map((todo, index) =>
                  <Todo data={todo} onDelete={this.handleDelete} key={index} />
                )
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
