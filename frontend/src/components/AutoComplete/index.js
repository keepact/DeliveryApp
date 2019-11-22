import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import { Input } from '@rocketseat/unform';

import { Container } from './styles';

export default function AutoComplete({
  onSelect,
  onChange,
  value,
  placeholder,
  name,
}) {
  const searchOptions = {
    componentRestrictions: { country: ['br'] },
    types: ['address'],
  };

  return (
    <PlacesAutocomplete
      searchOptions={searchOptions}
      value={value}
      onChange={onChange}
      onSelect={onSelect}
      placeholder={placeholder}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <>
          <Input name={name} type="text" {...getInputProps({ placeholder })} />

          <div>
            {loading ? <div>...Loading</div> : null}

            {suggestions.map(suggestion => {
              const style = {
                backgroundColor: suggestion.active ? '#3b9eff' : '#fff',
                color: suggestion.active ? '#fff' : 'black',
              };

              return (
                <Container {...getSuggestionItemProps(suggestion, { style })}>
                  {suggestion.description}
                </Container>
              );
            })}
          </div>
        </>
      )}
    </PlacesAutocomplete>
  );
}
