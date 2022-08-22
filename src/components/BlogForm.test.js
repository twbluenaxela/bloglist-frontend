import React from "react";
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('when a new blog is created, display the correct details from the event handler', async () => {
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


    const { container } = render(<BlogForm createBlog={mockHandler} />)
    const user = userEvent.setup()
    const titleElement = container.querySelector('.title')
    const authorElement = container.querySelector('.author')
    const urlElement = container.querySelector('.url')
    const createButton = container.querySelector('.create')

    await user.type(titleElement, 'Yo Momma Returns!')
    await user.type(authorElement, 'Ade n his Momma')
    await user.type(urlElement, 'google.com')

    await user.click(createButton)
    // console.log(mockHandler.mock.calls[0][0])
    expect(mockHandler.mock.calls[0][0].title).toBe('Yo Momma Returns!')
    expect(mockHandler.mock.calls[0][0].author).toBe('Ade n his Momma')
    expect(mockHandler.mock.calls[0][0].url).toBe('google.com')


    // screen.debug()

})