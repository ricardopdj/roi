const api = 'http://localhost:9000/api'

export const initSession = () => fetch(`${api}/session`, { method: 'post' })
  .then(res => res.json())
  .then((data) => {
    return data
  })
  .catch(err => {
    throw err
  })