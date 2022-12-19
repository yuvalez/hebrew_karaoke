import React, {useState} from 'react';
import './App.css';
import SearchPage from './SearchPage'
import SongsTable from './SongsTable';


function App() {
  const [searchQuery, setSearchQuery] = useState('')
  return (
    <div className="App">
      <header className="App-header">
        <SearchPage getSearchResults={v => setSearchQuery(v)} />
      </header>
    </div>
  );
}

export default App;
