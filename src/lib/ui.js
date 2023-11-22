import { getProducts, getCategories } from './api.js';
import { el, empty } from './elements.js';


export async function renderNavbar() {
  const navbar = el('div', {},
    el('div', { class: 'navbar' },
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
    ),
    el('h2', { class: 'products-title' }, 'Nýjar vörur')
  );
  return navbar;
}

export function createProductCard(product) {
  const card = el('div', { class: 'card' },
    el('img', { src: product.image }),
    el('div', { class: 'card-text' },
      el('div', { class: 'card-title' },
        el('div', { class: 'p-title' }, product.title),
        el('div', { class: 'c-title' }, product.category_title)
      ),
      el('div', { class: 'card-price' },
        el('div', { class: 'p-price' }, `${product.price} kr.-`)
      )
    ),
  );
  return card;
}

export async function renderSamples(API_URL) {
  const exampleSamples = el('div', { class: 'product-container' });

  try {
    const url = `${API_URL}/products/?limit=6`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch sample products');
    }

    const data = await response.json();

    data.items.forEach((product) => {
      const productCard = createProductCard(product);
      exampleSamples.appendChild(productCard);
    });
  } catch (error) {
    console.error('Error fetching sample products:', error);
  }

  return exampleSamples;
}


export async function renderSearch() {
  const exampleNewProduct = el('div', { class: 'new-products' });

  const searchForm = el('form', {class: 'form-container'}); 

  const searchTermInput = el('input', {
    type: 'text',
    placeholder: 'Search...',
    class: 'search-input',
  });

  const searchButton = el('button', {
    type: 'submit',
    class: 'searchButton',
  }, 'Search');

  const productContainer = el('div', { class: 'product-container' });
  exampleNewProduct.appendChild(searchForm);
  searchForm.appendChild(searchTermInput);
  searchForm.appendChild(searchButton);
  exampleNewProduct.appendChild(productContainer);

  searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const searchTerm = searchTermInput.value.trim();
    const encodedSearchTerm = searchTerm ? encodeURIComponent(searchTerm) : '';

    const products = await getProducts(encodedSearchTerm);

    empty(productContainer);

    try {
      if (!products || products.length === 0) {
        const noResultProducts = el('div', {}, 'No products found');
        productContainer.appendChild(noResultProducts);
      } else {
        products.forEach((product) => {
          const productCard = createProductCard(product);
          productContainer.appendChild(productCard);
        });
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  });

  return exampleNewProduct;
}


export async function renderButton() {
  const button = el('div', { class: 'button' },
    el('a', { href: '/categories' }, 'skoða alla flokka')
  )
  return button;
}

export async function renderAllCategories() {
  const allCategories = el('div', { class: 'all-categories' });

  const categoriesTitle = el('h2', { class: 'categories-title' }, 'Skoða vöruflokkana okkar');
  allCategories.appendChild(categoriesTitle);

  const categories = await getCategories(6);
        console.log(getCategories(6));// TODO Dont work
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
