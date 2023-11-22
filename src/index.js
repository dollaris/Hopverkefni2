import { empty } from './lib/elements.js';
import { renderNavbar, renderHeropage, renderButton, renderAllCategories } from './lib/ui.js';

async function renderHomePage() {
  const mainElement = document.querySelector('main');

  const navbar = await renderNavbar();
  mainElement.appendChild(navbar);

  const frontpage = await renderHeropage();
  mainElement.appendChild(frontpage);

  const button = await renderButton();
  mainElement.appendChild(button);

  const categories = await renderAllCategories();
  mainElement.appendChild(categories);
}

function route(pathname) {
  const mainElement = document.querySelector('main');
  mainElement.innerHTML = '';

  if (pathname === '/' || pathname === '/home') {
    renderHomePage();
  } else if (pathname === '/categories') {
    renderCategoriesPage();
  } else {
    mainElement.innerHTML = '<h1>404 - Page Not Found</h1>';
  }
}

function handleRouting() {
  const pathname = window.location.pathname;
  route(pathname);
}

window.onload = () => {
  handleRouting();

  window.onpopstate = () => {
    handleRouting();
  };
};