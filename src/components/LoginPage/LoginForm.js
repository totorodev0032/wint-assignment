import { useFormik } from 'formik';
import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';

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
      <FormContainer autoComplete="off" onSubmit={formik.handleSubmit}>
        {/* email */}
        <InputContainer>
          <div id="float-label">
            <input
              type="email"
              id="email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="email">E-mail</label>
          </div>
          <MdEmail
            style={{ color: '#cecece', fontSize: '30px', marginRight: '15px' }}
          />
        </InputContainer>
        {formik.touched.email && formik.errors.email ? (
          <div className="errorBox">
            {' '}
            <p>{formik.errors.email}</p>{' '}
          </div>
        ) : null}

        {/* password */}
        <InputContainer>
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
          </div>
          <RiLockPasswordFill
            style={{ color: '#cecece', fontSize: '30px', marginRight: '15px' }}
          />
        </InputContainer>
        {formik.touched.password && formik.errors.password ? (
          <div className="errorBox">
            {' '}
            <p> {formik.errors.password}</p>{' '}
          </div>
        ) : null}
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
    ${'' /* min-width: 350px; */}
    position: relative;
  }

  #float-label input {
    width: 100%;
    height: 45px;
    background: #323645;
    border: none;
    ${'' /* border-radius: 15px; */}
    padding: 10px 10px 0 20px;
    color: #ffffff;
    margin-left: 10px;

    &:focus {
      outline: none;
      background: #323645;
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
    margin-left: 10px;
  }

  .errorBox {
    display: flex;
    width: 100%;
    background: #ffcdd2;
    border: 1px solid #e57373;
    height: 40px;
    color: #000000;
    border-radius: 10px;
    margin: 10px 0 20px 0;
    align-items: center;

    p {
      color: #ef5350;
      padding-left: 10px;
    }
  }

  @media (max-width: 596px) {
    width: 90%;

    #float-label input {
      width: 50%;
    }
  }
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  height: 55px;
  background: #323645;
  width: 100%;
  border-radius: 15px;
  margin-top: 20px;
  justify-content: space-between;
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
  cursor: pointer;
  margin-top: 20px;
`;
