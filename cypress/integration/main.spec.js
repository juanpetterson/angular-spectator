describe('Login Test', () => {
  it('should visit login page', () => {
    cy.visit('/');
  });

  it('should show error message when sign in with wrong credentials', () => {
    cy.get('#email').type('email@email.com');
    cy.get('#password').type('password');
    cy.get('.login-form__button').click();
    cy.get('#email').clear();
    cy.get('#password').clear();
  });

  // tslint:disable-next-line: max-line-length
  it('sign in with the right credentials, play the billboard meadia and go back to de browse page', () => {
    cy.get('#email').type('juan@netflix.com');
    cy.get('#password').type('juanflix');
    cy.get('.login-form__button').click();

    cy.get('.billboard__button#play').click();

    cy.wait(3000);
    cy.get('.watch-player__header-icon').click();
  });
});
