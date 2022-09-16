import axios from "axios";

const baseUrl = '/api/blogs'

const addComment = async (comment, id) => {
    const commentUrl = `${baseUrl}/${id}/comments`
    const response = await axios.post(commentUrl, comment)
    console.log('Comment service added comment: ', response.data)
    return response.data
}

const getComments = async (id) => {
    const commentUrl = `${baseUrl}/${id}/comments`
    const response = await axios.get(commentUrl)
    return response.data

}

export default { addComment, getComments }