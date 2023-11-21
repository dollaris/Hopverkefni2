import { renderNavbar, renderFrontpage, renderButton, renderAllCategories } from './lib/ui.js';

async function renderContent() {
  const mainElement = document.querySelector('main');

  const navbar = await renderNavbar();
  mainElement.appendChild(navbar);

  const frontpage = await renderFrontpage();
  mainElement.appendChild(frontpage);

  const button = await renderButton();
  mainElement.appendChild(button);

  const categories = await renderAllCategories();
  mainElement.appendChild(categories);
}

window.onload = () => {
  renderContent();
};