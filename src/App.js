import Header from './components/Header';
import Photos from './components/Photos';
import React, { useState } from 'react';

import './styles/App.css';

function App() {
    const [query, setQuery] = useState('');

    return (
        <div className="App">
            <Header query={query} setQuery={setQuery} />
            <Photos query={query} />
        </div>
    );
}

export default App;
