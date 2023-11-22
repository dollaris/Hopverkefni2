export const API_URL = 'https://vef1-2023-h2-api-791d754dda5b.herokuapp.com';

export async function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(undefined), ms);
  });
}

export async function getProducts(searchTerm) {
  try {
    let url = `${API_URL}/products/`;

    if (searchTerm) {
      const search = searchTerm ? `?search=${encodeURIComponent(JSON.stringify(searchTerm))}` : '';
      url += search;
    }

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


export async function getCategories(limit) {
  const url = new URL(`${API_URL}/categories`);
  url.searchParams.set('limit', limit);

  try {
    const response = await fetch(`${API_URL}/categories`);
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

export async function getCategoriesById(id) {
  const url = new URL('categories', API_URL);
  url.searchParams.set('id', id);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch category with ID ${id}`);
    }
    const data = await response.json();
    return data.items;
  } catch (error) {
    console.error(`Error fetching category with ID ${id}:`, error);
    return null;
  }
}