import { getProducts, getCategories, productSearch } from './api.js';
import { el, empty } from './elements.js';

function setLoading(parentElement, searchForm = undefined) {
  let loadingElement = parentElement.querySelector('.loading');

  if (!loadingElement) {
    loadingElement = el('div', { class: 'loading' }, 'Sæki gögn...');
    parentElement.appendChild(loadingElement);
  }

  if (!searchForm) {
    return;
  }

  const button = searchForm.querySelector('button');

  if (button) {
    button.setAttribute('disabled', 'disabled');
  }
}

function setNotLoading(parentElement, searchForm = undefined) {
  const loadingElement = parentElement.querySelector('.loading');

  if (loadingElement) {
    loadingElement.remove();
  }

  if (!searchForm) {
    return;
  }

  const disabledButton = searchForm.querySelector('button[disabled]');

  if (disabledButton) {
    disabledButton.removeAttribute('disabled');
  }
}

export function createProductCard(product) {
  const card = el(
    'div',
    { class: 'card' },
    el('img', { src: product.image }),
    el(
      'div',
      { class: 'card-text' },
      el(
        'div',
        { class: 'card-title' },
        el('div', { class: 'p-title' }, product.title),
        el('div', { class: 'c-title' }, product.category_title),
      ),
      el(
        'div',
        { class: 'card-price' },
        el('div', { class: 'p-price' }, `${product.price} kr.-`),
      ),
    ),
  );
  return card;
}

export async function renderSamplesProduct() {
  const productTitleSamples = el('div', { class: 'products-title' });
  const sampleHeader = el('h1', {}, 'Nýjar vörur');
  productTitleSamples.appendChild(sampleHeader);

  const exampleSamples = el('div', { class: 'product-container' });
  setLoading(exampleSamples);
  try {
    const products = await getProducts(6);
    setNotLoading(exampleSamples);

    if (!products || products.length === 0) {
      const noResultProducts = el('div', {}, 'Enginn vara fannst');
      exampleSamples.appendChild(noResultProducts);
    } else {
      products.forEach((product) => {
        const productCard = createProductCard(product);
        exampleSamples.appendChild(productCard);
      });
    }
  } catch (error) {
    console.error('Villa við að sækja vöru:', error);
    setNotLoading(exampleSamples);
  }

  const samplesSection = el('div');
  samplesSection.appendChild(productTitleSamples);
  samplesSection.appendChild(exampleSamples);

  return samplesSection;
}

export async function renderSearch() {
  const exampleNewProduct = el('div', { class: 'searchProducts' });

  const searchForm = el('form', { class: 'form-container' });

  const searchTermInput = el('input', {
    type: 'text',
    placeholder: 'Search...',
    class: 'search-input',
  });

  const searchButton = el(
    'button',
    {
      type: 'submit',
      class: 'searchButton',
    },
    'Search',
  );

  const productContainer = el('div', { class: 'product-container' });
  exampleNewProduct.appendChild(searchForm);
  searchForm.appendChild(searchTermInput);
  searchForm.appendChild(searchButton);
  exampleNewProduct.appendChild(productContainer);

  searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const searchTerm = searchTermInput.value.trim();

    // Check if the search term is empty
    if (!searchTerm) {
      const errorMessage = el(
        'div',
        {},
        'Verður að vera eitthvað í leitar vélinni!',
      );
      empty(productContainer);
      productContainer.appendChild(errorMessage);
      return;
    }

    const encodedSearchTerm = encodeURIComponent(searchTerm);

    empty(productContainer);
    setLoading(productContainer, searchForm);

    try {
      const products = await productSearch(encodedSearchTerm);
      setNotLoading(productContainer, searchForm);
      if (!products || products.length === 0) {
        const noResultProducts = el('div', {}, 'Enginn vara fannst');
        productContainer.appendChild(noResultProducts);
      } else {
        products.forEach((product) => {
          const productCard = createProductCard(product);
          productContainer.appendChild(productCard);
        });
      }
    } catch (error) {
      console.error('Villa við að sækja vöru:', error);
      setNotLoading(productContainer, searchForm);
    }
  });

  return exampleNewProduct;
}

export async function renderCategoriesCard() {
  empty(document.querySelector('main'));
  const contentContainer = document.querySelector('main');
  setLoading(contentContainer);

  try {
    const categoriesAll = await getCategories(12);
    setNotLoading(contentContainer);
    if (!categoriesAll || categoriesAll.length === 0) {
      const noResultCategories = el('div', {}, 'Enginn flokkar funndust');
      contentContainer.appendChild(noResultCategories);
    } else {
      const categoriesGrid = el('div', { class: 'categories-grid' });

      for (const category of categoriesAll) {
        const categoryItem = el(
          'div',
          { class: 'category-item' },
          category.title,
        );
        categoriesGrid.appendChild(categoryItem);
      }

      contentContainer.appendChild(categoriesGrid);
    }
  } catch (error) {
    console.error('Villa við að sækja flokka:', error);
    setNotLoading(contentContainer);
  }
}

export async function renderButton() {
  const button = el(
    'div',
    { class: 'showCategories' },
    el(
      'div',
      { class: 'button' },
      el('a', { href: '#', class: 'button-link' }, 'Skoða alla flokka'),
    ),
  );

  button.addEventListener('click', async (event) => {
    event.preventDefault();
    empty(document.querySelector('main'));
    setLoading(document.querySelector('main'));
    await renderCategoriesCard();
    window.history.pushState({}, '', '/categories');
    setNotLoading(document.querySelector('main'));
  });

  return button;
}

export async function renderSamplesCategories() {
  const samplesCategories = el('div', { class: 'all-categories' });

  const categoriesTitle = el('h1', {}, 'Skoða vöruflokkana okkar');
  samplesCategories.appendChild(categoriesTitle);
  empty(samplesCategories);
  setLoading(samplesCategories);

  try {
    const categories = await getCategories(6);
    setNotLoading(samplesCategories);
    if (!categories || categories.length === 0) {
      const noResultCategories = el('div', {}, 'Enginn flokkar funndust');
      samplesCategories.appendChild(noResultCategories);
    } else {
      const categoriesGrid = el('div', { class: 'categories-grid' });

      for (const category of categories) {
        const categoryItem = el(
          'div',
          { class: 'category-item' },
          category.title,
        );
        categoriesGrid.appendChild(categoryItem);
      }

      samplesCategories.appendChild(categoriesGrid);
    }
  } catch (error) {
    console.error('Villa við að sækja flokka:', error);
    setNotLoading(samplesCategories);
  }

  return samplesCategories;
}

export async function renderNavbar() {
  const navbar = el(
    'div',
    {},
    el(
      'div',
      { class: 'navbar' },
      el(
        'div',
        { class: 'navbar-logo' },
        el('a', { href: '/' }, 'Vefforritunarbudin'),
      ),
      el(
        'div',
        { class: 'navbar-links' },
        el('span', {}, 'Nýskráning'),
        el('span', {}, 'Innskráning'),
        el('span', {}, 'Karfa'),
        el('span', { class: 'products-span' }, 'Nýjar Vörur'),
        el('span', { class: 'categories-span' }, 'Flokkar'),
      ),
    ),
  );

  const newProductsSpan = navbar.querySelector('.products-span');

  newProductsSpan.addEventListener('click', async () => {
    const contentContainer = document.querySelector('main');
    empty(contentContainer);
    setLoading(contentContainer);

    try {
      const products = await getProducts(100);
      window.history.pushState({}, '', '/products/');

      setNotLoading(contentContainer);
      if (!products || products.length === 0) {
        const noResultProducts = el('div', {}, 'Enginn vara fannst');
        contentContainer.appendChild(noResultProducts);
      } else {
        const productContainer = el('div', { class: 'product-container' });
        products.forEach((product) => {
          const productCard = createProductCard(product);
          productContainer.appendChild(productCard);
        });
        contentContainer.appendChild(productContainer);
      }
    } catch (error) {
      console.error('Villa við að sækja vöru:', error);
      setNotLoading(contentContainer);
    }
  });

  const categoriesSpan = navbar.querySelector('.categories-span');

  categoriesSpan.addEventListener('click', async () => {
    const contentContainer = document.querySelector('main');
    empty(contentContainer);
    setLoading(contentContainer);

    try {
      const categoriesAll = await getCategories(12);
      window.history.pushState({}, '', '/categories');

      setNotLoading(contentContainer);
      if (!categoriesAll || categoriesAll.length === 0) {
        const noResultCategories = el('div', {}, 'Engir flokkar fundust');
        contentContainer.appendChild(noResultCategories);
      } else {
        const categoriesGrid = el('div', { class: 'categories-grid' });
        categoriesAll.forEach((category) => {
          const categoryItem = el(
            'div',
            { class: 'category-item' },
            category.title,
          );
          categoriesGrid.appendChild(categoryItem);
        });
        contentContainer.appendChild(categoriesGrid);
      }
    } catch (error) {
      console.error('Gat ekki náð í flokka:', error);
      setNotLoading(contentContainer);
    }
  });

  return navbar;
}
