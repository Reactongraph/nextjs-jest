import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import UserRegistrationForm, { REGISTER_USER } from './UserRegistrationForm';

// Mock the GraphQL mutation response
const mocks = [
  {
    request: {
      query: REGISTER_USER,
      variables: {
        username: 'john_doe',
        email: 'john@example.com',
        password: 'password123',
      },
    },
    result: {
      data: {
        registerUser: {
          id: '1',
          username: 'john_doeqqq',
          email: 'john@example.com',
        },
      },
    },
  },
];

test('renders the registration form', () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <UserRegistrationForm />
    </MockedProvider>
  );
  expect(screen.getByText(/User Registration/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Register/i })).toBeInTheDocument();
});

test('form submission with valid data', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <UserRegistrationForm />
    </MockedProvider>
  );
  fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'john_doe' } });
  fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john@example.com' } });
  fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });
  fireEvent.click(screen.getByRole('button', { name: /Register/i }));
  await waitFor(() => expect(screen.getByText(/Registration successful!/i)).toBeInTheDocument());
});
