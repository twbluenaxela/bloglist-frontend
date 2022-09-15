import { useState, useEffect } from 'react'
import axios from 'axios'
import { Table } from 'react-bootstrap'
import blogs from '../services/blogs'
import { Link } from 'react-router-dom'

const Users = ({ users }) => {


  return (
    <div>
      <h1>Users</h1>
      <h3>Blogs created</h3>
      <Table striped>
        <tbody>
          {users.map(user =>
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>
                {user.blogs.length}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default Users