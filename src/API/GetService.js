import axios from 'axios';

export default class GetService {
    static async getPhotos(searchString) {
        const response = await axios.get('https://pixabay.com/api', {
            params: {
                key: '', // Pass Your API key:
                image_type: 'photo',
                q: searchString || '',
            },
        });

        return response;
    }
}
