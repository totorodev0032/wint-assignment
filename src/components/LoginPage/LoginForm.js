import { useFormik } from 'formik';
import React, { useState } from 'react';
import styled from 'styled-components';

const LoginForm = () => {
  const [isActive, setIsActive] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },

    onSubmit: (values) => {
      console.log('form data:', values);
    },
  });

  // function handleTextChange(text) {
  //   setValue(text);

  //   if (text !== '') {
  //     setIsActive(true);
  //   } else {
  //     setIsActive(false);
  //   }
  // }
  console.log('form values:', formik.values);

  return (
    <>
      <FormContainer onSubmit={formik.handleSubmit}>
        <div id="float-label">
          <input
            type="email"
            id="email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <label className={isActive ? 'Active' : ''} htmlFor="email">
            E-mail
          </label>
        </div>
        <div id="float-label">
          <input
            type="password"
            id="password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <label className={isActive ? 'Active' : ''} htmlFor="password">
            Password
          </label>
        </div>{' '}
        <PrimaryButton type="submit"> Login </PrimaryButton>
      </FormContainer>
    </>
  );
};

export default LoginForm;

const FormContainer = styled.form`
  width: 400px;
  height: auto;
  justify-content: center;
  align-items: center;

  #float-label {
    display: flex;
    flex-direction: column;
    min-width: 350px;
    position: relative;
  }

  #float-label input {
    width: 90%;
    height: 60px;
    background: #323645;
    border: none;
    border-radius: 15px;
    padding: 10px 10px 0 20px;
    color: #ffffff;
    margin-bottom: 10px;

    &:focus {
      outline: none;
    }
  }

  #float-label label {
    font-size: 16px;
    font-family: Arial, Helvetica, sans-serif;
    padding: 0 12px;
    color: #999;
    pointer-events: none;
    position: absolute;
    transform: translate(0, 26px) scale(1);
    transform-origin: top left;
    transition: all 0.2s ease-out;
    padding-left: 25px;
  }

  #float-label:focus-within label {
    transform: translate(0, 12px) scale(0.75);
  }

  #float-label .Active {
    transform: translate(0, 12px) scale(0.75);
  }
`;

const PrimaryButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background: #1d90f4;
  width: 40%;
  height: 45px;
  border-radius: 22.5px;
  font-size: 0.8rem;
  font-weight: 600;
  color: #ffffff;
  margin-top: 10px;
  cursor: pointer;
`;
