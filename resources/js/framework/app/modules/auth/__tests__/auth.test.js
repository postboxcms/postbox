import { render, screen } from "@testing-library/react";
import { api } from "@app/constants";
import "@testing-library/jest-dom";
import Auth from "@modules/auth";

jest.mock("@app/constants",() => ({
 ...jest.requireActual('@app/constants'),
 api: {
    csrfToken: 'abcd'
 }   
}))

test('show user login screen', async () => {
    render(<Auth />);

    expect(screen.getByRole('heading')).toHaveTextContent('Sign in');
    expect(screen.getByRole('button')).toHaveTextContent('Sign in');
});
