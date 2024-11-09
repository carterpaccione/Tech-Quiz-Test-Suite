describe("Quiz via Fixtures", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3001");
  });

  it("should retrieve data from API request", () => {
    cy.intercept("GET", "/api/questions/random", {
      status: 201,
      fixture: "questions",
    }).as("mockGetRequest");
    cy.get("button").should("have.text", "Start Quiz").click();
    cy.wait("@mockGetRequest").then((intercept) => {
      assert.isNotNull(intercept.response?.body, "has data");
    });
  });

  it("should display quiz questions", () => {
    cy.intercept("GET", "/api/questions/random", {
      status: 201,
      fixture: "questions",
    }).as("mockGetRequest");
    cy.get("button").should("have.text", "Start Quiz").click();
    cy.wait("@mockGetRequest");
    cy.get("h2").should("have.text", "What is the output of print(2 ** 3)?");
    cy.get("button").should("have.length", 4);
  });

  it("should get next question after answer input", () => {
    cy.intercept("GET", "/api/questions/random", {
      status: 201,
      fixture: "questions",
    }).as("mockGetRequest");
    cy.get("button").should("have.text", "Start Quiz").click();
    cy.wait("@mockGetRequest");
    cy.get("button").first().should('have.text', '1').click();
    cy.intercept('GET', '/api/questions/random').as('getNextQuestion');
    cy.get('h2').should('have.text', 'Which of the following is a mutable data type in Python?')
  });

  it('should display quiz completed message when finished', () => {
    cy.intercept('GET', '/api/questions/random', {
        status: 201,
        fixture: 'questions',
    }).as('mockGetRequest');
    cy.get('button').should('have.text', 'Start Quiz').click();
    cy.wait('@mockGetRequest');
    cy.get('button').first().should('have.text', '1').click();
    cy.intercept('GET', '/api/questions/random').as('getNextQuestion');
    cy.get('button').first().should('have.text', '1').click();
    cy.intercept('GET', '/api/questions/random').as('getNextQuestion');
    cy.get('button').first().should('have.text', '1').click();
    cy.intercept('GET', '/api/questions/random').as('getNextQuestion');
    cy.get('button').first().should('have.text', '1').click();
    cy.intercept('GET', '/api/questions/random').as('getNextQuestion');
    cy.get('button').first().should('have.text', '1').click();
    cy.intercept('GET', '/api/questions/random').as('getNextQuestion');
    cy.get('h2').should('have.text', 'Quiz Completed');
  });

  it('should have a score of 5/5 when all questions are answered correctly', () => {
    cy.intercept('GET', '/api/questions/random', {
        status: 201,
        fixture: 'questions',
    }).as('mockGetRequest');
    cy.get('button').should('have.text', 'Start Quiz').click();
    cy.wait('@mockGetRequest');
    cy.get('button').eq(1).should('have.text', '2').click();
    cy.intercept('GET', '/api/questions/random').as('getNextQuestion');
    cy.get('button').eq(2).should('have.text', '3').click();
    cy.intercept('GET', '/api/questions/random').as('getNextQuestion');
    cy.get('button').eq(2).should('have.text', '3').click();
    cy.intercept('GET', '/api/questions/random').as('getNextQuestion');
    cy.get('button').eq(2).should('have.text', '3').click();
    cy.intercept('GET', '/api/questions/random').as('getNextQuestion');
    cy.get('button').eq(1).should('have.text', '2').click();
    cy.get('h2').should('have.text', 'Quiz Completed');
    cy.get('.card ').children().eq(1).should('have.text', 'Your score: 5/5');
  });

  it('should have a score of 0/5 when all questions are answered incorrectly', () => {
    cy.intercept('GET', '/api/questions/random', {
        status: 201,
        fixture: 'questions',
    }).as('mockGetRequest');
    cy.get('button').should('have.text', 'Start Quiz').click();
    cy.wait('@mockGetRequest');
    cy.get('button').eq(0).should('have.text', '1').click();
    cy.intercept('GET', '/api/questions/random').as('getNextQuestion');
    cy.get('button').eq(0).should('have.text', '1').click();
    cy.intercept('GET', '/api/questions/random').as('getNextQuestion');
    cy.get('button').eq(0).should('have.text', '1').click();
    cy.intercept('GET', '/api/questions/random').as('getNextQuestion');
    cy.get('button').eq(0).should('have.text', '1').click();
    cy.intercept('GET', '/api/questions/random').as('getNextQuestion');
    cy.get('button').eq(0).should('have.text', '1').click();
    cy.get('h2').should('have.text', 'Quiz Completed');
    cy.get('.card ').children().eq(1).should('have.text', 'Your score: 0/5');
  });

  it('should start a new quiz after completion and invokation of take new quiz button', () => {
    cy.intercept('GET', '/api/questions/random', {
        status: 201,
        fixture: 'questions',
    }).as('mockGetRequest');
    cy.get('button').should('have.text', 'Start Quiz').click();
    cy.wait('@mockGetRequest');
    cy.get('button').eq(0).should('have.text', '1').click();
    cy.intercept('GET', '/api/questions/random').as('getNextQuestion');
    cy.get('button').eq(0).should('have.text', '1').click();
    cy.intercept('GET', '/api/questions/random').as('getNextQuestion');
    cy.get('button').eq(0).should('have.text', '1').click();
    cy.intercept('GET', '/api/questions/random').as('getNextQuestion');
    cy.get('button').eq(0).should('have.text', '1').click();
    cy.intercept('GET', '/api/questions/random').as('getNextQuestion');
    cy.get('button').eq(0).should('have.text', '1').click();
    cy.get('button').should('have.text', 'Take New Quiz').click();
    cy.get('h2').should('have.text', 'What is the output of print(2 ** 3)?');
  });
});