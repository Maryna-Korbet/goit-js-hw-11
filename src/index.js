import '../src/css/styles.css';
import { fetchData } from './js/fetch-data';
import { generateGallery } from './js/generateGallery';
import Notiflix from 'notiflix';

const refs = {
    searchForm: document.querySelector('#search-form'),
    gallery: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more'),
    imageGallery: document.querySelector('photo-card'),
}

let textQuery = '';
let page = 1;
const perPage = 40;

refs.searchForm.addEventListener('submit', onSearchForm);
refs.loadMoreBtn.addEventListener('click', onLoadMore);
refs.loadMoreBtn.style.display = 'none';

function onSearchForm(e) {
    e.preventDefault();
    page = 1;
    textQuery = e.currentTarget.searchQuery.value.trim();
    refs.gallery.innerHTML = '';
    
    if (textQuery === '') {
        return;
    }
    
    fetchData(textQuery, page, perPage)
        .then(({ data }) => {
            if (data.totalHits === 0) {
                return Notiflix.Notify.failure(`Sorry, there are no images matching your search query. Please try again.`);
            } else {
                generateGallery(data.hits);
                Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
                if (data.totalHits > perPage) {
                    refs.loadMoreBtn.style.display = 'block';
                }
            }
        })
        .catch(error => console.log(error));
}


function onLoadMore() {
    page += 1;
    fetchData(textQuery, page, perPage)
        .then(({ data }) => {
            generateGallery(data.hits);
            const totalPages = Math.ceil(data.totalHits / perPage);
            if (page > totalPages) {
                refs.loadMoreBtn.style.display = 'none';
                Notiflix.Notify.failure(`We're sorry, but you've reached the end of search results.`);
                return;
            }
        })
        .catch(error => console.log(error));
}





