import React from 'react'
import './App.css'
import * as TodoAPI from './TodoAPI'
import Todo from './Todo'
import { Debounce } from 'react-throttle'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faSync } from '@fortawesome/free-solid-svg-icons'
library.add(faPlus, faSync)

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      sessionId: null,
      todos: null,
      error: null,
      adding: false
    }
    this.getTodos = this.getTodos.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
  }

  componentDidMount () {
    this.initSession()
  }

  initSession () {
    TodoAPI
      .initSession()
      .then((data) => {
        this.setState({ sessionId: data.sessionId })
        this.getTodos()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  getTodos () {
    TodoAPI
      .getAll(this.state.sessionId)
      .then((data) => {
        this.refreshTodos(data)
      })
      .catch((error) => {
        console.log('error', error)
      })
  }

  handleAdd () {
    this.setState({ adding: true })
  }

  handleDelete (todoId) {
    TodoAPI
      .deleteTodo(this.state.sessionId, todoId)
      .then((data) => {
        this.refreshTodos(data)
      })
      .catch((error) => {
        console.log('error', error)
      })
  }

  refreshTodos (data) {
    if (data.status === 'OK') {
      this.setState({ todos: data.todos })
    }
    this.setState({ error: data.error })
  }

  handleUpdate (todoId, text) {
    TodoAPI
      .updateTodo(this.state.sessionId, todoId, text)
      .then((data) => {
        alert('Updated')
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
              <form className='form-inline my-2 my-lg-0 ml-auto'>
                <input className='form-control mr-sm-2' type='search' placeholder='Search' aria-label='Search' />
              </form>
              <button type='button' className='btn btn-primary ml-auto' onClick={this.getTodos}>
                <FontAwesomeIcon icon='sync' />
              </button>
            </div>
          </div>
        </nav>
        <div className='container py-5 content'>
          <div className='row justify-content-md-center'>
            <div className='col col-lg-8'>
              {
                this.state.error &&
                <p>{this.state.error}</p>
              }
              {
                todos &&
                Object.values(todos).map((todo, index) =>
                  <Debounce time='1000' handler='onUpdate' key={index}>
                    <Todo
                      data={todo}
                      onUpdate={this.handleUpdate}
                      onDelete={this.handleDelete}
                    />
                  </Debounce>
                )
              }
            </div>
          </div>
          {
            this.state.adding &&
            <div className='row justify-content-md-center'>
              <div className='col col-lg-8'>
                <Todo onUpdate={this.handleUpdate} onDelete={this.handleDelete} />
              </div>
            </div>
          }
          {
            !this.state.error &&
            <div className='row justify-content-md-center'>
              <div className='col col-lg-8'>
                { this.state.adding &&
                <button type='button' className='btn btn-success' onClick={this.addTodo}>
                  Save
                </button>
                }
                <button type='button' className='btn btn-primary float-right' onClick={this.handleAdd}>
                  <FontAwesomeIcon icon='plus' />
                </button>
              </div>
            </div>
          }
        </div>
      </div>
    )
  }
}

export default App
