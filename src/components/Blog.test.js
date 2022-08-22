import React from "react";
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content', async () => {
    const blog = {
        title: 'Yo Momma',
        author: 'Ade',
        url: 'nonono.com',
        likes: 9,
        user: {
            name: 'Nick'
        }
    }

    render(<Blog blog={blog} />)

    const element = screen.queryByText('Yo Momma')
    expect(element).toBeDefined()

})

test('displays extra info after clicking view', async () => {
    const blog = {
        title: 'Yo Momma',
        author: 'Ade',
        url: 'nonono.com',
        likes: 9,
        user: {
            name: 'Nick'
        }
    }

    const mockHandler = jest.fn()

    const { container } = render(<Blog blog={blog} deleteBlog={mockHandler}/>)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
    screen.debug()
    const urlElement = container.querySelector('.url')
    expect(urlElement).toHaveTextContent('nonono.com')
    const likesElement = screen.queryByText('9')
    expect(likesElement).toBeDefined()
    // expect(mockHandler.mock.calls).toHaveLength(1)
})

test('if like button pressed twice triggers adding like function', async () => {
    const blog = {
        title: 'Yo Momma',
        author: 'Ade',
        url: 'nonono.com',
        likes: 9,
        user: {
            name: 'Nick'
        }
    }

    const mockHandler = jest.fn()

    const { container } = render(<Blog blog={blog} addLike={mockHandler}/>)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
})