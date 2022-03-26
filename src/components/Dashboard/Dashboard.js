import React from 'react';
import styled from 'styled-components';
import SearchBar from './SearchBar/SearchBar';

const Dashboard = () => {
  return (
    <>
      <DashboardWrapper>
        {' '}
        <SearchBar />
      </DashboardWrapper>
    </>
  );
};

export default Dashboard;

const DashboardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background: #121112;
`;
