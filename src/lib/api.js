/** Grunnslóð á API (DEV útgáfa) */
const API_URL = 'https://vef1-2023-h2-api-791d754dda5b.herokuapp.com';

/**
 * Skilar Promise sem bíður í gefnar millisekúndur.
 * Gott til að prófa loading state, en einnig hægt að nota `throttle` í
 * DevTools.
 * @param {number} ms Tími til að sofa í millisekúndum.
 * @returns {Promise<void>}
 */
export async function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(undefined), ms);
  });
}

export async function getProducts() {
  try {
    const response = await fetch(`${API_URL}/products/`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const data = await response.json();
    return data.items;
  } catch (error) {
    console.error('Villa við að ná í Vörur', error);
    return [];
  }
}

export async function getCategories() {
  try {
    const response = await fetch(`${API_URL}/categories`);
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    const data = await response.json();
    return data.items;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return []; // Return an empty array or handle the error as needed
  }
}
