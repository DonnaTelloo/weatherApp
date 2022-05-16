import Search from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import { InputAdornment } from '@mui/material';
import { Field } from '../styles/TextField';
import { debounce } from 'lodash';
import { useEffect } from 'react';

const SearchView = styled('div')(() => ({
    width: '100%',
    height: '60px',
    marginBottom: 25,
    '& > *': {
        height: '100%',
    },
    '& > .MuiFormControl-root': {
        width: '100%'
    },
    '& .MuiFilledInput-root': {
        height: '100%'
    }
}))

const SearchContainer = ({
    handleChange
}) => {
   
    const debouncedSearch = debounce(async (cityName) => {
        handleChange(cityName)
      }, 1500);
    
    const handleSearch = (text) => {
        debouncedSearch(text)
    }

    useEffect(() => {
        return () => {
          debouncedSearch.cancel();
        };
      }, [debouncedSearch]);
    
    return (
        <SearchView>
            <Field
                id="general-search"
                label="Search City"
                variant="filled"
                defaultValue='Kyiv'
                onChange={(e) => handleSearch(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position='start'>
                            <Search />
                        </InputAdornment>
                    )
                }}
            />
        </SearchView>
    )
}

export default SearchContainer