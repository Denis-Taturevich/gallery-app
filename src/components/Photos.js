import React from 'react';
import Photo from './Photo';

const Photos = ({ photos }) => {
    return (
        <div>
            {!photos ? (
                'Loading...'
            ) : (
                <div className="container">
                    {photos.map((photo) => (
                        <Photo photo={photo} key={photo.id} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Photos;
