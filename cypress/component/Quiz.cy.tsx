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
});