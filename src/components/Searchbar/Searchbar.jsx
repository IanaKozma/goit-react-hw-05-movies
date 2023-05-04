import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as AddIcon } from '../icons/search.svg';
import {
   SearchForm,
   SearchbarContainer,
   SearchButton,
} from './Searchbar.styled';
import { useSearchParams } from 'react-router-dom';

const SearchBar = ({ onSubmit }) => {
   const [searchParams, setSearchParams] = useSearchParams();
   const nameFromInput = searchParams.get('query') ?? '';

   const handleQueryChange = e => {
      setSearchParams({ query: e.target.value.toLowerCase() });
   };

   const handleSubmit = e => {
      e.preventDefault();
      onSubmit(nameFromInput);
    };
    
   return (
      <SearchbarContainer>
         <SearchForm onSubmit={handleSubmit}>
            <SearchButton type="submit" aria-label="search">
               <AddIcon width="28" height="28" />
            </SearchButton>
            <input
               type="text"
               autoComplete="off"
               autoFocus
               placeholder="Search movies"
               onChange={handleQueryChange}
               value={nameFromInput}
               name="forminput"
            />
         </SearchForm>
      </SearchbarContainer>
   );
};

SearchBar.propTypes = {
   onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;