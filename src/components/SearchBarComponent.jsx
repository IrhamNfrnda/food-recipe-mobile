import * as React from 'react';
import { Searchbar } from 'react-native-paper';

const SearchBarComponent = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  return (
    <Searchbar
      placeholder="Search Pasta, Bread, etc"
      onChangeText={onChangeSearch}
      value={searchQuery}
      style={{
        backgroundColor: '#DDDDDD',
      }}
    />
  );
};

export default SearchBarComponent;
