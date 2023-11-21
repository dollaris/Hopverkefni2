/**
 * @typedef {object} Product
 * @property {number} id
 * @property {string} title
 * @property {number} price
 * @property {string} description
 * @property {string} image
 * @property {string} created
 * @property {string} updated
 * @property {number} category_id
 * @property {string} category_title
 */

/**
 * @typedef {object} Category
 * @property {number} id
 * @property {string} title
 */

/**
 * @typedef {object} ApiResponse
 * @property {number} limit
 * @property {number} offset
 * @property {Product[] | Category[]} items
 * @property {object} _links
 */

export default {};
