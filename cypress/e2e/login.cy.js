describe('Login Flow', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login');
  });

  it('should display login page correctly', () => {
    cy.get('input[placeholder="nama@email.com"]').should('be.visible');
    cy.get('input[placeholder="••••••••"]').should('be.visible');
    cy.get('button').contains('Masuk').should('be.visible');
  });

  it('should display alert when login failed', () => {
    cy.intercept('POST', '**/v1/login', {
      statusCode: 400,
      body: {
        status: 'fail',
        message: 'email or password is wrong',
      },
    }).as('loginRequest');

    cy.get('input[type="email"]').type('email.salah@gmail.com');
    cy.get('input[type="password"]').type('wrongpassword');
    cy.get('button').contains('Masuk').click();

    cy.wait('@loginRequest');

    cy.on('window:alert', (text) => {
      expect(text).to.equal('email or password is wrong');
    });
  });
});
