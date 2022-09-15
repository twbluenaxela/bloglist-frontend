import loginService from '../services/login'
import blogService from '../services/blogs'
import Notification from './Notification'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch, useSelector }  from 'react-redux'
import { loginUser } from '../reducers/loginReducer'
import PropTypes from 'prop-types'

const LoginForm = ({
  username,
  setUsername,
  password,
  setPassword,
  setUser,
  message,
  setMessage,
}) => {

  const dispatch = useDispatch()
  // const user = useSelector((state) => {
  //   return state.users
  // })
  // console.log('Login form side user: ', user)

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      // const user = await loginService.login({
      //   username,
      //   password,
      // })
      dispatch(loginUser({username, password})) 
      // console.log('Current user state: ', user)
      // if(user){
      //   window.localStorage.setItem(
      //     'loggedBloglistappUser',
      //     JSON.stringify(user)
      //   )
      //   blogService.setToken(user.token)
      // }
      // setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNotification({ message: 'Wrong username or password', timer: 3 }))
    }
  }

  LoginForm.propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    setUsername: PropTypes.func.isRequired,
    setPassword: PropTypes.func.isRequired,
    setMessage: PropTypes.func.isRequired
  }



  return (
    <form onSubmit={handleLogin}>
      <Notification message={message} type={'error'} />
      <h1>login</h1>
      <div>
          username
        <input
          type="text"
          value={username}
          name="username"
          id="username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
          password
        <input
          type="password"
          value={password}
          name="password"
          id="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit" id="login-button">login</button>
    </form>
  )
}

export default LoginForm