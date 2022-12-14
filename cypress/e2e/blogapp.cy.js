describe('Blog app', function () {
  beforeEach(function(){
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Tudou',
      username: 'tudou',
      password: 'tudou'
    }
    cy.request('POST','http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })
  it('login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
  })
  describe('login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('tudou')
      cy.get('#password').type('tudou')
      cy.get('#login-button').click()
      cy.contains('Tudou logged in')
    })
    it('fails with wrong credentials', function() {
      cy.get('#username').type('wrong')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      // cy.contains('Wrong username or password')
      cy.get('.error').should('contain', 'Wrong username or password')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
      
    })
  })
  describe('when logged in', function() {
    beforeEach(function () {
      cy.login({ username: 'tudou', password: 'tudou'})
    })
    it('a blog can be created', function() {
      // cy.createBlog({title: 'some title', url:'abc.com', author: 'yo momma'})
      cy.contains('new blog').click()
      cy.get('.title').type('some title')
      cy.get('.author').type('yo momma')
      cy.get('.url').type('abc.com')
      cy.get('.create').click()
      cy.contains('some title', {timeout: 10000})
      

    })
    describe('and a blog is created', function() {
      beforeEach(function(){
        cy.createBlog({ title: 'the answer to the universe', author: 'bye', url: 'abc.com' })
      })
      it('a blog can be liked', function() {
        cy.contains('view').click()
        cy.contains('like').click()
        cy.get('.blog-container').should('not.contain', 'likes 0')
  
      })
      it('blog can be deleted', function() {
        cy.contains('view').click()
        cy.contains('remove').click().should('not.contain', 'the answer to the universe')
      })

      describe('and several more are created', function(){
        beforeEach(function() {
          cy.createBlog({ title: 'Xiaobao', author: 'Dabao', url: 'baidu.com' })
          cy.createBlog({ title: 'Chinese', author: 'Dabao', url: 'baidu.com' })
          cy.createBlog({ title: 'Chaobao', author: 'Dabao', url: 'baidu.com' })
        })
        it.only('blogs are in order by like count', function() {
          cy.contains('Chinese').find('.view-button').as('chineseTitleViewButton') //should have least amount of likes
          cy.contains('Chaobao').find('.view-button').as('chaobaoTitleViewButton') //should have most amount of likes
          cy.get('@chineseTitleViewButton').click({ multiple: true })
          cy.get('@chineseTitleViewButton').parent().find('.like-button').as('chineseTitleLikeButton')
          cy.get('@chineseTitleLikeButton').click({ multiple: true }).click().click() //not all the clicks register but thats okay, this is just for testing purposes anyway
          cy.get('@chaobaoTitleViewButton').click()
          cy.get('@chaobaoTitleViewButton').parent().find('.like-button').as('chaobaoTitleLikeButton')
          cy.get('@chaobaoTitleLikeButton').click({ multiple:true }).click().click().click().click().click()
          cy.get('.blog-container').eq(0).should('contain', 'Chaobao')
          cy.get('.blog-container').eq(1).should('contain', 'Chinese')
        })

      })
    })

  })
})