import { getProducts, getCategories } from './api.js';
import { el, empty } from './elements.js';

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

export async function renderSamplesProduct() {
  const productTitleSamples = el('div', { class: 'products-title' });
  const sampleHeader = el('h1', {}, 'Nýjar vörur');
  productTitleSamples.appendChild(sampleHeader);

  const exampleSamples = el('div', { class: 'product-container' });

  const products = await getProducts(6);
  
  if (!products || products.length === 0) {
    const noResultProducts = el('div', {}, 'No products found');
    exampleSamples.appendChild(noResultProducts);
  } else {
    products.forEach((product) => {
      const productCard = createProductCard(product);
      exampleSamples.appendChild(productCard);
    });
  }
    
  const samplesSection = el('div');
  samplesSection.appendChild(productTitleSamples);
  samplesSection.appendChild(exampleSamples);

  return samplesSection;
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

export async function renderCategoriesCard() {
  empty(document.querySelector('main'));
  const contentContainer = document.querySelector('main');

  try {
    const categoriesAll = await getCategories(12);

    if (!categoriesAll || categoriesAll.length === 0) {
      const noResultCategories = el('div', {}, 'No categories available');
      contentContainer.appendChild(noResultCategories);
    } else {
      const categoriesGrid = el('div', { class: 'categories-grid' });

      for (const category of categoriesAll) {
        const categoryItem = el('div', { class: 'category-item' }, category.title);
        categoriesGrid.appendChild(categoryItem);
      }

      contentContainer.appendChild(categoriesGrid);
    }
  } catch (error) {
    console.error('Error rendering categories:', error);
  }
}

export async function renderButton() {
  const button = el('div', { class: 'button' },
    el('a', { href: '#', class: 'button-link' }, 'Skoða alla flokka')
  );

  button.addEventListener('click', async (event) => {
    event.preventDefault();
    await renderCategoriesCard();
  });

  return button;
}

export async function renderSamplesCategories() {
  const samplesCategories = el('div', { class: 'all-categories' });

  const categoriesTitle = el('h1', {}, 'Skoða vöruflokkana okkar');
  samplesCategories.appendChild(categoriesTitle);

  const categories = await getCategories(6);
  if (!categories || categories.length === 0) {
    const noResultCategories = el('div', {}, 'No categories available');
    samplesCategories.appendChild(noResultCategories);
  } else {
    const categoriesGrid = el('div', { class: 'categories-grid' });

    for (const category of categories) {
      const categoryItem = el('div', { class: 'category-item' }, category.title);
      categoriesGrid.appendChild(categoryItem);
    }

    samplesCategories.appendChild(categoriesGrid);
  }

  return samplesCategories;
}

export async function productPaginationPage() {
  const paginationContainer = el('div', { class: 'product-container' });

  const products = await getProducts(10);

  if (!products || products.length === 0) {
    const noResultProducts = el('div', {}, 'No products found');
    paginationContainer.appendChild(noResultProducts);
  } else {
    products.forEach((product) => {
      const productCard = createProductCard(product);
      paginationContainer.appendChild(productCard);
    });

    const prevButton = el('button', { class: 'prev-button', disabled: true }, 'Previous');
    const nextButton = el('button', { class: 'next-button' }, 'Next');

    paginationContainer.appendChild(prevButton);
    paginationContainer.appendChild(nextButton);

    let offset = 0;

    nextButton.addEventListener('click', async () => {
      offset += 10;
      const newProducts = await getProducts(10, offset);

      paginationContainer.innerHTML = '';
      newProducts.forEach((product) => {
        const productCard = createProductCard(product);
        paginationContainer.appendChild(productCard);
      });

      prevButton.disabled = offset === 0;
    });

    prevButton.addEventListener('click', async () => {
      if (offset > 0) {
        offset -= 10; 
        const newProducts = await getProducts(10, offset);

        paginationContainer.innerHTML = '';
        newProducts.forEach((product) => {
          const productCard = createProductCard(product);
          paginationContainer.appendChild(productCard);
        });

        prevButton.disabled = offset === 0;
      }
    });
  }

  const paginationPage = el('div');
  paginationPage.appendChild(paginationContainer);

  return paginationPage;
}

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
        el('span', { class: 'products-span' }, 'Nýjar Vörur'),
        el('span', { class: 'categories-span' }, 'Flokkar'))
    ),
  );

  const newProductsSpan = navbar.querySelector('.products-span');

  newProductsSpan.addEventListener('click', async () => {
    empty(document.querySelector('main'));
    const contentContainer = document.querySelector('main');

    const productPagination = await productPaginationPage();
    contentContainer.appendChild(productPagination);
  });

  const categoriesSpan = navbar.querySelector('.categories-span');

  categoriesSpan.addEventListener('click', async (event) => {
    event.preventDefault();
    empty(document.querySelector('main'));
    const contentContainer = document.querySelector('main');

    const categoriesAll = await getCategories(12);

    if (!categoriesAll || categoriesAll.length === 0) {
      const noResultCategories = el('div', {}, 'No categories available');
      contentContainer.appendChild(noResultCategories);
    } else { 
      const categoriesGrid = el('div', { class: 'categories-grid' });

      for (const category of categoriesAll) {
        const categoryItem = el('div', { class: 'category-item' }, category.title);
        categoriesGrid.appendChild(categoryItem);
      }

      contentContainer.appendChild(categoriesGrid);
    }
    
  });

  return navbar;
}