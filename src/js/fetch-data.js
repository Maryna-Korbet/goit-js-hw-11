import axios from 'axios';
const BASEURL = 'https://pixabay.com/api/';
const KEY = `29304756-51da1fab5abbfa991ea2eaa1b`; 

async function fetchData(textQuery, page, perPage) {
    try {
        const response = await axios.get(`${BASEURL}?key=${KEY}&q=${textQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`);
        return response;   
    } catch (error) {
        console.error(error);
    }
}
export { fetchData };

