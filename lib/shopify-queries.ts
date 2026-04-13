// lib/shopify-queries.ts

export const GET_PRODUCTS = `
  query GetProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          handle
          title
          description
          descriptionHtml
          subtitle: metafield(namespace: "custom", key: "subtitle") { value }
          badge: metafield(namespace: "custom", key: "badge") { value }
          category: metafield(namespace: "custom", key: "category") { value }
          category_label: metafield(namespace: "custom", key: "category_label") { value }
          ingredients: metafield(namespace: "custom", key: "ingredients") { value }
          images(first: 2) { edges { node { url altText } } }
          variants(first: 1) {
            edges { node { id price { amount currencyCode } availableForSale } }
          }
        }
      }
    }
  }
`;

export const GET_PRODUCT_BY_HANDLE = `
  query GetProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      handle
      title
      description
      descriptionHtml
      subtitle: metafield(namespace: "custom", key: "subtitle") { value }
      badge: metafield(namespace: "custom", key: "badge") { value }
      category: metafield(namespace: "custom", key: "category") { value }
      category_label: metafield(namespace: "custom", key: "category_label") { value }
      ingredients: metafield(namespace: "custom", key: "ingredients") { value }
      images(first: 2) { edges { node { url altText } } }
      variants(first: 1) {
        edges { node { id price { amount currencyCode } availableForSale } }
      }
    }
  }
`;

export const CART_CREATE = `
  mutation CartCreate($lines: [CartLineInput!]!) {
    cartCreate(input: { lines: $lines }) {
      cart { id checkoutUrl }
      userErrors { field message }
    }
  }
`;
