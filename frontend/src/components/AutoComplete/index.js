import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import PropTypes from 'prop-types';
import { Input } from '@rocketseat/unform';

import { Container } from './styles';

export default function AutoComplete({
  onSelect,
  onChange,
  value,
  placeholder,
  name,
}) {
  AutoComplete.defaultProps = {
    placeholder: 'Campo de input',
    name: 'autocomplete',
  };

  AutoComplete.propTypes = {
    onSelect: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    name: PropTypes.string,
  };
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
