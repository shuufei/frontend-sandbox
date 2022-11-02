import { getGreeting } from '../support/app.po';

describe('supabase-auth-sample-20221103', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    // Custom command example, see `../support/commands.ts` file
    cy.login('my-email@something.com', 'myPassword');

    // Function helper example, see `../support/app.po.ts` file
    getGreeting().contains('Welcome supabase-auth-sample-20221103');
  });
});
