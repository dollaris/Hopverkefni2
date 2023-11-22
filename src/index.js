import { 
  renderNavbar, 
  renderSearch, 
  renderButton, 
  renderAllCategories, 
  renderSamples 
} from './lib/ui.js';
import { API_URL } from './lib/api.js';

async function renderHomePage() {
  const mainElement = document.querySelector('main');

  const navbar = await renderNavbar();
  mainElement.appendChild(navbar);

  const samples = await renderSamples(API_URL);
  mainElement.appendChild(samples);

  const button = await renderButton();
  mainElement.appendChild(button);

  const productSearch = await renderSearch();
  mainElement.appendChild(productSearch);

  const categories = await renderAllCategories();
  mainElement.appendChild(categories);
}

window.onload = () => {
  renderHomePage();
};
