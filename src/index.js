import { 
  renderNavbar, 
  renderSearch, 
  renderButton, 
  renderSamplesCategories, 
  renderSamplesProduct 
} from './lib/ui.js';
import { API_URL } from './lib/api.js';

async function renderNav() {
  const navElement = document.querySelector('div');

  const navbar = await renderNavbar();
  navElement.appendChild(navbar);
}

async function renderHomePage() {
  const mainElement = document.querySelector('main');

  const samples = await renderSamplesProduct(API_URL);
  mainElement.appendChild(samples);

  const button = await renderButton();
  mainElement.appendChild(button);

  const productSearch = await renderSearch();
  mainElement.appendChild(productSearch);

  const categories = await renderSamplesCategories();
  mainElement.appendChild(categories);
}

window.onload = () => {
  renderNav();
  renderHomePage();
};
