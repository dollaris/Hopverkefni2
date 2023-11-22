import {  getProducts, getCategories } from './api.js';
import { el } from './elements.js';


export async function renderNavbar() {
  const navbar = el('div', { class: 'navbar' },
    el('div', { class: 'navbar-logo' },
      el('a', { href: '/' }, 'Vefforritunarbudin'),
    ),
    el('div', { class: 'navbar-links' },
      el('span', {}, 'Nýskráning'),
      el('span', {}, 'Innskráning'),
      el('span', {}, 'Karfa'),
      el('span', {}, 'Nýjar Vörur'),
      el('span', {}, 'Flokkar')
    )
  );

  return navbar;
}

export async function renderHeropage() {
  const exampleNewProduct = el('div', { class: 'new-products' });
  const products = await getProducts({ limit: 6 });
  const productsTitle = el('h2', { class: 'products-title' }, 'Skoða vöruflokkana okkar');
  exampleNewProduct.appendChild(productsTitle);

  if (!products || products.length === 0) {
    const noResultNewProduct = el('div', {}, 'Engar niðurstöður fyrir nýjar vörur');
    exampleNewProduct.appendChild(noResultNewProduct);
  } else {
    const productContainer = el('div', { class: 'product-container' });
    for (const product of products) {
      const card = el('div', { class: 'card' },
        el('img', { src: product.image }),
        el('div', {class: 'card-text'},
          el('div', {class: 'card-title'}, 
            el('div', {class: 'p-title'}, product.title),
            el('div', {class: 'c-title'}, product.category_title)
          ),
          el('div', {class: 'card-price'}, 
          el('div', {class: 'p-price'}, product.price, ' kr.-')
          ),
        )
      );
      productContainer.appendChild(card);
    }
    exampleNewProduct.appendChild(productContainer);
  }

  return exampleNewProduct;
}

export async function renderButton() {
  const button = el('div', { class: 'button' });

  const link = el('a', { href: '/categories' }, 'Skoða alla flokka');
  link.addEventListener('click', async (event) => {
    event.preventDefault();
    renderCategoriesPage();
  });

  button.appendChild(link);
  return button;
}

export async function renderAllCategories() {
  const allCategories = el('div', { class: 'all-categories' });

  const categoriesTitle = el('h2', { class: 'categories-title' }, 'Skoða vöruflokkana okkar');
  allCategories.appendChild(categoriesTitle);

  const categories = await getCategories();

  if (!categories || categories.length === 0) {
    const noResultCategories = el('div', {}, 'No categories available');
    allCategories.appendChild(noResultCategories);
  } else {
    const categoriesGrid = el('div', { class: 'categories-grid' });

    for (const category of categories) {
      const categoryItem = el('div', { class: 'category-item' }, category.title);
      categoriesGrid.appendChild(categoryItem);
    }

    allCategories.appendChild(categoriesGrid);
  }

  return allCategories;
}

export async function renderCategoriesPage() {
  const mainElement = document.querySelector('main');
  mainElement.innerHTML = '';

  try {
    const navbar = await renderNavbar();
    mainElement.appendChild(navbar);

    const categories = await renderAllCategories();
    mainElement.appendChild(categories);
  } catch (error) {
    console.error('Error rendering categories page:', error);
  }
}



