import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import { Input } from '@rocketseat/unform';

export default function AutoComplete({
  onSelect,
  onChange,
  value,
  placeholder,
  name,
}) {
  return (
    <PlacesAutocomplete
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
              };

              return (
                <div {...getSuggestionItemProps(suggestion, { style })}>
                  {suggestion.description}
                </div>
              );
            })}
          </div>
        </>
      )}
    </PlacesAutocomplete>
  );
}
