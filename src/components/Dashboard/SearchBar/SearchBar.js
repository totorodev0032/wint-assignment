import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { IoClose, IoSearch } from 'react-icons/io5';
import { motion } from 'framer-motion';
import { useClickOutside } from 'react-click-outside-hook';
import { words } from '../data/words';
import axios from 'axios';

const SearchBarWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 34em;
  height: 4em;
  background-color: #2f2f35;
  border: 1px solid #68686d;
  border-radius: 10px;
  box-shadow: 0px 2px 12px 3px rgba(0, 0, 0, 0.14);
  overflow: hidden;
  ${'' /* align-items: center; */}
`;

const SearchInputContainer = styled.div`
  width: 100%;
  min-height: 4em;
  display: flex;
  align-items: center;
  position: relative;
  padding: 0 15px;
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

const SearchContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1em;
  overflow-y: auto;
`;

const DictionMeaningContainer = styled.div`
  display: flex;
  height: 10em;
  width: 34em;
  background-color: #2f2f35;
  border: 1px solid #68686d;
  border-radius: 10px;
  margin-top: 2em;
  justify-content: center;
  align-items: center;
`;

const containerVariants = {
  expanded: {
    height: '24em',
  },

  collapsed: {
    height: '4em',
  },
};

const containerTransition = { type: 'spring', damping: 22, stiffness: 150 };

const SearchBar = () => {
  const [isExpanded, setExpanded] = useState(false);
  const [ref, isClickedOutside] = useClickOutside();
  const [inputValue, setInputValue] = useState(0);
  const [data, setData] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef();

  const expandContainer = () => {
    setExpanded(true);
  };

  const collapseContainer = () => {
    setExpanded(false);
  };

  useEffect(() => {
    if (isClickedOutside) collapseContainer();
  }, [isClickedOutside]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
    console.log(inputValue);
  };

  function getMeaning() {
    axios
      .get(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${inputValue}`)
      .then((response) => {
        setData(response.data[0]);
        console.log(response.data[0]);
      })
      .catch((error) => {
        setError(error.response.data.message);
        console.log(error.response.data.message);
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    getMeaning();
    collapseContainer();
    inputRef.current.blur();
    console.log('success', inputValue);
  };

  const filterWords = words.filter((word) => word.startsWith(inputValue));
  console.log(filterWords);
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
          <form onSubmit={handleSubmit}>
            <SearchInput
              onFocus={expandContainer}
              placeholder="Search for word"
              onChange={handleChange}
              ref={inputRef}
            />
            <button type="submit" style={{ display: 'none' }}></button>
          </form>
        </SearchInputContainer>
        <SearchContent>
          {' '}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {filterWords !== undefined
              ? filterWords
                  .slice(0, 5)
                  .map((w) => <p style={{ color: 'white' }}> {w} </p>)
              : ''}
          </div>
        </SearchContent>
      </SearchBarWrapper>

      <div>
        {' '}
        {data ? (
          <DictionMeaningContainer>
            <p style={{ color: 'white' }}>
              {data.meanings[0].definitions[0].definition}
            </p>
          </DictionMeaningContainer>
        ) : error ? (
          <DictionMeaningContainer>
            <p style={{ color: 'white' }}>{error}</p>
          </DictionMeaningContainer>
        ) : null}
      </div>
    </>
  );
};

export default SearchBar;
