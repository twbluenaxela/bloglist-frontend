describe('Blog app', function () {
  beforeEach(function(){
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Tudou',
      username: 'tudou',
      password: 'tudou'
    }
    // cy.request('POST','http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })
  it('login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
  })
})