import React, { Component } from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
library.add(faTrash)

class Todo extends Component {
  constructor (props) {
    super(props)
    this.state = {
      text: this.props.data ? this.props.data.text : ''
    }
  }

  deleteTodo (todoId) {
    this.props.onDelete(todoId)
  }

  updateTodo (todoId, text) {
    this.setState({ text })
    this.props.onUpdate(todoId, text)
  }

  change (text) {
    this.setState({ text })
  }

  render () {
    const { data } = this.props
    return (
      <div className='input-group mb-3 task' data-id={data ? data.id : null}>
        <div className='input-group-prepend'>
          <div className='input-group-text'>
            <input
              type='checkbox'
              aria-label='Checkbox for following text input'
              defaultChecked={data ? data.isCompleted : false}
            />
          </div>
        </div>
        <input
          type='text'
          className='form-control task-name'
          aria-label='Text input with checkbox'
          value={this.state.text}
          onChange={(event) => data ? this.updateTodo(data.id, event.target.value) : this.change(event.target.value)}
        />
        <div className='input-group-append'>
          <button
            className='btn btn-outline-secondary border-0 btn-sm'
            type='button'
            onClick={() => this.deleteTodo(data ? data.id : null)}
          >
            <FontAwesomeIcon icon='trash' />
          </button>
        </div>
      </div>
    )
  }
}

export default Todo
