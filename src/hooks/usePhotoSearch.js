import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react/cjs/react.development';

export default function usePhotoSearch(query, pageNumber) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(true);
    const [photos, setPhotos] = useState([]);
    const [hasMore, setHasMore] = useState(false);
    const [hasNoItems, setHasNoItems] = useState(false);

    useEffect(() => {
        setPhotos([]);
    }, [query]);

    useEffect(() => {
        setLoading(true);
        setError(false);
        setHasNoItems(false);

        let cancel;
        axios
            .get('https://pixabay.com/api', {
                params: {
                    key: '24245769-98600151d26e0c62759696949', // Pass Your API key:
                    image_type: 'photo',
                    q: query || '',
                    page: pageNumber,
                },
                cancelToken: new axios.CancelToken((c) => (cancel = c)),
            })
            .then((res) => {
                setPhotos((prevPhotos) => {
                    return [
                        ...prevPhotos,
                        ...res.data.hits.map((hit) => {
                            return { ...hit, id: hit.id + Date.now() }; // Workaround because API return duplicate ids
                        }),
                    ];
                });

                setHasMore(res.data.hits.length > 0);
                setHasNoItems(res.data.hits.length === 0);
                setLoading(false);
            })
            .catch((e) => {
                if (axios.isCancel(e)) return;

                setError(true);
            });

        return () => cancel();
    }, [query, pageNumber]);

    return { loading, error, photos, hasMode: hasMore, hasNoItems };
}
