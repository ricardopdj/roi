import React, { Component } from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
library.add(faTrash)

class Todo extends Component {
  deleteTodo (todoId) {
    this.props.onDelete(todoId)
  }

  render () {
    const { data } = this.props
    return (
      <div className='input-group mb-3 task'>
        <div className='input-group-prepend'>
          <div className='input-group-text'>
            <input
              type='checkbox'
              aria-label='Checkbox for following text input'
              defaultChecked={data.isCompleted}
            />
          </div>
        </div>
        <input
          type='text'
          className='form-control task-name'
          aria-label='Text input with checkbox'
          value={data.text}
          readOnly
        />
        <div className='input-group-append'>
          <button className='btn btn-outline-secondary' type='button' onClick={() => this.deleteTodo(data.id)}>
            <FontAwesomeIcon icon='trash' />
          </button>
        </div>
      </div>
    )
  }
}

export default Todo
