import Header from './components/Header';
import Photos from './components/Photos';
import React, { useEffect, useState } from 'react';
import GetService from './API/GetService';
import './styles/App.css';

function App() {
    const [photos, setPhotos] = useState();

    async function fetchPhotosAPI(value) {
        const response = await GetService.getPhotos(value);
        setPhotos(response.data.hits);
    }

    useEffect(() => fetchPhotosAPI(''), []);

    return (
        <div className="App">
            <Header onSearchStringChange={(value) => fetchPhotosAPI(value)} />
            <Photos photos={photos} />
        </div>
    );
}

export default App;
