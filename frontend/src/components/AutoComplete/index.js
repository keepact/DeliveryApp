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
            {loading ? <div>...Carregando</div> : null}

            {suggestions.map(suggestion => {
              const className = suggestion.active
                ? 'suggestion-item-active'
                : 'suggestion-item';

              return (
                <Container
                  {...getSuggestionItemProps(suggestion, { className })}
                >
                  <div className={className}>{suggestion.description}</div>
                </Container>
              );
            })}
          </div>
        </>
      )}
    </PlacesAutocomplete>
  );
}
