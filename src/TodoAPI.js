const api = 'http://localhost:9000/api'

export const initSession = () =>
  fetch(`${api}/session`, { method: 'post' })
    .then(res => res.json())
    .catch(err => {
      throw err
    })

export const getAll = (sessionId) =>
  fetch(`${api}/todos`,
    {
      headers: {
        sessionId: sessionId
      },
      method: 'GET'
    })
    .then(res => res.json())
    .catch(err => {
      throw err
    })

export const deleteTodo = (sessionId, todoId) =>
  fetch(`${api}/todos/${todoId}`,
    {
      headers: {
        sessionId: sessionId
      },
      method: 'DELETE'
    })
    .then(res => res.json())
    .catch(err => {
      throw err
    })

export const updateTodo = (sessionId, todoId, text) =>
  fetch(`${api}/todos/${todoId}`,
    {
      headers: {
        sessionId: sessionId
      },
      method: 'PATCH',
      body: {
        'text': text,
        'isCompleted': false,
        'urgency': 5
      }
    })
    .then(res => res.json())
    .catch(err => {
      throw err
    })
