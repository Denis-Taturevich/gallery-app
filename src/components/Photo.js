import React from 'react';

const Photo = ({ photo, lastPhotoElementRef }) => {
    return (
        <div className="photo" ref={lastPhotoElementRef}>
            <img src={photo.userImageURL} alt="" />
            <div>{photo.tags}</div>
        </div>
    );
};

export default Photo;
