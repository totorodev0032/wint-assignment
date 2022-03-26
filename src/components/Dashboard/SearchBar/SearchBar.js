import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { IoClose, IoSearch } from 'react-icons/io5';
import { motion } from 'framer-motion';
import { useClickOutside } from 'react-click-outside-hook';
import { words } from '../data/words';
import MoonLoader from 'react-spinners/MoonLoader';
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

  @media (max-width: 496px) {
    width: 20rem;
  }
`;

const SearchInputContainer = styled.div`
  width: 100%;
  min-height: 4em;
  display: flex;
  align-items: center;
  position: relative;
  padding: 0 15px;
  .instruction {
    color: #cecece;
    padding-right: 10px;
    font-size: 0.9rem;
  }
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

  p {
    cursor: pointer;
  }
`;

const SuggestionElement = styled.div`
  display: flex;
  width: 90%;
  justify-content: space-between;
  cursor: pointer;
  height: 10px;
  margin-bottom: 40px;
`;

const DictionMeaningContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 10em;
  height: auto;
  width: 34em;
  background-color: #2f2f35;
  border: 1px solid #68686d;
  border-radius: 10px;
  margin-top: 2em;
  justify-content: center;
  align-items: center;
  transition-delay: 2s;

  .emoji {
    font-size: 3rem;
    margin-bottom: 5px;
  }

  p {
    padding: 0 10px 0 10px;
    text-align: center;
  }

  @media (max-width: 496px) {
    width: 20rem;
  }
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
  const [isLoading, setLoading] = useState(false);

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
    setInputValue(e.target.value.toLowerCase());
    console.log(inputValue);
  };

  function getMeaning(word) {
    axios
      .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
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
    setData('');
    setError('');
    setLoading(true);
    e.preventDefault();

    if (e.target.value !== '') {
      getMeaning(inputValue);
      collapseContainer();
      inputRef.current.blur();
      console.log('success', inputValue);
    }

    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  function handleSuggestion(word) {
    setData('');
    setError('');
    setLoading(true);
    setInputValue(word);
    getMeaning(word);
    collapseContainer();
    inputRef.current.blur();

    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }

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
              value={inputValue === 0 ? null : inputValue}
              ref={inputRef}
            />
            <button type="submit" style={{ display: 'none' }}></button>
          </form>
          {inputValue !== 0 && inputValue !== '' ? (
            <p className="instruction">Press enter to search</p>
          ) : null}
        </SearchInputContainer>

        {/* SUGGESTION FROM THE DATA */}
        <SearchContent>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {filterWords !== undefined
              ? filterWords.slice(0, 5).map((w, index) => (
                  <SuggestionElement onClick={() => handleSuggestion(w)}>
                    <p key={index} style={{ color: 'white' }}>
                      {w}
                    </p>
                    <p style={{ color: '#cecece' }}>Click to Search</p>
                  </SuggestionElement>
                ))
              : ''}
          </div>
        </SearchContent>
      </SearchBarWrapper>

      {/* MESSAGE/INFORMATION */}
      <div>
        {isLoading && (
          <DictionMeaningContainer>
            {' '}
            <MoonLoader loading color="#000" size={20} />{' '}
          </DictionMeaningContainer>
        )}
        {data && isLoading === false ? (
          <DictionMeaningContainer>
            <p className="emoji">🌟</p>
            <p style={{ color: 'white' }}>
              {data.meanings[0].definitions[0].definition}
            </p>
          </DictionMeaningContainer>
        ) : error && isLoading === false ? (
          <DictionMeaningContainer>
            <p className="emoji">😭</p>
            <p style={{ color: 'white' }}>{error}</p>
          </DictionMeaningContainer>
        ) : null}
      </div>
    </>
  );
};

export default SearchBar;
