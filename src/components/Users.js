import { useState, useEffect } from "react"
import axios from "axios"
import { Table } from "react-bootstrap"
import blogs from "../services/blogs"

const Users = () => {
    const [users, setUsers] = useState([])
    useEffect(() => {
        axios.get('http://localhost:3003/api/users').then(response => {
            console.log('Users: ', response.data)
            setUsers(response.data)
        })
    },[])
    return (
        <div>
            <h1>Users</h1>
            <Table striped>
                <h3>Blogs created</h3>
                <tbody>
                    {users.map(user => 
                        <tr key={user.name}>
                            <td>
                                {user.name}
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