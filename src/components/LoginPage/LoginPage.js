import React from 'react';
import styled from 'styled-components';
import BgImage from '../../images/forestBG.jpg';
import LoginForm from './LoginForm';

const LoginPage = () => {
  return (
    <>
      <LoginPageWrapper>
        <LoginPageContainer>
          <Heading>Welcome Back.</Heading>
          <LoginForm />
        </LoginPageContainer>{' '}
      </LoginPageWrapper>
    </>
  );
};

export default LoginPage;

const LoginPageWrapper = styled.div`
  display: flex;
  background: linear-gradient(
      90deg,
      #333435 -0.62%,
      rgba(12, 10, 20, 0.911382) 48.59%,
      rgba(31, 26, 40, 0.9) 86.23%,
      rgba(103, 102, 102, 0.4) 171.46%
    ),
    url(${BgImage});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const LoginPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  height: 80%;
  justify-content: center;
`;

const Heading = styled.h3`
  font-size: 3rem;
  color: #ffffff;
`;
