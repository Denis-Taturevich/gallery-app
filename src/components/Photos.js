import React, { useState, useEffect, useRef, useCallback } from 'react';
import Photo from './Photo';
import usePhotoSearch from '../hooks/usePhotoSearch';

const Photos = ({ query }) => {
    const [pageNumber, setPageNumber] = useState(1);
    const observer = useRef();

    const { photos, loading, error, hasMore, hasNoItems } = usePhotoSearch(
        query,
        pageNumber
    );

    const lastPhotoElementRef = useCallback(
        (node) => {
            if (loading) return;

            if (observer.current) observer.current.disconnect();

            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    setPageNumber((prevPageNumber) => prevPageNumber + 1);
                }
            });

            if (node) observer.current.observe(node);
        },
        [loading, hasMore]
    );

    useEffect(() => {
        setPageNumber(1);
    }, [query]);

    return (
        <>
            <div className="container">
                {photos.map((photo, index) => {
                    if (photos.length === index + 1) {
                        return (
                            <Photo
                                lastPhotoElementRef={lastPhotoElementRef}
                                photo={photo}
                                key={photo.id}
                            />
                        );
                    } else {
                        return <Photo photo={photo} key={photo.id} />;
                    }
                })}
            </div>
            <div className="notification">
                <div>{loading && 'Loading...'}</div>
                <div>{error && 'Error'}</div>
                <div>{hasNoItems && 'No items'}</div>
            </div>
        </>
    );
};

export default Photos;
