import React from 'react';
import Quiz from '../../client/src/components/Quiz.tsx';

describe('<Quiz />', () => {
    it('should render the Quiz component', () => {
        cy.mount(<Quiz />)
    });

    it('should render the start quiz button before quiz is started', () => {
        cy.mount(<Quiz />);
        cy.get('button').should('have.text', 'Start Quiz');
    });

    it('should start the quiz when the start quiz button is clicked', () => {
        cy.mount(<Quiz />);
        cy.get('button').click();
        cy.get('button').first().should('have.text', '1');
    });
});