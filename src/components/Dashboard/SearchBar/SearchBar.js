import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { IoClose, IoSearch } from 'react-icons/io5';
import { motion } from 'framer-motion';
import { useClickOutside } from 'react-click-outside-hook';

const SearchBarWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 34em;
  height: 3.8em;
  background-color: #2f2f35;
  border: 1px solid #68686d;
  border-radius: 10px;
  box-shadow: 0px 2px 12px 3px rgba(0, 0, 0, 0.14);
  overflow: hidden;
`;

const SearchInputContainer = styled.div`
  width: 100%;
  min-height: 4em;
  display: flex;
  align-items: center;
  position: relative;
  padding: 2px 15px;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  font-size: 21px;
  color: #cecece;
  font-weight: 500;
  border-radius: 6px;
  background-color: transparent;

  &:focus {
    outline: none;
    &::placeholder {
      opacity: 0;
    }
  }

  &::placeholder {
    color: #bebebe;
    transition: all 250ms ease-in-out;
  }
`;

const SearchIcon = styled.span`
  color: #bebebe;
  font-size: 27px;
  margin-right: 10px;
  margin-top: 6px;
  vertical-align: middle;
`;

const CloseIcon = styled.span`
  color: #bebebe;
  font-size: 23px;
  vertical-align: middle;
  transition: all 200ms ease-in-out;
  cursor: pointer;

  &:hover {
    color: #dfdfdf;
  }
`;

const containerVariants = {
  expanded: {
    height: '20em',
  },

  collapsed: {
    height: '3.4em',
  },
};

const containerTransition = { type: 'spring', damping: 22, stiffness: 150 };

const SearchBar = () => {
  const [isExpanded, setExpanded] = useState(false);
  const [ref, isClickedOutside] = useClickOutside();

  const expandContainer = () => {
    setExpanded(true);
  };

  const collapseContainer = () => {
    setExpanded(false);
  };

  useEffect(() => {
    if (isClickedOutside) collapseContainer();
  }, [isClickedOutside]);

  return (
    <>
      <SearchBarWrapper
        animate={isExpanded ? 'expanded' : 'collapsed'}
        variants={containerVariants}
        transition={containerTransition}
        ref={ref}
      >
        <SearchInputContainer>
          <SearchIcon>
            <IoSearch />
          </SearchIcon>
          <SearchInput
            onFocus={expandContainer}
            placeholder="Search for word"
          />
        </SearchInputContainer>
      </SearchBarWrapper>
    </>
  );
};

export default SearchBar;
