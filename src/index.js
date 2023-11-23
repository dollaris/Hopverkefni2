import {
  renderNavbar,
  renderSearch,
  renderButton,
  renderSamplesCategories,
  renderSamplesProduct,
  renderCategoriesCard,
} from './lib/ui.js';
import { empty } from './lib/elements.js';
import { getProducts } from './lib/api.js';

async function renderNav() {
  const navElement = document.querySelector('div');

  const navbar = await renderNavbar();
  navElement.appendChild(navbar);
}

async function renderHomePage() {
  const mainElement = document.querySelector('main');

  const samples = await renderSamplesProduct();
  mainElement.appendChild(samples);

  const productSearch = await renderSearch();
  mainElement.appendChild(productSearch);

  const button = await renderButton();
  mainElement.appendChild(button);

  const categories = await renderSamplesCategories();
  mainElement.appendChild(categories);
}

function handleRouting(pathname) {
  const mainElement = document.querySelector('main');
  empty(mainElement);

  if (pathname === '/products/') {
    renderSamplesProduct().then(async () => {
      const productPage = await getProducts(100);
      mainElement.appendChild(productPage);
    });
  } else if (pathname === '/categories') {
    renderCategoriesCard().then(() => {});
  } else {
    renderHomePage();
  }
}

window.onload = () => {
  renderNav();
  const { pathname } = window.location;
  handleRouting(pathname);

  window.onpopstate = () => {
    const { pathname: updatedPath } = window.location;

    if (updatedPath === '/') {
      const mainElement = document.querySelector('main');
      empty(mainElement);
    }

    handleRouting(updatedPath);
  };
};
