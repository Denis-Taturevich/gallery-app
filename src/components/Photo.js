import React from 'react';

const Photo = ({ photo }) => {
    return (
        <div className="photo">
            <img src={photo.userImageURL} alt="" />
            <div>{photo.tags}</div>
        </div>
    );
};

export default Photo;
