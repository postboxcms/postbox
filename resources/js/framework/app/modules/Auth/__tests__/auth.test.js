import { render, screen } from "@testing-library/react";
import { api } from "@app/utils/constants";
import "@testing-library/jest-dom";
import Auth from "@modules/Auth";

jest.mock("@app/utils/constants",() => ({
 ...jest.requireActual('@app/utils/constants'),
 api: {
    csrfToken: 'abcd'
 }   
}))

test('show user login screen', async () => {
    render(<Auth />);

    expect(screen.getByRole('heading')).toHaveTextContent('Sign in');
    expect(screen.getByRole('button')).toHaveTextContent('Sign in');
});
