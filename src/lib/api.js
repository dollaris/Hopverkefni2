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
      throw new Error('Mistókst að sækja gögn');
    }
    const data = await response.json();
    return data.items;
  } catch (error) {
    console.error('Villa við að ná í vörur:', error);
    return [];
  }
}

export async function productSearch(searchTerm = '') {
  const url = new URL('products', API_URL);
  url.searchParams.set('search', searchTerm);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Mistókst að sækja gögn');
    }
    const data = await response.json();
    return data.items;
  } catch (error) {
    console.error('Villa við að ná í vörur:', error);
    return [];
  }
}

export async function getCategories(limit) {
  const url = new URL(`${API_URL}/categories`);
  url.searchParams.set('limit', limit);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Mistókst að sækja gögn');
    }
    const data = await response.json();
    return data.items;
  } catch (error) {
    console.error('Villa við að ná í flokka:', error);
    return [];
  }
}
