import React, { useState, useEffect,useCallback } from 'react';
import { Autocomplete, TextField, CircularProgress } from '@mui/material';
import axios from 'axios';
import debounce from 'lodash.debounce';


const CollegeSelector = ({ onCollegeSelect }) => {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchColleges = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://raw.githubusercontent.com/Hipo/university-domains-list/master/world_universities_and_domains.json');
        setColleges(response.data);
        setOptions(response.data);
      } catch (error) {
        console.error('Error fetching college data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchColleges();
  }, []);
  const debounceFetchOptions = useCallback(
    debounce((value) => {
      if (value) {
        const filteredOptions = colleges.filter((college) =>
          college.name.toLowerCase().includes(value.toLowerCase())
        );
        setOptions(filteredOptions);
      } else {
        setOptions(colleges);
      }
    }, 300),
    [colleges]
  );

  useEffect(() => {
    debounceFetchOptions(inputValue);
  }, [inputValue, debounceFetchOptions]);


  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) => option.name}
      loading={loading}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
      onChange={(event, value) => onCollegeSelect(value)}
      sx={{ width: '100%' }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select College"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default CollegeSelector;
