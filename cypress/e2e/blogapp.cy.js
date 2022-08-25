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
})