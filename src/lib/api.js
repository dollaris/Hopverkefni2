export const API_URL = 'https://vef1-2023-h2-api-791d754dda5b.herokuapp.com';

export async function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(undefined), ms);
  });
}

export async function getProducts(limit) {
  const url = new URL('products', API_URL);
  url.searchParams.set('limit', limit);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const data = await response.json();
    return data.items;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function productPageination(limit, offset) {
  const url = new URL(API_URL, `/products/?offset=${offset}&limit=${limit}`);
  url.searchParams.set('limit', limit);
  url.searchParams.set('offset', offset);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch products list');
    }
    const data = await response.json();
    return data.total;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}


export async function getCategories(limit) {
  const url = new URL(`${API_URL}/categories`);
  url.searchParams.set('limit', limit);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    const data = await response.json();
    return data.items;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}
