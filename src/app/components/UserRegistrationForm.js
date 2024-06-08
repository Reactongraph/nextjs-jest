"use client"
import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

export const REGISTER_USER = gql`
  mutation RegisterUser($username: String!, $email: String!, $password: String!) {
    registerUser(username: $username, email: $email, password: $password) {
      id
      email
    }
  }
`;

const UserRegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [registerUser, { loading, error, data }] = useMutation(REGISTER_USER);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser({ variables: formData });
      console.log('Form submitted', formData);
    } catch (e) {
      console.error('Error submitting form', e);
    }
  };

  console.log(data,"datadatadatadatadatadatadata")

  return (
    <form className="registration-form" onSubmit={handleSubmit}>
      <h2>User Registration</h2>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" disabled={loading}>Register</button>
      {error && <p>Error submitting form: {error.message}</p>}
      {data && <p>Registration successful!</p>}
    </form>
  );
};

export default UserRegistrationForm;
