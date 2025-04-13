import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const CustomAutocomplete = ({ options, value, onChange }) => {
  return (
    <Autocomplete
      value={value}
      onChange={onChange}
      options={options}
      getOptionLabel={(option) => option.name} // Assuming your options have a 'name' property
      filterOptions={(options, state) => {
        return options.filter((option) =>
          option.name.toLowerCase().includes(state.inputValue.toLowerCase())
        );
      }} // Custom filter logic
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search Categories"
          variant="outlined"
          fullWidth
        />
      )}
    />
  );
};

export default CustomAutocomplete;
