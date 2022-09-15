

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
                    <li key={blog.id}>{blog.title}</li>
                    )}
            </ul>
            
        </div>
    )
} 

export default User