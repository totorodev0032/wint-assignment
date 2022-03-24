import { useFormik } from 'formik';
import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';

const LoginForm = () => {
  let navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },

    onSubmit: (values) => {
      localStorage.setItem('UserDetails', JSON.stringify(values));
      navigate('/dashboard');
    },

    validate: (values) => {
      let errors = {};

      if (!values.email) {
        errors.email = 'This is Required';
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = 'Invalid email format';
      }

      if (!values.password) {
        errors.password = 'This is Required';
      }

      return errors;
    },
  });

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
            onBlur={formik.handleBlur}
            // onClick={(e) => handleTextChange(e)}
          />
          <label htmlFor="email">E-mail</label>
          {formik.touched.email && formik.errors.email ? (
            <div>
              {' '}
              <p>{formik.errors.email}</p>{' '}
            </div>
          ) : null}
        </div>
        <div id="float-label">
          <input
            type="password"
            id="password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            onBlur={formik.handleBlur}
          />
          <label htmlFor="password">Password</label>
          {formik.touched.password && formik.errors.password ? (
            <div>
              {' '}
              <p> {formik.errors.password}</p>{' '}
            </div>
          ) : null}
        </div>{' '}
        <PrimaryButton type="submit"> Login </PrimaryButton>
      </FormContainer>
    </>
  );
};

export default LoginForm;

const FormContainer = styled.form`
  width: 350px;
  height: auto;
  justify-content: center;
  align-items: center;

  #float-label {
    display: flex;
    flex-direction: column;
    min-width: 350px;
    position: relative;

    div {
      display: flex;
      width: 100%;
      background: #ffcdd2;
      border: 1px solid #e57373;
      height: 40px;
      color: #000000;
      border-radius: 10px;
      margin: 0px 0 20px 0;
      align-items: center;

      p {
        color: #ef5350;
        padding-left: 10px;
      }
    }
  }

  #float-label input {
    width: 90%;
    height: 50px;
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
    transform-origin: top left;
    padding-left: 25px;
    transform: translate(0, 12px) scale(0.75);
  }

  @media (max-width: 596px) {
    width: 90%;
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
