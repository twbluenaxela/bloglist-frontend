import { Link } from "react-router-dom"

const User = ({ user }) => {

    // console.log('Clicked user: ', user);

    if(!user){
        return null
    }

    return (
        <div>
            <h1>{user.name}</h1>
            <h4>added blogs</h4>
            <ul>
                {user.blogs.map(blog => 
                    <li key={blog.id}>
                        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                    </li>
                    )}
            </ul>
            
        </div>
    )
} 

export default User